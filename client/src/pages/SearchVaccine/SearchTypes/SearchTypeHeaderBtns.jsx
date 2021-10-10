import React from "react";
import SearchTypeHeaderBtn from "./SearchTypeHeaderBtn";

function SearchTypeHeaderBtns(props) {
    const { selected, setSelected, btnValues } = props;

    const handleClick = (id) => {
        setSelected(id);
    };

    return (
        <div className="search-types">
            {btnValues.map((btn, i) => (
                <SearchTypeHeaderBtn
                    key={i}
                    id={i}
                    selectedId={selected}
                    label={btn}
                    onClick={handleClick}
                />
            ))}
        </div>
    );
}

export default SearchTypeHeaderBtns;
