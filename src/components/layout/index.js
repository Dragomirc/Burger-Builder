import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Toolbar from '../toolbar';
import SideDrawer from '../side-drawer';
import classes from './styles.module.css';

const Layout = props => {
	const [showSideDrawer, setShowSideDrawer] = useState(false);
	const sideDrawerClosedHandler = () => {
		setShowSideDrawer(false);
	};

	const sideDrawerToggleHandler = useCallback(() => {
		setShowSideDrawer(prevState => !prevState.showSideDrawer);
	}, []);

	const { isAuthenticated } = props;

	return (
		<React.Fragment>
			<Toolbar
				drawerToggleClicked={sideDrawerToggleHandler}
				isAuthenticated={isAuthenticated}
			/>
			<SideDrawer
				open={showSideDrawer}
				closed={sideDrawerClosedHandler}
				isAuthenticated={isAuthenticated}
			/>

			<main className={classes.Content}>{props.children}</main>
		</React.Fragment>
	);
};

const mapStateToProps = ({ auth }) => ({
	isAuthenticated: auth.token !== null
});
export default connect(mapStateToProps)(Layout);

Layout.propTypes = {
	children: PropTypes.object
};
Layout.defaultProps = {
	children: null
};
