import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
function App() {

    return (
        <div className="app-container">
            <Header />
            <HomePage />
            <Footer />
        </div>
    )
};

export default App;