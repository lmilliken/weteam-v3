import axios from 'axios';
import { FETCH_USER } from './types';

export const updateProfile = (values) => async (dispatch) => {
  // console.log('update action called', values);
  const response = await axios.post('/api/profile/update', values);
  // console.log({ response });
  dispatch({ type: FETCH_USER, payload: response.data });
};
