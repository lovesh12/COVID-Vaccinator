import React from "react";

function FooterSection(props) {
    const { heading, links } = props;

    return (
        <div className={"footer-section"}>
            <h2>{heading}</h2>

            <div className="links">
                {links.map((link) => (
                    <a href={link.url}>{link.label}</a>
                ))}
            </div>
        </div>
    );
}

export default FooterSection;
