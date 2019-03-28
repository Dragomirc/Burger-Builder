import React from "react";
import classes from "./styles.module.css";
const NavigationItem = ({ link, children, active }) => (
	<li className={classes.NavigationItem}>
		<a href={link} className={active ? classes.active : ""}>
			{children}
		</a>
	</li>
);

export default NavigationItem;
