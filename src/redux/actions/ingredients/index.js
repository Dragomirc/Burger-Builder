import { INGREDIENTS } from "../../constants";
import axios from "../../../axios-orders";
export const updateIngredients = ingredient => {
    return {
        type: INGREDIENTS.UPDATE_INGREDIENTS,
        payload: ingredient
    };
};

export const fetchIngredients = () => dispatch => {
    dispatch({ type: INGREDIENTS.GET_INGREDIENTS_REQUEST, payload: true });

    return axios
        .get("ingredients.json")
        .then(response => {
            dispatch({
                type: INGREDIENTS.GET_INGREDIENTS_SUCCESS,
                payload: response.data
            });
        })
        .catch(err => {
            return {
                type: INGREDIENTS.GET_INGREDIENTS_ERROR,
                payload: err.messagee
            };
        });
};
