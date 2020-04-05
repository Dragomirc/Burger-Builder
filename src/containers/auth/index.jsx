import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Input from '../../components/input';
import Button from '../../components/button';
import Spinner from '../../components/spinner';
import { auth, setAuthRedirectPath } from '../../redux/actions/auth';
import { connect } from 'react-redux';
import classes from './styles.module.css';
const Auth = props => {
	const [controls, setControls] = useState({
		email: {
			elementType: 'input',
			elementConfig: {
				type: 'email',
				placeholder: 'Mail Address'
			},
			value: '',
			validation: { required: true, isEmail: true },
			valid: false,
			touched: false
		},
		password: {
			elementType: 'input',
			elementConfig: {
				type: 'password',
				placeholder: 'Password'
			},
			value: '',
			validation: { required: true, minLength: 6 },
			valid: false,
			touched: false
		}
	});

	const [isSignup, setIsSignup] = useState(true);

	useEffect(() => {
		if (props.building && props.redirectPath !== '/') {
			props.setAuthRedirectPath('/');
		}
	});

	const checkValidity = (value, rules) => {
		let isValid = true;
		if (!rules) {
			return true;
		}

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
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
	const inputChangeHandler = ({ target: { name, value } }, inputIdentifier) => {
		const updatedControls = { ...controls };
		const updatedFormElement = {
			...updatedControls[inputIdentifier]
		};
		updatedFormElement.value = value;
		updatedFormElement.valid = checkValidity(
			value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedControls[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedControls) {
			formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
		}
		setControls(updatedControls);
	};

	const onFormSubmit = event => {
		event.preventDefault();
		const email = controls.email.value;
		const password = controls.password.value;
		props.onAuth(email, password, isSignup);
	};

	const switchAuthModeHandler = event => {
		event.preventDefault();

		setIsSignup(prevState => !prevState);
	};

	let inputElements = Object.keys(controls).map(input => {
		const {
			elementType,
			elementConfig,
			value,
			valid,
			validation,
			touched
		} = controls[input];
		return (
			<Input
				touched={touched}
				shouldValidate={validation}
				invalid={!valid}
				key={input}
				elementType={elementType}
				elementConfig={elementConfig}
				value={value}
				changed={event => inputChangeHandler(event, input)}
			/>
		);
	});
	let errorMessage = null;
	if (props.auth.error) {
		errorMessage = <p>{props.auth.error}</p>;
	}

	let form = (
		<div>
			{errorMessage}
			<form onSubmit={onFormSubmit}>
				{inputElements}
				<Button
					// disabled={!state.formIsValid}
					btnType="Success"
				>
					SUBMIT
				</Button>
				<Button clicked={switchAuthModeHandler} btnType="Danger">
					SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
				</Button>
			</form>
			{props.auth.token ? <Redirect to={props.redirectPath} /> : null}
		</div>
	);

	if (props.auth.loading) {
		form = <Spinner />;
	}

	return <div className={classes.Auth}>{form}</div>;
};

const mapStateToProps = ({ auth, ingredients }) => ({
	auth,
	building: ingredients.building,
	redirectPath: auth.authRedirectPath
});
export default connect(mapStateToProps, { onAuth: auth, setAuthRedirectPath })(
	Auth
);
