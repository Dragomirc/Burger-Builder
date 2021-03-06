import { combineReducers } from "redux";
import ingredients from "./ingredients";
import totalPrice from "./price";
import orders from "./orders";
import auth from "./auth";
const rootReducer = combineReducers({
    ingredients,
    totalPrice,
    orders,
    auth
});

export default rootReducer;
