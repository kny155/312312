import axios from 'axios';

const getDevices = async parkingId => {
	const { data } = await axios.get(`/devices/${parkingId}`);
	return data;
};

const addDevice = async parkingId => {
	const { data } = await axios.post(`/devices`, { parkingId });
	return data;
};

const deleteDevice = async deviceId => {
	const { data } = await axios.delete(`/devices/${deviceId}`);
	return data;
};

const updateDevice = async (deviceId, parkingId, allSeats) => {
	const { data } = await axios.put(`/devices`, {
		deviceId,
		parkingId,
		allSeats,
	});
	return data;
};

export const deviceService = {
	addDevice,
	deleteDevice,
    getDevices,
    updateDevice
};
