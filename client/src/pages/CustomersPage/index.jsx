import React, { useEffect, useState } from 'react';
import MyTable from '../../components/MyTable';
import PageLayout from '../../components/PageLayout';
import MyDialog from '../../components/MyDialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useTable from '../../hooks/useTable';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  addCustomer,
  addUser,
  deleteCustomer,
  deleteUser,
  editCustomer,
  editUser,
  getUsers,
} from '../../store/users';
import { useDispatch } from 'react-redux';
import PageHeading from '../../components/PageHeading';
const PAGE_TITLE = 'الزبائن';
const COLUMNS = [
  {
    id: 'id',
    label: 'رقم الحساب',
    minWidth: 80,
    align: 'center',
    isField: false,
  },
  {
    id: 'name',
    label: 'اسم الحساب',
    minWidth: 150,
    align: 'left',
    isField: true,
    required: true,
    isLink: true,
    urlPath: 'shops',
  },
  {
    id: 'mobileNumber',
    label: 'رقم الهاتف المحمول',
    minWidth: 150,
    align: 'center',
    isField: true,
    required: true,
  },
  {
    id: 'address',
    label: 'العنوان',
    minWidth: 100,
    align: 'center',
    isField: true,
  },
  {
    id: 'note',
    label: 'ملاحظة',
    minWidth: 170,
    align: 'left',
    isField: true,
  },
  {
    id: 'accountBalance',
    label: 'صافي الحساب',
    minWidth: 50,
    align: 'center',
    isField: true,
    format: (value) => value.toLocaleString('en-US'),
    isMoney: true,
  },
  {
    id: 'accountBalanceValues',
    label: 'قيمة صافي الحساب',
    minWidth: 100,
    align: 'center',
    isField: true,
    format: (value) => value.toLocaleString('en-US'),
    isMoney: true,
  },
];

const DAILY_ROW_INTIAL_VALUE = {
  id: '',
  name: '',
  mobileNumber: '',
  address: '',
  note: '',
  accountBalance: 0,
  accountBalanceValues: 0,
};
const validationSchema = Yup.object({
  name: Yup.string().required('يرجى إدخال اسم الحساب'),
  mobileNumber: Yup.number().required('يرجى إدخال رقم الموبايل'),
  address: Yup.string(),
  accountBalance: Yup.number().required('يرجى كتابة صافي الحساب'),
  note: Yup.string(),
  accountBalanceValues: Yup.number().required('يرجى كتابة قيمة صافي الحساب'),
});
const DailyPage = () => {
  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const rows = users.data.filter((customer) => customer.userType === 'زبون');
  const dispatchers = {
    add: (customer) => dispatch(addUser({ ...customer, userType: 'زبون' })),
    edit: (editedCustomer) => dispatch(editUser({ ...editedCustomer })),
    delete: (customerId) => dispatch(deleteUser(customerId)),
  };
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <PageLayout title={`صفحة ${PAGE_TITLE}`}>
      <PageHeading title="صفحة الزبائن" />
      <Box>
        <MyTable
          columns={COLUMNS}
          deletedLabel={`فاتورة ${PAGE_TITLE}`}
          setDialog={setDialog}
          rows={rows}
          COLUMNS={COLUMNS}
          validationSchema
          dispatchers={dispatchers}
        />
        <Button
          variant="contained"
          sx={{
            height: '60px',
            margin: '2rem auto',
            display: 'block',
            width: '50%',
          }}
          color="error"
          onClick={handleOpenAddDialog}
        >
          {`اضافة ${PAGE_TITLE}`}
        </Button>
      </Box>
      <MyDialog
        title={`فاتورة ${PAGE_TITLE}`}
        dialog={dialog}
        setDialog={setDialog}
        ROW_INTIAL_VALUE={DAILY_ROW_INTIAL_VALUE}
        FIELDS={COLUMNS.filter((e) => e.isField)}
        rows={rows}
        validationSchema={validationSchema}
        dispatchers={dispatchers}
      />
    </PageLayout>
  );
};

export default DailyPage;
