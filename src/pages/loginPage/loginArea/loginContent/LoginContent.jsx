import "./LoginContent.css";
import LoginForm from "../loginForm/LoginForm";
import ForgotPassword from "../forgotPassword/ForgotPassword";

const LoginContent = () => {
    return (
        <div className="login-content">
            <LoginForm />
            <ForgotPassword />
        </div>
    );
};

export default LoginContent;