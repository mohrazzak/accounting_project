import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const getDaily = createAsyncThunk(
  'dailyRows/get',
  async (payload, thunkAPI) => {
    try {
      let queryString = '';

      if (payload?.all) {
        queryString += `&all=${payload.all}`;
      }

      if (payload?.userId) {
        queryString += `&userId=${payload.userId}`;
      }

      if (payload?.isDaily) {
        queryString += `&isDaily=${payload.isDaily}`;
      }

      const res = await api.get(`/daily?${queryString}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addDaily = createAsyncThunk(
  'dailyRows/add',
  async (payload, thunkAPI) => {
    try {
      const res = await api.post('/daily', payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editDaily = createAsyncThunk(
  'dailyRows/edit',
  async (payload, thunkAPI) => {
    try {
      const res = await api.put(`/daily/${payload.id}`, payload);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteDaily = createAsyncThunk(
  'dailyRows/delete',
  async (payload, thunkAPI) => {
    try {
      const res = await api.delete(`/daily/${payload}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const counterSlice = createSlice({
  name: 'dailyRows',
  initialState: {
    data: [],
    today: { value: 0, values: 0 },
    yesterday: { value: 0, values: 0 },
    isSuccess: false,
    isLoading: false,
  },
  // reducers: {
  //   addDailyRow: (state, action) => {
  //     state.push(action.payload);
  //   },
  //   editDailyRow: (state, action) => {
  //     const { invoice, ...updatedRow } = action.payload;
  //     const rowIndex = state.findIndex((row) => row.invoice === invoice);
  //     if (rowIndex !== -1)
  //       state[rowIndex] = { ...state[rowIndex], ...updatedRow };
  //   },
  //   deleteDailyRow: (state, action) => {
  //     const index = state.findIndex((row) => row.invoice === action.payload);
  //     if (index !== -1) {
  //       state.splice(index, 1);
  //     }
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getDaily.fulfilled, (state, action) => {
        state.yesterday = action.payload.data.yesterdayBalance;
        state.today = action.payload.data.todayBalance;
        state.data = action.payload.data.bills;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getDaily.rejected, (state, action) => {
        state.isSuccess = false;
      })
      .addCase(getDaily.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(addDaily.fulfilled, (state, action) => {
        console.log(action.payload);
        const formattedRow = {
          id: action.payload.data.bill.id,
          value: action.payload.data.bill.value,
          values: action.payload.data.bill.values,
          billType: action.payload.data.bill.billType,
          note: action.payload.data.bill.note,
          UserId: action.payload.data.bill.UserId,
          User: { name: action.payload.data.bill.User.name },
        };
        state.data.push(formattedRow);
        state.today = action.payload.data.todayBalance;
        state.yesterday = action.payload.data.yesterdayBalance;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(addDaily.rejected, (state, action) => {
        state.isSuccess = false;
      })
      .addCase(addDaily.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteDaily.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (row) => row.id !== action.payload.data.bill.id
        );
        if (action.payload.data.bill.billType === 'ادخال') {
          state.today.value -= action.payload.data.bill.value;
          state.today.values -= action.payload.data.bill.values;
        } else {
          state.today.value += action.payload.data.bill.value;
          state.today.values += action.payload.data.bill.values;
        }
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteDaily.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteDaily.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
      })
      .addCase(editDaily.fulfilled, (state, action) => {
        state.data = state.data.map((bill) => {
          if (bill.id === action.payload.data.bill.id) {
            state.today = action.payload.data.balance.todayBalance;
            state.yesterday = action.payload.data.balance.yesterdayBalance;
            return {
              id: action.payload.data.bill.id,
              value: action.payload.data.bill.value,
              values: action.payload.data.bill.values,
              billType: action.payload.data.bill.billType,
              createdAt: action.payload.data.bill.createdAt,
              note: action.payload.data.bill.note,
              UserId: action.payload.data.bill.UserId,
              User: {
                name: action.payload.data.bill.User.name,
                id: action.payload.data.bill.User.id,
              },
            };
          }

          return bill;
        });
      })

      .addCase(editDaily.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(editDaily.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
      });
  },
});

// // Action creators are generated for each case reducer function
export const { addDailyRow, editDailyRow, deleteDailyRow } =
  counterSlice.actions;

export default counterSlice.reducer;
