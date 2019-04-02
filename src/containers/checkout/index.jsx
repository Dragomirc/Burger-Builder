import React, { Component } from "react";
import { Route } from "react-router-dom";
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
        return (
            <React.Fragment>
                <CheckoutSummary
                    totalPrice={this.props.totalPrice}
                    ingredients={this.props.ingredients}
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
}
const mapStateToProps = ({ ingredients, totalPrice }) => ({
    ingredients,
    totalPrice
});
export default connect(mapStateToProps)(Checkout);
