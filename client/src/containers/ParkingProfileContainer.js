import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ParkingProfile from '../components/ParkingProfile';

const mapStateToProps = state => ({
	user: state.user,
});

const ParkingProfileContainer = withRouter(
	connect(
		mapStateToProps,
	)(ParkingProfile),
);

export default ParkingProfileContainer;
