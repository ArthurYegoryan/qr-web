import './LoginForm.css';
import InputField from "../../../../generalComponents/inputFields/InputField";
import Button from "../../../../generalComponents/buttons/Button";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urls } from '../../../../constants/urls/urls';
import getToken from '../../../../api/getToken';

const LoginForm = () => {
    const [ token, setToken ] = useState("");

    const navigate = useNavigate();

    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ emptyUsernameError, setEmptyUsernameError ] = useState(false);
    const [ emptyPasswordError, setEmptyPasswordError ] = useState(false);
    const [ wrongUsernamePasswordError, setWrongUsernamePasswordError ] = useState(false);

    const onChangeUsernameHandler = (evt) => {
        setUsername(evt.target.value);
    }

    const onChangePasswordHandler = (evt) => {
        setPassword(evt.target.value);
    }

    const onClickHandler = async (evt) => {
        evt.preventDefault();

        setEmptyUsernameError(false);
        setEmptyPasswordError(false);
        setWrongUsernamePasswordError(false);

        if (!username.length || !password.length) {
            if (!username.length) setEmptyUsernameError(true);
            if (!password.length) setEmptyPasswordError(true);
        } else {
            const result = await getToken(urls.GET_TOKEN_URL, username, password);

            if (result) {                                                               // result.token
                setToken(result);
                localStorage.setItem("token", token);
                navigate("/terminals");
            } else {
                setWrongUsernamePasswordError(true);
            }
        }
    }

    return (
        <form action="" className="login-form">
            <InputField type="text" 
                        placeholder="User Name" 
                        onChangeHandler={onChangeUsernameHandler}
                        classNameInput="login-input"  
            />
            {
                emptyUsernameError ?
                    <label className="error-message">User Name can't be empty!</label> 
                : null
            }
            <InputField type="password" 
                        placeholder="Password" 
                        onChangeHandler={onChangePasswordHandler} 
                        classNameInput="login-input" 
            />
            {
                emptyPasswordError ?
                    <label className="error-message">Password can't be empty!</label> 
                : null
            }
            {
                wrongUsernamePasswordError ?
                    <label className="error-message">Invalid User name or password!</label> 
                : null
            }
            <Button type="submit" 
                    label="Login" 
                    className="login-button"
                    onClickHandler={onClickHandler}
            />
        </form>
    );
};

export default LoginForm;