import React from "react";

import classes from "./styles.module.css";
import NavigationItem from "../navigation-item";

const NavigationItems = () => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/">Burger Builder</NavigationItem>
		<NavigationItem link="/orders">Orders</NavigationItem>
	</ul>
);

export default NavigationItems;
