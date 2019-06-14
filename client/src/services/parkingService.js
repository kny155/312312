import axios from 'axios';

const addParking = async (parking) => {
    const { data } = await axios.post(`/parkings`, parking);
    return data;
}

const getParking = async (id) => {
    const { data } = await axios.get(`/parkings/${id}`);
    return data;
}

const getUserParkings = async () => {
    const { data } = await axios.get(`/parkings-owner`);
    return data;
}

const getParkings = async () => {
    const { data } = await axios.get('/parkings');
    return data;
};

const getParkingSeats = async (id) => {
    const { data } = await axios.get(`/parkings/${id}/seats`);
    return data;
}

const updateParking = async (id, parking) => {
    const { data } = await axios.put(`/parkings/${id}`, parking);
    return data;
}

const deleteParking = async (id) => {
    const { data } = await axios.delete(`/parkings/${id}`);
    return data;
}




export const parkingService = {
    addParking,
    getParking,
    getParkings,
    getUserParkings,
    getParkingSeats,
    updateParking,
    deleteParking
};




