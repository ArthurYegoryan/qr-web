import "./UserSection.css";
import { useSelector } from "react-redux";
import Button from "../../../../../generalComponents/buttons/Button";

const UserSection = () => {
    const { username } = useSelector((state) => state.auth);

    return (
        <div className="user-section">
            <div className="language-container">
                <Button label="am" className="button-language" />
                <Button label="ru" className="button-language" />
                <Button label="en" className="button-language" />
            </div>
            <div className="user-container">
                <img src="" alt="user" />
                <span>{username}</span>
            </div>
            <div className="change-password">
                <Button label="Փոխել գաղտնաբառը" className="button-change-password" />
            </div>
            <div className="logout">
                <img src="" alt="logout" />
                <Button label="Դուրս գալ" className="button-logout" />
            </div>
        </div>
    );
};

export default UserSection;