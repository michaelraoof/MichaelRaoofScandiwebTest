import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from './currencySlice.js';
import categorytypeReducer from "./categorytypeSlice.js";
import cartreducer from './cartSlice.js';
import productidReducer from './productid.js';
export default configureStore({
  reducer: {
    currency: currencyReducer,
    headerType: categorytypeReducer,
    cart: cartreducer,
    productid:productidReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
})