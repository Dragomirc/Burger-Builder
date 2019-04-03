import { TOTAL_PRICE } from "../../constants";

const initialState = 0;

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case TOTAL_PRICE.ADD:
            return state + payload;
        case TOTAL_PRICE.REMOVE:
            return state - payload;
        case TOTAL_PRICE.RESET:
            return initialState;
        default:
            return state;
    }
};
