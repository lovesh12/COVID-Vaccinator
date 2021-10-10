import React from "react";
import Dropdown from "../../../components/Dropdown/Dropdown";
import Button from "../../../components/Button/Button";
import { AiOutlineSearch } from "react-icons/all";
import InputGroup from "../../../components/Input/InputGroup";

function SearchByStateDistrict(props) {
    const {
        sIsSuccess,
        dIsSuccess,
        stateList,
        state,
        changeState,
        districtList,
        district,
        changeDistrict,
        refetch,
    } = props;

    return (
        <InputGroup>
            {sIsSuccess && dIsSuccess && (
                <>
                    <Dropdown
                        label={"Select State"}
                        options={stateList}
                        selected={state.i}
                        onChange={changeState}
                        labelKey={"state_name"}
                        idKey={"state_id"}
                    />
                    <Dropdown
                        label={"Select District"}
                        options={districtList}
                        selected={district.i}
                        onChange={changeDistrict}
                        labelKey={"district_name"}
                        idKey={"district_id"}
                    />
                </>
            )}
            <Button
                icon={AiOutlineSearch}
                label={"Search"}
                type={"inverted"}
                big
                onClick={refetch}
            />
        </InputGroup>
    );
}

export default SearchByStateDistrict;
