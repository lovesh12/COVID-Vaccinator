import React from "react";
import { Link } from "react-router-dom";

function FooterSection(props) {
    const { heading, links } = props;

    return (
        <div className={"footer-section"}>
            <h2>{heading}</h2>

            <div className="links">
                {links.map((link, i) => (
                    <Link key={i} to={link.url}>
                        {link.label}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default FooterSection;
