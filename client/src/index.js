import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import AppContainer from './containers/AppContainer';
import store from './store';

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<CssBaseline />
			<AppContainer />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'),
);
