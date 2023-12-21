import './LoginArea.css';
import Logo from './logo/Logo';
import LoginForm from './loginForm/LoginForm';
import ForgotPassword from './forgotPassword/ForgotPassword';

const LoginArea = ({ setIsLoggedIn }) => {
    return (
        <div className="login-area">
            <Logo />
            <LoginForm setIsLoggedIn={setIsLoggedIn} />
            <ForgotPassword />
        </div>
    );
};

export default LoginArea;