import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';

const ParkingMap = ({ parking = {} }) => {

	return (
		<Grid item xs={12} md={6}>
			<Card style={{ height: '100%', minHeight: parking ? '200px' : 0 }}>
				{parking ? (
					<LeafletMap
						center={parking.location}
						zoom={17}
						maxZoom={19}
						minZoom={14}
						style={{ height: '100%' }}
					>
						<TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
						<Marker position={parking.location} />
					</LeafletMap>
				) : (
					<LinearProgress />
				)}
			</Card>
		</Grid>
	);
};

export default ParkingMap;
