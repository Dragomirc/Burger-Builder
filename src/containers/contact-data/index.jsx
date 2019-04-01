import React, { Component } from "react";
import axios from "../../axios-orders.js";
import Button from "../../components/button";
import Spinner from "../../components/spinner";
import Input from "../../components/input";
import classes from "./styles.module.css";
class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name"
				},
				value: ""
			},

			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street"
				},
				value: ""
			},
			zipCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Postal code"
				},
				value: ""
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country"
				},
				value: ""
			},

			email: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your email"
				},
				value: ""
			},

			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" }
					]
				},
				value: ""
			}
		},
		loading: false
	};

	inputChangeHandler = ({ target: { name, value } }, inputIdentifier) => {
		const updatedOrderForm = { ...this.state.orderForm };
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = value;
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		this.setState({ orderForm: updatedOrderForm });
	};
	orderHandler = event => {
		event.preventDefault();
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice
		};
		this.setState({ loading: true });

		axios
			.post("/orders.json", order)
			.then(res => this.setState({ loading: false }))
			.catch(res => this.setState({ loading: false, purchasing: false }));
		this.props.history.push("/");
	};
	render() {
		let inputElements = Object.keys(this.state.orderForm).map(input => {
			const { elementType, elementConfig, value } = this.state.orderForm[input];
			return (
				<Input
					key={input}
					elementType={elementType}
					elementConfig={elementConfig}
					value={value}
					changed={event => this.inputChangeHandler(event, input)}
				/>
			);
		});

		let form = (
			<div>
				<h4>Enter your contact data</h4>
				<form className={classes.ContactData}>
					{inputElements}
					<Button clicked={this.orderHandler} btnType="Success">
						ORDER
					</Button>
				</form>
			</div>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return <React.Fragment>{form}</React.Fragment>;
	}
}

export default ContactData;
