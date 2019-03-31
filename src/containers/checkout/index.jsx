import React, { Component } from "react";
import { Route } from "react-router-dom";
import ContactData from "../contact-data";
import CheckoutSummary from "../../components/checkout-summary";
class Checkout extends Component {
	state = {
		ingredients: {},
		totalPrice: 0
	};

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (let param of query.entries()) {
			if (param[0] === "price") {
				price = param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
		this.setState({ ingredients, totalPrice: price });
	}
	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};
	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data");
	};
	render() {
		return (
			<React.Fragment>
				<CheckoutSummary
					totalPrice={this.state.totalPrice}
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route
					path={`${this.props.match.url}/contact-data`}
					render={() => <ContactData ingredients={this.state.ingredients} />}
				/>
			</React.Fragment>
		);
	}
}
export default Checkout;