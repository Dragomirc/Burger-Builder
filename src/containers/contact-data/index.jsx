import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../../axios-orders.js";
import Button from "../../components/button";
import Spinner from "../../components/spinner";
import Input from "../../components/input";
import { orderPurchaseRequest, purchaseInit } from "../../redux/actions/orders";

import withErrorHandler from "../../components/hoc/with-error-handler";
import classes from "./styles.module.css";
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: "",
                validation: { required: true },
                valid: false,
                touched: false
            },

            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: "",
                validation: { required: true },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Postal code"
                },
                value: "",
                validation: { required: true, minLength: 5, maxLength: 5 },
                valid: false,
                touched: false
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: "",
                validation: { required: true },
                valid: false,
                touched: false
            },

            email: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your email"
                },
                value: "",
                validation: { required: true },
                valid: false,
                touched: false
            },

            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        { value: "fastest", displayValue: "Fastest" },
                        { value: "cheapest", displayValue: "Cheapest" }
                    ]
                },
                value: "fastest",
                validation: { required: false },
                valid: true
            }
        },

        formIsValid: false
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };
    inputChangeHandler = ({ target: { name, value } }, inputIdentifier) => {
        const updatedOrderForm = { ...this.state.orderForm };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = value;
        updatedFormElement.valid = this.checkValidity(
            value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid =
                updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        });
    };
    orderHandler = event => {
        event.preventDefault();

        const formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = { value: this.state.orderForm[key].value };
        }
        const order = {
            ingredients: this.props.ingredients.data,
            price: this.props.totalPrice,
            formData
        };
        this.props.orderPurchaseRequest(order);
        this.props.purchaseInit();
        // this.props.history.push("/");
    };
    render() {
        let inputElements = Object.keys(this.state.orderForm).map(input => {
            const {
                elementType,
                elementConfig,
                value,
                valid,
                validation,
                touched
            } = this.state.orderForm[input];
            return (
                <Input
                    touched={touched}
                    shouldValidate={validation}
                    invalid={!valid}
                    key={input}
                    elementType={elementType}
                    elementConfig={elementConfig}
                    value={value}
                    changed={event => this.inputChangeHandler(event, input)}
                />
            );
        });

        let form = (
            <div>
                <h4>Enter your contact data</h4>
                <form
                    className={classes.ContactData}
                    onSubmit={this.orderHandler}
                >
                    {inputElements}
                    <Button
                        disabled={!this.state.formIsValid}
                        clicked={this.orderHandler}
                        btnType="Success"
                    >
                        ORDER
                    </Button>
                </form>
            </div>
        );
        if (this.props.orders.loading) {
            form = <Spinner />;
        }
        return <React.Fragment>{form}</React.Fragment>;
    }
}

const mapStateToProps = ({ ingredients, totalPrice, orders }) => ({
    ingredients,
    totalPrice,
    orders
});
export default connect(
    mapStateToProps,
    { orderPurchaseRequest, purchaseInit }
)(withErrorHandler(ContactData, axios));
