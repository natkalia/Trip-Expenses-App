const SET_LOGGED_IN = 'SET_LOGGED_IN';

const setLoggedIn = (payload) => ({
  type: SET_LOGGED_IN,
  payload: {
    isLoggedIn: payload
  }
});

export {
  setLoggedIn,
  SET_LOGGED_IN
}