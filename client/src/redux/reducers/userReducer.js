import {
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  CLEAR_STATE,
  SET_CHOOSEN_TRIP,
  SET_CHOOSEN_EXPENSE,
  UPDATE_CHOOSEN_TRIP,
  CLEAR_CHOOSEN_TRIP,
  SET_CURRENCY_LIST,
  SET_USER_ID
} from '../actions/userActions';


const initialState = {
  isLoggedIn: false,
  choosenTrip: {},
  choosenExpense: {},
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
    case SET_CHOOSEN_EXPENSE:
      return Object.assign({}, state, action.payload)
    case UPDATE_CHOOSEN_TRIP:
      return Object.assign({}, state, {
        choosenTrip: Object.assign({}, state.choosenTrip, action.payload)
      })
    case CLEAR_CHOOSEN_TRIP:
      return Object.assign({}, state, {
        choosenTrip: {}
      })
    case SET_CURRENCY_LIST:
      return Object.assign({}, state, action.payload)
    case SET_USER_ID:
      return Object.assign({}, state, action.payload)
    default:
      return state
  }
};

export default userReducer;