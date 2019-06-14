import React, { useState, Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const SERVICE_UUID = '3a38eab7-d5a1-44e3-9a7f-ccaf11faf364';
const CHARACTER_UUID = '7c4c7b38-20b3-4c28-81a3-e367165bb041';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	button: {
		margin: theme.spacing(1),
	},
	leftIcon: {
		marginRight: theme.spacing(1),
	},
}));

const Setting = () => {
	const [char, setChar] = useState(null);
	const [SSID, setSSID] = useState('');
	const [password, setPassword] = useState('');
	const [IP, setIP] = useState('');
	const [port, setPort] = useState('');
	const [delay, setDelay] = useState('');
	const [deviceId, setDeviceId] = useState('');

	const classes = useStyles();

	const scan = async () => {
		const bluetooth = navigator.bluetooth;

		if (!bluetooth) {
			console.log('WebBluetooth is not supported by your browser!');
			return;
		}

		try {
			const device = await bluetooth.requestDevice({
				filters: [{ services: [SERVICE_UUID] }],
			});

			device.addEventListener('gattserverdisconnected', () => {
				setChar(null);
			});

			//await device.gatt.disconnect();

			const server = await device.gatt.connect();
			return server;
		} catch {}
	};

	const connect = async () => {
		const server = await scan();

		if (!server) return;

		const service = await server.getPrimaryService(SERVICE_UUID);
		const character = await service.getCharacteristic(CHARACTER_UUID);
		setChar(character);
	};

	const save = async () => {
		const encoder = new TextEncoder('utf-8');
		const payload = `${SSID},${password},${IP},${port},${delay},${deviceId},`;
		const data = encoder.encode(payload);
    await char.writeValue(data);
    setChar(null);
	};

	const fieldList = [
		{ label: 'SSID', value: SSID, setValue: setSSID },
		{ label: 'Password', value: password, setValue: setPassword },
		{ label: 'IP', value: IP, setValue: setIP },
		{ label: 'Port', value: port, setValue: setPort },
		{ label: 'Delay', value: delay, setValue: setDelay },
		{ label: 'Device ID', value: deviceId, setValue: setDeviceId },
	];

	return (
		<Container maxWidth="xs" className={classes.container}>
			{char ? (
				<Fragment>
					{fieldList.map(field => (
						<TextField
							className={classes.textField}
							margin="normal"
							variant="outlined"
							fullWidth
							label={field.label}
							value={field.value}
							onChange={e => field.setValue(e.currentTarget.value)}
							key={field.label}
						/>
					))}
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						size="large"
						fullWidth
            onClick={save}
					>
						<Icon className={classes.leftIcon}>save</Icon>
						Сохранить
					</Button>
				</Fragment>
			) : (
				<Fab
					variant="extended"
					color="primary"
					aria-label="Search"
					className={classes.margin}
					onClick={connect}
				>
					<Icon className={classes.leftIcon}>bluetooth</Icon>
					Найти устройство
				</Fab>
			)}
		</Container>
	);
};

export default Setting;
