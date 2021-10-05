import React from "react";

import "./Page.css";

function PageHighlight(props) {
    const { className, lite } = props;

    return (
        <div
            className={`page-highlight ${className || ""} ${
                lite ? "lite" : ""
            }`}
        >
            {props.children}
        </div>
    );
}

export default PageHighlight;
