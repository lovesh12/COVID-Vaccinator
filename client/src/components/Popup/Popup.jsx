import React, { useEffect } from "react";
import { createPortal } from "react-dom";

function Popup({ children, open }) {
    const body = document.body;

    // useEffect(() => {
    //   body.style.overflow = "hidden";
    //   return () => {
    //     body.style.overflow = "unset";
    //   }
    // });

    return (
        <>
            {
                open &&
                    createPortal(
                        <div id="popup">{children}</div>,
                        body
                    ) /*popup*/
            }
            {
                open &&
                    createPortal(<div className="overlay" />, body) /*overlay*/
            }
        </>
    );
}

export default Popup;
