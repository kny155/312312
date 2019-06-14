import { Device } from '../model';

export const getDeviceObj = async deviceId => {
	const device = await Device.findById(deviceId);
	return device;
};

export const getDevicesObj = async devices => {
	return await Promise.all(
		devices.map(async device => await getDeviceObj(device)),
	);
};
