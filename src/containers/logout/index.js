import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';

const Logout = props => {
	useEffect(() => {
		props.logout();
	});

	return <Redirect to="/" />;
};

export default connect(undefined, { logout })(Logout);
