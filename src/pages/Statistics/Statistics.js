import React from "react";

import "./Statistics.css";
import PageContent from "../../components/Page/PageContent";

import Page from "../../components/Page/Page";
import Card from "../../components/Card/Card";
import PageSection from "../../components/Page/PageSection";
import ButtonGroup from "../../components/Button/ButtonGroup";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { AiOutlineSearch } from "react-icons/all";

import syringeImg from "../../Syringe2.png";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import DoseDataCount from "./DoseDataCount";

function Statistics(props) {
    return (
        <Page className={"statistics"}>
            <PageContent>
                <PageSection>
                    <Card className={"short-stats"}>
                        <h3>Vaccinations Today</h3>
                        <p>25,91,256</p>
                    </Card>
                    <Card className={"short-stats"}>
                        <h3>Partially Vaccinations Today</h3>
                        <p>25,91,256</p>
                    </Card>
                    <Card className={"short-stats"}>
                        <h3>Fully Vaccinations Today</h3>
                        <p>25,91,256</p>
                    </Card>
                </PageSection>
                <ButtonGroup className={"search-btns"} center>
                    <Input type={"text"} placeholder={"Select State"} />
                    <Input type={"text"} placeholder={"Select District"} />
                    <Button
                        icon={AiOutlineSearch}
                        label={"Search"}
                        type={"inverted"}
                        big
                    />
                </ButtonGroup>
                <Card className={"total-doses"}>
                    <CardHeader>
                        <img src={syringeImg} alt={"syringe-img"} />
                        <div className="card-heading">
                            <h2>Total Vaccination Doses</h2>
                            <p>25,91,256</p>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <DoseDataCount type={1} count={"12,15,151"} />
                        <DoseDataCount type={2} count={"12,15,151"} />
                    </CardBody>
                </Card>
                <PageSection className={"vaccination-categories"}>
                    <Card className={"vaccination-categories-cars"}>
                        <h3>Vaccination - Category</h3>
                    </Card>
                    <Card className={"vaccination-categories-cars"}>
                        <h3>Vaccination - Age</h3>
                    </Card>
                    <Card className={"vaccination-categories-cars"}>
                        <h3>Vaccination - State/Centres</h3>
                    </Card>
                </PageSection>
                <Card className={"more-stats"}>
                    <h3>More Stats</h3>
                </Card>
            </PageContent>
        </Page>
    );
}

export default Statistics;
