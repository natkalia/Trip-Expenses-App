const SET_LOGGED_IN = 'SET_LOGGED_IN';

const setLoggedIn = () => ({
  type: SET_LOGGED_IN,
  payload: {
    isLoggedIn: true
  }
});

export {
  setLoggedIn,
  SET_LOGGED_IN
}