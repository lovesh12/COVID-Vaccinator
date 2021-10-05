import React from "react";

function Page(props) {
    const { className } = props;

    return <div className={`page ${className || ""}`}>{props.children}</div>;
}

export default Page;
