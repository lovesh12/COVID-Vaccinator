import React, { useEffect, useState } from "react";
import SearchByPincodeType from "./SearchTypes/SearchByPincodeType";
import { useQuery } from "react-query";
import getDate from "../../util/getDate";
import PageContent from "../../components/Page/PageContent";
import SearchResults from "./SearchResults/SearchResults";

function SearchByPincode(props) {
    const [pincode, setPincode] = useState("");

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
        refetch();
    }, [pincode]);

    console.log(centers);

    return (
        <>
            <PageContent className={"search-results-pagecontent"}>
                <SearchByPincodeType setPincode={setPincode} />
            </PageContent>
            {centers && isSuccess && (
                <SearchResults centers={centers} state={""} />
            )}
        </>
    );
}

export default SearchByPincode;
