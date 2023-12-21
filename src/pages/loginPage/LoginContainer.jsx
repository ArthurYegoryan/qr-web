import './LoginContainer.css';
import LoginArea from './loginArea/LoginArea';

const LoginContainer = ({ setIsLoggedIn }) => {
    return (
        <div className="login-container">
            <LoginArea setIsLoggedIn={setIsLoggedIn} />
        </div>       
    );
};

export default LoginContainer;