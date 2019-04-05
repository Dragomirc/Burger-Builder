import { ORDERS, PURCHASE_INIT } from "../../constants";

const initialState = {
    loading: false,
    error: null,
    results: [],
    purchased: false
};
const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case PURCHASE_INIT: {
            return {
                ...state,
                purchased: false
            };
        }
        case ORDERS.PURCHASE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ORDERS.PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: [
                    ...state.results,
                    { orderId: action.orderId, orderData: action.orderData }
                ],
                purchased: true
            };
        case ORDERS.PURCHASE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case ORDERS.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            };
        case ORDERS.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                results: [...action.payload]
            };
        case ORDERS.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default:
            return { ...initialState };
    }
};

export default ordersReducer;
