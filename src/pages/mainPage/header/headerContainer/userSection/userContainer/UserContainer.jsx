import "./UserContainer.css";
import { useSelector } from "react-redux";

const UserContainer = () => {
    const { username } = useSelector((state) => state.auth);

    return (
        <div className="user-container">
            <img src={process.env.PUBLIC_URL + "img/user.svg"} alt="user" />
            <span>{username}</span>
        </div>
    );
};

export default UserContainer;