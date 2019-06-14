import React, { useState, useEffect, Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import { deviceService } from '../../services';
import DevicesCard from '../DevicesCard';

const useStyles = makeStyles({
	header: {
		padding: '8px 16px 0px 16px',
	},
	contant: {
		paddingTop: '0px',
		paddingBottom: '0px !important',
	},
});

const ParkingDevices = ({ id }) => {
	const [devices, setDevices] = useState([]);
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		getDevices();
	}, [update]);

	const classes = useStyles();

	const getDevices = async () => {
		const devices = await deviceService.getDevices(id);
		setDevices(devices);
	};

	const addDevice = async () => {
		await deviceService.addDevice(id);
		updateDevices();
	};

	const deleteDevice = async id => {
		await deviceService.deleteDevice(id);
		updateDevices();
	};

	const updateDevices = async () => {
		setUpdate(prevUpdate => !prevUpdate);
	};

	return (
		<Grid item xs={12}>
			<Card>
				<CardHeader
					action={
						<IconButton
							aria-label="Add"
							style={{ marginTop: '8px' }}
							onClick={addDevice}
						>
							<Icon>add</Icon>
						</IconButton>
					}
					title="Устройства: "
					className={classes.header}
				/>
				<CardContent className={classes.contant}>
					{devices.map(device => (
						<DevicesCard
							key={device._id}
							device={device}
							deleteDevice={() => deleteDevice(device._id)}
							parkingId={id}
							updateDevices={updateDevices}
						/>
					))}
				</CardContent>
			</Card>
		</Grid>
	);
};

export default ParkingDevices;
