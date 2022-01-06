import classes from "./Button.module.css";

const Button = ({ className, value, onClick }) => {
    return (
        <button className={classes[className]} onClick={onClick}>
            {value}
        </button>
    );
};
export default Button;
