import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { parkingService } from '../../services';

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
	button: {
		marginLeft: 'auto',
	},
	content: {
		width: '100%',
		padding: '0 8px',
	},
	text: {
		fontSize: '1.1rem',
		fontWeight: 300,
		paddingLeft: '8px',
	},
	bigText: {
		fontSize: '1.3rem',
		fontWeight: 500,
	},
	avatar: {
		backgroundColor: '#3f51b5',
	},
});

function ParkingCard({ parking }) {
	const [seats, setSeats] = useState([]);

	useEffect(() => {
		getParkings();
	}, []);

	const getParkings = async () => {
		const seats = await parkingService.getParkingSeats(parking._id);
		setSeats(seats);
	};

	const classes = useStyles();

	return (
		<Card className={classes.card}>
			<CardHeader
				avatar={
					<Avatar aria-label="Recipe" className={classes.avatar}>
						{parking.name[0]}
					</Avatar>
				}
				title={parking.name}
				subheader={`${parking.city}, ${parking.address}`}
				classes={{ title: classes.title, subheader: classes.subheader }}
			/>
			<CardContent className={classes.content}>
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
			</CardContent>
			<CardActions disableSpacing>
				<div className={classes.text}>
					Цена:{' '}
					<span className={classes.bigText}>
						{parking.price ? `${parking.price} р.` : `бесплатно`}
					</span>
				</div>
				<Button
					className={classes.button}
					component={Link}
					to={`/parkings/${parking._id}`}
				>
					Подробнее
				</Button>
			</CardActions>
		</Card>
	);
}

export default ParkingCard;
