import React from "react";

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
