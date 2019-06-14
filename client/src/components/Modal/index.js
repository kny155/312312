import React, {forwardRef} from 'react';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme =>  ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
}));

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const Modal = ({ open, setOpen, children, title }) => {
  const classes = useStyles();
	return (
		<Dialog fullScreen  onClose={() => setOpen(false)} open={open} TransitionComponent={Transition}>
			<MuiDialogTitle disableTypography className={classes.root}>
				<Typography variant="h6">{title}</Typography>
					<IconButton
						aria-label="Close"
						className={classes.closeButton}
						onClick={() => setOpen(false)}
					>
						<Icon>close</Icon>
					</IconButton>
			</MuiDialogTitle>
			<MuiDialogContent dividers>{children}</MuiDialogContent>
		</Dialog>
	);
};

export default Modal;
