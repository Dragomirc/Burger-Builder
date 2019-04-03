import { TOTAL_PRICE } from "../../constants";

export const addCost = value => {
    return {
        type: TOTAL_PRICE.ADD,
        payload: value
    };
};

export const removeCost = value => {
    return {
        type: TOTAL_PRICE.REMOVE,
        payload: value
    };
};

export const resetPrice = () => {
    return {
        type: TOTAL_PRICE.RESET
    };
};
