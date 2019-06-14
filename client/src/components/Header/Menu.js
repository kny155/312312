import React from 'react';
import { Link } from 'react-router-dom';

import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Icon from '@material-ui/core/Icon';
import Popper from '@material-ui/core/Popper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';

const UserMenu = ({ links, anchorRef, open, setOpenedMenu }) => {
	return (
		<Popper
			open={open}
			anchorEl={anchorRef.current}
			transition
			placement="bottom-start"
			style={{ zIndex: "1000" }}
		>
			<Collapse in={open}>
				<Paper style={{ marginRight: '-5px'}}>
					<ClickAwayListener onClickAway={() => setOpenedMenu(false)}>
						<MenuList>
							{links.map(link => (
								<MenuItem component={Link} key={link.text} to={link.path} onClick={() => setOpenedMenu(false)}>
									<Icon style={{ marginRight: '10px' }}>{link.icon}</Icon>
									<p>{link.text}</p>
								</MenuItem>
							))}
						</MenuList>
					</ClickAwayListener>
				</Paper>
			</Collapse>
		</Popper>
	);
};

export default UserMenu;
