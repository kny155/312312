import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from '../components/Header';

const mapStateToProps = state => ({
	authenticated: state.authenticated,
});

const HeaderContainer = withRouter(connect(mapStateToProps)(Header));

export default HeaderContainer;
