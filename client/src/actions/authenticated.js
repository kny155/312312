import axios from 'axios';
import { authenticatedService, commonService } from '../services';
import {setUser, removeUser} from './'
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const logout = () => {
	return async dispatch => {
		axios.defaults.headers.common['Authorization'] = '';
		localStorage.removeItem('user');
		sessionStorage.removeItem('user');
		removeUser();
		dispatch({ type: LOGOUT });
	};
};

export const login = (email, password, remember) => {
	return async dispatch => {
		const { token, user } = await authenticatedService.login(email, password);
		axios.defaults.headers.common['Authorization'] = token;
		if (remember) {
			localStorage.setItem('user', JSON.stringify(token));
		} else {
			sessionStorage.setItem('user', JSON.stringify(token));
		}
		setUser(user)(dispatch)
		dispatch({ type: LOGIN });

	};
};

export const relogin = () => {
	return async dispatch => {
		const token = commonService.getToken();
		axios.defaults.headers.common['Authorization'] = token;
		if (token) {
			try {
				const user = await authenticatedService.relogin();
				setUser(user)(dispatch)
				dispatch({ type: LOGIN });
			} catch {
				localStorage.removeItem('user');
				sessionStorage.removeItem('user');
			}
		}
	};
};
