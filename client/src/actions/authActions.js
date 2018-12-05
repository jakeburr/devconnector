import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utilities/setAuthToken";

// Register User
export const registerUser = (userData, history) => dispatch => {
  // dispatch brought in and used with thunk middleware
  axios
    .post("/api/users/register", userData) //post request to the backend api
    .then(res => history.push("/login")) // then after promise is returned from post request
    .catch(
      err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        }) // catch errors and dispatch the errors to
    );
};

/*
TEST_DISPATCH sets the type
userData is the parameter sent into the function in the authReducer
payload is used with action.payload in authReducer
that sets its value to userData from authActions

*/

// Login - Get User Token
export const loginUser = userData => dispatch => {
  // dispatch is thunk middleware used to connect to the store
  axios
    .post("/api/users/login", userData) // post it to our api and pass in userData
    .then(res => {
      // then we get a promise back (res)
      // Save to localStorage
      const { token } = res.data;
      // Set token to localStorage
      localStorage.setItem("jwtToken", token); // refered to as jwtToken in storage
      // Set token to auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will also set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
