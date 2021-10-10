import React, { useState } from "react";

import InputGroup from "../../../components/Input/InputGroup";
import Input from "../../../components/Input/Input";
import { AiOutlineSearch } from "react-icons/all";
import Button from "../../../components/Button/Button";

function SearchByPincodeType(props) {
    const { setPincode } = props;

    const [pincodeVal, setPincodeVal] = useState("");

    const handleChange = (e) => {
        setPincodeVal(e.target.value);
    };

    const handleFilterClick = () => {
        setPincode(pincodeVal);
    };

    return (
        <InputGroup>
            <Input
                type={"text"}
                placeholder={"Pincode"}
                value={pincodeVal}
                onChange={handleChange}
            />

            <Button
                icon={AiOutlineSearch}
                label={"Search"}
                type={"inverted"}
                big
                onClick={handleFilterClick}
            />
        </InputGroup>
    );
}

export default SearchByPincodeType;
