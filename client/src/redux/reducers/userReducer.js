import {
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  CLEAR_STATE,
  SET_CHOOSEN_TRIP,
  SET_CURRENCY_LIST,
  SET_USER_ID
} from '../actions/userActions';


const initialState = {
  isLoggedIn: false,
  choosenTrip: {},
  currencyList: [],
  userID: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return Object.assign({}, state, action.payload)
    case SET_LOGGED_OUT:
      return Object.assign({}, state, action.payload)
    case CLEAR_STATE:
      return {}
    case SET_CHOOSEN_TRIP:
      return Object.assign({}, state, action.payload)
    case SET_CURRENCY_LIST:
      return Object.assign({}, state, action.payload)
    case SET_USER_ID:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
};

export default userReducer;