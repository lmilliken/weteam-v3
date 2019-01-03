import { FETCH_SURVEYS } from '../actions/types';

export default function(state = [], action) {
  // console.log('survey reducer: ', action.type);
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;
    default:
      return state;
  }
}
