import React, { useState } from "react";

import Page from "../../../components/Page/Page";
import PageContent from "../../../components/Page/PageContent";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ButtonGroup from "../../../components/Button/ButtonGroup";

import "./ReminderDetails.css";
import { AiFillInfoCircle } from "react-icons/all";
import { useMutation, useQuery } from "react-query";
import UnAuthorized from "../../../components/UnAuthorized";
import MutationAlert from "../../../components/Alerts/MutationAlert";

function ReminderVertification(props) {
    const [telegram, setTelegram] = useState("");
    const [mobile, setMobile] = useState("");

    const { error, isSuccess } = useQuery(
        "reminderConfig",
        () =>
            fetch("/account/reminder/config")
                .then((res) => res.json())
                .then(async (body) => {
                    if (!body.success)
                        throw Error("Something went wrong. Please relogin");
                    setTelegram(body.telegram ? body.telegram : "");
                    setMobile(body.mobile ? body.mobile : "");
                    return body;
                }),
        {
            retry: false,
            refetchOnWindowFocus: false,
            refetchInterval: false,
        }
    );

    const ReminderConfig = useMutation((data) => {
        return new Promise(async (resolve, reject) => {
            let res = await fetch("/account/" + data.endpoint, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [data.key]: data.value }),
            });
            res = await res.json();
            if (!res.success) reject(new Error(res.error));
            resolve(res);
        });
    });

    const verifyTelegram = () => {
        ReminderConfig.mutate({
            endpoint: "telegram/update",
            key: "username",
            value: telegram,
        });
    };

    const addMobile = () => {
        ReminderConfig.mutate({
            endpoint: "mobile/update",
            key: "mobile",
            value: mobile,
        });
    };

    return (
        <Page className={"reminder-details"}>
            <UnAuthorized error={error} />
            <MutationAlert
                mutation={ReminderConfig}
                successMsg={"Successfully saved"}
            />
            {isSuccess && (
                <PageContent>
                    <p className="info">
                        <span>
                            <AiFillInfoCircle />
                        </span>
                        Please send any message to the telegram bot from the
                        link given below
                    </p>
                    <ButtonGroup>
                        <Button
                            label={"Message telegram bot to get reminders"}
                            type={"inverted"}
                            big
                            onClick={() =>
                                window.open(
                                    "https://t.me/covidvaccinator_bot",
                                    "_blank"
                                )
                            }
                        />
                    </ButtonGroup>
                    <ButtonGroup className={"mobile-verification"}>
                        <Input
                            type={"text"}
                            placeholder={"Telegram Username"}
                            width={"20vw"}
                            value={telegram}
                            onChange={(e) => setTelegram(e.target.value)}
                        />
                        <Button
                            label={"Verify"}
                            type={"inverted"}
                            onClick={verifyTelegram}
                        />
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
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        <Button
                            label={"Add"}
                            type={"inverted"}
                            onClick={addMobile}
                        />
                    </ButtonGroup>
                </PageContent>
            )}
        </Page>
    );
}

export default ReminderVertification;
