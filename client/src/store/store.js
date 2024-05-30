import userReducer from "@/store/features/user/userSlice.js"
import { configureStore , combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({user : userReducer});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}  
 