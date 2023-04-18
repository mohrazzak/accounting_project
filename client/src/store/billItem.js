// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../api';

// export const addBillItem = createAsyncThunk(
//   'billItems/add',
//   async (payload, thunkAPI) => {
//     try {
//       const res = await api.post(`/bill-items`, payload);
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const billSlice = createSlice({
//   name: 'billItems',
//   initialState: {
//     data: {},
//     isSuccess: false,
//     isLoading: false,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(addBillItem.fulfilled, (state, action) => {
//         state.data = action.payload.data.billItem;
//         state.isSuccess = true;
//         state.isLoading = false;
//       })
//       .addCase(addBillItem.rejected, (state, action) => {
//         state.isSuccess = false;
//       })
//       .addCase(addBillItem.pending, (state, action) => {
//         state.isLoading = true;
//       });
//   },
// });

// export default billSlice.reducer;
