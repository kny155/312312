import React, { useState, useEffect } from 'react';
import { Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { parkingService } from '../../services';
import PopupInfo from './PopupInfo'

import 'react-leaflet-markercluster/dist/styles.min.css';

const ClasterGroup = () => {
	const [parkings, setParkigns] = useState([]);

	useEffect(() => {
		getParkings();
	}, []);

	const getParkings = async () => {
		const parkings = await parkingService.getParkings();
		setParkigns(parkings);
	};

	return (
		<MarkerClusterGroup
			spiderLegPolylineOptions={{
				weight: 0,
				opacity: 0,
			}}
		>
			{parkings.map(parking => (
				<Marker key={parking._id} position={parking.location}>
					<PopupInfo parking={parking} />
				</Marker>
			))}
		</MarkerClusterGroup>
	);
};

export default ClasterGroup;
