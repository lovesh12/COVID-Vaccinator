import React, {useEffect} from "react";
import Page from "../../../components/Page/Page";
import PageContent from "../../../components/Page/PageContent";
import HorizontalCard from "../../../components/Card/HorizontalCard";
import Button from "../../../components/Button/Button";
import syringeImg from "../../../Syringe3.png";

import "./Certificates.css";
import {useQuery} from "react-query";
import useRedirect from "../../../hooks/useRedirect";
import UnAuthorized from "../../../components/UnAuthorized";

const statusViewMap = [
    {color: "#D11818", status: "Not Vaccinated"},
    {color: "", status: "Partially Vaccinated"},
    {color: "#00982B", status: "Fully Vaccinated"}
]

function Certificates(props) {

    const redirectTo = useRedirect();

    const { error, isSuccess, data: vaccinationStatus } = useQuery('certificateStatus', () =>
            fetch("/account/certificates/status").then(res => res.json()).then(async body => {
                if (!body.success) throw Error("Something went wrong. Please relogin")
                return body.vaccinationStatus;
            }),
        {
            retry: false,
            refetchOnWindowFocus: false,
            refetchInterval: false
        }
    )

    useEffect(() => {
        console.log(vaccinationStatus)
        console.log(isSuccess)
    }, [vaccinationStatus, isSuccess])

    return (
        <Page className={"certificates"}>
            <UnAuthorized error={error} />
            <PageContent>
                <h1>Certificates</h1>
                {isSuccess &&
                <HorizontalCard
                    color={statusViewMap[vaccinationStatus].color}
                    icon={<img src={syringeImg} alt={"icon-img"} />}
                    left={statusViewMap[vaccinationStatus].status}
                    right={
                         vaccinationStatus === 0 ? <Button label={"Search Vaccines"} type={"inverted"} onClick={() => redirectTo("/search")} />
                            :
                            <Button
                                label={"Download Certificate"}
                                type={"inverted"}
                            />
                    }
                />}
                {/*<HorizontalCard*/}
                {/*    color={"#D11818"}*/}
                {/*    icon={<img src={syringeImg} alt={"icon-img"} />}*/}
                {/*    left={"Not Vaccinated"}*/}
                {/*    right={*/}
                {/*        <Button label={"Search Vaccines"} type={"inverted"} />*/}
                {/*    }*/}
                {/*/>*/}
                {/*<HorizontalCard*/}
                {/*    icon={<img src={syringeImg} alt={"icon-img"} />}*/}
                {/*    left={"Partially Vaccinated"}*/}
                {/*    right={*/}
                {/*        <Button*/}
                {/*            label={"Download Certificate"}*/}
                {/*            type={"inverted"}*/}
                {/*        />*/}
                {/*    }*/}
                {/*/>*/}
            </PageContent>
        </Page>
    );
}

export default Certificates;
