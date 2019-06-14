import React, { useState, Fragment } from 'react';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { userService } from '../../services';

const useStyles = makeStyles(theme => ({
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

const UserEdit = ({user, setOpen, updateUser}) => {
	const [firstName, setFirstName] = useState(user.firstName || '');
	const [lastName, setLastName] = useState(user.lastName || '');
	const [secondName, setSecondName] = useState(user.secondName || '');
	const [phone, setPhone] = useState(user.phone || '');

	const classes = useStyles();
	const onSubmit = async () => {
		const user = {
			firstName,
			lastName,
			secondName,
			phone,
        };
        await userService.updateUser(user);
        updateUser();
        setOpen(false);
	};

	const fieldList = [
		{ label: 'Фамилия', value: lastName, setValue: setLastName, type: 'string' },
		{ label: 'Имя', value: firstName, setValue: setFirstName, type: 'string' },
		{ label: 'Отчество', value: secondName, setValue: setSecondName, type: 'string' },
		{ label: 'Номер', value: phone, setValue: setPhone, type: 'string' },
	];

	return (
		<Fragment>
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
            </Fragment>
	);
};

export default UserEdit;
