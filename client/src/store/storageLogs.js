import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    invoice: 'ف-1234',
    accountId: '5',
    accountName: 'جون دو',
    productName: 'بلوزة',
    productColors: 'أحمر, أسود, أخضر',
    productSizes: 'صغير, متوسط, كبير',
    billType: 'ادخال صادر',
    billNote: 'تم تطبيق الخصم',
    values: 99,
  },
  {
    invoice: 'ف-5678',
    accountId: '6',
    accountName: 'جين سميث',
    productName: 'بنطلون',
    productColors: 'أسود, رمادي',
    productSizes: 'متوسط, كبير, كبير جداً',
    billType: 'ادخال صادر',
    billNote: '',
    values: 149,
  },
  {
    invoice: 'ف-3456',
    accountId: '7',
    accountName: 'علي أحمد',
    productName: 'قميص',
    productColors: 'أبيض, أزرق',
    productSizes: 'صغير, كبير',
    billType: 'ادخال صادر',
    billNote: 'تم إلغاء الطلب',
    values: 79,
  },
  {
    invoice: 'ف-7890',
    accountId: '8',
    accountName: 'فاطمة خليل',
    productName: 'فستان',
    productColors: 'وردي, أسود',
    productSizes: 'صغير, متوسط, كبير',
    billType: 'ادخال صادر',
    billNote: '',
    values: 199,
  },
];

export const counterSlice = createSlice({
  name: 'storageLogs',
  initialState,
  reducers: {
    editLog: (state, action) => {
      const { id, ...updatedRow } = action.payload;
      const rowIndex = state.findIndex((row) => row.id === id);
      if (rowIndex !== -1)
        state[rowIndex] = { ...state[rowIndex], ...updatedRow };
    },
    deleteLog: (state, action) => {
      const index = state.findIndex((row) => row.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

// // Action creators are generated for each case reducer function
export const { editLog, deleteLog } = counterSlice.actions;

export default counterSlice.reducer;
