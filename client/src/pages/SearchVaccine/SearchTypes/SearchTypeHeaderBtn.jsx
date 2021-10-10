import React from "react";

function SearchTypeHeaderBtn(props) {
    const { id, selectedId, onClick, label } = props;

    const isSelected = id === selectedId;

    return (
        <div
            className={`search-type ${isSelected ? "selected" : ""}`}
            onClick={() => onClick(id)}
        >
            {label}
        </div>
    );
}

export default SearchTypeHeaderBtn;
