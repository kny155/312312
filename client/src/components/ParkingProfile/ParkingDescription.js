import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
	contentTitle: {
		fontSize: '1.3rem',
	},
	contentDescription: {
		fontSize: '1rem',
	},
});

const ParkingTitle = ({ parking = {} }) => {
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<Card>
				{parking ? (
					<CardContent>
						<Typography
							variant="h5"
							component="h2"
							className={classes.contentTitle}
						>
							Описание:
						</Typography>
						<Typography
							variant="body2"
							color="textSecondary"
							component="p"
							className={classes.contentDescription}
						>
							{parking && parking.description}
						</Typography>
					</CardContent>
				) : (
					<LinearProgress />
				)}
			</Card>
		</Grid>
	);
};

export default ParkingTitle;
