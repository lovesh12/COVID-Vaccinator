import React, { useEffect, useState } from "react";

import Page from "../../components/Page/Page";
import PageContent from "../../components/Page/PageContent";

import "./SearchVaccine.css";
import Button from "../../components/Button/Button";
import { AiOutlineSearch } from "react-icons/all";
import SearchResults from "./SearchResults/SearchResults";
import useStateDistrictLists from "../../hooks/useStateDistrictLists";
import { useQuery, useQueryClient } from "react-query";
import getDate from "../../util/getDate";
import SearchByStateDistrict from "./SearchTypes/SearchByStateDistrict";

import SearchByPincodeType from "./SearchTypes/SearchByPincodeType";
import SearchTypeHeaderBtns from "./SearchTypes/SearchTypeHeaderBtns";
import CenterMap from "./CenterMap/CenterMap";
import SearchByDistrict from "./SearchByDistrict";
import SearchByPincode from "./SearchByPincode";

const searchBtns = ["By District", "By Pincode", "On The Map"];

function SearchVaccine(props) {
    const [selectedSearchType, setSelectedSearchType] = useState(0);

    return (
        <Page className={"search-vaccine"}>
            <PageContent>
                <h1>Find COVID-19 Vaccines Near You</h1>
                <p>
                    Get a preview list of nearest vaccination centres and
                    availability of vaccination slots
                </p>
                <Button
                    icon={AiOutlineSearch}
                    label={"Quick Find Near Me"}
                    type={"inverted"}
                    big
                />

                <SearchTypeHeaderBtns
                    btnValues={searchBtns}
                    selected={selectedSearchType}
                    setSelected={setSelectedSearchType}
                />
            </PageContent>
            {selectedSearchType === 0 && <SearchByDistrict />}
            {selectedSearchType === 1 && <SearchByPincode />}
            {selectedSearchType === 2 && <CenterMap />}
        </Page>
    );
}

export default SearchVaccine;
