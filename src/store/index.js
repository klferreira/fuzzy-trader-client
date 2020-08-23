import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import { auth } from "./reducers";

const rootReducer = combineReducers({ auth });

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = compose(
  applyMiddleware(thunk),
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

export const store = createStore(persistedReducer, {}, middlewares);
const persistor = persistStore(store);

export default () => {
  
  return { store, persistor };
};
