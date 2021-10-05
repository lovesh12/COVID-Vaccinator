import React from "react";

import "./Button.css";

function ButtonGroup(props) {
    const { className } = props;

    return (
        <div className={`btn-group ${className || ""}`}>{props.children}</div>
    );
}

export default ButtonGroup;
