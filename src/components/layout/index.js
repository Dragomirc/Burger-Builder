import React from "react";
import PropTypes from "prop-types";
import Toolbar from "../toolbar";
import SideDrawer from "../side-drawer";
import classes from "./styles.module.css";

const Layout = props => {
	return (
		<React.Fragment>
			<SideDrawer />
			<Toolbar />
			<main className={classes.Content}>{props.children}</main>
		</React.Fragment>
	);
};

export default Layout;

Layout.propTypes = {
	children: PropTypes.object
};
Layout.defaultProps = {
	children: null
};
