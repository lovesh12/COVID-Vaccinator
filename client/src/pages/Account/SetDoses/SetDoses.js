import React, { useState } from "react";
import { useMutation } from "react-query";

import Page from "../../../components/Page/Page";
import PageContent from "../../../components/Page/PageContent";
import HorizontalCard from "../../../components/Card/HorizontalCard";
import shieldImg from "../../../Shield.png";
import Input from "../../../components/Input/Input";
import InputSwitch from "../../../components/Input/InputSwitch";
import Button from "../../../components/Button/Button";
import ButtonGroup from "../../../components/Button/ButtonGroup";
import MutationAlert from "../../../components/Alerts/MutationAlert";
import useFetchDoses from "../../../hooks/useFetchDoses";
import useRedirect from "../../../hooks/useRedirect";
import UnAuthorized from "../../../components/UnAuthorized";
import Dropdown from "../../../components/Dropdown/Dropdown";

const vaccineList = [
    { id: 1, name: "COVISHIELD" },
    { id: 2, name: "COVAXIN" },
];

function SetDoses(props) {
    const [data, setData, isSuccess, error] = useFetchDoses();
    const [vaccine, setVaccine] = useState({ i: 0, id: 1 });
    const redirectTo = useRedirect();

    const changeVaccine = (id) => {
        setVaccine({ i: id - 1, id });
    };

    const handleDoseDateChange = (doseId, e) => {
        setData({
            ...data,
            [doseId]: { ...data[doseId], date: e.target.value },
        });
    };

    const handleToggleDate = (doseId, newValue) => {
        setData({
            ...data,
            [doseId]: { ...data[doseId], enabled: newValue },
        });
    };

    const saveDosesInfo = () => {
        SaveDoses.mutate(data);
    };

    const SaveDoses = useMutation((data) => {
        console.log(vaccine.id);
        return new Promise(async (resolve, reject) => {
            let res = await fetch("/account/setDoses", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ doses: data, vaccine: vaccine.id - 1 }),
            });
            res = await res.json();
            if (!res.success) reject(new Error(res.error));
            resolve(data);
        });
    });

    return (
        <Page className={"dashboard"}>
            <UnAuthorized error={error} />
            <PageContent>
                <h1>Your Doses</h1>
                <ButtonGroup center>
                    <Dropdown
                        label={"Select Vaccine"}
                        options={vaccineList}
                        selected={vaccine.i}
                        onChange={changeVaccine}
                        labelKey={"name"}
                    />
                </ButtonGroup>

                {isSuccess &&
                    Object.values(data).map((dose, i) => (
                        <HorizontalCard
                            key={i}
                            color={"#00982B"}
                            icon={<img src={shieldImg} alt={"icon-img"} />}
                            left={dose.name}
                            middle={
                                <InputSwitch
                                    label={
                                        data[dose.id].enabled
                                            ? "TAKEN"
                                            : "NOT TAKEN"
                                    }
                                    switchedOn={data[dose.id].enabled}
                                    onToggle={(value) =>
                                        handleToggleDate(dose.id, value)
                                    }
                                />
                            }
                            right={
                                <Input
                                    type={"date"}
                                    value={data[dose.id].date}
                                    onChange={(event) =>
                                        handleDoseDateChange(dose.id, event)
                                    }
                                    width={"14vw"}
                                    pStyle={{
                                        visibility: data[dose.id].enabled
                                            ? "visible"
                                            : "hidden",
                                    }}
                                />
                            }
                        />
                    ))}
                <ButtonGroup center>
                    <Button
                        label={"Save"}
                        type={"inverted"}
                        onClick={saveDosesInfo}
                        big
                    />
                    <MutationAlert
                        mutation={SaveDoses}
                        successMsg={"Successfully saved your doses"}
                        onSuccess={() => redirectTo("/account")}
                    />
                </ButtonGroup>
            </PageContent>
        </Page>
    );
}

export default SetDoses;
