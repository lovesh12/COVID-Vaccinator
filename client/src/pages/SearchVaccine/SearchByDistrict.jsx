import React from "react";
import SearchByStateDistrict from "./SearchTypes/SearchByStateDistrict";
import useStateDistrictLists from "../../hooks/useStateDistrictLists";
import { useQuery } from "react-query";
import getDate from "../../util/getDate";
import SearchResults from "./SearchResults/SearchResults";
import PageContent from "../../components/Page/PageContent";

function SearchByDistrict(props) {
    const [
        state,
        district,
        stateList,
        districtList,
        sIsSuccess,
        dIsSuccess,
        changeState,
        changeDistrict,
    ] = useStateDistrictLists();

    const {
        isSuccess,
        data: centers,
        refetch,
    } = useQuery(
        "calenderByDistrict",
        () =>
            fetch(
                `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${
                    district.id
                }&date=${getDate(0)}`
            )
                .then((res) => res.json())
                .then(async (body) => {
                    console.log(body);
                    return body.centers;
                }),
        {
            enabled: false,
            keepPreviousData: true,
        }
    );

    return (
        <>
            <PageContent className={"search-results-pagecontent"}>
                <SearchByStateDistrict
                    sIsSuccess={sIsSuccess}
                    dIsSuccess={dIsSuccess}
                    stateList={stateList}
                    state={state}
                    changeState={changeState}
                    districtList={districtList}
                    district={district}
                    changeDistrict={changeDistrict}
                    refetch={refetch}
                />
            </PageContent>

            {state.i !== -1 &&
                district.i !== -1 &&
                isSuccess &&
                sIsSuccess &&
                dIsSuccess && (
                    <SearchResults
                        centers={centers}
                        state={stateList[state.i].state_name}
                    />
                )}
        </>
    );
}

export default SearchByDistrict;
