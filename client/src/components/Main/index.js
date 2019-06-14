import React, { Fragment, useState } from 'react';

import HeaderContainer from '../../containers/HeaderContainer';
import Content from '../Content';
import DrawerContainer from '../../containers/DrawerContainer';

const Main = () => {
	const [openedDrawer, setOpenedDrawer] = useState(false);
	return (
		<Fragment>
			<HeaderContainer setOpenedDrawer={setOpenedDrawer} />
			<Content />
			<DrawerContainer
				openedDrawer={openedDrawer}
				setOpenedDrawer={setOpenedDrawer}
			/>
		</Fragment>
	);
};

export default Main;
