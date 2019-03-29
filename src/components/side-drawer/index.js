import React from "react";
import NavigationItems from "../navigation-items";
import Logo from "../logo";
import classes from "./style.module.css";
const SideDrawer = props => {
	return (
		<div className={classes.SideDrawer}>
			<div className={classes.Logo}>
				<Logo />
			</div>

			<nav>
				<NavigationItems />
			</nav>
		</div>
	);
};
export default SideDrawer;
