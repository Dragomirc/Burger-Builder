import React, { Component } from "react";
import Burger from "../../components/burger";
import Buildcontrols from "../../components/build-controls";
import Modal from "../../components/modal";
import OrderSummary from "../../components/order-summary";
const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.3
};
class BurgerBuilder extends Component {
    state = {
        ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
        totalPrice: 0,
        purchasable: false,
        purchasing: false
    };
    updatePurchaseState = ingredients => {
        const sum = Object.keys(ingredients).reduce(
            (sum, key) => sum + ingredients[key],
            0
        );

        this.setState({ purchasable: sum > 0 });
    };

    addIngredientHandler = type => {
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedIngredients[type] + 1;
        this.setState(prevState => ({
            ingredients: updatedIngredients,
            totalPrice: prevState.totalPrice + INGREDIENT_PRICES[type]
        }));
        this.updatePurchaseState(updatedIngredients);
    };
    removeIngredientHandler = type => {
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedIngredients[type] - 1;
        this.setState(prevState => ({
            ingredients: updatedIngredients,
            totalPrice: prevState.totalPrice - INGREDIENT_PRICES[type]
        }));
        this.updatePurchaseState(updatedIngredients);
    };
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHandler = () => {
        alert("Continue");
    };
    render() {
        const { ingredients, totalPrice, purchasable, purchasing } = this.state;

        return (
            <React.Fragment>
                <Modal
                    show={purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    <OrderSummary
                        ingredients={ingredients}
                        totalPrice={totalPrice}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                    />
                </Modal>
                <Burger ingredients={ingredients} />
                <Buildcontrols
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    totalPrice={totalPrice}
                    purchasable={purchasable}
                    purchaseHandler={this.purchaseHandler}
                />
            </React.Fragment>
        );
    }
}

export default BurgerBuilder;
