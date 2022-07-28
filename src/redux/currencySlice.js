import { createSlice } from '@reduxjs/toolkit'

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
   currencyIndexArray: 0,label:""
  },
  reducers: {

    setcurrency: (state, action) => {
      state.currencyindex = action.payload;
  
      state.label = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setcurrency } = currencySlice.actions;

export default currencySlice.reducer;