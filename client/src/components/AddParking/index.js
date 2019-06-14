import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Icon from '@material-ui/core/Icon';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { Redirect } from 'react-router-dom';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import { makeStyles } from '@material-ui/core/styles';
import { parkingService } from '../../services';

const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
		margin: '16px 0',
	},
	textField: {
		margin: theme.spacing(1) / 2,
	},
	button: {
		margin: theme.spacing(1),
	},
	leftIcon: {
		marginRight: theme.spacing(1),
	},
}));

const AddParking = () => {
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');
	const [location, setLocation] = useState([52.0935, 23.6852]);
	const [zoom, setZoom] = useState(17);
	const [seats, setSeats] = useState(0);
	const [price, setPrice] = useState(0);
	const [type, setType] = useState('Открытая');
	const [description, setDescription] = useState('');

	const classes = useStyles();

	const onSubmit = async () => {
		const parking = {
			name,
			city,
			address,
			location,
			seats: +seats,
			price: +price,
			type,
			description,
		};
		const { _id } = await parkingService.addParking(parking);
		setId(_id);
	};

	const fieldList = [
		{ label: 'Название', value: name, setValue: setName, type: 'string' },
		{ label: 'Город', value: city, setValue: setCity, type: 'string' },
		{ label: 'Адрес', value: address, setValue: setAddress, type: 'string' },
		{ label: 'Всего мест', value: seats, setValue: setSeats, type: 'number' },
		{ label: 'Цена', value: price, setValue: setPrice, type: 'number' },
	];

	if (id) {
		return <Redirect from="/" to={`/parkings/${id}`} />;
	}

	return (
		<Container maxWidth="sm" className={classes.container}>
			<Typography variant="h4" gutterBottom>
				Добавить парковку
			</Typography>
			{fieldList.map(field => (
				<TextField
					className={classes.textField}
					margin="normal"
					variant="outlined"
					fullWidth
					label={field.label}
					value={field.value}
					onChange={e => field.setValue(e.target.value)}
					key={field.label}
					type={field.type}
				/>
			))}
			<FormControl variant="outlined" className={classes.textField} fullWidth>
				<InputLabel>Тип</InputLabel>
				<Select
					native
					value={type}
					onChange={e => setType(e.target.value)}
					input={<OutlinedInput labelWidth={30} />}
				>
					<option value="Открытая">Открытая</option>
					<option value="Закрытая">Закрытая</option>
					<option value="Смешанная">Смешанная</option>
				</Select>
			</FormControl>
			<TextField
				label="Описание"
				multiline
				rows="4"
				className={classes.textField}
				margin="normal"
				variant="outlined"
				value={description}
				onChange={e => setDescription(e.target.value)}
				fullWidth
			/>
			<Card
				style={{ height: '200px', width: '100%' }}
				className={classes.textField}
			>
				<LeafletMap
					center={location}
					zoom={zoom}
					maxZoom={19}
					minZoom={14}
					style={{ height: '100%', width: '100%' }}
					onViewportChange={e => {
						if (zoom !== e.zoom) setZoom(e.zoom);
						setLocation(e.center);
					}}
				>
					<TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
					<Marker position={location} />
				</LeafletMap>
			</Card>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				size="large"
				fullWidth
				onClick={onSubmit}
			>
				<Icon className={classes.leftIcon}>save</Icon>
				Сохранить
			</Button>
		</Container>
	);
};

export default AddParking;
