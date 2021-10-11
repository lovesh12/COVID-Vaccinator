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
import { useMutation, useQuery } from "react-query";
import UnAuthorized from "../../../components/UnAuthorized";
import MutationAlert from "../../../components/Alerts/MutationAlert";

const reminderTypes = [
    "Reminder for Dose 2 date",
    "Appointment Reminder",
    "Notify for availability of vaccine at center",
];

function Reminders(props) {
    const { error, isSuccess, data, refetch } = useQuery(
        "remindersList",
        () =>
            fetch("/account/reminder/list")
                .then((res) => res.json())
                .then(async (body) => {
                    if (!body.success)
                        throw Error("Something went wrong. Please relogin");
                    return body.list;
                }),
        {
            retry: false,
            initialData: [],
            refetchOnWindowFocus: false,
            refetchInterval: false,
        }
    );

    const RemoveReminder = useMutation((id) => {
        return new Promise(async (resolve, reject) => {
            let res = await fetch("/account/reminder/remove", {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id }),
            });
            res = await res.json();
            if (!res.success) reject(new Error(res.error));
            resolve(res);
        });
    });

    const removeReminder = (id) => {
        RemoveReminder.mutate(id);
    };

    const redirectTo = useRedirect();

    return (
        <Page className={"reminders"}>
            <UnAuthorized error={error} />
            <MutationAlert
                mutation={RemoveReminder}
                successMsg={"Reminder removed"}
                onSuccess={refetch}
            />
            <PageContent>
                <h1>Your Reminders</h1>
                <ButtonGroup center>
                    <Button
                        label={"Configure Settings"}
                        type={"inverted"}
                        onClick={() => redirectTo("/account/reminderDetails")}
                    />
                </ButtonGroup>
                <p className={"reminder-noti"}>
                    <AiFillInfoCircle className={"reminder-noti-icon"} />
                    Reminders can be set from search vaccine page, it will
                    automatically detect which dose you want to add reminder
                </p>
                {isSuccess &&
                    data.map((reminder) => (
                        <HorizontalCard
                            key={reminder._id}
                            icon={<img src={reminderImg} alt={"icon-img"} />}
                            left={reminderTypes[reminder.type]}
                            leftMid={reminder.date}
                            leftBottom={
                                reminder.centername ? reminder.centername : ""
                            }
                            middle={"Telegram, SMS"}
                            right={
                                <Button
                                    icon={FcEmptyTrash}
                                    label={"Remove"}
                                    type={"bordered"}
                                    onClick={() => removeReminder(reminder._id)}
                                />
                            }
                        />
                    ))}
            </PageContent>
        </Page>
    );
}

export default Reminders;
