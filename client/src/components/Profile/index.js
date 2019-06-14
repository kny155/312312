import React, { Fragment, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { userService } from '../../services';
import 'react-leaflet-markercluster/dist/styles.min.css';

import UserInfo from './UserInfo';
import UserParking from './UserParking';
import UserEdit from './UserEdit';
import Modal from '../Modal';

const Profile = () => {
	const [openedEdit, setOpenedEdit] = useState(false)
	const [user, setUser] = useState(null);
	const [update, setUpdate] = useState(true);

	useEffect(() => {
		getUser();
	}, [update]);

	const getUser = async () => {
		const user = await userService.getUser();
		setUser(user);
	};

	const updateUser = async () => {
		setUpdate(prevUpdate => !prevUpdate);
	}

	return (
		<Fragment>
		<Container maxWidth="md" style={{ paddingTop: '20px' }}>
			<UserInfo buttonFunc={setOpenedEdit} user={user}/>
			<UserParking />
		</Container>
		<Modal open={openedEdit} setOpen={setOpenedEdit} title="Изменить профиль">
			<UserEdit user={user} setOpen={setOpenedEdit} updateUser={updateUser}/>
		</Modal>
		</Fragment>
	);
};

export default Profile;
