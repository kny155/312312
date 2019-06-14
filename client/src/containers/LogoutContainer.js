import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Logout from '../components/Logout';
import { logout } from '../actions';

const mapDispatchToProps = dispatch => {
	return {
		onLogout: () => logout()(dispatch),
	};
};

const mapStateToProps = state => ({});

const LogoutContainer = withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Logout),
);

export default LogoutContainer;
