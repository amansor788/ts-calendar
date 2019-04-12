import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import {submit} from 'redux-form';
import { connect } from 'react-redux';

class ModalForm extends React.Component {
  onClick = e => {
    e.preventDefault();
    const formNametoSubmit = this.props.form.type.WrappedComponent.defaultProps.form;
    this.props.dispatch(submit(formNametoSubmit));
  }

  render() {
    return (
      <Dialog
        aria-labelledby="form-dialog-title"
        open={this.props.open}>
        <DialogTitle id="form-dialog-title">
          {this.props.title}
        </DialogTitle>
        <DialogContent>
          {this.props.form}
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