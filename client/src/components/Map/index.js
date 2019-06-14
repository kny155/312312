import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { makeStyles } from '@material-ui/core/styles';

import ClasterGroup from './ClasterGroup'

const useStyles = makeStyles({
	mapSize: {
		width: '100%',
	},
});

const Map = () => {
	const classes = useStyles();
	return (
		<LeafletMap
			center={[52.0935, 23.6852]}
			zoom={14}
			maxZoom={19}
			minZoom={10}
			className={classes.mapSize}
		>
			<TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
			<ClasterGroup/>
		</LeafletMap>
	);
};

export default Map;
