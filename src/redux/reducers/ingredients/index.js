import { INGREDIENTS } from "../../constants";

const initialState = {
    error: null,
    loading: false,
    data: null
};

const updateIngredients = (state = initialState, { type, payload }) => {
    switch (type) {
        case INGREDIENTS.UPDATE_INGREDIENTS:
            return {
                ...state,
                data: { ...payload }
            };
        case INGREDIENTS.GET_INGREDIENTS_REQUEST:
            return {
                ...initialState,
                loading: true
            };
        case INGREDIENTS.GET_INGREDIENTS_SUCCESS:
            return {
                ...initialState,
                loading: false,
                data: { ...payload }
            };
        case INGREDIENTS.GET_INGREDIENTS_ERROR:
            return {
                ...initialState,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
};

export default updateIngredients;
