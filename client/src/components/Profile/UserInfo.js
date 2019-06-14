import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles({
	card: {
		marginBottom: '15px',
	},
	text: {
		fontSize: '1.1rem',
		fontWeight: 300,
		marginLeft: '8px',
	},
	bigText: {
		fontSize: '1.3rem',
		fontWeight: 400,
	},
});

const UserInfo = ({ buttonFunc, user }) => {
	const classes = useStyles();

	return (
		<Card className={classes.card}>
			{user ? (
				<Fragment>
					<CardHeader
						action={
							<IconButton aria-label="Edit" onClick={() => buttonFunc(true)}>
								<Icon>edit</Icon>
							</IconButton>
						}
						title={
							user && user.firstName
								? `${user.lastName} ${user.firstName} ${user.secondName}`
								: 'Профиль'
						}
						style={{ paddingBottom: 0 }}
					/>
					<CardContent style={{ paddingTop: 0 }}>
						<div className={classes.text}>
							email:
							<span className={classes.bigText}>{` ${user.email}`}</span>
						</div>
						{user.phone && (
							<div className={classes.text}>
								телефон:
								<span className={classes.bigText}>{` +${user.phone}`}</span>
							</div>
						)}
					</CardContent>
				</Fragment>
			) : (
				<LinearProgress />
			)}
		</Card>
	);
};

export default UserInfo;
