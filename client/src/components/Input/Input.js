import React from "react";

function Input(props) {
    const { onChange, width, pStyle, ...passingProps } = props;

    return (
        <div
            className={"input-wrapper"}
            style={{ width: width || "11vw", ...pStyle }}
        >
            <input {...passingProps} onChange={onChange} />
        </div>
    );
}

export default Input;
