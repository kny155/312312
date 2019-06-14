import React, { useState, useEffect, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom';

import { parkingService } from '../../services';
import ParikingCard from '../ParkingList/ParikingCard';

const useStyles = makeStyles({
	card: {
		marginBottom: '15px',
	},
	header: {
		padding: '8px 16px 0px 16px',
	},
	contant: {
		paddingTop: '0px',
	},
});

const UserInfo = () => {
	const [parkings, setParkings] = useState([]);
	const [count, setCount] = useState(5);

	useEffect(() => {
		getParking();
	}, []);

	const classes = useStyles();

	const getParking = async () => {
		const parkings = await parkingService.getUserParkings();
		setParkings(parkings);
	};

	const addParkings = () => {
		setCount(prevCount => prevCount + 5);
	};

	return (
		<Fragment>
			<Card className={classes.card}>
				<CardHeader
					action={
						<IconButton
							aria-label="Add"
							style={{ marginTop: '8px' }}
							component={Link}
							to="/parkings/add"
						>
							<Icon>add</Icon>
						</IconButton>
					}
					title="Мои парковки: "
					className={classes.header}
				/>
				<CardContent className={classes.contant}>
					{parkings.slice(0, count).map(parking => (
						<ParikingCard key={parking._id} parking={parking} />
					))}
					{count < parkings.length && (
						<Button variant="contained" onClick={() => addParkings()} fullWidth>
							Добавить
						</Button>
					)}
				</CardContent>
			</Card>
		</Fragment>
	);
};

export default UserInfo;
