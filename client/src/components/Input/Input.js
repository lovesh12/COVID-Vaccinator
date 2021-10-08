import React from "react";

function Input(props) {
    const { onChange, width, ...passingProps } = props;

    return (
        <div className={"input-wrapper"} style={{ width: width || "11vw" }}>
            <input {...passingProps} onChange={onChange} />
        </div>
    );
}

export default Input;
