import React from "react";

import "./Login.css";
import Page from "../../../components/Page/Page";
import Card from "../../../components/Card/Card";
import PageContent from "../../../components/Page/PageContent";
import ButtonGroup from "../../../components/Button/ButtonGroup";
import heartHealth from "../../../HeartHealth.png";
import { GoogleLogin } from 'react-google-login';
import useRedirect from "../../../hooks/useRedirect";

function Login(props) {

    const redirectTo = useRedirect();
    const responseGoogle = async (response) => {
        const token = response.tokenId;
        let serverResponse = await fetch("/auth/google", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({token})
        })
        serverResponse = await serverResponse.json()
        if (serverResponse.success) redirectTo("/account")
    }

    return (
        <Page className={"login-page"}>
            <PageContent>
                <Card className={"login-card"}>
                    <div className="top-circle">
                        <img src={heartHealth} alt={"heart-img"} />
                    </div>
                    <h2>Sign in for Vaccination</h2>
                    {/*<Input placeholder={"Username"} width={"20vw"} />*/}
                    {/*<Input placeholder={"Password"} width={"20vw"} />*/}
                    <ButtonGroup center>
                        {/*<Button label={"Login"} type={"inverted"} big />*/}
                        <GoogleLogin
                            clientId="972720935949-0a2n3a3475p6bru7o1rv64df1gh0mq2r.apps.googleusercontent.com"
                            buttonText="Login Using google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </ButtonGroup>
                </Card>
            </PageContent>
        </Page>
    );
}

export default Login;
