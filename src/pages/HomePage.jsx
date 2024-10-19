import React, {useState} from "react";
import Post from "../pages/Post";
import CreatePost from "../pages/CreatePost";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

function HomePage() {


    const [allPosts, setPosts] = useState([
        { title: "First Post", content: "This is the content of the first post. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum", author: "Author 1" },
        { title: "Second Post", content: "This is the content of the second post", author: "Author 2" },
        { title: "Third Post", content: "This is the content of the second post", author: "Author 3" }

    ]);

    // state to manage weather user is editing or not 
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(null);

    // state to toggle visibility of the code 
    const [isCreating, setIsCreating] = useState(false);


    function handleEdit(index) {
        setIsEditing(true);
        setIsCreating(false);
        setCurrentPost({...allPosts[index], index});
    }

    // upadate the edited post 
    function updatePost(updatedPost) {
        const updatedPosts = allPosts.slice(); // Create a copy of allPosts array
        updatedPosts[updatedPost.index] = updatedPost;
        setPosts(updatedPosts);
        setIsEditing(false);
        setCurrentPost(null);
    }


    function addPost(newPost) {
        setPosts(prevPosts => {
            return [...prevPosts, newPost]
        })
        setIsCreating(false);
    }

    // function for deliting post
    function deletePost(id) {
        setPosts(prevPosts => {
            return prevPosts.filter((post, index) => {
                return index !== id;
            });
        });
    }
    // toggle function for creat post button 
    function toggleCreatePost() {
        setIsCreating(!isCreating);
        setIsEditing(false); // Ensure not editing when creating a post
    }

    return (
        <div>
            {/* {button to show or hide createpost form} */}
            <div id="CreatePostButton">
            <Button
            varient="contained"
            color="success"
            onClick={toggleCreatePost}
            >
                {isCreating ? "Cancle" : "Create New Post"}
            </Button>
            </div>

            {/* {show CreatePost form only when is creating is true} */}
            {isCreating && ( <CreatePost onAdd={addPost} /> )}

            {/* {show editing form when isEditing is true} */}

            {isEditing && (
                <CreatePost post={currentPost} onSave={updatePost} />) }

            {/* {Display all posts} */}
            {!isCreating && (
            <div className="postContainer">
            {allPosts.slice().reverse().map((post, reverseIndex) => {
                const actualIndex = allPosts.length -1 - reverseIndex;
                console.log(actualIndex)
                return (
                    <div key={actualIndex} className="postItem">
                    <Post 
                    id={actualIndex}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    />
                    <div>
                    <div className="postButton">
                    <Button
                    id="editbutton"
                    onClick={function() { handleEdit(actualIndex); }}
                    variant="outlined" 
                    color="success"  
                    size="small"
                    type="submit">
                        Edit
                    </Button>
                    <Button 
                    onClick={function () {deletePost(actualIndex); }}
                    variant="contained" 
                    size="small"
                    color="error"  
                    type="submit"><DeleteIcon /></Button>
                    </div>
            </div> 
                    </div> 

    )})}
    </div>)}
        </div>
    )
}

export default HomePage;