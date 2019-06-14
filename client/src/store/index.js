import { createStore } from 'redux';

import reducer from '../reducers';

const initialState = {
	authenticated: false,
	user: {},
};

const store = createStore(reducer, initialState);

export default store;
