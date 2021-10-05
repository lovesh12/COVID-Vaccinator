import React from "react";

import "./Page.css";

function PageHighlight(props) {
    const { className } = props;

    return (
        <div className={`page-highlight ${className || ""}`}>
            {props.children}
        </div>
    );
}

export default PageHighlight;
