const SET_LOGGED_IN = 'SET_LOGGED_IN';
const SET_LOGGED_OUT = 'SET_LOGGED_OUT';
const CLEAR_STATE = 'CLEAR_STATE';
const SET_CHOOSEN_TRIP = 'SET_CHOOSEN_TRIP';
const CLEAR_CHOOSEN_TRIP = 'CLEAR_CHOOSEN_TRIP';
const UPDATE_CHOOSEN_TRIP = 'UPDATE_CHOOSEN_TRIP';
const SET_CURRENCY_LIST = 'SET_CURRENCY_LIST';
const SET_USER_ID = 'SET_USER_ID';


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

const setChoosenTrip = (id, name, mainCurrency) => ({
  type: SET_CHOOSEN_TRIP,
  payload: {
    choosenTrip: {
      id,
      name,
      mainCurrency
    }
  }
});

const updateChoosenTrip = (name) => ({
  type: UPDATE_CHOOSEN_TRIP,
  payload: {
      name
  }
});

const clearChoosenTrip = () => ({
  type: CLEAR_CHOOSEN_TRIP,
  payload: {}
});

const setCurrencyList = (currencyList) => ({
  type: SET_CURRENCY_LIST,
  payload: {
    currencyList: currencyList,
  }
});

const setUserId = (userId) => ({
  type: SET_USER_ID,
  payload: {
    userId: userId,
  }
});

export {
  setLoggedIn,
  setLoggedOut,
  clearState,
  setChoosenTrip,
  updateChoosenTrip,
  clearChoosenTrip,
  setCurrencyList,
  setUserId,
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  CLEAR_STATE,
  SET_CHOOSEN_TRIP,
  UPDATE_CHOOSEN_TRIP,
  CLEAR_CHOOSEN_TRIP,
  SET_CURRENCY_LIST,
  SET_USER_ID
}