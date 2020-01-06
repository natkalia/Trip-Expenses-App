import {
  SET_LOGGED_IN,
  SET_LOGGED_OUT,
  CLEAR_STATE
} from '../actions/userActions';


const initialState = {
  isLoggedIn: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return Object.assign({}, state,action.payload)
    case SET_LOGGED_OUT:
      return Object.assign({}, state,action.payload)
    case CLEAR_STATE:
      return {}
    default:
      return state
  }
};

export default userReducer;