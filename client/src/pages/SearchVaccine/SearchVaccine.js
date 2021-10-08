import React from "react";

import Page from "../../components/Page/Page";
import PageContent from "../../components/Page/PageContent";

import "./SearchVaccine.css";
import Button from "../../components/Button/Button";
import { AiOutlineSearch } from "react-icons/all";
import InputGroup from "../../components/Input/InputGroup";
import Input from "../../components/Input/Input";
import SearchResults from "./SearchResults/SearchResults";

function SearchVaccine(props) {
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
                    <Input type={"text"} placeholder={"Select State"} />
                    <Input type={"text"} placeholder={"Select District"} />
                    <Button
                        icon={AiOutlineSearch}
                        label={"Search"}
                        type={"inverted"}
                        big
                    />
                </InputGroup>
            </PageContent>
            <SearchResults />
        </Page>
    );
}

export default SearchVaccine;
