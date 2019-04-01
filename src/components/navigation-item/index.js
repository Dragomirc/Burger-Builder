import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./styles.module.css";
const NavigationItem = ({ link, children, active }) => (
	<li className={classes.NavigationItem}>
		<NavLink exact activeClassName={classes.active} to={link}>
			{children}
		</NavLink>
	</li>
);

export default NavigationItem;
