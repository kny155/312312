import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Login from '../components/Login';
import { login } from '../actions';

const mapDispatchToProps = dispatch => {
	return {
		onLogin: (email, password, remember) =>
			login(email, password, remember)(dispatch),
	};
};

const mapStateToProps = state => ({});

const LoginContainer = withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Login),
);

export default LoginContainer;
