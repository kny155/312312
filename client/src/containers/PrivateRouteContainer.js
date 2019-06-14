import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PrivateRoute from '../components/Common/PrivateRoute';

const mapStateToProps = state => ({
	authenticated: state.authenticated,
});

const PrivateRouteContainer = withRouter(
	connect(mapStateToProps)(PrivateRoute),
);

export default PrivateRouteContainer;
