import React from "react";

import "./CenterVaccineDetails.css";
import Button from "../../../components/Button/Button";
import VaccineDetailCard from "./VaccineDetailCard";
import genWeekWithDates from "../../../util/genWeekWithDates";

function CenterVaccineDetails(props) {
    const { name, address, dayDetails } = props;

    const dosesDate = genWeekWithDates(dayDetails)
    console.log(dosesDate)
    console.log(name)

    return (
        <div className={"center-vaccine-details"}>
            <h3>{name}</h3>
            <p>{address}</p>
            <div className="vaccine-day-cards">
                {Object.values(dosesDate).map((dayData, i) => (
                    <div className="vaccine-day-cards--type" key={i}>
                        {dayData.covishield &&
                            <VaccineDetailCard
                                heading={dayData.covishield.date}
                                label={dayData.covishield.name}
                                description={dayData.covishield.min_age_limit}
                                vaccine={"Covishield"}
                                dose1={dayData.covishield.available_capacity_dose1}
                                dose2={dayData.covishield.available_capacity_dose2}
                            />
                        }
                        {dayData.covaxin &&
                        <VaccineDetailCard
                            label={dayData.covaxin.name}
                            description={dayData.covaxin.min_age_limit}
                            vaccine={"Covaxin"}
                            dose1={dayData.covaxin.available_capacity_dose1}
                            dose2={dayData.covaxin.available_capacity_dose2}
                        />
                        }
                        {!dayData.covaxin && !dayData.covishield &&
                            <div className={"vaccine-detail-card"}>
                                <div className="card-heading">{dayData.date}</div>
                                <Button label={"Notify Me"} type={"bordered"} lite/>
                            </div>
                        }
                    </div>

                ))}
            </div>
        </div>
    );
}

export default CenterVaccineDetails;
