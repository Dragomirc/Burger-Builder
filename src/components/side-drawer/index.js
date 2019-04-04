import React from "react";
import NavigationItems from "../navigation-items";
import Logo from "../logo";
import Backdrop from "../backdrop";
import classes from "./style.module.css";
const SideDrawer = ({ open, closed, isAuthenticated }) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <React.Fragment>
            <Backdrop show={open} clicked={closed} />
            <div className={attachedClasses.join(" ")}>
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems isAuthenticated={isAuthenticated} />
                </nav>
            </div>
        </React.Fragment>
    );
};
export default SideDrawer;
