import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import ContactData from "../contact-data";
import CheckoutSummary from "../../components/checkout-summary";
class Checkout extends Component {
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };
    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ingredients.data) {
            const purchasedRedirect = this.props.purchased ? (
                <Redirect to="/" />
            ) : null;
            summary = (
                <React.Fragment>
                    {purchasedRedirect}
                    <CheckoutSummary
                        totalPrice={this.props.totalPrice}
                        ingredients={this.props.ingredients.data}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}
                    />
                    <Route
                        path={`${this.props.match.url}/contact-data`}
                        component={ContactData}
                    />
                </React.Fragment>
            );
        }
        return <React.Fragment>{summary}</React.Fragment>;
    }
}
const mapStateToProps = ({ ingredients, totalPrice, orders }) => ({
    ingredients,
    totalPrice,
    purchased: orders.purchased
});
export default connect(mapStateToProps)(Checkout);
