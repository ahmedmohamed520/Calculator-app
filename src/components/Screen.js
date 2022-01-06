import { Textfit } from "react-textfit";

import classes from "./Screen.module.css";

const Screen = (props) => {
    return (
        <Textfit className={classes.screen} mode="single" max={70}>
            {props.value}
        </Textfit>
    );
};
export default Screen;
