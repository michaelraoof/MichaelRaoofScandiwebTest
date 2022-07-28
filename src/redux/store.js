import { configureStore } from '@reduxjs/toolkit'
import currencyReducer from './currencySlice.js';

export default configureStore({
  reducer: {
    currency: currencyReducer,
  },
})