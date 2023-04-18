import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';

export const getProducts = createAsyncThunk(
  'products/get',
  async (_, thunkAPI) => {
    try {
      const res = await api.get('/products');
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const addProduct = createAsyncThunk(
  'products/add',
  async (payload, thunkAPI) => {
    try {
      const res = await api.post('/products', payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const editProduct = createAsyncThunk(
  'products/edit',
  async (payload, thunkAPI) => {
    try {
      const res = await api.put(`/products/${payload.id}`, payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (payload, thunkAPI) => {
    try {
      const res = await api.delete(`/products/${payload}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

// const initialState = [
//   {
//     id: '1',
//     name: 'تيشيرت',
//     stock: 10,
//     pricePerEach: 20.5,
//     valuePerEach: 25,
//     note: 'متوفر بألوان مختلفة',
//   },
//   {
//     id: '2',
//     name: 'تيشيرت',
//     stock: 10,
//     pricePerEach: 20.5,
//     valuePerEach: 25,
//     note: 'متوفر بألوان مختلفة',
//   },
// ];

export const counterSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    isSuccess: false,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload.data.products;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isSuccess = false;
      })
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.data.push(action.payload.data.product);

        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isSuccess = false;
      })
      .addCase(addProduct.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (row) => row.id !== action.payload.data.product.id
        );
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.data = state.data.map((bill) => {
          if (bill.id === action.payload.data.product.id) {
            return action.payload.data.product;
          }
          return bill;
        });
      })

      .addCase(editProduct.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
      });
  },
});

// // Action creators are generated for each case reducer function
// export const { addProduct, editProduct, deleteProduct } = counterSlice.actions;

export default counterSlice.reducer;
