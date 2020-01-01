import {
  FIRSTONE
} from '../actions/expampleAction';


const initialState = {
  text: 'text początkowy'
};

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIRSTONE:
    return Object.assign({}, state,action.payload)
    default:
    return state
  }
};

export default exampleReducer;