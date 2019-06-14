import jwt from 'jsonwebtoken';

import { TOKEN_LIFETIME_HOURS, TOKEN_SECRET } from '../../config.json';

export const getTokenById = async id => {
	const token = jwt.sign({ id: id.toString() }, TOKEN_SECRET, {
		expiresIn: TOKEN_LIFETIME_HOURS + 'h',
	});
	return token;
};

export const getIdByToken = async headers => {
	if (headers && headers.authorization) {
		const parted = headers.authorization.split(' ');
		if (parted.length === 2) {
			const { id } = await jwt.verify(parted[1], TOKEN_SECRET);
			return id;
		} else {
			return null;
		}
	} else {
		return null;
	}
};
