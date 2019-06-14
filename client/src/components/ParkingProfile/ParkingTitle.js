import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
	headerTitle: {
		fontSize: '1.5rem',
	},
});

const ParkingTitle = ({ parking = {}, editParking, deleteParking , email }) => {
	const classes = useStyles();

	return (
		<Grid item xs={12}>
			<Card>
				{parking ? (
					<CardHeader
						action={
							<Fragment>
								{parking.owner.email === email && (
									<Fragment>
									<IconButton
											aria-label="Edit"
											onClick={() => editParking(true)}
										>
											<Icon>edit</Icon>
										</IconButton>
										<IconButton
											aria-label="Delete"
											onClick={() => deleteParking(true)}
										>
											<Icon>delete</Icon>
										</IconButton>
										
									</Fragment>
								)}
							</Fragment>
						}
						classes={{ title: classes.headerTitle }}
						title={parking.name}
						subheader={`${parking.city}, ${parking.address}`}
					/>
				) : (
					<LinearProgress />
				)}
			</Card>
		</Grid>
	);
};

export default ParkingTitle;
