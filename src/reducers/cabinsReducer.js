import * as types from '../actions/CabinActionsTypes';

const initialState = [];

const cabins = function cabins(state = initialState, action) {
  let newState = [...state];
  switch (action.type) {
    case types.FETCH_CABINS_SUCCESS: {
      newState = newState.concat(action.cabins);
      break;
    }
    default: {
      break;
    }
  }

  return newState;
};

export default cabins;
