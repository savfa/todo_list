import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reportWebVitals from "./reportWebVitals";

import "./assets/styles/styles.scss";

import rootReducer from "./store/reducers/index";
import { createAPI, setDispatch } from "./assets/services/api";
import { UserOperation } from "./store/reducers/user/user";

import App from "./App";
import { deleteUserAuthToken } from "./assets/services/utils/localStorage";

const onUnauthorised = () => {
  deleteUserAuthToken();
  window.location.reload();
};

const api = createAPI(onUnauthorised);

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

setDispatch(store.dispatch);
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById(`root`)
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
