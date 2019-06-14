import React, { useState, useEffect } from 'react';
import ParikingCard from './ParikingCard';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { parkingService } from '../../services';

const ParkingList = () => {
	const [parkings, setParkings] = useState([]);
	const [count, setCount] = useState(10);

	useEffect(() => {
		getParkings();
	}, []);

	const getParkings = async () => {
		const parkings = await parkingService.getParkings();
		setParkings(parkings);
	};

	const addParkings = () => {
		setCount(prevCount => prevCount + 10);
	};

	return (
		<Container maxWidth="md">
			{parkings.slice(0, count).map(parking => (
				<ParikingCard key={parking._id} parking={parking} />
			))}
			{count < parkings.length && (
				<Button variant="contained" onClick={() => addParkings()} fullWidth>
					Добавить
				</Button>
			)}
		</Container>
	);
};

export default ParkingList;
