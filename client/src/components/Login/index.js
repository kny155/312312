import React, { useState } from 'react';
import { Link as LinkRoute } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Icon from '@material-ui/core/Icon';

import { REGEXP, MESSAGE } from '../../config.json';

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
		width: '100%', // Fix IE 11 issue.
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

const Login = ({ onLogin }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [remember, setRemember] = useState(true);
	const [loading, setLoading] = useState(false);
	const [validEmail, setValidEmail] = useState(true);
	const [validPassword, setValidPasswrod] = useState(true);
	const [validServer, setValidServer] = useState(true);

	const classes = useStyles();

	const onValid = () => {
		const validEmail = new RegExp(REGEXP.email).test(email);
		const validPassword = new RegExp(REGEXP.password).test(password);
		setValidEmail(validEmail);
		setValidPasswrod(validPassword);
		return validEmail && validPassword;
	};

	const onSubmit = async e => {
		e.preventDefault();
		if (onValid()) {
			setLoading(true);
			try {
				await onLogin(email, password, remember);
			} catch (e) {
				setValidServer(false);
				setLoading(false);
			}
		}
	};

	return (
		<main className={classes.container}>
			<Container maxWidth="xs" className={classes.paper}>
				<Typography component="h1" variant="h4">
					Вход
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
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Запомнить меня"
						checked={remember}
						onChange={e => setRemember(e.target.checked)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						disabled={loading}
					>
						Войти
					</Button>
					<Grid container>
						<Grid item xs>
							<Link component={LinkRoute} to="/" variant="body2">
								Главная
							</Link>
						</Grid>
						<Grid item>
							<Link component={LinkRoute} to="/registration" variant="body2">
								Нет аккаунта? Регистрация!
							</Link>
						</Grid>
					</Grid>
				</form>
			</Container>
		</main>
	);
};

export default Login;
