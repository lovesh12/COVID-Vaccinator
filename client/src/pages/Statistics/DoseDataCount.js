import React from "react";

function DoseDataCount(props) {
    const { type, count } = props;

    return (
        <div className="dose-data">
            <p className="dose-data-type">Dose {type}</p>
            <p className="dose-data-count">{count}</p>
        </div>
    );
}

export default DoseDataCount;
