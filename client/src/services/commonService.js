const getToken = () =>
	JSON.parse(localStorage.getItem('user')) ||
	JSON.parse(sessionStorage.getItem('user'));

export const commonService = {
	getToken,
};
