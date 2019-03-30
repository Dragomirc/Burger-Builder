import React, { Component } from "react";
import Backdrop from "../backdrop";
import classes from "./styles.module.css";

class Modal extends Component {
	shouldComponentUpdate(prevProps, prevState) {
		return (
			this.props.show !== prevProps.show ||
			this.props.children !== prevProps.children
		);
	}
	render() {
		const { children, show, modalClosed } = this.props;
		return (
			<React.Fragment>
				<Backdrop show={show} clicked={modalClosed} />
				<div
					className={classes.Modal}
					style={{
						transform: show ? "translateY(0)" : "translateY(-100vh)",
						opacity: show ? "1" : "0"
					}}
				>
					{children}
				</div>
			</React.Fragment>
		);
	}
}

export default Modal;
