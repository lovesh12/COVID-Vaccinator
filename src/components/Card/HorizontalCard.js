import React from "react";

function HorizontalCard(props) {
    const { icon, left, leftMid, leftBottom, middle, right, color } = props;

    return (
        <div className={"horizontal-card"} style={{ borderColor: color }}>
            <div className="card-icon">{icon}</div>
            <div className="card-left">
                <div className={`left-top ${leftMid ? "small" : ""}`}>
                    {left}
                </div>
                {leftMid && <div className="left-middle">{leftMid}</div>}
                {leftBottom && <div className="left-bottom">{leftBottom}</div>}
            </div>
            {middle && (
                <div className="card-middle" style={{ color: color }}>
                    {middle.toUpperCase()}
                </div>
            )}
            <div className="card-right">{right}</div>
        </div>
    );
}

export default HorizontalCard;
