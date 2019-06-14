import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const deviceSchema = new Schema(
	{
		updateTime: { type: Number, required: true },
		allSeats: { type: Number },
		clearSeats: { type: Number, required: true },
		parking: { type: String, required: true },
	},
	{ versionKey: false },
);

const Device = mongoose.model('Device', deviceSchema);

export default Device;
