import React from "react";
import Backdrop from "../backdrop";
import classes from "./styles.module.css";

const modal = ({ children, show, modalClosed }) => (
    <React.Fragment>
        <Backdrop show={show} clicked={modalClosed} />
        <div
            className={classes.Modal}
            style={{
                transform: show ? "translateY(0)" : "translateY(-100vh)",
                opacity: show ? "1" : "0"
            }}
        >
            {children}
        </div>
    </React.Fragment>
);

export default modal;
