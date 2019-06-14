import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const parkingSchema = new Schema(
	{
		name: { type: String, required: true },
		city: { type: String, required: true },
		address: { type: String, required: true },
		owner: { type: String, required: true },
		location: { type: Array },
		seats: { type: Number },
		price: { type: Number },
		type: { type: String },
		devices: { type: Array },
		statistics: { type: String },
		description: { type: String },
	},
	{ versionKey: false },
);

const Parking = mongoose.model('Parking', parkingSchema);

export default Parking;
