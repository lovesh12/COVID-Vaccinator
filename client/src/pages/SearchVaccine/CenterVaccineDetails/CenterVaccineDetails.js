import React from "react";

import "./CenterVaccineDetails.css";
import Button from "../../../components/Button/Button";
import VaccineDetailCard from "./VaccineDetailCard";
import genWeekWithDates from "../../../util/genWeekWithDates";
import { useMutation } from "react-query";
import MutationAlert from "../../../components/Alerts/MutationAlert";

function CenterVaccineDetails(props) {
    const { name, address, dayDetails, id } = props;

    const dosesDate = genWeekWithDates(dayDetails);

    const Reminder = useMutation((data) => {
        return new Promise(async (resolve, reject) => {
            let res = await fetch("/account/reminder/add", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            res = await res.json();
            if (!res.success) reject(new Error(res.error));
            resolve(data);
        });
    });

    const addReminder = (date, center) => {
        Reminder.mutate({
            type: 1,
            date,
            center: id,
            centername: name,
            message: `You have vaccination appointment on ${date} at ${center}`,
        });
    };

    const addNotify = (date, center) => {
        Reminder.mutate({
            type: 2,
            date,
            center: id,
            centername: name,
            message: `Vaccines are now available at ${center} on ${date}`,
        });
    };

    return (
        <>
            <MutationAlert
                mutation={Reminder}
                successMsg={"Successfully added your reminder"}
            />
            <div className={"center-vaccine-details"}>
                <h3>{name}</h3>
                <p>{address}</p>
                <div className="vaccine-day-cards">
                    {Object.values(dosesDate).map((dayData, i) => (
                        <div className="vaccine-day-cards--type" key={i}>
                            {dayData.covishield && (
                                <VaccineDetailCard
                                    heading={dayData.covishield.date}
                                    label={dayData.covishield.name}
                                    description={
                                        dayData.covishield.min_age_limit
                                    }
                                    vaccine={"Covishield"}
                                    dose1={
                                        dayData.covishield
                                            .available_capacity_dose1
                                    }
                                    dose2={
                                        dayData.covishield
                                            .available_capacity_dose2
                                    }
                                    addReminder={() =>
                                        addReminder(
                                            dayData.covishield?.date
                                                ? dayData.covishield.date
                                                : dayData.covaxin.date,
                                            name
                                        )
                                    }
                                />
                            )}
                            {dayData.covaxin && (
                                <VaccineDetailCard
                                    heading={
                                        !dayData.covishield &&
                                        dayData.covaxin.date
                                    }
                                    label={dayData.covaxin.name}
                                    description={dayData.covaxin.min_age_limit}
                                    vaccine={"Covaxin"}
                                    dose1={
                                        dayData.covaxin.available_capacity_dose1
                                    }
                                    dose2={
                                        dayData.covaxin.available_capacity_dose2
                                    }
                                    addReminder={() =>
                                        addReminder(
                                            dayData.covishield?.date
                                                ? dayData.covishield.date
                                                : dayData.covaxin.date,
                                            name
                                        )
                                    }
                                />
                            )}
                            {!dayData.covaxin && !dayData.covishield && (
                                <div className={"vaccine-detail-card"}>
                                    <div className="card-heading">
                                        {dayData.date}
                                    </div>
                                    <Button
                                        label={"Notify Me"}
                                        type={"bordered"}
                                        lite
                                        onClick={() =>
                                            addNotify(dayData.date, name)
                                        }
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default CenterVaccineDetails;
