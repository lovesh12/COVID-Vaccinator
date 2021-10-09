import React from "react";
import Popup from "../Popup/Popup";
import PopupContainer from "../Popup/PopupContainer";
import Button from "../Button/Button";

import "./swal.css"

function ErrorAlert({ title, subTitle, onClick, ...props }) {
  return (
    <Popup open={true}>
      <PopupContainer className="alert-popup">
        <div className="alert-content">
          <div
            className="swal2-icon swal2-error swal2-icon-show"
            style={{ display: "flex" }}
          >
            <span className="swal2-x-mark">
              <span className="swal2-x-mark-line-left" />
              <span className="swal2-x-mark-line-right" />
            </span>
          </div>
          <div className="swal2-title">{title}</div>
          <div className="swal2-html-container">{subTitle}</div>
        </div>
        <Button label={"Close"} type={"inverted"} onClick={props.onClose} />
      </PopupContainer>
    </Popup>
  );
}

export default ErrorAlert;
