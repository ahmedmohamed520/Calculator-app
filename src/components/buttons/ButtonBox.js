import classes from "./ButtonBox.module.css";
const ButtonBox = (props) => {
    return <div className={classes.buttonBox}>{props.children}</div>;
};
export default ButtonBox;
