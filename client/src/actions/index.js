import axios from 'axios';
import { FETCH_USER, FETCH_EXPERT_AREAS } from './types';

export * from './profileActions';

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: response.data }); //redux thunk working here:"So again redux thunk is really allowing us to bend the rules here and allowing us to manually dispatch an action at any point in time that we wish from an action creator rather than requiring us to (immediately) just flat out return it from the action creator."  This action creator is returning a function.  The purpose of this middleware (thunk) is to inspect what ever value we return this action creator if redux thunked sees that we return a function instead of a normal action redux thunk will automatically call this function and pass in that dispatch function as an argument. We do not want to dispatch an action until this API request has been completed. So we want to treat this thing like an asynchronous little piece of code and chain on a then statement because axios returns a promise and then once the promise is resolved only then will we actually dispatch an action and have that be sent off to all of our different reducers.
};

export const fetchExpertAreas = () => async (dispatch) => {
  const response = await axios.get('/api/expertareas');
  dispatch({ type: FETCH_EXPERT_AREAS, payload: response.data });
};
