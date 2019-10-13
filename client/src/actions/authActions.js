import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';
import { returnErrors } from './errorActions';
import axios from 'axios';

// Check token and load user
export const loadUser = () => {
  const dispatchLoadUser = async (dispatch, getState) => {
    // User loading
    dispatch({
      type: USER_LOADING
    });

    try {
      const response = await axios.get('/api/auth/user', tokenConfig(getState));
      dispatch({
        type: USER_LOADED,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
  return dispatchLoadUser;
};

// Register user
export const registerUser = registerData => {
  const dispatchRegisterUser = async dispatch => {
    // Headers (not necessary)
    /*const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };*/

    // Request body. If uncomment Headers above, change to const body = JSON.stringify({})
    const body = {
      name: registerData.name,
      email: registerData.email,
      password: registerData.password
    };

    // Make request
    try {
      const new_user = await axios.post('/api/users', body); // If uncomment Headers above and body has JSON.stringify, add config as the third argument here
      dispatch({
        type: REGISTER_SUCCESS,
        payload: new_user.data
      });
    } catch (error) {
      console.log(error);
      dispatch(
        returnErrors(
          error.response.data,
          error.response.status,
          'REGISTER_FAIL'
        )
      );
      dispatch({
        type: REGISTER_FAIL
      });
    }
  };
  return dispatchRegisterUser;
};

// Login user
export const loginUser = loginData => {
  const dispatchLoginUser = async dispatch => {
    const body = {
      email: loginData.email,
      password: loginData.password
    };

    try {
      const logged_in_user = await axios.post('/api/auth', body);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: logged_in_user.data
      });
    } catch (error) {
      console.log(error);
      dispatch(
        returnErrors(error.response.data, error.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };

  return dispatchLoginUser;
};

// Logout user
export const logoutUser = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers in token
export const tokenConfig = getState => {
  // Get token from localStorage
  const token = getState().myauth.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) config.headers['x-auth-token'] = token;

  return config;
};
