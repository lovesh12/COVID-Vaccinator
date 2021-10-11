import React from "react";
import SearchTypeHeaderBtn from "./SearchTypeHeaderBtn";
import { Link, useLocation } from "react-router-dom";

function SearchTypeHeaderBtns(props) {
    const { btnValues } = props;

    const location = useLocation();

    return (
        <div className="search-types">
            {btnValues.map((btn, i) => (
                <Link key={i} to={btn.link}>
                    <SearchTypeHeaderBtn
                        id={i}
                        selected={location.pathname === btn.link}
                        label={btn.name}
                    />
                </Link>
            ))}
        </div>
    );
}

export default SearchTypeHeaderBtns;
