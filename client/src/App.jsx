import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const ErrorPage = lazy(() => import('./pages/others/ErrorPage'));

import { CacheProvider } from '@emotion/react';
const CircularProgress = lazy(() => import('@mui/material/CircularProgress'));

const Root = lazy(() => import('./pages/others/Root'));

import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import store from './store/index';
import { Provider } from 'react-redux';
const HomePage = lazy(() => import('./pages/HomePage'));
const DailyPage = lazy(() => import('./pages/DailyPage'));
const ExpensesPage = lazy(() => import('./pages/ExpensesPage'));
const MonthlyInventoryPage = lazy(() => import('./pages/MonthlyInventoryPage'));
const StoragePage = lazy(() => import('./pages/StoragePage'));
const WithdrawalsPage = lazy(() => import('./pages/WithDrawalsPage'));
const CustomersPage = lazy(() => import('./pages/CustomersPage'));
const CustomerPage = lazy(() => import('./pages/CustomersPage/CustomerPage'));
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import TransferPage from './pages/TransferPage';
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const ShopInvoice = lazy(() => import('./pages/Shops/Shop/ShopInvoice'));
const CustomerInvoice = lazy(() =>
  import('./pages/CustomersPage/CustomerPage/CustomerInvoice')
);
const AddCustomerInvoice = lazy(() =>
  import('./pages/CustomersPage/CustomerPage/AddCustomerInvoice')
);
const ShopsPage = lazy(() => import('./pages/Shops'));
const ShopPage = lazy(() => import('./pages/Shops/Shop'));
const AddShopInvoice = lazy(() =>
  import('./pages/Shops/Shop/AddShopInvoice.jsx')
);
const Login = lazy(() => import('./pages/LoginPage'));
const ExpensePage = lazy(() => import('./pages/ExpensesPage/ExpensePage'));
const WithDrawalPage = lazy(() =>
  import('./pages/WithDrawalsPage/WithDrawalPage')
);

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const theme = createTheme({
  typography: {
    fontFamily: ['Droid Arabic Naskh', 'sans-serif'].join(','),
  },
  direction: 'rtl',
});

function App() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </div>
      }
    >
      <CacheProvider value={cacheRtl}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <HomePage />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/daily"
                    element={
                      <PrivateRoute>
                        <DailyPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/expenses"
                    element={
                      <PrivateRoute>
                        <ExpensesPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/expenses/:id"
                    element={
                      <PrivateRoute>
                        <ExpensePage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/monthly-inventory"
                    element={
                      <PrivateRoute>
                        <MonthlyInventoryPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/shops"
                    element={
                      <PrivateRoute>
                        <ShopsPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/shops/:id"
                    element={
                      <PrivateRoute>
                        <ShopPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/storage"
                    element={
                      <PrivateRoute>
                        <StoragePage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/withdrawals"
                    element={
                      <PrivateRoute>
                        <WithdrawalsPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/withdrawals/:id"
                    element={
                      <PrivateRoute>
                        <WithDrawalPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/customers"
                    element={
                      <PrivateRoute>
                        <CustomersPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/customers/:id"
                    element={
                      <PrivateRoute>
                        <CustomerPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/customers/:customerId/invoices/:invoiceId"
                    element={
                      <PrivateRoute>
                        <CustomerInvoice />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/shops/:shopId/invoices/:invoiceId"
                    element={
                      <PrivateRoute>
                        <ShopInvoice />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/customers/:customerId/invoices/add"
                    element={
                      <PrivateRoute>
                        <AddCustomerInvoice />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/transfer"
                    element={
                      <PrivateRoute>
                        <TransferPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/shops/:shopId/invoices/add"
                    element={
                      <PrivateRoute>
                        <AddShopInvoice />
                      </PrivateRoute>
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </Provider>
      </CacheProvider>
    </Suspense>
  );
}

export default App;
