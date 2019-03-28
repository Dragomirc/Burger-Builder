import React from "react";
import NavigationItem from "../navigation-item";
import classes from "./styles.module.css";
const NavigationItems = () => (
	<ul className={classes.NavigationItems}>
		<NavigationItem active link="/">
			Active Link
		</NavigationItem>
		<NavigationItem link="/">Checkout</NavigationItem>
	</ul>
);

export default NavigationItems;
