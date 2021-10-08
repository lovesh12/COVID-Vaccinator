import React from "react";
import VaccineDoseDay from "./VaccineDoseDay";

import "./VaccineDetail.css";

function VaccineDetail(props) {
    const { heading, doseDays } = props;

    return (
        <div className={"vaccine-detail"}>
            <h2 className="heading vaccine-detail-head">
                {heading.toUpperCase()}
            </h2>

            <div className="vaccine-doses">
                {doseDays.map((e, i) => (
                    <VaccineDoseDay heading={e} i={i} />
                ))}
            </div>
        </div>
    );
}

export default VaccineDetail;
