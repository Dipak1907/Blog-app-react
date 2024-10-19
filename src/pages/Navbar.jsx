import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./CreatePost";
import HomePage from "./HomePage";

function Navbar() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create-post" element={<CreatePost onAdd={addPost}/>} />
                </Routes>
            </div>
        </Router>
        
    )
}

export default Navbar;