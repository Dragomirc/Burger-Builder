import React, { Component } from "react";
import withErrorHandler from "../../components/hoc/with-error-handler";
import Order from "../../components/order";
import axios from "../../axios-orders";
import classes from "./styles.module.css";

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};

	componentDidMount() {
		axios.get("orders.json").then(res => {
			const fetchedOrders = [];
			for (let key in res.data) {
				fetchedOrders.push({
					...res.data[key],
					id: key
				});
			}
			this.setState({ orders: fetchedOrders, loading: true });
		});
	}
	render() {
		const orders = this.state.orders.map(order => (
			<Order
				key={order.id}
				price={order.price ? Number.parseFloat(order.price).toFixed(2) : 0.0}
				ingredients={order.ingredients}
			/>
		));
		return <div>{orders}</div>;
	}
}

export default withErrorHandler(Orders, axios);
