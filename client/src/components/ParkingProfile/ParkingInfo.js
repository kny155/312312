import React, { useState, useEffect, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import { parkingService } from '../../services';

const useStyles = makeStyles({
	text: {
		fontSize: '1.1rem',
		fontWeight: 300,
		paddingLeft: '24px',
	},
	bigText: {
		fontSize: '1.3rem',
		fontWeight: 400,
	},
});

const ParkingInfo = ({ parking = {}, id }) => {
	const [seats, setSeats] = useState({});

	useEffect(() => {
		getSeats();
	}, []);

	const getSeats = async () => {
		const seats = await parkingService.getParkingSeats(id);
		setSeats(seats);
	};

	const classes = useStyles();

	return (
		<Grid item xs={12} md={6}>
			<Card style={{ height: '100%' }}>
				{parking ? (
					<CardContent>
						<Typography
							variant="h5"
							component="h2"
							className={classes.contentTitle}
						>
							Информация:
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
						<div className={classes.text}>
							Тип: <span className={classes.bigText}>{parking.type}</span>
						</div>
						{parking.owner.firstName && (
							<Fragment>
								<Typography
									variant="h5"
									component="h2"
									className={classes.contentTitle}
									style={{ marginTop: '10px' }}
								>
									Владелец:
								</Typography>

								<div className={classes.text}>
									<span className={classes.bigText}>
										{parking.owner &&
											`${parking.owner.lastName} ${parking.owner.firstName} ${
												parking.owner.secondName
											}`}
									</span>
								</div>
								{parking.owner.phone && (
									<div className={classes.text}>
										email:
										<span className={classes.bigText}>
											{` ${parking.owner && parking.owner.email}`}
										</span>
									</div>
								)}
								{parking.owner.phone && (
									<div className={classes.text}>
										телефон:
										<span className={classes.bigText}>
											{` +${parking.owner.phone}`}
										</span>
									</div>
								)}
							</Fragment>
						)}
					</CardContent>
				) : (
					<LinearProgress />
				)}
			</Card>
		</Grid>
	);
};

export default ParkingInfo;
