import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from "./components/App";
import exampleReducer from './reducers/exampleReducer';
import {loadState, saveState} from './utils/localStorage';

const persistedState = loadState();

const store = createStore(
  exampleReducer,
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