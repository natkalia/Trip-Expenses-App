import {
  FIRSTONE
} from '../actions/expampleAction';


const exampleReducer = (state = [], action) => {
  switch (action.type) {
    case FIRSTONE:
    return [ ...state, action.payload ]
    default:
    return state
  }
};

export default exampleReducer;