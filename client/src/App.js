import Home from "./pages/Home/Home.js";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import React from "react";

import {
    BiHome,
    GiLoveInjection,
    GoGraph,
    RiAccountBoxLine,
} from "react-icons/all";

import Footer from "./components/Footer/Footer";
import SearchVaccine from "./pages/SearchVaccine/SearchVaccine";
import Statistics from "./pages/Statistics/Statistics";
import Account from "./pages/Account/Account";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

const navBtns = [
    {
        icon: BiHome,
        label: "Home",
        link: "/",
    },
    {
        icon: GiLoveInjection,
        label: "Search Vaccine",
        link: "/search",
    },
    {
        icon: GoGraph,
        label: "Statistics",
        link: "/stats",
    },
    {
        icon: RiAccountBoxLine,
        label: "Account",
        link: "/account",
    },
];

function NavbarComponent() {
    return <Navbar heading={"COVID Vaccinator"} navBtns={navBtns} />;
}

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact>
                        <NavbarComponent />
                        <Home />
                    </Route>
                    <Route path="/search">
                        <NavbarComponent />
                        <SearchVaccine />
                    </Route>
                    <Route path="/stats">
                        <NavbarComponent />
                        <Statistics />
                    </Route>
                    <Route path="/account">
                        <Account />
                    </Route>
                </Switch>
            </Router>
            <Footer />
        </div>
    );
}

export default App;
