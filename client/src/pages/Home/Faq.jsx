import React from "react";

function Faq(props) {
    const { id, question, answer, isActive, setActive } = props;

    const handleClick = () => {
        if (isActive) setActive(-1);
        else setActive(id);
    };

    return (
        <div className={"faq-wrapper"} onClick={handleClick}>
            <p className={"faq-question"}>{question}</p>
            {isActive && <p className={"faq-question-answer"}>{answer}</p>}
        </div>
    );
}

export default Faq;
