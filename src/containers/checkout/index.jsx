import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from '../contact-data';
import CheckoutSummary from '../../components/checkout-summary';
const Checkout = props => {
	const checkoutCancelledHandler = () => {
		props.history.goBack();
	};
	const checkoutContinuedHandler = () => {
		props.history.replace('/checkout/contact-data');
	};

	let summary = <Redirect to="/" />;
	if (props.ingredients.data) {
		const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
		summary = (
			<React.Fragment>
				{purchasedRedirect}
				<CheckoutSummary
					totalPrice={props.totalPrice}
					ingredients={props.ingredients.data}
					checkoutCancelled={checkoutCancelledHandler}
					checkoutContinued={checkoutContinuedHandler}
				/>
				<Route
					path={`${props.match.url}/contact-data`}
					component={ContactData}
				/>
			</React.Fragment>
		);
	}
	return <React.Fragment>{summary}</React.Fragment>;
};
const mapStateToProps = ({ ingredients, totalPrice, orders }) => ({
	ingredients,
	totalPrice,
	purchased: orders.purchased
});
export default connect(mapStateToProps)(Checkout);
