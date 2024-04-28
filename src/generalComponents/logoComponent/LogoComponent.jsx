import './LogoComponent.css';

const LogoComponent = ({
    className = ""
}) => {
    return (
        <div className={`logo ${className}`}>
            <img src={process.env.PUBLIC_URL + 'img/logo.webp'} alt="Logo" />
        </div>
    );
};

export default LogoComponent;