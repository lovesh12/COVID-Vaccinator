import React from "react";

function PageSection(props) {
    const { className } = props;

    return <div className={`page-section ${className}`}>{props.children}</div>;
}

export default PageSection;
