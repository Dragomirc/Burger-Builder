import { combineReducers } from "redux";
import ingredients from "./ingredients";
import totalPrice from "./price";
const rootReducer = combineReducers({
    ingredients,
    totalPrice
});

export default rootReducer;
