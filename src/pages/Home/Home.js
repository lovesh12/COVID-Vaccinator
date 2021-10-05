import React from "react";
import Page from "../../components/Page/Page";
import PageContent from "../../components/Page/PageContent";

import vaccineImg from "../../vaccine.png";
import syringeImg from "../../Syringe.png";

import "./Home.css";
import ButtonGroup from "../../components/Button/ButtonGroup";
import { AiOutlineSearch } from "react-icons/all";
import Button from "../../components/Button/Button";
import PageHighlight from "../../components/Page/PageHighlight";
import PageNormal from "../../components/Page/PageNormal";
import VaccinationStep from "./VaccinationStep";
import VaccineDetail from "./VaccineDetail/VaccineDetail";

function Home(props) {
    return (
        <Page className={"home"}>
            <PageContent>
                <div className="left-pane">
                    <h4>LETS GET VACCINATED</h4>
                    <p>Have a "Vaccine" rather than a "Virus"</p>
                    <ButtonGroup>
                        <Button
                            big
                            type={"inverted"}
                            icon={AiOutlineSearch}
                            label={"Search for Vaccines"}
                        />
                        <Button big type={"bordered"} label={"Convince Me"} />
                    </ButtonGroup>
                </div>
                <div className="right-pane">
                    <img
                        src={vaccineImg}
                        alt={"vaccine-img"}
                        className={"vaccine-img"}
                    />
                </div>
            </PageContent>
            <PageHighlight className={"vaccine-status"}>
                <img
                    src={syringeImg}
                    alt="syringe-img"
                    className={"syringe-img"}
                />
                <div className="right-pane">
                    <h4>VACCINATIONS DONE TODAY</h4>
                    <p>36,47,952</p>
                </div>
            </PageHighlight>
            <PageNormal className={"vaccine-why"}>
                <h2>Why should you get vaccinated?</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Malesuada facilisis montes, dignissim aliquam est penatibus
                    maecenas sit scelerisque. Amet ullamcorper purus
                    sollicitudin nulla nulla. Risus malesuada tempor tortor eu
                    arcu. Maecenas quis facilisis mauris, aliquet amet pretium.
                </p>
            </PageNormal>
            <PageHighlight className={"vaccine-steps"} lite>
                <h2>Getting vaccinated is simpler than even</h2>
                <div className="vaccination-steps">
                    <VaccinationStep
                        number={1}
                        heading={"Search and walk in to any vaccination centre"}
                        image={syringeImg}
                    />
                    <VaccinationStep
                        number={2}
                        heading={
                            "Get your vaccination safely at the time of your appointment"
                        }
                        image={syringeImg}
                    />
                    <VaccinationStep
                        number={3}
                        heading={
                            "Download your vaccination certificate after logging in"
                        }
                        image={syringeImg}
                    />
                </div>
            </PageHighlight>
            <PageNormal className={"vaccine-immune"}>
                <h2 className={"vaccine-immune-heading"}>
                    Vaccination Immunization Process
                </h2>
                <p className={"vaccine-immune-label"}>WHY TWO DOSES?</p>
                <div className="vaccine-types">
                    <VaccineDetail
                        heading={"Covaxin"}
                        doseDays={[1, 12, 30, 42]}
                    />
                    <VaccineDetail
                        heading={"Covishield"}
                        doseDays={[1, 12, 84, 100]}
                    />
                </div>
            </PageNormal>
            <PageHighlight className={"vaccine-faqs"} lite>
                <h2>Frequently Asked Questions</h2>
                <div className="faqs">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Risus sit eget urna ut.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Risus sit eget urna ut.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Risus sit eget urna ut.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Risus sit eget urna ut.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Risus sit eget urna ut.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Risus sit eget urna ut.
                    </p>
                </div>
            </PageHighlight>
        </Page>
    );
}

export default Home;
