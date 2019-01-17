import axios from 'axios';
import { FETCH_USER, REGISTER_USER } from './types';

export const register = (values) => async (dispatch) => {
  console.log('register action called', values);
  const response = await axios.post('/api/register', values);
  console.log({ response });
  dispatch({ type: REGISTER_USER, payload: response.data });
};

export const updateProfile = (values) => async (dispatch) => {
  // console.log('update action called', values);
  const response = await axios.post('/api/profile/update', values);
  // console.log({ response });
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const agreeToTerms = () => async (dispatch) => {
  // console.log('update action called', values);
  const response = await axios.post('/api/agreetoterms');
  console.log({ response });
  dispatch({ type: FETCH_USER, payload: response.data });
};
