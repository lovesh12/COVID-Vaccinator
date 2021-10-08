import React from "react";

import "./CenterVaccineDetails.css";
import Button from "../../../components/Button/Button";
import ButtonGroup from "../../../components/Button/ButtonGroup";
import VaccineDetailCard from "./VaccineDetailCard";

function CenterVaccineDetails(props) {
    const { name, address, dayDetails } = props;

    const totalDosesAvailable = dayDetails.reduce(
        (prev, curr) =>
            prev.dose1 ||
            0 + prev.dose2 ||
            0 + curr.dose1 ||
            0 + curr.dose2 ||
            0
    );

    console.log(totalDosesAvailable);

    return (
        <div className={"center-vaccine-details"}>
            <h3>{name}</h3>
            <p>{address}</p>

            <ButtonGroup center>
                {totalDosesAvailable <= 0 && (
                    <Button
                        label={"Notify Me When Available"}
                        type={"bordered"}
                        lite
                    />
                )}
            </ButtonGroup>
            <div className="vaccine-day-cards">
                {dayDetails.map((dayData) => (
                    <VaccineDetailCard
                        heading={dayData.date}
                        label={dayData.name}
                        description={dayData.age}
                        dose1={dayData.dose1}
                        dose2={dayData.dose2}
                    />
                ))}
            </div>
        </div>
    );
}

export default CenterVaccineDetails;
