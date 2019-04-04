import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Input from "../../components/input";
import Button from "../../components/button";
import Spinner from "../../components/spinner";
import { auth, setAuthRedirectPath } from "../../redux/actions/auth";
import { connect } from "react-redux";
import classes from "./styles.module.css";
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail Address"
                },
                value: "",
                validation: { required: true, isEmail: true },
                valid: false,
                touched: false
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: "",
                validation: { required: true, minLength: 6 },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    };

    componentDidMount() {
        if (this.props.building && this.props.redirectPath !== "/") {
            this.props.setAuthRedirectPath("/");
        }
    }
    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    };
    inputChangeHandler = ({ target: { name, value } }, inputIdentifier) => {
        const updatedControls = { ...this.state.controls };
        const updatedFormElement = {
            ...updatedControls[inputIdentifier]
        };
        updatedFormElement.value = value;
        updatedFormElement.valid = this.checkValidity(
            value,
            updatedFormElement.validation
        );
        updatedFormElement.touched = true;
        updatedControls[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            controls: updatedControls
        });
    };

    onFormSubmit = event => {
        event.preventDefault();
        const email = this.state.controls.email.value;
        const password = this.state.controls.password.value;
        this.props.onAuth(email, password, this.state.isSignup);
    };

    switchAuthModeHandler = event => {
        event.preventDefault();
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    };
    render() {
        let inputElements = Object.keys(this.state.controls).map(input => {
            const {
                elementType,
                elementConfig,
                value,
                valid,
                validation,
                touched
            } = this.state.controls[input];
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
        let errorMessage = null;
        if (this.props.auth.error) {
            errorMessage = <p>{this.props.auth.error}</p>;
        }

        let form = (
            <div>
                {errorMessage}
                <form onSubmit={this.onFormSubmit}>
                    {inputElements}
                    <Button
                        // disabled={!this.state.formIsValid}
                        btnType="Success"
                    >
                        SUBMIT
                    </Button>
                    <Button
                        clicked={this.switchAuthModeHandler}
                        btnType="Danger"
                    >
                        SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
                    </Button>
                </form>
                {this.props.auth.token ? (
                    <Redirect to={this.props.redirectPath} />
                ) : null}
            </div>
        );

        if (this.props.auth.loading) {
            form = <Spinner />;
        }

        return <div className={classes.Auth}>{form}</div>;
    }
}

const mapStateToProps = ({ auth, ingredients }) => ({
    auth,
    building: ingredients.building,
    redirectPath: auth.authRedirectPath
});
export default connect(
    mapStateToProps,
    { onAuth: auth, setAuthRedirectPath }
)(Auth);
