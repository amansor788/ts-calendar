import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CustomTableCell from '../CustomTableCell';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bookingActions from '../../actions/BookingActions';

import TableItemMenu from '../../components/TableItemMenu';
import ModalForm from '../ModalForm';
import BookingForm from './BookingForm';

const styles = {
  addButton: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
  },
};

class BookingsList extends React.Component {
  state = {
      newOpen: false,
  }

  componentDidMount() {
    this.props.bookingActions.fetch();
  }

  onNew = e => {
    e.stopPropagation();
    this.setState({ newOpen: true });
  }

  onNewCancel = e => {
    e.stopPropagation();
    this.setState({ newOpen: false });
  }

  handleNewConfirm = formValues => {
    this.props.bookingActions.addBooking(formValues);
    this.setState({ newOpen: false });  
  }

  handleEditConfirm = (bookingId, formValues) => {
    this.props.bookingActions.updateBooking(bookingId, formValues);
  }

  handleDeleteConfirm = bookingId => {
    this.props.bookingActions.removeBooking(bookingId);
    this.setState({ deleteOpen: false });
  }

  render() {
    const {newOpen} = this.state;

    const newFormDialog = newOpen ? 
    <ModalForm
        open={newOpen}
        form={<BookingForm onSubmit={this.handleNewConfirm}/>}
        title="Nueva Reserva"
        OnCancel={this.onNewCancel}
      />
    : null;

    return (
      <div>
      <Table>
        <TableHead>
          <TableRow>            
            <CustomTableCell>Clientes</CustomTableCell>
            <CustomTableCell>Desde</CustomTableCell>
            <CustomTableCell>Hasta</CustomTableCell>
            <CustomTableCell># Dias</CustomTableCell>
            <CustomTableCell>Total</CustomTableCell>
            <CustomTableCell>Reserva</CustomTableCell>
            <CustomTableCell>Saldo</CustomTableCell>
            <CustomTableCell>Confirmado</CustomTableCell>
            <CustomTableCell># Personas</CustomTableCell>
            <CustomTableCell>Cuna</CustomTableCell>
            <CustomTableCell>Perro</CustomTableCell>
            <CustomTableCell>Cabana</CustomTableCell>
            <CustomTableCell>Fecha Alta</CustomTableCell>
            <CustomTableCell>Acciones</CustomTableCell>                       
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.bookings.map(booking => (
            <TableRow key={booking.id} style={styles.row}>
              <CustomTableCell component="th" scope="row">{booking.client}</CustomTableCell>
              <CustomTableCell>{booking.since.toString()}</CustomTableCell>
              <CustomTableCell>{booking.until.toString()}</CustomTableCell>
              <CustomTableCell>
              {(Date.parse(booking.until) - Date.parse(booking.since)) / 86400000}
              </CustomTableCell>
              <CustomTableCell>$ {booking.total}</CustomTableCell>
              <CustomTableCell>$ {booking.deposit}</CustomTableCell>
              <CustomTableCell>$ {booking.total - booking.deposit}</CustomTableCell>
              <CustomTableCell>{booking.deposited ? 'X' : ''}</CustomTableCell>
              <CustomTableCell>{booking.pax}</CustomTableCell>
              <CustomTableCell>{booking.needs_cradle === 1 ? 'X' : ''}</CustomTableCell>
              <CustomTableCell>{booking.has_dog ? 'X' : ''}</CustomTableCell>
              <CustomTableCell>Cabana {booking.cabin}</CustomTableCell>
              <CustomTableCell>{booking.created_at.toString()}</CustomTableCell>
              <CustomTableCell> 
                <TableItemMenu
                  model={booking}
                  actions={this.props.bookingActions}
                  onDeleteConfirm={this.handleDeleteConfirm}
                  onEditConfirm={this.handleEditConfirm} />
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Fab color="primary" size="small" aria-label="Add" 
        style={styles.addButton} onClick={this.onNew}>
        <AddIcon />
        {newFormDialog}  
      </Fab>
  </div>
    );
  }
}

BookingsList.propTypes = {
  bookingActions: PropTypes.object,
};

export default connect(
  store => ({
    bookings: Object.values(store.bookings),
  }),
  dispatch => ({
    bookingActions: bindActionCreators(bookingActions, dispatch),
  })
)(BookingsList);

