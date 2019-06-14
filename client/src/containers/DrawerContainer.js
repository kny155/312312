import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Drawer from '../components/Drawer';

const mapStateToProps = state => ({
	authenticated: state.authenticated,
});

const DrawerContainer = withRouter(connect(mapStateToProps)(Drawer));

export default DrawerContainer;
