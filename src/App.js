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

const navBtns = [
    {
        icon: BiHome,
        label: "Home",
    },
    {
        icon: GiLoveInjection,
        label: "Search Vaccine",
    },
    {
        icon: GoGraph,
        label: "Statistics",
    },
    {
        icon: RiAccountBoxLine,
        label: "Account",
    },
];

function App() {
    return (
        <div className="App">
            <Navbar heading={"COVID Vaccinator"} navBtns={navBtns} />
            <Home />
            <Footer />
        </div>
    );
}

export default App;
