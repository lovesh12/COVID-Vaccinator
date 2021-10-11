import React, { useState } from "react";
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
import Faq from "./Faq";

import faqs from "./faqs";
import { Link } from "react-router-dom";

function Home(props) {
    const [activeFaq, setActiveFaq] = useState(-1);

    const handleConvinceMe = () => {
        document
            .querySelector(".vaccine-why")
            .scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Page className={"home"}>
            <PageContent>
                <div className="left-pane">
                    <h4>LETS GET VACCINATED</h4>
                    <p>Have a "Vaccine" rather than a "Virus"</p>
                    <ButtonGroup>
                        <Link to={"/search"}>
                            <Button
                                big
                                type={"inverted"}
                                icon={AiOutlineSearch}
                                label={"Search for Vaccines"}
                            />
                        </Link>
                        <Button
                            big
                            type={"bordered"}
                            label={"Convince Me"}
                            onClick={handleConvinceMe}
                        />
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
                    Vaccines help the immune system counter infections faster
                    and in a more effective manner. When you are vaccinated, it
                    sparks the immune response, thus helping the body to fight
                    off and remember the virus so that it can attack it in the
                    event of a future invasion.
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
                    {faqs.map((faq, i) => (
                        <Faq
                            key={i}
                            id={i}
                            question={faq[0]}
                            answer={faq[1]}
                            isActive={activeFaq === i}
                            setActive={setActiveFaq}
                        />
                    ))}
                </div>
            </PageHighlight>
        </Page>
    );
}

export default Home;
