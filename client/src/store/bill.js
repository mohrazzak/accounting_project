import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const getBill = createAsyncThunk(
  'bills/get',
  async (payload, thunkAPI) => {
    try {
      const res = await api.get(`/bills/${payload}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const addBillItem = createAsyncThunk(
  'bills/addOne',
  async (payload, thunkAPI) => {
    try {
      const res = await api.post(
        `/bills/items/${payload.billId}?shop=${payload.shop ?? false}`,
        {
          ...payload.row,
          count: parseInt(payload.row.count, 10),
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const editBillItem = createAsyncThunk(
  'bills/editOne',
  async (payload, thunkAPI) => {
    try {
      const res = await api.put(
        `/bills/items/${payload.billId}/${payload.billItem}?shop=${
          payload.shop ?? false
        }`,
        {
          ...payload.row,
          count: parseInt(payload.row.count, 10),
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);
export const deleteBillItem = createAsyncThunk(
  'bills/deleteOne',
  async (payload, thunkAPI) => {
    try {
      console.log(payload);
      const res = await api.delete(
        `/bills/items/${payload.billId}/${payload.billItemId}`
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const billSlice = createSlice({
  name: 'bills',
  initialState: {
    data: {},
    isSuccess: false,
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBill.fulfilled, (state, action) => {
        state.data = action.payload.data.bill;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getBill.rejected, (state, action) => {
        state.isSuccess = false;
      })
      .addCase(getBill.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(addBillItem.fulfilled, (state, action) => {
        state.data.BillItems.push(action.payload.data.billItem);
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(addBillItem.rejected, (state, action) => {
        state.isSuccess = false;
      })
      .addCase(addBillItem.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteBillItem.fulfilled, (state, action) => {
        state.data.BillItems = state.data.BillItems.filter(
          (billItem) => billItem.id !== action.payload.data.billItem.id
        );
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteBillItem.rejected, (state, action) => {
        state.isSuccess = false;
      })
      .addCase(deleteBillItem.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      });
  },
});

export default billSlice.reducer;
