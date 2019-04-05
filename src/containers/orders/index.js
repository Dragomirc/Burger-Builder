import React, { Component } from "react";
import { connect } from "react-redux";
import withErrorHandler from "../../components/hoc/with-error-handler";
import Order from "../../components/order";
import Spinner from "../../components/spinner";
import axios from "../../axios-orders";
import { fetchOrders } from "../../redux/actions/orders";
import classes from "./styles.module.css";

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrders(this.props.auth.token, this.props.auth.userId);
    }
    render() {
        let orders = <Spinner />;
        if (!this.props.orders.loading) {
            orders = this.props.orders.results.map(order => (
                <Order
                    key={order.id}
                    price={
                        order.price
                            ? Number.parseFloat(order.price).toFixed(2)
                            : 0.0
                    }
                    ingredients={order.ingredients}
                />
            ));
        }

        return <div>{orders}</div>;
    }
}

const mapStateToProps = ({ orders, auth }) => ({ orders, auth });
export default connect(
    mapStateToProps,
    { fetchOrders }
)(withErrorHandler(Orders, axios));
