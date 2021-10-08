import React from "react";
import Page from "../../../components/Page/Page";
import PageContent from "../../../components/Page/PageContent";
import HorizontalCard from "../../../components/Card/HorizontalCard";
import Button from "../../../components/Button/Button";
import syringeImg from "../../../Syringe3.png";

import "./Certificates.css";

function Certificates(props) {
    return (
        <Page className={"certificates"}>
            <PageContent>
                <h1>Certificates</h1>
                <HorizontalCard
                    color={"#D11818"}
                    icon={<img src={syringeImg} alt={"icon-img"} />}
                    left={"Not Vaccinated"}
                    right={
                        <Button label={"Search Vaccines"} type={"inverted"} />
                    }
                />
                <HorizontalCard
                    icon={<img src={syringeImg} alt={"icon-img"} />}
                    left={"Partially Vaccinated"}
                    right={
                        <Button
                            label={"Download Certificate"}
                            type={"inverted"}
                        />
                    }
                />
                <HorizontalCard
                    color={"#00982B"}
                    icon={<img src={syringeImg} alt={"icon-img"} />}
                    left={"Fully Vaccinated"}
                    right={
                        <Button
                            label={"Download Certificate"}
                            type={"inverted"}
                        />
                    }
                />
            </PageContent>
        </Page>
    );
}

export default Certificates;
