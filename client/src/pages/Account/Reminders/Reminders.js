import React from "react";

import "./Reminders.css";
import Page from "../../../components/Page/Page";
import PageContent from "../../../components/Page/PageContent";
import HorizontalCard from "../../../components/Card/HorizontalCard";
import reminderImg from "../../../Reminders.png";
import Button from "../../../components/Button/Button";

import { FcEmptyTrash, AiFillInfoCircle } from "react-icons/all";
import ButtonGroup from "../../../components/Button/ButtonGroup";
import useRedirect from "../../../hooks/useRedirect";

function Reminders(props) {

    const redirectTo = useRedirect();

    return (
        <Page className={"reminders"}>
            <PageContent>
                <h1>Your Reminders</h1>
                <ButtonGroup center>
                    <Button label={"Configure Settings"} type={"inverted"} onClick={() => redirectTo("/account/setDoses")} />
                </ButtonGroup>
                <p className={"reminder-noti"}>
                    <AiFillInfoCircle className={"reminder-noti-icon"} />
                    Reminders can be set from search vaccine page, it will
                    automatically detect which dose you want to add reminder
                </p>
                <HorizontalCard
                    icon={<img src={reminderImg} alt={"icon-img"} />}
                    left={"Reminder for Dose 1"}
                    leftMid={"03-10-2021"}
                    leftBottom={"CENTRE NAME WITH FULL ADDRESS"}
                    middle={"Telegram, SMS"}
                    right={
                        <Button
                            icon={FcEmptyTrash}
                            label={"Remove"}
                            type={"bordered"}
                        />
                    }
                />
                <HorizontalCard
                    icon={<img src={reminderImg} alt={"icon-img"} />}
                    left={"Reminder for Dose 1"}
                    leftMid={"03-10-2021"}
                    leftBottom={"CENTRE NAME WITH FULL ADDRESS"}
                    middle={"Telegram, SMS"}
                    right={
                        <Button
                            icon={FcEmptyTrash}
                            label={"Remove"}
                            type={"bordered"}
                        />
                    }
                />
            </PageContent>
        </Page>
    );
}

export default Reminders;
