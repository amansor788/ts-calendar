import React from 'react';
//import Dialog from 'material-ui/Dialog';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

class ModalForm extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const form = React.createElement(this.props.form, { ...this.props });
    return (
      <Dialog
        aria-labelledby="form-dialog-title"
        open={this.props.open}>
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        {form}
        <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Aceptar
            </Button>
            <Button onClick={e => this.props.OnCancel(e)} color="secondary">
              Cancelar
            </Button>
          </DialogActions>
      </Dialog>
    );
  }
}

export default ModalForm;
