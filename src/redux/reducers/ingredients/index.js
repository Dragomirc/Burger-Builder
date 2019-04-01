import { INGREDIENTS } from "../../constants";

const initialState = {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case INGREDIENTS.UPDATE_INGREDIENTS:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};
