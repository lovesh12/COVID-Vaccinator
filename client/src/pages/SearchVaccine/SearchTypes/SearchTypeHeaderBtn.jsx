import React from "react";

function SearchTypeHeaderBtn(props) {
    const { selected, label } = props;

    return (
        <div className={`search-type ${selected ? "selected" : ""}`}>
            {label}
        </div>
    );
}

export default SearchTypeHeaderBtn;
