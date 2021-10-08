import React, { useState } from "react";
import Page from "../../../components/Page/Page";
import PageContent from "../../../components/Page/PageContent";
import HorizontalCard from "../../../components/Card/HorizontalCard";
import shieldImg from "../../../Shield.png";
import syringeImg from "../../../Syringe3.png";
import Input from "../../../components/Input/Input";
import InputSwitch from "../../../components/Input/InputSwitch";
import Button from "../../../components/Button/Button";

function SetDoses(props) {
    const dosesToShow = [
        {
            id: 1,
            name: "Dose 1",
        },
        {
            id: 2,
            name: "Dose 2",
        },
    ];

    const [date, setDate] = useState(
        dosesToShow.reduce((p, c) => {
            p[c.id] = { id: c.id, date: "", enabled: false };
            return p;
        }, {})
    );

    const handleDoseDateChange = (doseId, e) => {
        setDate({
            ...date,
            [doseId]: { ...date[doseId], date: e.target.value },
        });
    };

    const handleToggleDate = (doseId, newValue) => {
        setDate({
            ...date,
            [doseId]: { ...date[doseId], enabled: newValue },
        });
    };

    return (
        <Page className={"dashboard"}>
            <PageContent>
                <h1>Your Doses</h1>
                {dosesToShow.map((dose, i) => (
                    <HorizontalCard
                        color={"#00982B"}
                        icon={<img src={shieldImg} alt={"icon-img"} />}
                        left={dose.name}
                        middle={
                            <InputSwitch
                                label={
                                    date[dose.id].enabled
                                        ? "TAKEN"
                                        : "NOT TAKEN"
                                }
                                switchedOn={date[dose.id].enabled}
                                onToggle={(value) =>
                                    handleToggleDate(dose.id, value)
                                }
                            />
                        }
                        right={
                            <Input
                                type={"date"}
                                value={date[dose.id].date}
                                onChange={(event) =>
                                    handleDoseDateChange(dose.id, event)
                                }
                                width={"14vw"}
                                pStyle={{
                                    visibility: date[dose.id].enabled
                                        ? "visible"
                                        : "hidden",
                                }}
                            />
                        }
                    />
                ))}

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

export default SetDoses;
