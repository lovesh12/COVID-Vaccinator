import React from "react";
import Popup from "../Popup/Popup";
import PopupContainer from "../Popup/PopupContainer";
import Button from "../Button/Button";

import "./swal.css"

function SuccessAlert({ title, subTitle, onClick, ...props }) {
  return (
    <Popup open={true}>
      <PopupContainer className="alert-popup">
        <div className="alert-content">
          <div
            className="swal2-icon swal2-success swal2-icon-show"
            style={{ display: "flex" }}
          >
            <div
              className="swal2-success-circular-line-left"
              // style={{ backgroundColor: "#ebf2fa" }}
            />
            <span className="swal2-success-line-tip" />
            <span className="swal2-success-line-long" />
            <div className="swal2-success-ring" />
            <div
              className="swal2-success-fix"
              // style={{ backgroundColor: "#ebf2fa" }}
            />
            <div
              className="swal2-success-circular-line-right"
              // style={{ backgroundColor: "#ebf2fa" }}
            />
          </div>
          <div className="swal2-title">{title}</div>
          <div className="swal2-html-container">{subTitle}</div>
        </div>
        <Button label={"Close"} type={"inverted"} onClick={props.onClose} />
      </PopupContainer>
    </Popup>
  );
}

export default SuccessAlert;
