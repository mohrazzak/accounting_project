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
  userId: '',
  billType: '',
  id: '',
  name: '',
  value: 0,
  values: 0,
  note: '',
};

const validationSchema = Yup.object({
  value: Yup.number().required('يرجى كتابة المبلغ'),
  values: Yup.number().required('يرجى كتابة قيمة المبلغ'),
  note: Yup.string(),
});
const ExpensesPage = () => {
  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );
  const dispatch = useDispatch();
  const dailyRows = useSelector((state) => state.dailyRows.data);
  let rows = dailyRows.filter((row) => row.billType === 'مصروف');
  rows = rows.map((row) => ({
    name: row.User.name,
    billType: row.billType,
    userId: row.User.id,
    id: row.id,
    value: row.value,
    values: row.values,
    note: row.note,
    userType: row.User.userType,
  }));

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
  const COLUMNS = [
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
      minWidth: 80,
      align: 'center',
      isField: false,
      isLink: true,
    },
    {
      id: 'value',
      label: 'المبلغ',
      minWidth: 50,
      align: 'center',
      isField: true,
      format: (value) => value.toLocaleString('en-US'),
      isMoney: true,
    },
    {
      id: 'values',
      label: 'القيمة',
      minWidth: 50,
      align: 'center',
      isField: true,
      format: (value) => value.toLocaleString('en-US'),
      isMoney: true,
    },
    {
      id: 'note',
      label: 'ملاحظة',
      minWidth: 120,
      align: 'left',
      isField: true,
    },
  ];
  const dispatchers = {
    edit: (editedRow) => {
      const formattedRow = {
        userId: editedRow.userId,
        value: parseInt(editedRow.value, 10),
        values: parseInt(editedRow.values, 10),
        billType: editedRow.billType,
        note: editedRow.note,
        id: editedRow.id,
      };
      dispatch(editDaily(formattedRow)).then(() => {
        dispatch(getDaily());
      });
    },
    delete: (invoiceId) => dispatch(deleteDaily(invoiceId)),
  };

  useEffect(() => {
    dispatch(getDaily());
  }, []);
  return (
    <PageLayout>
      <PageHeading title="صفحة المصروف" />
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

        <CustomTableHeading rows={total} />
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

export default ExpensesPage;
