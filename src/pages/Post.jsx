import React from "react";


function Post(props) {
      
    const time = new Date().toLocaleTimeString('en-US', { hour12: true, hour: "numeric",  minute: "numeric"});
    const date = new Date().toLocaleDateString();

    return (
        <div >
            <h2 className="post-title">{props.title}</h2>
            <p className="post-content">{props.content}</p>
            <small>Author: <span>{props.author}</span></small>
            <small><p>{date} {time}</p></small>
        </div>
    )
}

export default Post;