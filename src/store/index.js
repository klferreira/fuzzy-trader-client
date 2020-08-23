import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import { auth } from "./reducers";

const reducers = combineReducers({ auth });

const middlewares = compose(
  applyMiddleware(thunk),
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export default createStore(reducers, {}, middlewares);
