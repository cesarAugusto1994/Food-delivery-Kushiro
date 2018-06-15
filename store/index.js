import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import thunk from "redux-thunk";

import reducers from "../reducers";
import { getTimeLeft } from "../helpers/timeLeftHelper";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["newOrder", "creditCard", "prevOrders"]
};

const persistedReducer = persistReducer(persistConfig, reducers);
export let store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware(thunk))
);
export let persistor = persistStore(store);
