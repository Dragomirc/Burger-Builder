import React, { useState, useEffect } from 'react';
import Modal from '../../modal';

const WithErrorHandler = (WrappedComponent, axios) => {
	return props => {
		const [error, setError] = useState(null);

		const requestInterceptor = axios.interceptors.request.use(req => {
			setError(null);
			return req;
		});
		const responseInterceptor = axios.interceptors.response.use(
			res => res,
			err => {
				setError(err);
				return Promise.reject(err);
			}
		);
		useEffect(() => {
			return () => {
				axios.interceptors.response.eject(responseInterceptor);
				axios.interceptors.request.eject(requestInterceptor);
			};
		}, [requestInterceptor, responseInterceptor]);

		const errorConfirmedHandler = () => {
			setError(null);
		};

		return (
			<React.Fragment>
				<Modal modalClosed={errorConfirmedHandler} show={error}>
					{error ? error.message : null}
				</Modal>
				<WrappedComponent {...props} />
			</React.Fragment>
		);
	};
};

export default WithErrorHandler;
