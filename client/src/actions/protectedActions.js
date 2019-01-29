import axios from 'axios';
import { CREATE_REQUEST } from './types';

export const createRequest = (values) => async (dispatch) => {
  console.log('createRequest action called', values);
  const response = await axios.post('/api/protected/request', values);
  console.log({ response });
  dispatch({ type: CREATE_REQUEST, payload: response.data });
};
