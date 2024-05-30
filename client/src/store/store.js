import userReducer from "@/store/features/user/userSlice.js"
import { configureStore } from "@reduxjs/toolkit";


export const makeStore = () => {
  return configureStore({
    user: userReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
}  
 