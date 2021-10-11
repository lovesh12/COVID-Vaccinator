import React from "react";

function Input(props) {
    const { onChange, width, pStyle, ...passingProps } = props;

    return (
        <div
            className={"input-wrapper"}
            style={{ width: width || "11vw", ...pStyle }}
        >
            <input
                {...passingProps}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default Input;
