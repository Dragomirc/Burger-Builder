import React from "react";
import classes from "./styles.module.css";
import Burger from "../burger";
import Button from "../button";

const CheckoutSummary = ({
	ingredients,
	checkoutCancelled,
	checkoutContinued
}) => (
	<div className={classes.CheckoutSummary}>
		<h1>We hope it tastes well!</h1>
		<div style={{ width: "100%",  margin: "auto" }}>
			<Burger ingredients={ingredients} />
			<Button clicked={checkoutCancelled} btnType="Danger">
				CANCEL
			</Button>
			<Button clicked={checkoutContinued} btnType="Success">
				CONTINUE
			</Button>
		</div>
	</div>
);

export default CheckoutSummary;
