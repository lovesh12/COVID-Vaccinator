import React from "react";

function InputSwitch(props) {
    const { label, switchedOn, onToggle } = props;

    const handleClick = () => {
        onToggle(!switchedOn);
    };

    return (
        <div className="radio-btn-wrapper">
            <div
                className={`radio-btn ${switchedOn ? "checked" : ""}`}
                onClick={handleClick}
            />
            {label && <div className="radio-lbl">{label}</div>}
        </div>
    );
}

export default InputSwitch;
