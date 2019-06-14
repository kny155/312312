import React, { useState, useEffect, Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

import { parkingService } from '../../services';

import 'react-leaflet-markercluster/dist/styles.min.css';

import ParkingTitle from './ParkingTitle';
import ParkingInfo from './ParkingInfo';
import ParkingMap from './ParkingMap';
import ParkingDescription from './ParkingDescription';
import ParkingEdit from './ParkingEdit';
import ParkingDevices from './ParkingDevices';
import Modal from '../Modal';
import ModalChoice from '../Modal/ModalChoice';

const ParkingProfile = ({ match, user = {} }) => {
	const [parking, setParking] = useState(null);
	const [openedEdit, setOpenedEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [update, setUpdate] = useState(true);
	const [deleted, setDeleted] = useState(false);
	const id = match.params.id;

	useEffect(() => {
		getParking();
	}, [update]);

	const getParking = async () => {
		const parking = await parkingService.getParking(id);
		setParking(parking);
	};

	const updateParking = async () => {
		setUpdate(prevUpdate => !prevUpdate);
	};

	const deleteParking = async () => {
		parkingService.deleteParking(parking._id);
		setDeleted(true)
	};

	if (deleted) {
		return <Redirect from="/" to="/" />;
	}

	return (
		<Fragment>
			<Container
				maxWidth="md"
				style={{ paddingTop: '20px', paddingBottom: '20px' }}
			>
				<Grid container spacing={1}>
					<ParkingTitle
						parking={parking}
						editParking={setOpenedEdit}
						deleteParking={setOpenDelete}
						email={user.email}
					/>
					<ParkingInfo parking={parking} id={id} />
					<ParkingMap parking={parking} />
					{parking && parking.description && (
						<ParkingDescription parking={parking} />
					)}
					{parking && parking.owner.email === user.email && (
						<ParkingDevices id={parking._id} />
					)}

				</Grid>
			</Container>
			<Modal
				open={openedEdit}
				setOpen={setOpenedEdit}
				title="Изменить парковку"
			>
				<ParkingEdit
					parking={parking}
					setOpen={setOpenedEdit}
					updateParking={updateParking}
				/>
			</Modal>
			<ModalChoice
				title="Удалить парковку?"
				func={deleteParking}
				open={openDelete}
				setOpen={setOpenDelete}
			/>
		</Fragment>
	);
};

export default ParkingProfile;
