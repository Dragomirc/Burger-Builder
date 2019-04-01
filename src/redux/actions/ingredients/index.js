import { INGREDIENTS } from "../../constants";

export const updateIngredients = ingredient => {
    return {
        type: INGREDIENTS.UPDATE_INGREDIENTS,
        payload: ingredient
    };
};
