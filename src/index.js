import React from "react";
import ReactDom from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { Provider } from "react-redux";

import reducers from "./reducers";
import App from "./components/App";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware),
);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
