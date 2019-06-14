import axios from 'axios';

const login = async (email, password) => {
	const { data } = await axios.post('/login', {
		email,
		password,
	});
	return data;
};

const registration = async (email, password) => {
	const { data } = await axios.post('/registration', {
		email,
		password,
	});
	return data;
};

const relogin = async () => {
	const { data } = await axios.get('/relogin');
	return data;
};

export const authenticatedService = {
	login,
	relogin,
	registration,
};
