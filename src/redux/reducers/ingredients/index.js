import { INGREDIENTS } from "../../constants";

const initialState = {
    error: null,
    loading: false,
    data: null,
    building: false
};

const updateIngredients = (state = initialState, { type, payload }) => {
    switch (type) {
        case INGREDIENTS.UPDATE_INGREDIENTS:
            return {
                ...state,
                building: true,
                data: { ...payload }
            };
        case INGREDIENTS.GET_INGREDIENTS_REQUEST:
            return {
                ...state,
                error: null,
                loading: true
            };
        case INGREDIENTS.GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                data: { ...payload }
            };
        case INGREDIENTS.GET_INGREDIENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
};

export default updateIngredients;
