import React from "react";
import ButtonGroup from "../../../components/Button/ButtonGroup";
import Button from "../../../components/Button/Button";

function VaccineFilter(props) {
    const { heading, filterBtns } = props;

    return (
        <div className="result-filter-type">
            <h3>{heading}</h3>
            <ButtonGroup>
                {filterBtns.map((btn) => (
                    <Button label={btn} type={"bordered"} small />
                ))}
            </ButtonGroup>
        </div>
    );
}

export default VaccineFilter;
