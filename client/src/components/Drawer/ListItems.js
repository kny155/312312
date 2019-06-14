import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';

const ListItems = ({ links, location: { pathname } }) => {
	return (
		<List>
			{links.map(link => (
				<ListItem
					button
					key={link.text}
					component={Link}
					to={link.path}
					selected={pathname === link.path}
				>
					<ListItemIcon>
						<Icon>{link.icon}</Icon>
					</ListItemIcon>
					<ListItemText primary={link.text} />
				</ListItem>
			))}
		</List>
	);
};

export default withRouter(ListItems);
