import { createStore, compose, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";

import reducers from "../reducers";
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["creditCard"]
};

const persistedReducer = persistReducer(persistConfig, reducers);
export let store = createStore(
  persistedReducer,
  {},
  compose(applyMiddleware())
);
export let persistor = persistStore(store);
