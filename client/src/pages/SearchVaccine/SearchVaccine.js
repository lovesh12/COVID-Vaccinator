import React, { useEffect } from "react";

import Page from "../../components/Page/Page";
import PageContent from "../../components/Page/PageContent";

import "./SearchVaccine.css";
import Button from "../../components/Button/Button";
import { AiOutlineSearch } from "react-icons/all";
import SearchTypeHeaderBtns from "./SearchTypes/SearchTypeHeaderBtns";
import CenterMap from "./CenterMap/CenterMap";
import SearchByDistrict from "./SearchByDistrict";
import SearchByPincode from "./SearchByPincode";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import { useQuery } from "react-query";
import useRedirect from "../../hooks/useRedirect";

const searchBtns = [
    {
        name: "By District",
        link: "/search",
    },
    {
        name: "By Pincode",
        link: "/search/pincode",
    },
    {
        name: "On The Map",
        link: "/search/map",
    },
];

function SearchVaccine(props) {
    const redirectTo = useRedirect();
    const { path } = useRouteMatch();

    const {
        isSuccess,
        data: locationData,
        refetch,
    } = useQuery(
        "quickFindNearMe",
        () =>
            fetch(`http://ip-api.com/json/?fields=61439`)
                .then((res) => res.json())
                .then(async (body) => {
                    return body;
                }),
        {
            enabled: false,
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        if (isSuccess && locationData && locationData.zip)
            redirectTo(`/search/pincode/${locationData.zip}`);
    }, [locationData]);

    const handleQuickFind = () => {
        refetch();
    };

    return (
        <Page className={"search-vaccine"}>
            <PageContent>
                <h1>Find COVID-19 Vaccines Near You</h1>
                <p>
                    Get a preview list of nearest vaccination centres and
                    availability of vaccination slots
                </p>
                <Link to={`/search/pincode/`}>
                    <Button
                        icon={AiOutlineSearch}
                        label={"Quick Find Near Me"}
                        type={"inverted"}
                        big
                        onClick={handleQuickFind}
                    />
                </Link>

                <SearchTypeHeaderBtns btnValues={searchBtns} />
            </PageContent>
            <Switch>
                <Route exact path={path}>
                    <SearchByDistrict />
                </Route>
                <Route exact path={`${path}/pincode`}>
                    <SearchByPincode />
                </Route>
                <Route exact path={`${path}/pincode/:pin`}>
                    <SearchByPincode />
                </Route>
                <Route path={`${path}/map`}>
                    <CenterMap />
                </Route>
            </Switch>
        </Page>
    );
}

export default SearchVaccine;
