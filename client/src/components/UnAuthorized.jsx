import React from 'react';
import ErrorAlert from "./Alerts/ErrorAlert";
import useRedirect from "../hooks/useRedirect";

function UnAuthorized({error}) {

    const redirectTo = useRedirect();

    return (
        error && <ErrorAlert
            title={"An error has occurred"}
            subTitle={"Something went wrong please login again"}
            onClose={() => redirectTo("/account/login")}
        />
    )
}

export default UnAuthorized;
