import React from "react";
import Popup from "./Popup";

function PopupContainer(props) {
  return (
    <div className={`popup-effect popup ${props.className}`}>
      {props.children}
    </div>
  );
}

PopupContainer.defaultProps = {
  className: "",
};
export default PopupContainer;
