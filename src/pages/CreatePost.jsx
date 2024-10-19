import React, {useState, useEffect } from "react";
import Button from '@mui/material/Button';


function CreatePost(props) {
 
    const [fullPost, setFullPost] = useState({
        title:"",
        content:"",
        author:""
    });
    
    useEffect(function() {
        if (props.post) {
            setFullPost({
                title: props.post.title,
                content: props.post.content,
                author: props.post.author
            });
        }
    }, [props.post]);


    
    const validateForm = ({title, content, author}) => {
        return title.trim() !== '' && content.trim() !== '' && author.trim() !== '';
    };

    // handle the input data typed by user in form 
    function handleChange(event) {
        const {value, name} = event.target;
        setFullPost(prevValue => {
            return {...prevValue,
            [name]:value
            }
        })
    }

    //handle the post button click and validate all the inputs are field
    function submitPost(event) {
        event.preventDefault();
        if (validateForm(fullPost)) {
            if (props.post) {
                // Editing an existing post
                props.onSave({...fullPost, index: props.post.index});
            } else {
                // Adding a new Post
                props.onAdd(fullPost);
            }
            // Reset the form after Submitted
            setFullPost({
                title:"",
                content:"",
                author:""
            })
        } else {
            alert("Please fill in all the fields correctly.");
        }
    }

    return ( 
        <div >
        <form className="postform" onSubmit={submitPost}>
            <input 
            type="text"
            className="post"
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={fullPost.title}
            required
            />
            <textarea
            type="text"
            className="post textarea"
            onChange={handleChange}
            name="content"
            placeholder="Write Post..."
            rows="4"
            value={fullPost.content}
            required
            />
            <input
            type="text"
            className="post"
            onChange={handleChange}
            name="author"
            placeholder="Author"
            value={fullPost.author}
            required
            />
            
            <div>
                <Button 
                id="postbutton" 
                variant="contained" 
                color="success"  
                type="submit">
                    {props.post ? "Update Post" : "Post"}
                </Button>
            </div>
        </form>
        </div>
)}

export default CreatePost;