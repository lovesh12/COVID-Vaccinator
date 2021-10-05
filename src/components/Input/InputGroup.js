import React from "react";

import "./Input.css";

function InputGroup(props) {
    return <div className={"input-group"}>{props.children}</div>;
}

export default InputGroup;
