import _ from 'lodash';
import * as types from '../actions/BookingActionsTypes';

const initialState = [];

const bookings = function bookings(state = initialState, action) {
  let newState = [...state];
  let bookingIndex = null;
  switch (action.type) {
    case 'FETCH_BOOKINGS_SUCCESS': {
      newState = newState.concat(action.bookings);
      break;
    }
    case 'ADD_BOOKING': {
      newState.push({ ...action.payload.booking, id: _.uniqueId() });
      break;
    }
    case types.REMOVE_BOOKING: {
      bookingIndex = _.findIndex(newState, { id: action.payload.bookingId });
      newState.splice(bookingIndex, 1);
      break;
    }
    case 'UPDATE_BOOKING_SUCCESS': {
      const booking = _.find(newState, { id: action.booking.id });
      bookingIndex = _.findIndex(newState, { id: action.booking.id });
      newState.splice(bookingIndex, 1, { ...booking, ...action.booking });
      break;
    }
    default: {
      break;
    }
  }

  return newState;
};

export default bookings;