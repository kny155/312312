import React, { useState } from 'react';
import { Link as LinkRoute, Redirect } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Icon from '@material-ui/core/Icon';

import { REGEXP, MESSAGE } from '../../config.json';
import { authenticatedService } from '../../services';

const useStyles = makeStyles(theme => ({
	'@global': {
		body: {
			backgroundColor: theme.palette.common.white,
		},
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'fixed',
		height: '100%',
		width: '100%',
		top: 0,
		left: 0,
		margin: 0,
	},
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(1, 0, 2),
	},
	error: {
		backgroundColor: theme.palette.error.dark,
		width: '100%',
		boxShadow: 'none',
		marginTop: theme.spacing(1),
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
	icon: {
		fontSize: 20,
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
}));

const Registration = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPasswrod] = useState(true);
	const [validServer, setValidServer] = useState(true);
	const [redirect, setRedirect] = useState(false);

	const classes = useStyles();

	const onValid = () => {
		const validEmail = new RegExp(REGEXP.email).test(email);
		const validPassword = new RegExp(REGEXP.password).test(password);
		const passwordsEqual = password === rePassword;
		setValidEmail(validEmail);
		setValidPasswrod(validPassword && passwordsEqual);
		return validEmail && validPassword && passwordsEqual;
	};

	const onSubmit = async e => {
		e.preventDefault();
		if (onValid()) {
			setLoading(true);
			try {
				await authenticatedService.registration(email, password);
				setRedirect(true);
			} catch (e) {
				setValidServer(false);
				setLoading(false);
			}
		}
	};

	if (redirect) {
		return <Redirect to="/login" />;
	}

	return (
		<main className={classes.container}>
			<Container maxWidth="xs" className={classes.paper}>
				<Typography component="h1" variant="h4">
					Регистрация
				</Typography>
				{!validServer && (
					<SnackbarContent
						className={classes.error}
						aria-describedby="client-snackbar"
						message={
							<span id="client-snackbar" className={classes.message}>
								<Icon className={classes.icon}>error_icon</Icon>
								{MESSAGE.ERROR.NOT_USER}
							</span>
						}
					/>
				)}
				<form className={classes.form} onSubmit={onSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						label="Email адрес"
						autoComplete="email"
						autoFocus
						value={email}
						error={!validEmail}
						helperText={!validEmail && MESSAGE.ERROR.EMAIL}
						onChange={e => setEmail(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						label="Пароль"
						type="password"
						autoComplete="current-password"
						value={password}
						error={!validPassword}
						helperText={!validPassword && MESSAGE.ERROR.PASSWORD}
						onChange={e => setPassword(e.target.value)}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						fullWidth
						label="Повтовторить пароль"
						type="password"
						autoComplete="current-password"
						value={rePassword}
						error={!validPassword}
						helperText={!validPassword && MESSAGE.ERROR.PASSWORD}
						onChange={e => setRePassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={loading}
					>
						Зарегистрироваться
					</Button>
					<Grid container>
						<Grid item xs>
							<Link component={LinkRoute} to="/" variant="body2">
								Главная
							</Link>
						</Grid>
						<Grid item>
							<Link component={LinkRoute} to="/login" variant="body2">
								Есть аккаунт? Войти!
							</Link>
						</Grid>
					</Grid>
				</form>
			</Container>
		</main>
	);
};

export default Registration;
