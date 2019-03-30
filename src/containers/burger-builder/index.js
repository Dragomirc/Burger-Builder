import React, { Component } from "react";
import Burger from "../../components/burger";
import Buildcontrols from "../../components/build-controls";
import Modal from "../../components/modal";
import OrderSummary from "../../components/order-summary";
import Spinner from "../../components/spinner";
import withErrorHandler from "../../components/hoc/with-error-handler";
import axios from "../../axios-orders.js";
const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
};
class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 0,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	};
	componentDidMount() {
		axios
			.get("/ingredients.json")
			.then(res => this.setState({ ingredients: res.data }))
			.catch(error => this.setState({ error: true }));
	}
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
		const order = {
			ingredients: this.state.ongredients,
			price: this.state.totalPrice,
			customer: {
				name: "Dragomir Ceban",
				address: {
					street: "Teststreet 1",
					zipCode: "41351",
					country: "Germany"
				},
				email: "test@test.com"
			},
			deliveryMethod: "fastest"
		};
		this.setState({ loading: true });
		axios
			.post("/orders.json", order)
			.then(res => this.setState({ loading: false, purchasing: false }))
			.catch(res => this.setState({ loading: false, purchasing: false }));
	};
	render() {
		const { ingredients, totalPrice, purchasable, purchasing } = this.state;
		let orderSummary = null;

		let burger = this.state.error ? (
			<p>Ingredientes cannot be loaded!</p>
		) : (
			<Spinner />
		);
		if (this.state.ingredients) {
			burger = (
				<React.Fragment>
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
			orderSummary = (
				<OrderSummary
					ingredients={ingredients}
					totalPrice={totalPrice}
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
				/>
			);
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<React.Fragment>
				<Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</React.Fragment>
		);
	}
}

export default withErrorHandler(BurgerBuilder, axios);
