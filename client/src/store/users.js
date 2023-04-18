import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api';

export const getUsers = createAsyncThunk('users/get', async (_, thunkAPI) => {
  try {
    const res = await api.get(`/users`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getUser = createAsyncThunk(
  'user/get',
  async (payload, thunkAPI) => {
    try {
      const res = await api.get(`/users/${payload}`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const addUser = createAsyncThunk(
  'users/add',
  async (payload, thunkAPI) => {
    try {
      const res = await api.post('/users', payload);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const editUser = createAsyncThunk(
  'users/edit',
  async (payload, thunkAPI) => {
    try {
      const res = await api.put(`/users/${payload.id}`, payload);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (payload, thunkAPI) => {
    try {
      const res = await api.delete(`/users/${payload}`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    isSuccess: false,
    isLoading: false,
    user: {},
  },
  // reducers: {
  //   addCustomer: (state, action) => {
  //     state.data.push(action.payload);
  //   },
  //   editCustomer: (state, action) => {
  //     const { id, ...updatedRow } = action.payload;
  //     const rowIndex = state.data.findIndex((row) => row.id === id);
  //     if (rowIndex !== -1)
  //       state.data[rowIndex] = { ...state.data[rowIndex], ...updatedRow };
  //   },
  //   deleteCustomer: (state, action) => {
  //     const index = state.data.findIndex((row) => row.id === action.payload);
  //     if (index !== -1) {
  //       state.data.splice(index, 1);
  //     }
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.data = action.payload.data.users;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        const formattedRow = action.payload.data.user;
        state.data.push(formattedRow);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const formattedRow = action.payload.data.user;
        state.data = state.data.map((user) => {
          if (user.id === formattedRow.id) return formattedRow;
          return user;
        });
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const formattedRow = action.payload.data.user;
        state.data = state.data.filter((user) => user.id !== formattedRow.id);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        const formattedRow = action.payload.data.user;
        state.user = formattedRow;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      });
  },
});

export const { addCustomer, editCustomer, deleteCustomer } = usersSlice.actions;

export default usersSlice.reducer;
