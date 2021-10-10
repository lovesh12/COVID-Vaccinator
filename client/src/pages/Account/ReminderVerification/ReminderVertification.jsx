import React from "react";

import Page from "../../../components/Page/Page";
import PageContent from "../../../components/Page/PageContent";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ButtonGroup from "../../../components/Button/ButtonGroup";

import "./ReminderDetails.css";
import { AiFillInfoCircle } from "react-icons/all";

function ReminderVertification(props) {
    return (
        <Page className={"reminder-details"}>
            <PageContent>
                <p className="info">
                    <span>
                        <AiFillInfoCircle />
                    </span>
                    Please join the telegram group and send any message in that
                    group and then click on verify
                </p>
                <ButtonGroup>
                    <Button
                        label={"Join telegram channel for reminders"}
                        type={"inverted"}
                        big
                    />
                </ButtonGroup>
                <ButtonGroup className={"mobile-verification"}>
                    <Input
                        type={"text"}
                        placeholder={"Telegram Username"}
                        width={"20vw"}
                    />
                    <Button label={"Verify"} type={"inverted"} />
                </ButtonGroup>
                <p className="info">
                    <span>
                        <AiFillInfoCircle />
                    </span>
                    Mobile Reminders
                </p>
                <ButtonGroup>
                    <Input
                        type={"text"}
                        placeholder={"Mobile number"}
                        width={"20vw"}
                    />
                    <Button label={"Add"} type={"inverted"} />
                </ButtonGroup>
            </PageContent>
        </Page>
    );
}

export default ReminderVertification;
