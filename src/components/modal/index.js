import React from 'react';
import Backdrop from '../backdrop';
import classes from './styles.module.css';

const Modal = props => {
	const { children, show, modalClosed } = props;
	return (
		<React.Fragment>
			<Backdrop show={show} clicked={modalClosed} />
			<div
				className={classes.Modal}
				style={{
					transform: show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: show ? '1' : '0'
				}}
			>
				{children}
			</div>
		</React.Fragment>
	);
};

export default React.memo(Modal, (prevProps, nextProps) => {
	return (
		nextProps.show === prevProps.show &&
		nextProps.children === prevProps.children
	);
});
