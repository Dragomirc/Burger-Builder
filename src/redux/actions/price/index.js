import { TOTAL_PRICE } from "../../constants";

export const addPrice = value => {
    return {
        type: TOTAL_PRICE.ADD,
        payload: value
    };
};

export const removePrice = value => {
    return {
        type: TOTAL_PRICE.REMOVE,
        payload: value
    };
};
