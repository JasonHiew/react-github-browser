import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import App from './components/App';
import { org, repos, repoDetails } from './store/reducers';
import rootSaga from './store/sagas';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createReduxHistoryContext, reachify } from 'redux-first-history';
import { createWouterHook } from 'redux-first-history/wouter';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { createBrowserHistory } from 'history';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Details from './routes/RepoDetails';
import PageNotFound from './routes/404';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  router: routerReducer,
  org: org,
  repos: repos,
  repoDetails: repoDetails,
});
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware))
);

export const history = createReduxHistory(store);

sagaMiddleware.run(rootSaga);

/**
 * Render React application
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='details/:name' element={<Details />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
