import { combineReducers } from 'redux';
import authReducer from './authReducer';
import expertAreasReducer from './expertAreasReducer';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  expertAreas: expertAreasReducer,
  form: reduxFormReducer
});
