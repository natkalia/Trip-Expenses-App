import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from "./components/App";
import {loadState, saveState} from './utils/localStorage';
import userReducer from './redux/reducers/userReducer';

const persistedState = loadState();

const store = createStore(
  userReducer,
  persistedState,
  window.devToolsExtension && window.devToolsExtension()
);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App/>    
  </Provider>
  , document.querySelector("#root"));