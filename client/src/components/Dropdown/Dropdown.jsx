import React, {useState} from "react";

import "./Dropdown.css";

function Dropdown(props) {
    const { onChange, width, pStyle, label, options, selected, labelKey, idKey } = props;

    const [shown, setShown] = useState(false);

    const toggle = () => {
        setShown(!shown)
    }

    return (
        <div
            className={"input-wrapper dropdown"}
            style={{ width: width || "11vw", ...pStyle }}
            onClick={toggle}
        >
            <p className="dropdown--selected">{selected > -1 ? options[selected][labelKey] : label}</p>
            {shown &&
            <div className="dropdown--options">
                {options.map((option, i) => <p className="dropdown--option" key={i} onClick={() => onChange(option[idKey])}>{option[labelKey]}</p>)}
            </div>
            }
        </div>
    );
}

Dropdown.defaultProps = {
    selected: 0,
    labelKey: "label",
    idKey: "id"
}

export default Dropdown;
