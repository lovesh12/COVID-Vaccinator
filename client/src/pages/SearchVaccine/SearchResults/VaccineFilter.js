import React from "react";
import ButtonGroup from "../../../components/Button/ButtonGroup";
import Button from "../../../components/Button/Button";

function VaccineFilter(props) {
    const { id, heading, filters, filterBtns, selectedId, setFilters } = props;

    const handleClick = (btnId) => {
        if (selectedId === btnId) {
            btnId = -1;
        }

        setFilters({ ...filters, [id]: { selectedId: btnId } });
    };

    return (
        <div className="result-filter-type">
            <h3>{heading}</h3>
            <ButtonGroup>
                {filterBtns.map((btn, i) => (
                    <Button
                        selected={selectedId === i}
                        key={i}
                        label={btn}
                        type={"bordered"}
                        small
                        onClick={() => handleClick(i)}
                    />
                ))}
            </ButtonGroup>
        </div>
    );
}

export default VaccineFilter;
