import React from "react";
import Button from "../Button/Button";

import "./Navbar.css";
import ButtonGroup from "../Button/ButtonGroup";
import { Link, useLocation } from "react-router-dom";

function Navbar(props) {
    const location = useLocation();
    const { heading, navBtns } = props;

    return (
        <div className={"navbar"}>
            <h1>{heading}</h1>
            <ButtonGroup className="nav-btns">
                {navBtns.map((btn) => (
                    <Link to={btn.link}>
                        <Button
                            selected={location.pathname === btn.link}
                            icon={btn.icon}
                            label={btn.label}
                        />
                    </Link>
                ))}
            </ButtonGroup>
        </div>
    );
}

export default Navbar;
