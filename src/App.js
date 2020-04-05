import React, { useEffect, Suspense } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './components/layout';
import BurgerBuilder from './containers/burger-builder';
import Logout from './containers/logout';

import { authCheckState } from './redux/actions/auth';

const Auth = React.lazy(() => import('./containers/auth'));
const Orders = React.lazy(() => import('./containers/orders'));
const Checkout = React.lazy(() => import('./containers/checkout'));

const App = props => {
	const { authCheckState, isAuthenticated } = props;
	useEffect(() => {
		authCheckState();
	}, []);

	let routes = (
		<Switch>
			<Route path="/auth" component={Auth} />
			<Route path="/" exact component={BurgerBuilder} />
			<Redirect to="/" />
		</Switch>
	);

	if (isAuthenticated) {
		routes = (
			<Switch>
				<Route path="/checkout" component={Checkout} />
				<Route path="/orders" component={Orders} />
				<Route path="/logout" component={Logout} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);
	}
	return (
		<div>
			<Layout>
				<Suspense fallback={<div>Loading...</div>}>{routes}</Suspense>
			</Layout>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

export default connect(mapStateToProps, { authCheckState })(App);
