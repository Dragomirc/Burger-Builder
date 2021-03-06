import React from "react";
import classes from "./styles.module.css";

const Button = ({ children, clicked, btnType, disabled }) => {
    return (
        <button
            disabled={disabled}
            className={[classes.Button, classes[btnType]].join(" ")}
            onClick={clicked}
        >
            {children}
        </button>
    );
};
export default Button;
