import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Burger from '../../components/burger';
import Buildcontrols from '../../components/build-controls';
import Modal from '../../components/modal';
import OrderSummary from '../../components/order-summary';
import Spinner from '../../components/spinner';
import withErrorHandler from '../../components/hoc/with-error-handler';
import axios from '../../axios-orders.js';
import {
	updateIngredients,
	fetchIngredients
} from '../../redux/actions/ingredients';
import { resetPrice } from '../../redux/actions/price';
import { addCost, removeCost } from '../../redux/actions/price';
import { setAuthRedirectPath } from '../../redux/actions/auth';
const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
};
const BurgerBuilder = props => {
	const [purchasing, setPurchasing] = useState(false);
	useEffect(() => {
		props.fetchIngredients();
		props.resetPrice();
	}, []);

	const addIngredientHandler = type => {
		const updatedIngredients = { ...props.ingredients.data };
		updatedIngredients[type] = updatedIngredients[type] + 1;
		props.updateIngredients(updatedIngredients);
		props.addCost(INGREDIENT_PRICES[type]);
	};
	const removeIngredientHandler = type => {
		const updatedIngredients = { ...props.ingredients.data };
		updatedIngredients[type] = updatedIngredients[type] - 1;
		props.updateIngredients(updatedIngredients);
		props.removeCost(INGREDIENT_PRICES[type]);
	};
	const purchaseHandler = () => {
		if (props.isAuthenticated) {
			setPurchasing(true);
		} else {
			props.setAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	};
	const purchaseCancelHandler = () => {
		setPurchasing(false);
	};
	const purchaseContinueHandler = () => {
		props.history.push(`/checkout`);
	};

	const { totalPrice } = props;
	let orderSummary = null;
	const { ingredients } = props;
	let burger = props.ingredients.error ? (
		<p>Ingredientes cannot be loaded!</p>
	) : (
		<Spinner />
	);
	if (ingredients.data) {
		burger = (
			<React.Fragment>
				<Burger ingredients={ingredients.data} />
				<Buildcontrols
					add={addIngredientHandler}
					remove={removeIngredientHandler}
					totalPrice={totalPrice}
					purchasable={totalPrice > 0}
					purchaseHandler={purchaseHandler}
					isAuthenticated={props.isAuthenticated}
				/>
			</React.Fragment>
		);
		orderSummary = (
			<OrderSummary
				ingredients={ingredients.data}
				totalPrice={totalPrice}
				purchaseCanceled={purchaseCancelHandler}
				purchaseContinued={purchaseContinueHandler}
			/>
		);
	}

	return (
		<React.Fragment>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
		</React.Fragment>
	);
};

const mapStateToProps = ({ ingredients, totalPrice, auth }) => ({
	ingredients,
	totalPrice,
	isAuthenticated: auth.token !== null
});
export default connect(mapStateToProps, {
	updateIngredients,
	fetchIngredients,
	addCost,
	removeCost,
	resetPrice,
	setAuthRedirectPath
})(withErrorHandler(BurgerBuilder, axios));
