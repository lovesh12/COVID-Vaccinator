import "./Account.css";
import Navbar from "../../components/Navbar/Navbar";
import Login from "./Login/Login";
import { BiHome } from "react-icons/all";
import Dashboard from "./Dashboard/Dashboard";
import Reminders from "./Reminders/Reminders";
import Certificates from "./Certificates/Certificates";
import SetDoses from "./SetDoses/SetDoses";

import {
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";

const navBtns = [
    {
        icon: BiHome,
        label: "Home",
        link: "/",
    },
    {
        icon: BiHome,
        label: "Dashboard",
        link: "/account",
    },
    {
        icon: BiHome,
        label: "Certificates",
        link: "/account/certificates",
    },
    {
        icon: BiHome,
        label: "Reminders",
        link: "/account/reminders",
    },
];

function Account(props) {
    const { path } = useRouteMatch();

    return (
        <div className={"account-page"}>
            <Navbar heading={"COVID Vaccinator"} navBtns={navBtns} />
            <Switch>
                <Route path={`${path}/login`}>
                    <Login />
                </Route>
                <Route path={`${path}/setDoses`}>
                    <SetDoses />
                </Route>
                <Route exact path={`${path}`}>
                    <Dashboard />
                </Route>
                <Route path={`${path}/reminders`}>
                    <Reminders />
                </Route>
                <Route path={`${path}/certificates`}>
                    <Certificates />
                </Route>
            </Switch>
        </div>
    );
}

export default Account;
