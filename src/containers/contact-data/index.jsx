import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders.js';
import Button from '../../components/button';
import Spinner from '../../components/spinner';
import Input from '../../components/input';
import { orderPurchaseRequest, purchaseInit } from '../../redux/actions/orders';

import withErrorHandler from '../../components/hoc/with-error-handler';
import classes from './styles.module.css';
const ContactData = props => {
	const [orderForm, setOrderForm] = useState({
		name: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your Name'
			},
			value: '',
			validation: { required: true },
			valid: false,
			touched: false
		},

		street: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Street'
			},
			value: '',
			validation: { required: true },
			valid: false,
			touched: false
		},
		zipCode: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Postal code'
			},
			value: '',
			validation: {
				required: true,
				minLength: 5,
				maxLength: 5,
				isNumeric: true
			},
			valid: false,
			touched: false
		},
		country: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Country'
			},
			value: '',
			validation: { required: true },
			valid: false,
			touched: false
		},

		email: {
			elementType: 'input',
			elementConfig: {
				type: 'text',
				placeholder: 'Your email'
			},
			value: '',
			validation: { required: true, isEmail: true },
			valid: false,
			touched: false
		},

		deliveryMethod: {
			elementType: 'select',
			elementConfig: {
				options: [
					{ value: 'fastest', displayValue: 'Fastest' },
					{ value: 'cheapest', displayValue: 'Cheapest' }
				]
			},
			value: 'fastest',
			validation: { required: false },
			valid: true
		}
	});

	const [formIsValid, setFormIsValid] = useState(false);

	const checkValidity = (value, rules) => {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		if (rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
			isValid = pattern.test(value) && isValid;
		}

		if (rules.isNumeric) {
			const pattern = /^\d+$/;
			isValid = pattern.test(value) && isValid;
		}

		return isValid;
	};
	const inputChangeHandler = ({ target: { name, value } }, inputIdentifier) => {
		const updatedOrderForm = { ...orderForm };
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = value;
		updatedFormElement.valid = checkValidity(
			value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
		}
		setOrderForm(updatedOrderForm);
		setFormIsValid(formIsValid);
	};
	const orderHandler = event => {
		event.preventDefault();

		const formData = {};
		for (let key in orderForm) {
			formData[key] = { value: orderForm[key].value };
		}
		const order = {
			ingredients: props.ingredients.data,
			price: props.totalPrice,
			formData,
			userId: props.auth.userId
		};
		console.log(order);
		props.orderPurchaseRequest(order, props.auth.token);
		props.purchaseInit();
		// this.props.history.push("/");
	};

	let inputElements = Object.keys(orderForm).map(input => {
		const {
			elementType,
			elementConfig,
			value,
			valid,
			validation,
			touched
		} = orderForm[input];
		return (
			<Input
				touched={touched}
				shouldValidate={validation}
				invalid={!valid}
				key={input}
				elementType={elementType}
				elementConfig={elementConfig}
				value={value}
				changed={event => inputChangeHandler(event, input)}
			/>
		);
	});

	let form = (
		<div>
			<h4>Enter your contact data</h4>
			<form className={classes.ContactData} onSubmit={orderHandler}>
				{inputElements}
				<Button
					disabled={!formIsValid}
					clicked={orderHandler}
					btnType="Success"
				>
					ORDER
				</Button>
			</form>
		</div>
	);
	if (props.orders.loading) {
		form = <Spinner />;
	}
	return <React.Fragment>{form}</React.Fragment>;
};

const mapStateToProps = ({ ingredients, totalPrice, orders, auth }) => ({
	ingredients,
	totalPrice,
	orders,
	auth
});
export default connect(mapStateToProps, { orderPurchaseRequest, purchaseInit })(
	withErrorHandler(ContactData, axios)
);
