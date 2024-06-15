import React from "react";
import './Heading.css';

const Heading = ({name}) => {
    return (
        <div className="heading">
            <h1>{name}</h1>
            <hr />
        </div>
        
    )

}

export default Heading;