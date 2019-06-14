import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from '../../containers/PrivateRouteContainer';

import Map from '../Map'
import ParkingList from '../ParkingList'
import ParkingProfileContainer from '../../containers/ParkingProfileContainer'
import Profile from '../Profile'
import Settings from '../Settings'
import AddParking from '../AddParking'


const useStyles = makeStyles(theme => ({
	content: {
		position: 'absolute',
		display: "flex",
		top: 0,
		left: 0,
		width: '100%',
		minHeight: '100%',
		paddingTop: theme.spacing(8),
		[theme.breakpoints.down('xs')]: {
			paddingTop: theme.spacing(7),
		},
		justifyContent: "center"
	},
}));

const Content = () => {
	const classes = useStyles();
	return (
		<main className={classes.content}>
			<Switch>
				<Route exact path="/" component={Map} />
				<PrivateRoute path="/profile" component={Profile} />
				<Route exact path="/parkings" component={ParkingList} />
				<PrivateRoute
					exact
					path="/parkings/add"
					component={AddParking}
				/>
				<Route
					path="/parkings/:id"
					component={ParkingProfileContainer}
				/>
				<PrivateRoute path="/settings" component={Settings} />
				<Route path="*" component={() => <Redirect to="/404" />} />
			</Switch>
		</main>
	);
};

export default Content;
