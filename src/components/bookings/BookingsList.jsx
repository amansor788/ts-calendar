import React from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as bookingActions from '../../actions/BookingActions';
import TableItemMenu from '../../components/TableItemMenu';
// import BookingCalendar from '../../components/Calendar/BookingCalendar';

const styles = {
  list: {
    width: '100%',
    
  },
  addButton: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
  },
};

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,    
    fontSize: '1.20rem',
    align: 'center',
  },
  body: {
    fontSize: '1.00rem',
    align: 'center',
  },
}))(TableCell);

class BookingsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newOpen: false,
      editOpen: false,
      deleteOpen: false,
    };

    this.handleNew = this.handleNew.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDeleteCancel = this.handleDeleteCancel.bind(this);
  }

  componentDidMount() {
    this.props.bookingActions.fetch();
  }

  handleNew(e) {
    this.setState({ newOpen: true });
  }

  handleEdit(e) {
    e.stopPropagation();
    this.setState({ editOpen: true });
  }

  handleEditConfirm = (bookingId, formValues) => {
    this.props.bookingActions.updateBooking(bookingId, formValues);
  }

  handleDelete(e) {
    e.stopPropagation();
    this.setState({ deleteOpen: true });
  }

  handleDeleteConfirm(bookingId) {
    this.props.bookingActions.removeBooking(bookingId);
    this.setState({ deleteOpen: false });
  }

  handleDeleteCancel(confirmed) {
    this.setState({ deleteOpen: false });
  }

  render() {
    return (
      <div style={styles.list}>

      <Table style={{ width: "auto", tableLayout: "auto" }}>
        <TableHead>
          <TableRow>            
            <CustomTableCell>Cliente</CustomTableCell>
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
            <TableRow key={booking.id}>
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
                  onDeleteConfirm={this.handleDeleteConfirm.bind(this, booking.id)}
                  onEditConfirm={this.handleEditConfirm} />
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  

     
  </div>
    );
  }
}

BookingsList.propTypes = {
  bookingActions: PropTypes.object,
};

export default connect(
  store => ({
    bookings: store.bookings,
  }),
  dispatch => ({
    bookingActions: bindActionCreators(bookingActions, dispatch),
  })
)(BookingsList);

