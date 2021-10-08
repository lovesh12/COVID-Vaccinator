import React from "react";

function PageNormal(props) {
    const { className } = props;

    return (
        <div className={`page-normal ${className || ""}`}>{props.children}</div>
    );
}

export default PageNormal;
