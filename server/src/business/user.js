export const getUserObj = user => {
	return {
		email: user.email,
		firstName: user.firstName,
		secondName: user.secondName,
		lastName: user.lastName,
		phone: user.phone,
	};
};
