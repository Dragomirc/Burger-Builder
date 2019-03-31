import React, { Component } from "react";
import axios from "../../axios-orders.js";
import Button from "../../components/button";
import Spinner from "../../components/spinner";
import classes from "./styles.module.css";
class ContactData extends Component {
	state = {
		name: "",
		email: "",
		address: {
			street: "",
			postalCode: ""
		},
		loading: false
	};

	orderHandler = event => {
		event.preventDefault();
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.totalPrice,
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
			.then(res => this.setState({ loading: false }))
			.catch(res => this.setState({ loading: false, purchasing: false }));
		console.log(this.props.ingredients);
	};
	render() {
		let form = (
			<div>
				<h4>Enter your contact data</h4>
				<form className={classes.ContactData}>
					<input
						className={classes.Input}
						type="text"
						name="name"
						placeholder="Your Name"
					/>
					<input
						className={classes.Input}
						type="text"
						name="email"
						placeholder="Your Email"
					/>
					<input
						className={classes.Input}
						type="text"
						name="street"
						placeholder="Your Street"
					/>
					<input
						className={classes.Input}
						type="text"
						name="postal code"
						placeholder="Your Postal code"
					/>
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
