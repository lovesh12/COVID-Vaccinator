import React from "react";

const description = [
    "1st Dose",
    "Start to build immunity",
    "2nd dose",
    "Full immunity",
];

const colors = ["#D4D6FF", "#A2A7FF", "#777CDA", "#4A50C0"];

function VaccineDoseDay(props) {
    const { heading, i } = props;

    return (
        <div className={"vaccine-dose-day"}>
            <div className="circle" style={{ backgroundColor: colors[i] }} />
            <div className="dose-day-details">
                <h2 className="heading">Day {heading}</h2>
                <p className="description">{description[i]}</p>
            </div>
        </div>
    );
}

export default VaccineDoseDay;
