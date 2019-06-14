import React, { useState, useEffect } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

import Main from '../Main';
import Error from '../Error';
import LoginContainer from '../../containers/LoginContainer';
import LogoutContainer from '../../containers/LogoutContainer';
import Registration from '../Registration';

const App = ({ authenticated, onRelogin }) => {
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		relogin();
	});

	const relogin = async () => {
		await onRelogin();
		setLoading(false);
	};
	return (
		<Router>
			{!loading && (
				<Switch>
					<Route
						path="/login"
						render={() =>
							authenticated ? <Redirect to="/" /> : <LoginContainer />
						}
					/>
					<Route
						path="/registration"
						render={() =>
							authenticated ? <Redirect to="/" /> : <Registration />
						}
					/>
					<Route
						path="/logout"
						render={() =>
							authenticated ? <LogoutContainer /> : <Redirect to="/" />
						}
					/>
					<Route path="/404" component={Error} />
					<Route path="/" component={Main} />
				</Switch>
			)}
		</Router>
	);
};
export default App;
