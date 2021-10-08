import React from "react";

import "./Button.css";

function ButtonGroup(props) {
    const { className, center } = props;

    return (
        <div
            className={`btn-group ${className || ""} ${center ? "center" : ""}`}
        >
            {props.children}
        </div>
    );
}

export default ButtonGroup;
