import axios from 'axios';
import * as types from './ClientActionsTypes';

export function fetch() {
  return (dispatch) => {
    dispatch({ type: types.FETCH_CLIENTS_START });
    axios.get('http://localhost:3000/clients')
      .then((response) => {
        dispatch({
          type: types.FETCH_CLIENTS_SUCCESS,
          clients: response.data,
        });
      });
  };
}

export function addClient(client) {
  return (dispatch) => {
    dispatch({ type: types.ADD_CLIENT_START });
    //hardcoding to support filed trucante (TODO)
    client.condition = 'potencial';
    axios.post('http://localhost:3000/clients',  client )
      .then((response) => {
        dispatch({
          type: types.ADD_CLIENT_SUCCESS,
          client: response.data,
        });
      });
  };
}

export function removeClient(clientId) {
  return (dispatch) => {
    dispatch({ type: types.REMOVE_CLIENT_START });
    axios.delete(`http://localhost:3000/clients/${clientId}`)
      .then((response) => {
        dispatch({
          type: types.REMOVE_CLIENT_SUCCESS,
          client: response.data,
        });
      });
  };
}

export function updateClient(clientId, client) {
  return (dispatch) => {
    dispatch({ type: types.UPDATE_CLIENT_START });
    axios.put(`http://localhost:3000/clients/${clientId}`, { client })
      .then((response) => {
        dispatch({
          type: types.UPDATE_CLIENT_SUCCESS,
          client: response.data,
        });
      });
  };
}