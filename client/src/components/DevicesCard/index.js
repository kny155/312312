import React, { useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ModalChoice from '../Modal/ModalChoice';
import Avatar from '@material-ui/core/Avatar';

import { deviceService } from '../../services';

const useStyles = makeStyles({
	card: {
		margin: '15px 0',
	},
	title: {
		fontSize: '1.1rem',
	},
	subheader: {
		fontSize: '0.9rem',
	},
	avatarOn: {
		backgroundColor: '#4caf50',
	},
	avatarOff: {
		backgroundColor: '#f44336',
	},
	input: {
		fontSize: '0.9rem',
		color: 'rgba(0, 0, 0, 0.54)',
		padding: 0,
		border: 0,
		background: 'rgba(0, 0, 0, 0.08)',
		width: '40px',
		outline: 'none',
	},
});

const DeviceCard = ({ device, deleteDevice, parkingId, updateDevices }) => {
	const [openDelete, setOpenDelete] = useState(false);
	const [allSeats, setAllSeats] = useState(device.allSeats);
	const [isEdit, setIsEdit] = useState(false);
	const classes = useStyles();
	const isOn = Date.now() - device.updateTime < 300000;

	const onEdit = async () => {
		await deviceService.updateDevice(device._id, parkingId, allSeats);
		updateDevices();
		setIsEdit(false);
	};

	return (
		<Card className={classes.card}>
			<CardHeader
				title={device._id}
				subheader={
					<Fragment>
						<span>
							Свободно: {device.clearSeats} /{' '}
							{isEdit ? (
								<input
									value={allSeats}
									onChange={e => setAllSeats(+e.currentTarget.value)}
									type="number"
									min={0}
									className={classes.input}
								/>
							) : (
								<span>{device.allSeats}</span>
							)}
						</span>
					</Fragment>
				}
				action={
					<Fragment>
						{isEdit ? (
							<IconButton aria-label="Done" onClick={onEdit}>
								<Icon>done</Icon>
							</IconButton>
						) : (
							<IconButton aria-label="Edit" onClick={() => setIsEdit(true)}>
								<Icon>edit</Icon>
							</IconButton>
						)}

						<IconButton aria-label="Delete" onClick={() => setOpenDelete(true)}>
							<Icon>delete</Icon>
						</IconButton>
					</Fragment>
				}
				avatar={
					<Avatar
						aria-label="Recipe"
						className={classes[isOn ? 'avatarOn' : 'avatarOff']}
					>
						{isOn ? 'ON' : 'OFF'}
					</Avatar>
				}
				classes={{ title: classes.title, subheader: classes.subheader }}
			/>

			<ModalChoice
				title="Удалить устройство?"
				func={deleteDevice}
				open={openDelete}
				setOpen={setOpenDelete}
			/>
		</Card>
	);
};

export default DeviceCard;
