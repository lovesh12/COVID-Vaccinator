import React, { useState } from "react";
import PageNormal from "../../../components/Page/PageNormal";

import "./SearchResults.css";
import VaccineFilter from "./VaccineFilter";
import PageHighlight from "../../../components/Page/PageHighlight";
import CenterVaccineDetails from "../CenterVaccineDetails/CenterVaccineDetails";

const filterTypes = [
    {
        id: 0,
        heading: "Age",
        filterBtns: ["18 & Above", "18 - 44 Only", "45 & Above"],
        keyValues: [18, 18, 45],
    },
    {
        id: 1,
        heading: "Cost",
        filterBtns: ["Paid", "Free"],
        keyValues: ["Paid", "Free"],
    },
    {
        id: 2,
        heading: "Vaccine",
        filterBtns: ["Covishield", "Covaxin", "Sputnik V"],
        keyValues: ["COVISHIELD", "COVAXIN", "SPUTNIK"],
    },
    {
        id: 3,
        heading: "Timings",
        filterBtns: ["Morning", "Afternoon/Evening"],
        keyValues: [
            ["09:00AM-11:00AM", "11:00AM-01:00PM"],
            ["01:00PM-03:00PM", "03:00PM-06:00PM"],
        ],
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
    const { centers, state } = props;

    const [filters, setFilters] = useState(
        filterTypes.reduce((p, c) => {
            p[c.id] = { selectedId: -1 };
            return p;
        }, {})
    );

    const filteredCenters = centers?.filter((center) => {
        const filterCostSelectedId = filters[1].selectedId;
        const filterCostType =
            filterCostSelectedId !== -1
                ? center.fee_type ===
                  filterTypes[1].keyValues[filterCostSelectedId]
                : true;

        return filterCostType;
    });

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
                            id={filterType.id}
                            key={filterType.i}
                            heading={filterType.heading}
                            filterBtns={filterType.filterBtns}
                            selectedId={filters[filterType.id].selectedId}
                            setFilters={setFilters}
                            filters={filters}
                        />
                    ))}
                </div>
            </PageNormal>
            <PageHighlight className={"center-vaccine-details-list"} lite>
                {filteredCenters.map((center) => {
                    const filteredSessions = center.sessions?.filter(
                        (session) => {
                            const ageSelectedId = filters[0].selectedId;

                            const filterAgeType =
                                ageSelectedId !== -1
                                    ? session.min_age_limit ===
                                      filterTypes[0].keyValues[ageSelectedId]
                                    : true;

                            const vaccineSelectedId = filters[2].selectedId;

                            const filterVaccineType =
                                vaccineSelectedId !== -1
                                    ? session.vaccine ===
                                      filterTypes[2].keyValues[
                                          vaccineSelectedId
                                      ]
                                    : true;

                            const timeSelectedId = filters[3].selectedId;

                            const filterTimeType =
                                timeSelectedId !== -1
                                    ? session.slots.find(
                                          (slot) =>
                                              filterTypes[3].keyValues[
                                                  timeSelectedId
                                              ].indexOf(slot) !== -1
                                      )
                                    : true;

                            return (
                                filterAgeType &&
                                filterVaccineType &&
                                filterTimeType
                            );
                        }
                    );

                    if (filteredSessions?.length === 0) return null;

                    return (
                        <CenterVaccineDetails
                            name={center.name}
                            address={`${center.address}, ${center.district_name}, ${state}, ${center.pincode}`}
                            dayDetails={filteredSessions}
                        />
                    );
                })}
            </PageHighlight>
        </>
    );
}

export default SearchResults;
