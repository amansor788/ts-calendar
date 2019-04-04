import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';

import ModalForm from './ModalForm';
import BookingForm from './bookings/BookingForm';
import BookingCalendar from './Calendar/BookingCalendar';

class TableItemMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editOpen: false,
      deleteOpen: false,
      detailOpen: false,
    };
  }

  onEdit = e => {
    e.stopPropagation();
    this.setState({ editOpen: true });
  }

  onEditCancel = e => {
    e.stopPropagation();
    this.setState({ editOpen: false });
  }

  onDelete = e => {
    e.stopPropagation();
    this.setState({ deleteOpen: true });
  }
 onDeleteCancel = e => {
    e.stopPropagation();
    this.setState({ deleteOpen: false });
  }

  onDeleteConfirm = e => {
    this.props.onDeleteConfirm();
    this.setState({ deleteOpen: false });
  }

  onDetail = (e) => {
    e.stopPropagation();
    this.setState({ detailOpen: true });
  }

  onDetailClose = (e) => {
    e.stopPropagation();
    this.setState({ detailOpen: false });
  }

  render() {
    const { model } = this.props;
    const { editOpen, deleteOpen, detailOpen } = this.state;

    const editFormDialog = editOpen ? 
      <ModalForm
        open={editOpen}
        form={BookingForm}
        title="Editar Reserva"
        actions={this.props.actions}
        afterSubmit={() => this.setState({ editOpen: false })}
        OnCancel={this.onEditCancel}
        model={model}
      />
    : null;

    const deleteForm = deleteOpen ? (
      <Dialog open={deleteOpen} aria-labelledby="simple-dialog-title2">
        <DialogTitle id="simple-dialog-title2">Eliminar Reserva</DialogTitle>  
        <DialogContent>
            <DialogContentText id="alert-dialog-description2">
              ¿Estás seguro que querés borrar la reserva?
            </DialogContentText>
        </DialogContent> 
        <DialogActions>
            <Button onClick={this.onDeleteCancel} color="primary" autoFocus>
              NO
            </Button>
            <Button onClick={this.onDeleteConfirm} color="secondary">
              SI
            </Button>
          </DialogActions>
      </Dialog>
    ) : null;

    return (
      <div>
        <IconButton onClick={this.onEdit}>
          <EditIcon />
          {editFormDialog}
        </IconButton>
        <IconButton onClick={this.onDelete}>
          <DeleteIcon />
          {deleteForm}
        </IconButton>
        <IconButton onClick={this.onDetail}>
          <InfoIcon />
          <Dialog open={detailOpen} onClose={this.onDetailClose} aria-labelledby="simple-dialog-title">
            <DialogTitle id="simple-dialog-title">Info Reserva</DialogTitle>   
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-description"> */}
                {Object.keys(model).map((attr) => {
                  return <div key={attr}>{attr}: {model[attr].toString()}</div>;
                })}
                <BookingCalendar bookings={[model]}/>
              {/* </DialogContentText> */}
            </DialogContent> 
          </Dialog>
        </IconButton>
      </div>
    );
  }
}

export default TableItemMenu;

