import React from 'react';

import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		position: 'fixed',
		height: '100%',
		width: '100%',
		top: 0,
		left: 0,
		overflowY: 'auto',
		fontWeight: 900,
		margin: 0,
		textAlign: 'center',
		textTransform: 'uppercase',
		userSelect: 'none',
	},
	h1: {
		fontSize: '150px',
		fontWeight: 900,
	},
});

const Error = () => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<Typography component="h4" variant="h6">
				Oops! Page not found
			</Typography>
			<Typography component="h1" className={classes.h1}>
				404
			</Typography>
			<Typography component="h3" variant="h6">
				we are sorry, but the page you requested was not found
			</Typography>
			<Typography component={Link} variant="h5" to="/">
				Come Back
			</Typography>
		</div>
	);
};

export default Error;
