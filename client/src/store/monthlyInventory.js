import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';

export const getMonthly = createAsyncThunk(
  'monthlyInventory/get',
  async (_) => {
    try {
      const res = await api.get(`/monthly`);
      console.log(res);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const counterSlice = createSlice({
  name: 'monthlyInventory',
  initialState: {
    data: [
      {
        month: '1',
        input: 0,
        output: 0,
        expense: 0,
        withdrawal: 0,
        transfers: 0,
      },
      {
        month: '2',
        input: 0,
        output: 0,
        expense: 0,
        withdrawal: 0,
        transfers: 0,
      },
      {
        month: '3',
        input: 0,
        output: 0,
        expense: 0,
        withdrawal: 0,
        transfers: 0,
      },
    ],
  },
  extraReducers: (builder) => {
    builder.addCase(getMonthly.fulfilled, (state, action) => {
      const res = action.payload.data.monthly;

      // Create an array to hold the updated data
      const updatedData = [];

      // Loop through each item in the response data
      for (let i = 0; i < res.length; i++) {
        const updatedItem = {
          month: `${i + 1}`,
          inputValue: 0,
          inputValues: 0,
          outputValue: 0,
          outputValues: 0,
          expenseValue: 0,
          expenseValues: 0,
          withdrawalsValue: 0,
          withdrawalsValues: 0,
          transferValue: 0,
          transferValues: 0,
        };

        // Loop through each bill item in the response data
        for (const bill of res[i]) {
          // Update the values based on the bill type
          if (bill.billType === 'ادخال') {
            updatedItem.inputValue = bill.value;
            updatedItem.inputValues = bill.values;
          } else if (bill.billType === 'صادر') {
            updatedItem.outputValue = bill.value;
            updatedItem.outputValues = bill.values;
          } else if (bill.billType === 'مصروف') {
            updatedItem.expenseValue = bill.value;
            updatedItem.expenseValues = bill.values;
          } else if (bill.billType === 'سحوبات') {
            updatedItem.withdrawalsValue = bill.value;
            updatedItem.withdrawalsValues = bill.values;
          } else if (bill.billType === 'تحويل') {
            updatedItem.transferValue = bill.value;
            updatedItem.transferValues = bill.values;
          }
        }

        // Push the updated item to the array
        updatedData.push(updatedItem);
      }
      console.log(updatedData);
      // Update the state with the updated data
      state.data = updatedData;
    }),
      builder.addCase(getMonthly.pending, (state, action) => {
        state.isLoading = true;
      }),
      builder.addCase(getMonthly.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
      });
  },
});

// // Action creators are generated for each case reducer function
export const { editMonthly, deleteMonthly } = counterSlice.actions;

export default counterSlice.reducer;
