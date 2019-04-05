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

export const orderPurchaseRequest = (orderData, token) => dispatch => {
    dispatch({ type: ORDERS.PURCHASE_REQUEST });
    return axios
        .post(`/orders.json?auth=${token}`, orderData)
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
        error: err
    };
};
export const fetchOrders = (token, userId) => dispatch => {
    dispatch(fetchOrdersStart());
    return axios
        .get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
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
