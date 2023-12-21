import './Button.css';

const Button = ({
    type,
    label,
    className,
    onClickHandler
}) => {
    return (
        <button type={type} 
                className={`button ${className}`}
                onClick={onClickHandler}
        >
            {label}
        </button>
    );
};

export default Button;