import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import balanceReducer from "./slice/balanceSlice";
export const store = configureStore({
  reducer: { auth: authReducer, balance: balanceReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable if issues with non-serializable values
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
