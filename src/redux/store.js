import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from './currencySlice.js';
import categorytypeReducer from "./categorytypeSlice.js";

export default configureStore({
  reducer: {
    currency: currencyReducer,
    headerType:categorytypeReducer
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
})