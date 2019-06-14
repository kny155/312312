import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';

import ListItems from './ListItems';
import { MAIN_LINKS, USER_LINKS, GUEST_LINKS } from '../../constants/links';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
});

const TemporaryDrawer = ({ authenticated, openedDrawer, setOpenedDrawer }) => {
	const classes = useStyles();

	return (
		<Drawer open={openedDrawer} onClose={() => setOpenedDrawer(false)}>
			<nav
				className={classes.list}
				role="presentation"
				onClick={() => setOpenedDrawer(false)}
				onKeyDown={() => setOpenedDrawer(false)}
			>
				<ListItems links={MAIN_LINKS} />
				<Divider />
				<ListItems links={authenticated ? USER_LINKS : GUEST_LINKS} />
			</nav>
		</Drawer>
	);
};

export default TemporaryDrawer;
