import React from 'react';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import AleForm from './bookings/AleForm';

class ModalForm extends React.Component {
  render() {
    //const form = React.createElement(this.props.form, { ...this.props });
    return (
      <Dialog
        aria-labelledby="form-dialog-title"
        open={this.props.open}>
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <AleForm model={this.props.model} initialValues={_.pick(this.props.model,
                         'client', 'since', 'until', 'total', 'deposit', 'pax'
                         , 'deposited', 'needs_cradle','has_dog', 'cabin')}/>
        </DialogContent>
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
