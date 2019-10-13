import { GET_ERRORS, CLEAR_ERRORS } from './types';
import axios from 'axios';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: {
      msg: msg,
      status: status,
      id: id
    }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
