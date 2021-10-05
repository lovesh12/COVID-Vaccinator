import React from "react";

function VaccinationStep(props) {
    const { number, heading, image } = props;

    return (
        <div className="vaccination-step">
            <div className="step-number">{number}</div>
            <div className="step-heading">{heading}</div>
            <img src={image} className="step-img" alt={"step-img"} />
        </div>
    );
}

export default VaccinationStep;
