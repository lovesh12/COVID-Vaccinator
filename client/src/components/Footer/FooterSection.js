import React from "react";

function FooterSection(props) {
    const { heading, links } = props;

    return (
        <div className={"footer-section"}>
            <h2>{heading}</h2>

            <div className="links">
                {links.map((link, i) => (
                    <a href={link.url} key={i}>{link.label}</a>
                ))}
            </div>
        </div>
    );
}

export default FooterSection;
