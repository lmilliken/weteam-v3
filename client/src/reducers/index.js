import { combineReducers } from 'redux';
import authReducer from './authReducer';
import expertAreasReducer from './expertAreasReducer';
import { requestStatuses } from './sharedReducers';
import { reducer as reduxFormReducer } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  expertAreas: expertAreasReducer,
  form: reduxFormReducer,
  shared: combineReducers({ requestStatuses: requestStatuses })
});
