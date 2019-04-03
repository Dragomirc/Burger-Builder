import { ORDERS, PURCHASE_INIT } from "../../constants";
import axios from "../../../axios-orders";
export const orderPurchaseSuccess = (id, orderData) => {
    return {
        type: ORDERS.PURCHASE_SUCCESS,
        orderId: id,
        orderData
    };
};

export const orderPurchaseFail = error => {
    return {
        type: ORDERS.PURCHASE_FAIL,
        error
    };
};

export const orderPurchaseRequest = orderData => dispatch => {
    dispatch({ type: ORDERS.PURCHASE_REQUEST });
    return axios
        .post("/orders.json", orderData)
        .then(res => dispatch(orderPurchaseSuccess(res.name, orderData)))
        .catch(err => dispatch(orderPurchaseFail(err.message)));
};

export const purchaseInit = () => {
    return {
        type: PURCHASE_INIT
    };
};

export const fetchOrdersStart = () => {
    return {
        type: ORDERS.FETCH_ORDERS_START
    };
};
export const fetchOrdersSuccess = orders => {
    return {
        type: ORDERS.FETCH_ORDERS_SUCCESS,
        payload: orders
    };
};
export const fetchOrdersFail = err => {
    return {
        type: ORDERS.FETCH_ORDERS_FAIL,
        payload: err
    };
};
export const fetchOrders = () => dispatch => {
    dispatch(fetchOrdersStart());
    axios
        .get("/orders.json")
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => dispatch(fetchOrdersFail(err.message)));
};
