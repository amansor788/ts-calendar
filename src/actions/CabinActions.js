import axios from 'axios';
import * as types from './CabinActionsTypes';

export const fetch = () => async dispatch => {
  const response = await axios.get('http://localhost:3000/cabins');
  
  dispatch({
          type: types.FETCH_CABINS_SUCCESS,
          cabins: response.data,
  });
}
