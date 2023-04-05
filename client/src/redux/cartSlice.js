import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { userRequest } from '../requestMethods';

export const fetchCartData = createAsyncThunk(
  'cart/fetchCartData',
  async (userId) => {
    try {
      const response = await userRequest(`/carts/find/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    status: 'idle',
    error: null,
  },

  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload.product);
      state.total += action.payload.price;
    },
    removeProduct: (state, action) => {
      const index = action.payload.index;

      if (index !== -1) {
        state.quantity -= 1;
        state.total -= action.payload.price;
        state.products.splice(index, 1);
      }
    },
    changeProductQuantity: (state, action) => {
      const index = action.payload.index;

      switch (action.payload.type) {
        case 'INCREMENT_QUANTITY':
          state.products[index].enteredDetails.pQuantity += 1;
          state.total += action.payload.unitPrice;
          state.products[index].price += action.payload.unitPrice;
          break;

        case 'DECREMENT_QUANTITY':
          state.products[index].enteredDetails.pQuantity -= 1;
          state.total -= action.payload.unitPrice;
          state.products[index].price -= action.payload.unitPrice;
          break;
        default:
          return state;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload);
        //state.items = action.payload.items;
        //state.total = action.payload.total;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addProduct, changeProductQuantity, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
