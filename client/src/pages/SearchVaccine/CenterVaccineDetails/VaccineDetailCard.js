import React from "react";

import Button from "../../../components/Button/Button";

function VaccineDetailCard(props) {
    const { heading, label, description, vaccine, dose1, dose2 } = props;

    const totalDoes = dose1 + dose2;

    return (
        <div className={"vaccine-detail-card"}>
            {heading && <div className="card-heading">{heading}</div>}
            <div className="card-label">{label}</div>

            <div className="dose-count">
                {totalDoes > 0 ? (
                    <>
                        <div className="dose1-count">
                            D1<span>{dose1}</span>
                        </div>
                        <div className="dose-total-count">{totalDoes}</div>
                        <div className="dose2-count">
                            D2<span>{dose2}</span>
                        </div>
                    </>
                ) : (
                    <div className="dose-booked">Booked</div>
                )}
            </div>
            <div className="card-description">{vaccine.toUpperCase()}</div>
            <div className="card-description">{description+" & Above"}</div>
            {totalDoes > 0 && (
                <Button label={"Set Reminder"} lite type={"bordered"} />
            )}
        </div>
    );
}

export default VaccineDetailCard;
