import React from "react";

import classes from "./styles.module.css";
import NavigationItem from "../navigation-item";

const NavigationItems = () => (
	<ul className={classes.NavigationItems}>
		<NavigationItem link="/" active>
			Burger Builder
		</NavigationItem>
		<NavigationItem link="/">Checkout</NavigationItem>
	</ul>
);

export default NavigationItems;
