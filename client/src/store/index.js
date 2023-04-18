import { configureStore } from '@reduxjs/toolkit';
import pages from './pages';
import dailyRows from './dailyRows';
import users from './users';
import products from './products';
import storageLogs from './storageLogs';
import auth from './auth';
import monthlyInventory from './monthlyInventory';
import bills from './bill';
export default configureStore({
  reducer: {
    pages,
    dailyRows,
    users,
    products,
    storageLogs,
    auth,
    monthlyInventory,
    bills,
  },
});
