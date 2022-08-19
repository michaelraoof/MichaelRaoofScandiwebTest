import { createSlice } from '@reduxjs/toolkit'

export const productidSlice = createSlice({
  name: 'productid',
  initialState: {
    productdescriptionID: "",
    attributeindices:[],
  },
  reducers: {

    setstatetolocalstorage: (state, action) => {
      state.productdescriptionID = localStorage.getItem("productID");
                state.attributeindices.splice(0, state.attributeindices.length);
for (var i = 0; i < localStorage.getItem("productAttLength"); i++)
{

              state.attributeindices.push(0);
              }
    },
    setattributeindices: (state, action) => {
      state.attributeindices[action.payload.index] = action.payload.value;
    }
    ,
  
    setproductid: (state, action) => {
               state.attributeindices.splice(0, state.attributeindices.length);
          for (var i = 0; i < action.payload.attlength; i++)
            {
              state.attributeindices.push(0);
              }
      state.productdescriptionID = action.payload.id;
            localStorage.setItem("productID", action.payload.id);
            localStorage.setItem("productAttLength", action.payload.attlength);
            }
      },

})

// Action creators are generated for each case reducer function
export const { setproductid,setstatetolocalstorage,setattributeindices} = productidSlice.actions;

export default productidSlice.reducer;