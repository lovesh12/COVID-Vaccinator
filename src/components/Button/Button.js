import React from "react";

import "./Button.css";

function Button(props) {
    const { icon, label, type, big } = props;

    return (
        <div className={`btn ${type || ""} ${big ? "big" : ""}`}>
            {icon && React.createElement(icon, { className: "btn-icon" })}
            <div className="btn-lbl">{label}</div>
        </div>
    );
}

export default Button;
