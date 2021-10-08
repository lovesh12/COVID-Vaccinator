import React from "react";
import PageHighlight from "../Page/PageHighlight";

import "./Footer.css";
import FooterSection from "./FooterSection";

const footerSections = [
    {
        heading: "Vaccination",
        links: [
            { label: "Link 1" },
            { label: "Link 2" },
            { label: "Link 3" },
            { label: "Link 4" },
            { label: "Link 5" },
        ],
    },
    {
        heading: "Statistics",
        links: [
            { label: "Link 1" },
            { label: "Link 2" },
            { label: "Link 3" },
            { label: "Link 4" },
            { label: "Link 5" },
        ],
    },
    {
        heading: "Account",
        links: [
            { label: "Link 1" },
            { label: "Link 2" },
            { label: "Link 3" },
            { label: "Link 4" },
            { label: "Link 5" },
        ],
    },
];

function Footer(props) {
    return (
        <PageHighlight className={"footer"}>
            <div className="footer-sections">
                {footerSections.map((footerSection) => (
                    <FooterSection
                        heading={footerSection.heading}
                        links={footerSection.links}
                    />
                ))}
            </div>
            <div className="footer-footer">
                <p>Copyright © 2021 COVID Vaccinator. All Rights Reserved</p>
                <p>Designed By: Luckshya Verma & Lovesh Verma</p>
            </div>
        </PageHighlight>
    );
}

export default Footer;
