import userReducer from "@/store/features/user/userSlice.js";
import { configureStore as createStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/es/storage"

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
  const store = createStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false, thunk:true }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
};
 