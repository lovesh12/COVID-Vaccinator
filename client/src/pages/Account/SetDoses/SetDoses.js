import React, {useState} from 'react';
import Page from "../../../components/Page/Page";
import PageContent from "../../../components/Page/PageContent";
import HorizontalCard from "../../../components/Card/HorizontalCard";
import shieldImg from "../../../Shield.png";
import Button from "../../../components/Button/Button";
import syringeImg from "../../../Syringe3.png";
import Input from "../../../components/Input/Input";

function SetDoses(props) {

    const [d1, setD1] = useState({taken: false, date: ""});
    const [d2, setD2] = useState({taken: false, date: ""});

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
                        <Input placeholder={"Vaccinated Date"} width={"20vw"} onChange={(e) => setD1({...d1, date: e.target.value})}/>
                    }
                />
                <HorizontalCard
                    color={"#D11818"}
                    icon={<img src={syringeImg} alt={"icon-img"} />}
                    left={"Dose 1"}
                    middle={"Not Taken"}
                    
                />
            </PageContent>
        </Page>
    );
}

export default SetDoses;

