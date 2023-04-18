import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const counterSlice = createSlice({
  name: 'isLoggedIn',
  initialState,
  reducers: {
    login: (state, action) => {
      state = true;
      return true;
    },
  },
});

// // Action creators are generated for each case reducer function
export const { login } = counterSlice.actions;

export default counterSlice.reducer;
