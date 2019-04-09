import axios from 'axios';
import * as types from './BookingActionsTypes';

export function fetch() {
  return (dispatch) => {
    dispatch({ type: types.FETCH_BOOKINGS_START });
    axios.get('http://localhost:3000/bookings')
      .then((response) => {
        dispatch({
          type: types.FETCH_BOOKINGS_SUCCESS,
          bookings: response.data,
        });
      });
  };
}

export function addBooking(booking) {
  return (dispatch) => {
    dispatch({ type: types.ADD_BOOKING_START });
    axios.post('http://localhost:3000/bookings')
      .then((response) => {
        dispatch({
          type: types.ADD_BOOKING_SUCCESS,
          booking: response.data,
        });
      });
  };
}

export const removeBooking = (bookingId) => async dispatch => {
  //TODO en BackEnd!!!!
  // axios.delete(`http://localhost:3000/bookings/${bookingId}`);
  dispatch({
          type: types.REMOVE_BOOKING,
          payload: bookingId ,
  });
}

export function updateBooking(bookingId, booking) {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_BOOKING_START });
    axios.put(`http://localhost:3000/bookings/${bookingId}`, { booking })
      .then((response) => {
        dispatch({
          type: types.UPDATE_BOOKING_SUCCESS,
          booking: response.data,
        });
      });
  };
}
