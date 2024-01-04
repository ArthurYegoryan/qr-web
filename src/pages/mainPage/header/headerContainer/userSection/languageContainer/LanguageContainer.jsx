import { useState } from "react";
import Button from "../../../../../../generalComponents/buttons/Button";
import "./LanguageContainer.css";

const LanguageContainer = () => {
    const [ active1, setActive1 ] = useState("inactive");
    const [ active2, setActive2 ] = useState("inactive");
    const [ active3, setActive3 ] = useState("inactive");

    const onClickHandler1 = () => {
        setActive1("active");
        setActive2("inactive");
        setActive3("inactive");
    };
    const onClickHandler2 = () => {
        setActive2("active");
        setActive1("inactive");
        setActive3("inactive");
    };
    const onClickHandler3 = () => {
        setActive3("active");
        setActive1("inactive");
        setActive2("inactive");
    };

    return (
        <div className="language-container">
            <Button label="am" className={`button-language ${active1}`} onClickHandler={onClickHandler1} />
            <Button label="ru" className={`button-language ${active2}`} onClickHandler={onClickHandler2} />
            <Button label="en" className={`button-language ${active3}`} onClickHandler={onClickHandler3} />
        </div>
    );
};

export default LanguageContainer;