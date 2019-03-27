import React from "react";
import Button from "../button";

const OrderSummary = ({
    ingredients,
    totalPrice,
    purchaseCanceled,
    purchaseContinued
}) => {
    const ingredientSummary = Object.keys(ingredients).map(igKey => (
        <li key={`${igKey}`}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>
            {`: ${ingredients[igKey]}`}
        </li>
    ));
    return (
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicous burger with the following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p>Continue to checkout?</p>
            <p>{`Total price ${totalPrice.toFixed(2)}`}</p>
            <Button btnType="Danger" clicked={purchaseCanceled}>
                CANCEL
            </Button>
            <Button btnType="Success" clicked={purchaseContinued}>
                CONTINUE
            </Button>
        </React.Fragment>
    );
};

export default OrderSummary;
