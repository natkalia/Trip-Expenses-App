import {
  SET_LOGGED_IN
} from '../actions/userActions';


const initialState = {
  isLoggedIn: false
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
      return Object.assign({}, state,action.payload)
    default:
      return state
  }
};

export default userReducer;