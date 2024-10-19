import React from "react";
import {Link} from "react-router-dom";


function Links(props) {
    return (
        <nav>
                <Link to={props.to}><button>{props.name}</button></Link>
        </nav>
    )

}

export default Links;