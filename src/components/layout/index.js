import React, { Component } from "react";
import PropTypes from "prop-types";
import Toolbar from "../toolbar";
import SideDrawer from "../side-drawer";
import classes from "./styles.module.css";

class Layout extends Component {
	state = {
		showSideDrawer: false
	};

	sideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};
	render() {
		return (
			<React.Fragment>
				<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer
					open={this.state.showSideDrawer}
					closed={this.sideDrawerClosedHandler}
				/>

				<main className={classes.Content}>{this.props.children}</main>
			</React.Fragment>
		);
	}
}

export default Layout;

Layout.propTypes = {
	children: PropTypes.object
};
Layout.defaultProps = {
	children: null
};
