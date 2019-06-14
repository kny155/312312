import { Parking, Device } from '../model';
import { getIdByToken } from '../business/authentication';
import { getDevicesObj } from '../business/devices';

const deviceController = {
	add: async ctx => {
		const ownerId = await getIdByToken(ctx.headers);
		const { parkingId } = ctx.request.body;
		const { devices, owner } = await Parking.findById(parkingId);
		if (ownerId === owner) {
			const device = new Device({
				parking: parkingId,
				clearSeats: 0,
				updateTime: 0,
				allSeats: 0
			});
			await device.save();
			const newDevices = [...devices, device._id.toString()];
			await Parking.findByIdAndUpdate(parkingId, {
				devices: newDevices,
			});
			ctx.body = await getDevicesObj(newDevices);
		} else {
			ctx.status = 404;
		}
	},
	update: async ctx => {
		const { parkingId, deviceId, seats, allSeats: newAllSeats } = ctx.request.body;
		const { parking, allSeats, updateTime } = await Device.findById(deviceId);
		if (parking === parkingId) {
			await Device.findByIdAndUpdate(deviceId, {
				clearSeats: allSeats - seats > 0 ? allSeats - seats : 0,
				updateTime: seats ? Date.now() : updateTime,
				allSeats: newAllSeats || allSeats
			});
			ctx.body = { status: 'OK' };
		} else {
			ctx.status = 404;
		}
	},
	delete: async ctx => {
		const ownerId = await getIdByToken(ctx.headers);
		const deviceId = ctx.params.id;
		const { parking } = await Device.findById(deviceId);
		const { devices, owner } = await Parking.findById(parking);
		if (ownerId === owner) {
			const newDevices = devices.filter(device => device !== deviceId);
			await Parking.findByIdAndUpdate(parking, { devices: newDevices });
			await Device.findByIdAndDelete(deviceId)
			ctx.body = await getDevicesObj(newDevices);
		} else {
			ctx.status = 404;
		}
	},
	readDevices: async ctx => {
		const ownerId = await getIdByToken(ctx.headers);
		const parkingId = ctx.params.id;
		const { devices, owner } = await Parking.findById(parkingId);

		if (ownerId === owner) {
			ctx.body = await getDevicesObj(devices);
		} else {
			ctx.status = 404;
		}
	},
};

export default deviceController;
