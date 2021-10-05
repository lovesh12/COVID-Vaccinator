import React from "react";

import "./Page.css";

function PageContent(props) {
    const { className } = props;

    return (
        <div className={`page-content ${className || ""}`}>
            {props.children}
        </div>
    );
}

export default PageContent;
