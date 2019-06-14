import axios from 'axios';

const getUser = async () => {
    const { data } = await axios.get('/users');
    return data;
}

const updateUser = async (user) => {
    const { data } = await axios.put('/users', user);
    return data;
}

export const userService = {
    getUser,
    updateUser
};




