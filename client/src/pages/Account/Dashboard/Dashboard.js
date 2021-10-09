import React from "react";

import "./Dashboard.css";

import Page from "../../../components/Page/Page";
import PageContent from "../../../components/Page/PageContent";
import HorizontalCard from "../../../components/Card/HorizontalCard";

import shieldImg from "../../../Shield.png";
import syringeImg from "../../../Syringe3.png";

import Button from "../../../components/Button/Button";
import useFetchDoses from "../../../hooks/useFetchDoses";
import useRedirect from "../../../hooks/useRedirect";
import UnAuthorized from "../../../components/UnAuthorized";

function Dashboard(props) {

    const [data, _, isSuccess, error] = useFetchDoses();
    const redirectTo = useRedirect();

    return (
        <Page className={"dashboard"}>
            <UnAuthorized error={error} />
            <PageContent>
                <h1>Your Doses</h1>
                {isSuccess &&
                <>
                    <HorizontalCard
                        color={data["1"] ? "#00982B" : "#D11818"}
                        icon={<img src={shieldImg} alt={"icon-img"} />}
                        left={"Dose 1"}
                        middle={data["1"] ? "Taken" : "Not Taken"}
                        right={
                            !data["1"] ? <Button label={"Search Vaccine"} type={"inverted"} onClick={() => redirectTo("/search")} />
                                :
                                <Button label={"Get Certificate"} type={"inverted"} onClick={() => redirectTo("/account/certificates")} />
                        }
                    />
                    <HorizontalCard
                        color={data["2"] ? "#00982B" : "#D11818"}
                        icon={<img src={syringeImg} alt={"icon-img"} />}
                        left={"Dose 2"}
                        middle={data["2"] ? "Taken" : "Not Taken"}
                        right={
                            !data["2"] ? <Button label={"Search Vaccine"} type={"inverted"} onClick={() => redirectTo("/search")} />
                                :
                                <Button label={"Get Certificate"} type={"inverted"} onClick={() => redirectTo("/account/certificates")} />
                        }
                    />
                </>}
            </PageContent>
        </Page>
    );
}

export default Dashboard;
