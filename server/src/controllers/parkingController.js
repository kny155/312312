import { User, Parking } from '../model';
import { getIdByToken } from '../business/authentication';
import {
	getParkingsObj,
	getParkingObj,
	deleteParking,
	getSeatsNow,
} from '../business/parking';

const parkingController = {
	create: async ctx => {
		const ownerId = await getIdByToken(ctx.headers);
		const owner = await User.findById(ownerId);
		const newParking = ctx.request.body;
		const parking = new Parking({
			...newParking,
			owner: ownerId,
		});
		await parking.save();
		await User.findByIdAndUpdate(ownerId, {
			parkings: [...owner.parkings, parking.id],
		});
		ctx.body = await getParkingObj(parking);
	},
	read: async ctx => {
		const parkings = await Parking.find();
		ctx.body = await getParkingsObj(parkings);
	},
	readOwner: async ctx => {
		const ownerId = await getIdByToken(ctx.headers);
		const { parkings } = await User.findById(ownerId);
		const ownerParkings = await Parking.find({ _id: parkings });
		ctx.body = await getParkingsObj(ownerParkings);
	},
	readSeats: async ctx => {
		const id = ctx.params.id;
		const { devices, seats } = await Parking.findById(id);
		if (devices.length) {
			const clearSeats = await getSeatsNow(devices);
			ctx.body = {
				clearSeats,
				allSeats: seats
			};
		} else {
			ctx.body = {
				allSeats: seats
			};
		}
	},
	readById: async ctx => {
		const id = ctx.params.id;
		const parking = await Parking.findById(id);
		if (parking) {
			ctx.body = await getParkingObj(parking);
		} else {
			ctx.status = 404;
		}
	},
	update: async ctx => {
		const id = ctx.params.id;
		const newParking = ctx.request.body;
		const ownerId = await getIdByToken(ctx.headers);
		const { parkings } = await User.findById(ownerId);
		const isParking = parkings.some(parking => parking === id);
		if (isParking) {
			await Parking.findByIdAndUpdate(id, newParking);
			const parking = await Parking.findById(id);
			ctx.body = await getParkingObj(parking);
		} else {
			ctx.status = 404;
		}
	},
	delete: async ctx => {
		const id = ctx.params.id;
		const ownerId = await getIdByToken(ctx.headers);
		const { parkings } = await User.findById(ownerId);
		const isParking = parkings.some(parking => parking === id);
		if (isParking) {
			ctx.body = await deleteParking(id);
		} else {
			ctx.status = 404;
		}
	},
};

export default parkingController;
