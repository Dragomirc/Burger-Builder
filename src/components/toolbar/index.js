import React from "react";
import Logo from "../logo";
import NavigationItems from "../navigation-items";
import classes from "./styles.module.css";
const Toolbar = props => (
	<header className={classes.Toolbar}>
		<div className={classes.Logo}>
			<Logo />
		</div>

		<NavigationItems />
	</header>
);

export default Toolbar;
