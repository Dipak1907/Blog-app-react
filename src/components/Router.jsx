import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePost from "../pages/CreatePost";
import App from "./App";

function Router() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="create-post" element={<CreatePost />} />
                    <Route path="/" element={<App />} />
                </Routes>
            </div>
        </Router>
    )
}

export default Router;