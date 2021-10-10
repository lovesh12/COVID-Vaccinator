import React from "react";
import PageNormal from "../../../components/Page/PageNormal";

import "./SearchResults.css";
import VaccineFilter from "./VaccineFilter";
import PageHighlight from "../../../components/Page/PageHighlight";
import CenterVaccineDetails from "../CenterVaccineDetails/CenterVaccineDetails";

const filterTypes = [
    {
        heading: "Age",
        filterBtns: ["18 & Above", "18 - 44 Only", "45 & Above"],
    },
    {
        heading: "Cost",
        filterBtns: ["Paid", "Free"],
    },
    {
        heading: "Vaccine",
        filterBtns: ["Covishield", "Covaxin", "Suptnik V"],
    },
    {
        heading: "Timings",
        filterBtns: ["Morning", "Afternoon/Evening"],
    },
];

const dummyDayDetails = [
    {
        date: "27 Sep 2021",
        name: "COVAXIN",
        age: "18 & Above",
        dose1: 0,
        dose2: 0,
    },
    {
        date: "27 Sep 2021",
        name: "COVAXIN",
        age: "18 & Above",
        dose1: 0,
        dose2: 0,
    },
    {
        date: "27 Sep 2021",
        name: "COVAXIN",
        age: "18 & Above",
        dose1: 0,
        dose2: 0,
    },
    {
        date: "27 Sep 2021",
        name: "COVAXIN",
        age: "18 & Above",
        dose1: 0,
        dose2: 0,
    },
    {
        date: "27 Sep 2021",
        name: "COVAXIN",
        age: "18 & Above",
        dose1: 0,
        dose2: 0,
    },
    {
        date: "27 Sep 2021",
        name: "COVAXIN",
        age: "18 & Above",
        dose1: 0,
        dose2: 0,
    },
    {
        date: "27 Sep 2021",
        name: "COVAXIN",
        age: "18 & Above",
        dose1: 1,
        dose2: 0,
    },
];

function SearchResults(props) {

    const {centers, state} = props;

    return (
        <>
            <PageNormal className={"search-results"}>
                <h2>
                    Search Results <span>(80 Center(s) found)</span>
                </h2>
                <div className="filter-results">
                    <p>Filter results by</p>
                    {filterTypes.map((filterType) => (
                        <VaccineFilter
                            heading={filterType.heading}
                            filterBtns={filterType.filterBtns}
                        />
                    ))}
                </div>
            </PageNormal>
            <PageHighlight className={"center-vaccine-details-list"} lite>
                {centers.map((center) => (
                    <CenterVaccineDetails
                        name={center.name}
                        address={`${center.address}, ${center.district_name}, ${state}, ${center.pincode}`}
                        dayDetails={center.sessions}
                    />
                ))}
            </PageHighlight>
        </>
    );
}

export default SearchResults;
