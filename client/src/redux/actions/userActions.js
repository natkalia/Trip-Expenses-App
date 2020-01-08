const SET_LOGGED_IN = 'SET_LOGGED_IN';
const SET_LOGGED_OUT = 'SET_LOGGED_OUT';
const CLEAR_STATE = 'CLEAR_STATE';
const SET_CHOOSEN_TRIP = 'SET_CHOOSEN_TRIP';


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

const setChoosenTrip = (tripId, tripName) => ({
  type: SET_CHOOSEN_TRIP,
  payload: {
    choosenTrip: {
      tripId,
      tripName
    }
  }
});

export {
  setLoggedIn,
  setLoggedOut,
  clearState,
  setChoosenTrip,
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  CLEAR_STATE,
  SET_CHOOSEN_TRIP
}