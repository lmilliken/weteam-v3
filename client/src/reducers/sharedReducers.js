import { FETCH_REQUEST_STATUSES } from '../actions/types';

export function requestStatuses(state = null, action) {
  //console.log('status reducer');
  switch (action.type) {
    case FETCH_REQUEST_STATUSES:
      return action.payload || false;
    default:
      return state;
  }
}

// module.exports = { requestStatuses };
