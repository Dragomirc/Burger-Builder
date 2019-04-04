import React from "react";
import Logo from "../logo";
import NavigationItems from "../navigation-items";
import DrawerToggle from "../drawer-toggle";
import classes from "./styles.module.css";
const Toolbar = ({ drawerToggleClicked, isAuthenticated }) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={drawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>

        <NavigationItems isAuthenticated={isAuthenticated} />
    </header>
);

export default Toolbar;
