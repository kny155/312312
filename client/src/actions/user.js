export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setUser = user => {
	return async dispatch => {
		dispatch({
			type: SET_USER,
			user,
		});
	};
};

export const removeUser = () => {
	return async dispatch => {
		dispatch({
			type: REMOVE_USER,
		});
	};
};
