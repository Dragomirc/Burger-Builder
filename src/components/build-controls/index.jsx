import React from "react";

import BuildControl from "../build-control";
import classes from "./styles.module.css";

const controls = [
    {
        label: "Salad",
        type: "salad"
    },
    {
        label: "Bacon",
        type: "bacon"
    },
    {
        label: "Cheese",
        type: "cheese"
    },
    {
        label: "Meat",
        type: "meat"
    }
];
const BuildControls = ({ add, remove, totalPrice, purchasable }) => (
    <div className={classes.BuildControls}>
        <p>
            Current Price: <strong>{totalPrice.toFixed()}</strong>
        </p>
        {controls.map(({ label, type }) => (
            <BuildControl
                label={label}
                key={label}
                add={() => add(type)}
                remove={() => remove(type)}
            />
        ))}
        <button disabled={!purchasable} className={classes.OrderButton}>
            ORDER NOW
        </button>
    </div>
);

export default BuildControls;