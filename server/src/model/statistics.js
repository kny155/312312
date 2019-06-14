import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const statisticsSchema = new Schema(
	{
		days: { type: Array, required: true },
		parking: { type: String, required: true },
	},
	{ versionKey: false },
);

const Statistics = mongoose.model('Statistics', statisticsSchema);

export default Statistics;
