import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

export const fetchUser = () => async (dispatch) => {
  // console.log('fetchUser action');
  const response = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchSurveys = () => async (dispatch) => {
  // console.log('fetchSurveys action');
  const response = await axios.get('/api/surveys');
  // console.log({ response });
  dispatch({ type: FETCH_SURVEYS, payload: response.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post('/api/stripe', token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async (dispatch) => {
  const res = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({ type: FETCH_USER, payload: res.data });
};
