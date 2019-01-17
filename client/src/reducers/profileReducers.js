import {
  UPDATE_PROFILE_DESC,
  UPDATE_PROFILE_EXPERT_AREAS
} from '../actions/types';

export const updateProfileDesc = (state = null, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_DESC:
      return false;
    default:
      return state;
  }
};
