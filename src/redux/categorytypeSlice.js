import { createSlice } from '@reduxjs/toolkit'

export const categorytypeSlice = createSlice({
  name: 'headerType',
  initialState: {

    type:""
  },
  reducers: {

    setCategoryType: (state, action) => {

  
   state.type=action.payload.type;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setCategoryType } = categorytypeSlice.actions;

export default categorytypeSlice.reducer;