import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

import Menu from './Menu';
import { USER_LINKS } from '../../constants/links';

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'fixed',
	},
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	toolbarTitle: {
		flex: 1,
	},
}));

const Header = ({ setOpenedDrawer, authenticated }) => {
	const classes = useStyles();
	const [openedMenu, setOpenedMenu] = React.useState(false);
	const anchorRef = React.useRef(null);

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar>
				<IconButton
					edge="start"
					className={classes.menuButton}
					color="inherit"
					aria-label="Menu"
					onClick={() => setOpenedDrawer(true)}
				>
					<Icon>menu</Icon>
				</IconButton>
				<Typography variant="h6" className={classes.toolbarTitle}>
					Diploma
				</Typography>
				{authenticated ? (
					<Fragment>
						<IconButton
							ref={anchorRef}
							aria-owns={openedMenu ? 'menu-list-grow' : undefined}
							aria-haspopup="true"
							onClick={() => setOpenedMenu(prevOpenedMenu => !prevOpenedMenu)}
							color="inherit"
						>
							<Icon>account_circle</Icon>
						</IconButton>
						<Menu
							links={USER_LINKS}
							open={openedMenu}
							anchorRef={anchorRef}
							setOpenedMenu={setOpenedMenu}
						/>
					</Fragment>
				) : (
					<Button color="inherit" component={Link} to="/login">
						Войти
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
