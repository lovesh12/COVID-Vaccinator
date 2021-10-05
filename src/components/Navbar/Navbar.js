import React from "react";
import Button from "../Button/Button";

import "./Navbar.css";
import ButtonGroup from "../Button/ButtonGroup";

function Navbar(props) {
    const { heading, navBtns } = props;

    return (
        <div className={"navbar"}>
            <h1>{heading}</h1>
            <ButtonGroup className="nav-btns">
                {navBtns.map((btn) => (
                    <Button icon={btn.icon} label={btn.label} />
                ))}
            </ButtonGroup>
        </div>
    );
}

export default Navbar;
