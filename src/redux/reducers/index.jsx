import { combineReducers } from "redux";
import ingredients from "./ingredients";
import totalPrice from "./price";
import orders from "./orders";
const rootReducer = combineReducers({
    ingredients,
    totalPrice,
    orders
});

export default rootReducer;
