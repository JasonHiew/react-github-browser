import React from "react";
import * as ReactDOM from "react-dom/client";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import App from "./components/App";
import { org, repos } from "./store/reducers";
import rootSaga from "./store/sagas";
import { composeWithDevTools } from "@redux-devtools/extension";

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ org: org, repos: repos });
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

/**
 * Render React application
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
