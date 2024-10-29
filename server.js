import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json());

const port = 3000;
const saltRounds = 10;

// postgress database connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "react-blog-db",
  password: "Danny7589",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello world")
});

// add the new post data to database
app.post("/posts", async (req, res) => {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
        return res.status(400).json({ message: "All fields are required"});
    }

    try {
        const result = await db.query(
            'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3) RETURNING *', 
            [title, content, author]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error inserting post', error);
        res.status(500).json({ message: "Internal server error"});
    }
});

// fetch all the posts
app.get('/posts', async (req, res) => {
    try {
        const result = await db.query("Select * FROM posts ORDER BY created_at DESC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching posts", error);
        res.status(500).json({ message: "Internal server error "});
    }
});

// fetch single post 
app.get("/posts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query("Select * FROM posts WHERE id = $1", [id]);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching posts", error);
        res.status(500).json({ message: "Internal server error "});
    }
})

// update an existing post
app.put('/posts/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
  
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const result = await db.query(
        'UPDATE posts SET title = $1, content = $2, author = $3 WHERE id = $4 RETURNING *',
        [title, content, author, id]
      );
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error updating post', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// handle delete post route
app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await db.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Handle register data 
app.post("/register", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // input validation 
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required"})
  }

  try {
    // check if user already exists
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists. Try logging in." });
    } 

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Insert the new user in database
    const result = await db.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashedPassword]
    );
    res.status(201).json({ message: "Registration successful!" });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error"});
  }
});


// handle login data
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

    //Input validation 
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required"});
    }

  try {
    // Check if user exists
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email]);
    const user = result.rows[0];

    if (!user) {
        return res.status(400).json({ message: "Invalid email or password"})
    }

    // Compare the pass using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password"})
    }

    res.json({
        message: "Login successful!"
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error"})
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
