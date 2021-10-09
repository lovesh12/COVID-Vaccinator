import React from "react";

import "./Button.css";

function Button(props) {
    const { icon, label, type, big, small, lite, selected } = props;

    return (
        <div
            className={`btn ${type || ""} ${selected ? "selected" : ""} ${
                big ? "big" : small ? "small" : ""
            } ${lite ? "lite" : ""}`} onClick={props.onClick}
        >
            {icon && React.createElement(icon, { className: "btn-icon" })}
            <div className="btn-lbl">{label}</div>
        </div>
    );
}

export default Button;
