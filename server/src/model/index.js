import mongoose from 'mongoose';

import { DATABASE_URL } from '../../config.json';

import User from './user';
import Parking from './parking';
import Device from './device';
import Statistics from './statistics';

const connectDb = () => {
	return mongoose.connect(DATABASE_URL, {
		useNewUrlParser: true,
		useFindAndModify: false,
	});
};

module.exports = {
	connectDb,
	User,
	Parking,
	Device,
	Statistics,
};
