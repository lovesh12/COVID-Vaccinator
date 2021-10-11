import React from "react";
import PageHighlight from "../Page/PageHighlight";

import "./Footer.css";
import FooterSection from "./FooterSection";

const footerSections = [
    {
        heading: "Vaccination",
        links: [
            { label: "Quick Find Near Me", url: "/search" },
            { label: "Search By District", url: "/search" },
            { label: "Search By Pincode", url: "/search/pincode" },
            { label: "Search on Map", url: "/search/map" },
        ],
    },
    {
        heading: "Statistics",
        links: [{ label: "View Stats", url: "/stats" }],
    },
    {
        heading: "Account",
        links: [
            { label: "Doses", url: "/account" },
            { label: "Certificate", url: "/account/certificates" },
            { label: "Reminders", url: "/account/reminders" },
            { label: "Reminder Details", url: "/account/reminderDetails" },
        ],
    },
];

function Footer(props) {
    return (
        <PageHighlight className={"footer"}>
            <div className="footer-sections">
                {footerSections.map((footerSection, i) => (
                    <FooterSection
                        key={i}
                        heading={footerSection.heading}
                        links={footerSection.links}
                    />
                ))}
            </div>
            <div className="footer-footer">
                <p>Copyright © 2021 COVID Vaccinator. All Rights Reserved</p>
                <p>Developed By: Luckshya Verma & Lovesh Verma</p>
            </div>
        </PageHighlight>
    );
}

export default Footer;
