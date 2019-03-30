import React, { Component } from "react";
import Modal from "../../modal";

const WithErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props);
			this.requestInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});
			this.responseInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({ error });
					return Promise.reject(error);
				}
			);
			this.state = {
				error: null
			};
		}

		componentWillUnmount() {
			axios.interceptors.response.eject(this.responseInterceptor);
			axios.interceptors.request.eject(this.requestInterceptor);
		}
		errorConfirmedHandler = () => {
			this.setState({ error: null });
		};
		render() {
			return (
				<React.Fragment>
					<Modal
						modalClosed={this.errorConfirmedHandler}
						show={this.state.error}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</React.Fragment>
			);
		}
	};
};

export default WithErrorHandler;
