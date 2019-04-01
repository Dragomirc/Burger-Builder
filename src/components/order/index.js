import React from "react";
import classes from "./styles.module.css";

const Order = ({ ingredients, price }) => {
	const renderedIngredients = Object.keys(ingredients).map(ingName => (
		<span
			style={{
				textTransform: "capitalize",
				display: "inline-block",
				margin: "0 8px",
				border: "1px solid #ccc",
				padding: "5px"
			}}
			key={ingName}
		>{`${ingName} (${ingredients[ingName]})`}</span>
	));
	return (
		<div className={classes.Order}>
			<p>Ingredients: {renderedIngredients} </p>

			<p>
				Price: <strong>{price}</strong>
			</p>
		</div>
	);
};

export default Order;
