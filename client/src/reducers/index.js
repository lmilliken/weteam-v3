import { combineReducers } from 'redux';
import authReducer from './authReducer';
import expertAreasReducer from './expertAreasReducer';

export default combineReducers({
  auth: authReducer,
  expertAreas: expertAreasReducer
});
