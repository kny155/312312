import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../components/App';
import { relogin } from '../actions';

const mapDispatchToProps = dispatch => {
	return {
		onRelogin: () => relogin()(dispatch),
	};
};

const mapStateToProps = state => ({
	authenticated: state.authenticated,
});

const AppContainer = withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(App),
);

export default AppContainer;
