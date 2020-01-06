const SET_LOGGED_IN = 'SET_LOGGED_IN';
const SET_LOGGED_OUT = 'SET_LOGGED_OUT';
const CLEAR_STATE = 'CLEAR_STATE';


const setLoggedIn = () => ({
  type: SET_LOGGED_IN,
  payload: {
    isLoggedIn: true
  }
});

const setLoggedOut = () => ({
  type: SET_LOGGED_OUT,
  payload: {
    isLoggedIn: false
  }
});

const clearState = () => ({
  type: CLEAR_STATE,
  payload: {}
});

export {
  setLoggedIn,
  setLoggedOut,
  clearState,
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  CLEAR_STATE
}