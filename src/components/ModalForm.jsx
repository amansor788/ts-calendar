import React from 'react';
import _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import BookingForm from './bookings/BookingForm';
import {submit} from 'redux-form';
import { connect } from 'react-redux';

class ModalForm extends React.Component {
  onClick = e => {
    e.preventDefault();
    this.props.dispatch(submit('bookingForm'));
  }

  onFormSubmit = formValues => {
    const {model} = this.props;

    if (model) {
      this.props.onEditConfirm(model.id, formValues);
    } else {
      console.log('crear');
      // this.props.actions.addBooking({ ...this.state });
    }
  }

  render() {
    //const form = React.createElement(this.props.form, { ...this.props });
    return (
      <Dialog
        aria-labelledby="form-dialog-title"
        open={this.props.open}>
        <DialogTitle id="form-dialog-title">
          {this.props.title}
        </DialogTitle>
        <DialogContent>
          <BookingForm 
            onSubmit={this.onFormSubmit}
            initialValues={_.pick(this.props.model,
              'client', 'since', 'until', 'total', 'deposit', 'pax'
              , 'deposited', 'needs_cradle','has_dog', 'cabin')}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => {this.onClick(e)}} color="primary">
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

export default connect()(ModalForm);
