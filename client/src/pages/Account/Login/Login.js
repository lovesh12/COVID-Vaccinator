import React from "react";

import "./Login.css";
import Page from "../../../components/Page/Page";
import Card from "../../../components/Card/Card";
import PageContent from "../../../components/Page/PageContent";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import ButtonGroup from "../../../components/Button/ButtonGroup";
import heartHealth from "../../../HeartHealth.png";

function Login(props) {
    return (
        <Page className={"login-page"}>
            <PageContent>
                <Card className={"login-card"}>
                    <div className="top-circle">
                        <img src={heartHealth} alt={"heart-img"} />
                    </div>
                    <h2>Sign in for Vaccination</h2>
                    <Input placeholder={"Username"} width={"20vw"} />
                    <Input placeholder={"Password"} width={"20vw"} />
                    <ButtonGroup center>
                        <Button label={"Login"} type={"inverted"} big />
                    </ButtonGroup>
                </Card>
            </PageContent>
        </Page>
    );
}

export default Login;
