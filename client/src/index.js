import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from "./components/App";
import exampleReducer from './reducers/exampleReducer';

const store = createStore(
  exampleReducer,
  window.devToolsExtension && window.devToolsExtension()
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  , document.querySelector("#root"));