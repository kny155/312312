import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: { type: String, required: true },
		password: { type: String, required: true },
		firstName: { type: String },
		secondName: { type: String },
		lastName: { type: String },
		phone: { type: String },
		parkings: { type: Array },
	},
	{ versionKey: false },
);

const User = mongoose.model('User', userSchema);

export default User;
