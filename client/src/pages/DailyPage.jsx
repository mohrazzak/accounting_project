import React, { useEffect, useState } from 'react';
import MyTable from '../components/MyTable';
import PageLayout from '../components/PageLayout';
import MyDialog from '../components/MyDialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CustomTableHeading from '../components/CustomTableHeading';
import useTable from '../hooks/useTable';
import * as Yup from 'yup';
import {
  addDaily,
  addDailyRow,
  deleteDaily,
  deleteDailyRow,
  editDaily,
  editDailyRow,
} from '../store/dailyRows';
import PageHeading from '../components/PageHeading';
import axios from '../api';
import { useSelector, useDispatch } from 'react-redux';
import { getDaily } from '../store/dailyRows';
import Swal from 'sweetalert2';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { getUsers } from '../store/users';
const PAGE_TITLE = 'اليومية';

const DAILY_ROW_INTIAL_VALUE = {
  accountId: '',
  id: '',
  accountName: '',
  value: '',
  values: '',
  billType: '',
  note: '',
};

const DailyPage = () => {
  const { data, yesterday, today, isLoading, isSuccess } = useSelector(
    (state) => state.dailyRows
  );

  const users = useSelector((state) => state.users);
  const formattedBills = data
    ?.map(({ id, values, value, billType, note, UserId, isDaily, User }) => {
      if (isDaily)
        return {
          id,
          values,
          value,
          billType,
          note,
          accountId: UserId,
          accountName: User?.name,
          accountType: User?.userType,
        };
      return null;
    })
    .filter((e) => e !== null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDaily({ isDaily: true }));
    dispatch(getUsers());
  }, []);

  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );

  const dispatchers = {
    add: (row) => {
      const formattedRow = {
        isDaily: true,
        userId: row.accountId, // its id
        value: parseInt(row.value, 10),
        values: parseInt(row.values, 10),
        billType: row.billType,
        note: row.note,
      };
      dispatch(addDaily(formattedRow)).then(() => {
        dispatch(getDaily({ isDaily: true }));
      });
    },
    edit: (editedRow) => {
      const formattedRow = {
        isDaily: true,
        userId: editedRow.accountId,
        value: parseInt(editedRow.value, 10),
        values: parseInt(editedRow.values, 10),
        billType: editedRow.billType,
        note: editedRow.note,
        id: editedRow.id,
      };
      dispatch(editDaily(formattedRow)).then(() => {
        dispatch(getDaily({ all: false, userId: null, isDaily: true }));
      });
    },
    delete: (invoiceId) => {
      dispatch(deleteDaily(invoiceId));
    },
  };

  const validationSchema = Yup.object({
    accountId: Yup.string().required('يرجى إدخال اسم الحساب'),
    value: Yup.number().required('يرجى إدخال المبلغ'),
    values: Yup.number().required('يرجى إدخال القيمة'),
    note: Yup.string(),
    billType: Yup.string().required('يرجى اختيار نوع الفاتورة'),
  });
  const formattedUsers = users?.data?.map((user) => ({
    value: user.name,
    id: user.id,
    type: user.userType,
  }));

  const COLUMNS = [
    {
      id: 'id',
      label: 'رقم الفاتورة',
      minWidth: 70,
      align: 'center',
      isField: false,
      isLink: true,
      isInvoice: true,
    },
    {
      id: 'accountId',
      label: 'ايدي الحساب',
      minWidth: 80,
      align: 'center',
      isField: true,
      isLink: true,
      options: formattedUsers,
      required: true,
    },
    {
      id: 'accountName',
      label: 'اسم الحساب',
      minWidth: 150,
      align: 'left',
    },
    {
      id: 'value',
      label: 'المبلغ',
      minWidth: 100,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
      isField: true,
      required: true,
      isBill: true,
    },
    {
      id: 'values',
      label: 'القيمة',
      minWidth: 50,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
      isField: true,
      isBill: true,
    },
    {
      id: 'billType',
      label: 'نوع الفاتورة',
      type: 'select',
      options: [
        { value: 'ادخال', id: 'ادخال' },
        { value: 'صادر', id: 'صادر' },
        { value: 'مصروف', id: 'مصروف' },
        { value: 'سحوبات', id: 'سحوبات' },
      ],
      required: true,
      isField: true,
    },
    {
      id: 'note',
      label: 'ملاحظة',
      minWidth: 170,
      align: 'left',
      isField: true,
    },
  ];
  return (
    <>
      <PageLayout>
        <PageHeading title="صفحة اليومية" />
        <Box>
          <CustomTableHeading rows={{ ...yesterday, title: 'الاساس' }} />
          <MyTable
            COLUMNS={COLUMNS}
            deletedLabel={`فاتورة ${PAGE_TITLE}`}
            setDialog={setDialog}
            rows={formattedBills}
            dispatchers={dispatchers}
          />
          <CustomTableHeading rows={{ ...today, title: 'المدور' }} />
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
            {'اضافة فاتورة جديدة'}
          </Button>
        </Box>
        <MyDialog
          title={`فاتورة ${PAGE_TITLE}`}
          dialog={dialog}
          setDialog={setDialog}
          ROW_INTIAL_VALUE={DAILY_ROW_INTIAL_VALUE}
          validationSchema={validationSchema}
          FIELDS={COLUMNS.filter((e) => e.isField)}
          rows={formattedBills}
          dispatchers={dispatchers}
        />
      </PageLayout>
    </>
  );
};

export default DailyPage;
