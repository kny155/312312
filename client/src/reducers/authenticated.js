import { LOGIN, LOGOUT } from '../actions';

export default function reducer(state = [], action) {
	switch (action.type) {
		case LOGIN:
			return true;

		case LOGOUT:
			return false;

		default:
			return state;
	}
}
