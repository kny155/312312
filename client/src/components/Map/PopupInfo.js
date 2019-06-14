import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Popup } from 'react-leaflet';
import { parkingService } from '../../services';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	name: {
		fontSize: '1.2rem',
		fontWeight: '500',
		color: "#3f51b5 !important",
		textDecoration: "none"
	},
	address: {
		fontSize: '0.9rem',
	},
	text: {
		fontSize: '1.1rem',
		fontWeight: 300,
	},
	bigText: {
		fontSize: '1.3rem',
		fontWeight: 600,
	},
	a : {
		a: {
			color: "#3f51b5",
		}
	}
});

const PopupInfo = ({ parking }) => {
	const [seats, setSeats] = useState([]);

	useEffect(() => {
		getSeats();
	}, []);

	const getSeats = async () => {
		const seats = await parkingService.getParkingSeats(parking._id);
		setSeats(seats);
	};

	const classes = useStyles();
	return (
		<Popup closeButton={false}>
			<Typography
				variant="h5"
				component={Link}
				className={classes.name}
				to={`/parkings/${parking._id}`}
			>
				{parking.name}
			</Typography>
			<Typography
				component="div"
				color="textSecondary"
				className={classes.address}
			>
				{`${parking.city}, ${parking.address}`}
			</Typography>
			{seats.clearSeats === undefined ? (
				<div className={classes.text}>
					Всего:
					<span className={classes.bigText}>{` ${seats.allSeats} `}</span>
					мест.
				</div>
			) : (
				<div className={classes.text}>
					Свободно:
					<span className={classes.bigText}>
						{` ${seats.clearSeats} / ${seats.allSeats} `}
					</span>
					мест.
				</div>
			)}
			<div className={classes.text}>
				Цена:{' '}
				<span className={classes.bigText}>
					{parking.price ? `${parking.price} р.` : `бесплатно`}
				</span>
			</div>
		</Popup>
	);
};

export default PopupInfo;
