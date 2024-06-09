import "./DeleteUserData.css";
import Button from "../../../generalComponents/buttons/Button";
import deleteUserData from "../../../api/deleteUserData";
import { urls } from "../../../constants/urls/urls";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logoutUser } from "../../../redux/slices/authorization/authSlice";

const DeleteUserData = ({
    user, 
    setIsUserDataDeleted,
    isUserDataDeleted,
    onCloseHandler
}) => {
    const dispatch = useDispatch();

    const onDeleteClickHandler = async () => {
        const response = await deleteUserData(urls.DELETE_USER_DATA_URL, user.id);

        if (response.message === "success") {
            setIsUserDataDeleted(!isUserDataDeleted);
            onCloseHandler();
        } else if (response.message === "invalid token") {
            localStorage.clear();
            dispatch(logoutUser());
    
            <Navigate to="/login" />;
        }
    };

    return (
        <div className="delete-user-data-content">
            <p>Դուք ցանկանու՞մ եք ջնջել <b>{user.username}</b> օգտատիրոջ տվյալները:</p>
            <div className="delete-user-data-buttons">
                <Button label="Ջնջել" 
                        backgroundColor="red"
                        marginRight="10px"
                        onClickHandler={() => onDeleteClickHandler()} />
                <Button label="Չեղարկել" 
                        backgroundColor="white"
                        color="red"
                        onClickHandler={() => onCloseHandler()} />
            </div>
        </div>
    )
};

export default DeleteUserData;