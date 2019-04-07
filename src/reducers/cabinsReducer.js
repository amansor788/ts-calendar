import _ from 'lodash';
import * as types from '../actions/CabinActionsTypes';

const cabins = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_CABINS_SUCCESS: {
      return {...state, ..._.mapKeys(action.cabins,'id')};
    }
    default: {
      return state;
    }
  }
};

export default cabins;
