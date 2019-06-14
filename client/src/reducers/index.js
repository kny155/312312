import { combineReducers } from 'redux';

import { default as authenticated } from './authenticated';
import { default as user } from './user';

const reducer = combineReducers({
	authenticated,
	user,
});

export default reducer;
