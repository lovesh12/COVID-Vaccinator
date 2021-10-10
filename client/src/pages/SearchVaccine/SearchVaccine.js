import React, {useEffect} from "react";

import Page from "../../components/Page/Page";
import PageContent from "../../components/Page/PageContent";

import "./SearchVaccine.css";
import Button from "../../components/Button/Button";
import { AiOutlineSearch } from "react-icons/all";
import InputGroup from "../../components/Input/InputGroup";
import SearchResults from "./SearchResults/SearchResults";
import Dropdown from "../../components/Dropdown/Dropdown";
import useStateDistrictLists from "../../hooks/useStateDistrictLists";
import {useQuery, useQueryClient} from "react-query";
import getDate from "../../util/getDate";

function SearchVaccine(props) {

    const queryClient = useQueryClient()

    const [state, district, stateList, districtList, sIsSuccess, dIsSuccess, changeState, changeDistrict] = useStateDistrictLists();

    const {isSuccess, data: centers, refetch } = useQuery('calenderByDistrict', () =>
            fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${district.id}&date=${getDate(0)}`).then(res => res.json()).then(async body => {
                console.log(body);
                return body.centers;
            }),
        {
            enabled: false,
            keepPreviousData: true
        }
    )

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

                <div className="search-types">
                    <div className="search-type selected">By District</div>
                    <div className="search-type">By Pincode</div>
                    <div className="search-type">On The Map</div>
                </div>

                <InputGroup>
                    {sIsSuccess && dIsSuccess &&
                    <>
                        <Dropdown label={"Select State"} options={stateList} selected={state.i} onChange={changeState} labelKey={"state_name"} idKey={"state_id"}/>
                        <Dropdown label={"Select District"} options={districtList} selected={district.i} onChange={changeDistrict} labelKey={"district_name"} idKey={"district_id"}/>

                    </>
                    }
                    <Button
                        icon={AiOutlineSearch}
                        label={"Search"}
                        type={"inverted"}
                        big
                        onClick={refetch}
                    />
                </InputGroup>
            </PageContent>
            {state.i !== -1 && district.i !== -1 && isSuccess && sIsSuccess && dIsSuccess && <SearchResults centers={centers} state={stateList[state.i].state_name} />}
        </Page>
    );
}

export default SearchVaccine;
