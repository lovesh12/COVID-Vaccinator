import React from "react";

import "./Dashboard.css";

import Page from "../../../components/Page/Page";
import PageContent from "../../../components/Page/PageContent";
import HorizontalCard from "../../../components/Card/HorizontalCard";

import shieldImg from "../../../Shield.png";
import syringeImg from "../../../Syringe3.png";

import Button from "../../../components/Button/Button";

function Dashboard(props) {
    return (
        <Page className={"dashboard"}>
            <PageContent>
                <h1>Your Doses</h1>
                <HorizontalCard
                    color={"#00982B"}
                    icon={<img src={shieldImg} alt={"icon-img"} />}
                    left={"Dose 1"}
                    middle={"Taken"}
                    right={
                        <Button
                            label={"Go to Certificates"}
                            type={"inverted"}
                        />
                    }
                />
                <HorizontalCard
                    color={"#D11818"}
                    icon={<img src={syringeImg} alt={"icon-img"} />}
                    left={"Dose 1"}
                    middle={"Not Taken"}
                    right={
                        <Button label={"Search Vaccine"} type={"inverted"} />
                    }
                />
            </PageContent>
        </Page>
    );
}

export default Dashboard;
