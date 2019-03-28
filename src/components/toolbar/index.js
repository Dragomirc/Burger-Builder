import React from "react";
import Logo from "../logo";
import NavigationItems from "../navigation-items";
import SideDrawer from "../side-drawer";
import classes from "./styles.module.css";
const Toolbar = props => (
	<header className={classes.Toolbar}>
		<SideDrawer />
		<Logo />
		<NavigationItems />
	</header>
);

export default Toolbar;
