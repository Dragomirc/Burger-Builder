import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/burger";
import Buildcontrols from "../../components/build-controls";
import Modal from "../../components/modal";
import OrderSummary from "../../components/order-summary";
import Spinner from "../../components/spinner";
import withErrorHandler from "../../components/hoc/with-error-handler";
import axios from "../../axios-orders.js";
import {
    updateIngredients,
    fetchIngredients
} from "../../redux/actions/ingredients";
import { resetPrice } from "../../redux/actions/price";
import { addCost, removeCost } from "../../redux/actions/price";
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};
class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };
    componentDidMount() {
        this.props.fetchIngredients();
        this.props.resetPrice();
    }

    addIngredientHandler = type => {
        const updatedIngredients = { ...this.props.ingredients.data };
        updatedIngredients[type] = updatedIngredients[type] + 1;
        this.props.updateIngredients(updatedIngredients);

        this.props.addCost(INGREDIENT_PRICES[type]);
    };
    removeIngredientHandler = type => {
        const updatedIngredients = { ...this.props.ingredients.data };
        updatedIngredients[type] = updatedIngredients[type] - 1;
        this.props.updateIngredients(updatedIngredients);

        this.props.removeCost(INGREDIENT_PRICES[type]);
    };
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHandler = () => {
        this.props.history.push(`/checkout`);
    };
    render() {
        const { purchasing } = this.state;
        const { totalPrice } = this.props;
        let orderSummary = null;
        const { ingredients } = this.props;
        let burger = this.props.ingredients.error ? (
            <p>Ingredientes cannot be loaded!</p>
        ) : (
            <Spinner />
        );
        if (ingredients.data) {
            burger = (
                <React.Fragment>
                    <Burger ingredients={ingredients.data} />
                    <Buildcontrols
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        totalPrice={totalPrice}
                        purchasable={totalPrice > 0}
                        purchaseHandler={this.purchaseHandler}
                    />
                </React.Fragment>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={ingredients.data}
                    totalPrice={totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }

        return (
            <React.Fragment>
                <Modal
                    show={purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ ingredients, totalPrice }) => ({
    ingredients,
    totalPrice
});
export default connect(
    mapStateToProps,
    { updateIngredients, fetchIngredients, addCost, removeCost, resetPrice }
)(withErrorHandler(BurgerBuilder, axios));
