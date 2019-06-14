import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';


const ModalChoice = ({func, title, open, setOpen}) => {

  return (
      <Dialog
        open={open}
        keepMounted
        onClose={() => setOpen(false)}
      >
        <DialogTitle >{title}</DialogTitle>
        <DialogActions>
          <Button onClick={func} color="primary">
            Да
          </Button>
          <Button onClick={() => setOpen(false)} color="primary">
            Нет
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default ModalChoice;