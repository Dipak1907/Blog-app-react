import React from "react";
import BookIcon from '@mui/icons-material/Book';

function Header() {
    return ( 
        <header className="header">    
            <h1>
            <BookIcon/>
            Blog
            </h1>
        </header>
    );
}
export default Header;