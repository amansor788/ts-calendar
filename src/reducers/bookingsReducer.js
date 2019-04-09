import _ from 'lodash';
import * as types from '../actions/BookingActionsTypes';

const bookings = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_BOOKINGS_SUCCESS': {
      return {...state, ..._.mapKeys(action.bookings,'id')}
    }
    case 'ADD_BOOKING': {
      return {...state, [action.booking.id] : action.booking}
    }
    case 'UPDATE_BOOKING_SUCCESS': {
      return {...state, [action.booking.id] : action.booking}
    }
    case types.REMOVE_BOOKING: {
      return _.omit(state, action.payload)
    }
    default: {
      return state;
    }
  }
};

export default bookings;