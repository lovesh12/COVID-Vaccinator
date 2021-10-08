import React from "react";

import "./Card.css";

function Card(props) {
    const { className } = props;

    return <div className={`card ${className || ""}`}>{props.children}</div>;
}

export default Card;
