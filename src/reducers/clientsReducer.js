import _ from 'lodash';
import * as types from '../actions/ClientActionsTypes';

const clients = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_CLIENTS_SUCCESS': {
      return {...state, ..._.mapKeys(action.clients,'id')}
    }
    case 'ADD_CLIENT_SUCCESS': {
      return {...state, [action.client.id] : action.client}
    }
    case 'UPDATE_CLIENT_SUCCESS': {
      return {...state, [action.client.id] : action.client}
    }
    case types.REMOVE_CLIENT_SUCCESS: {
      return _.omit(state, action.payload)
    }
    default: {
      return state;
    }
  }
};

// const initialState = {
//   clients: {},
// };

// const clientSchema = new schema.Entity('clients');
// const clientsListSchema = [clientSchema];

// const clientsReducer = function(state = initialState, action) {
//   switch (action.type) {
//     case types.FETCH_CLIENTS_SUCCESS: {
//       const normalizedClients = normalize(action.clients, clientsListSchema);
//       return {
//         ...state,
//         clients: normalizedClients.entities.clients,
//       };
//     }

//     case types.UPDATE_CLIENT_SUCCESS: {
//       const updatedClient = action.client;
//       const clients = { ...state.clients };
//       clients[updatedClient.id] = updatedClient;

//       return { ...state, clients };
//     }

//     case types.REMOVE_CLIENT_SUCCESS: {
//       const removedClient = action.client;
//       const clients = { ...state.clients };
//       delete clients[removedClient.id];

//       return { ...state, clients };
//     }

//     default: {
//       return { ...state };
//     }
//   }
// };

export default clients;
