import React, { useEffect, useState } from 'react';
import MyTable from '../../components/MyTable';
import PageLayout from '../../components/PageLayout';
import MyDialog from '../../components/MyDialog';
import Box from '@mui/material/Box';
import useTable from '../../hooks/useTable';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { addCustomer, deleteCustomer, editCustomer } from '../../store/users';
import { useDispatch } from 'react-redux';
import PageHeading from '../../components/PageHeading';
import {
  deleteDaily,
  deleteDailyRow,
  editDaily,
  editDailyRow,
  getDaily,
} from '../../store/dailyRows';
import CustomTableHeading from '../../components/CustomTableHeading';
const PAGE_TITLE = 'سحب';

const DAILY_ROW_INTIAL_VALUE = {
  id: '',
  name: '',
  value: 0,
  values: 0,
};

const validationSchema = Yup.object({
  name: Yup.string().required('يرجى إدخال اسم الحساب'),
  value: Yup.number().required('يرجى كتابة المبلغ'),
  values: Yup.number().required('يرجى كتابة قيمة المبلغ'),
  note: Yup.string(),
});
const WithdrawalsPage = () => {
  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );
  const dispatch = useDispatch();
  const dailyRows = useSelector((state) => state.dailyRows.data);
  // const users = useSelector((state) => state.users);
  // const partners = users.filter((user) => user.type === 'partner');
  let rows = dailyRows.filter((row) => row.billType === 'سحوبات');
  rows = rows.map((row) => ({
    userId: row.User.id,
    billType: row.billType,
    name: row.User.name,
    id: row.id,
    value: row.value,
    values: row.values,
    note: row.note,
    createdAt: row.createdAt,
  }));
  const COLUMNS = [
    {
      id: 'userId',
      label: 'رقم الحساب',
      minWidth: 80,
      align: 'center',
      isField: false,
    },
    {
      id: 'id',
      label: 'رقم الفاتورة',
      minWidth: 80,
      align: 'center',
      isField: false,
    },
    {
      id: 'name',
      label: 'اسم الحساب',
      minWidth: 150,
      align: 'left',
      isField: false,
      required: true,
      isLink: true,
    },
    {
      id: 'value',
      label: 'المبلغ',
      minWidth: 80,
      align: 'center',
      isField: true,
      format: (value) => value.toLocaleString('en-US'),
      isMoney: true,
    },
    {
      id: 'values',
      label: 'القيمة',
      minWidth: 80,
      align: 'center',
      isField: true,
      format: (value) => value.toLocaleString('en-US'),
      isMoney: true,
    },
    {
      id: 'createdAt',
      label: 'التاريخ',
      minWidth: 80,
      align: 'center',
    },
  ];
  const dispatchers = {
    edit: (editedInvoice) => {
      dispatch(editDaily(editedInvoice));
    },
    delete: (invoiceId) => dispatch(deleteDaily(invoiceId)),
  };
  const totalMoney = rows.reduce(
    (prev, cur) => {
      prev.value += cur.value;
      prev.values += cur.values;
      return prev;
    },
    { value: 0, values: 0 }
  );
  const total = {
    title: 'الاجمالي',
    ...totalMoney,
  };
  useEffect(() => {
    dispatch(getDaily());
  }, []);
  return (
    <PageLayout title={`صفحة ${PAGE_TITLE}`}>
      <PageHeading title="صفحة السحوبات" />
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
      </Box>
      <CustomTableHeading rows={total} />
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

export default WithdrawalsPage;
