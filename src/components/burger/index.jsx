import React from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "../burger-ingredient";
import classes from "./styles.module.css";

const Burger = ({ ingredients }) => {
    let transformedIngredients = Object.keys(ingredients)
        .map(igKey => {
            return [...Array(ingredients[igKey])].map((_, i) => (
                <BurgerIngredient key={igKey + i} type={igKey} />
            ));
        })
        .reduce((arr, el) => arr.concat(el), []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default Burger;

Burger.propTypes = {
    ingredients: PropTypes.object
};
