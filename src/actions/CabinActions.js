import axios from 'axios';
import * as types from './CabinActionsTypes';

export function fetch() {
  return (dispatch) => {
    dispatch({ type: types.FETCH_CABINS_START });
    axios.get('http://localhost:3000/cabins')
      .then((response) => {
        dispatch({
          type: types.FETCH_CABINS_SUCCESS,
          cabins: response.data,
        });
      });
  };
}
