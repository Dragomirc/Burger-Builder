import React from "react";

import classes from "./styles.module.css";
import NavigationItem from "../navigation-item";

const NavigationItems = ({ isAuthenticated }) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {isAuthenticated ? (
            <NavigationItem link="/orders">Orders</NavigationItem>
        ) : null}
        {isAuthenticated ? (
            <NavigationItem link="/logout">Logout</NavigationItem>
        ) : (
            <NavigationItem link="/auth">Authenticate</NavigationItem>
        )}
    </ul>
);

export default NavigationItems;
