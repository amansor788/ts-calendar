import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import bookings from './bookingsReducer'; 
import clients from './clientsReducer';
import cabins from './cabinsReducer';

export default combineReducers({
  form: formReducer,
  bookings,
  clients,
  cabins,
});
