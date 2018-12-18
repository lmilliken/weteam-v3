import axios from 'axios';
import { FETCH_USER, FETCH_EXPERT_AREAS } from './types';

export const fetchUser = () => async (dispatch) => {
  const response = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchExpertAreas = () => async (dispatch) => {
  const response = await axios.get('/api/expertareas');
  dispatch({ type: FETCH_EXPERT_AREAS, payload: response.data });
};
