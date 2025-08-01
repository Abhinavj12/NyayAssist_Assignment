import { configureStore } from "@reduxjs/toolkit"
import todoSlice from "./slices/todoSlice"
import authSlice from "./slices/authSlice"
import uiSlice from "./slices/uiSlice"

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    auth: authSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
