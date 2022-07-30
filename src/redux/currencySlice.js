import { createSlice } from '@reduxjs/toolkit'

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currencyIndexArray: 0,
    label: ""
  },
  reducers: {

    setcurrency: (state, action) => {
      state.currencyIndexArray = action.payload.currencyIndexArray;
  
      state.label = action.payload.label;
      localStorage.setItem("currencyIndex", state.currencyIndexArray);//to save the vaklue of currency if i closed tap or refresh it
    },
  },
})

// Action creators are generated for each case reducer function
export const { setcurrency } = currencySlice.actions;

export default currencySlice.reducer;