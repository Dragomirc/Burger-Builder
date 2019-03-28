import React from "react";
import NavigationItems from "../navigation-items";
import classes from "./style.module.css";
const SideDrawer = ({ open }) => {
	return (
		<div
			className={classes.SideDrawer}
			styles={{ transform: open ? "translateX(0)" : "translateX(-200px)" }}
		>
			<NavigationItems />
		</div>
	);
};
export default SideDrawer;
