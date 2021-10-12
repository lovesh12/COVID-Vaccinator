import React, { useEffect, useState } from "react";
import SearchByPincodeType from "./SearchTypes/SearchByPincodeType";
import { useQuery } from "react-query";
import getDate from "../../util/getDate";
import PageContent from "../../components/Page/PageContent";
import SearchResults from "./SearchResults/SearchResults";

import { useParams } from "react-router-dom";

function SearchByPincode(props) {
    const { pin } = useParams();
    const [pincode, setPincode] = useState(pin);

    useEffect(() => {
        if (pin && pin !== "") setPincode(pin);
    }, [pin]);

    const {
        isSuccess,
        data: centers,
        refetch,
    } = useQuery(
        "calenderByDistrict",
        () =>
            fetch(
                `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${getDate(
                    0
                )}`
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

    useEffect(() => {
        if (pincode) {
            refetch();
        }
    }, [pincode]);

    console.log(centers);

    return (
        <>
            <PageContent className={"search-results-pagecontent"}>
                <SearchByPincodeType value={pincode} setPincode={setPincode} />
            </PageContent>
            {centers && isSuccess && (
                <SearchResults centers={centers} state={""} />
            )}
        </>
    );
}

export default SearchByPincode;
