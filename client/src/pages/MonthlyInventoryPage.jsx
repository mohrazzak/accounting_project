import React, { useEffect, useState } from 'react';
import MyTable from '../components/MyTable';
import PageLayout from '../components/PageLayout';
import MyDialog from '../components/MyDialog';
import useTable from '../hooks/useTable';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
// import { addCustomer, deleteCustomer, editCustomer } from '../store/users';
import { useDispatch } from 'react-redux';
import { addProduct, deleteProduct, editProduct } from '../store/products';
import Logs from '../components/Logs';
import PageHeading from '../components/PageHeading';
import TableSubHeader from '../components/TableSubHeader';
import LogsTable from '../components/LogsTable';
import {
  deleteMonthly,
  editMonthly,
  getMonthly,
} from '../store/monthlyInventory';
const PAGE_TITLE = 'الجرد الشهري';

const LOGS_ROW_INTIAL_VALUE = {
  input: 0,
  output: 0,
  withdrawals: 0,
  expenses: 0,
};

const LOGS_COLUMNS = [
  {
    id: 'month',
    label: 'الشهر',
    minWidth: 100,
    align: 'center',
    isField: false,
  },
  {
    id: 'inputValue',
    label: 'المبلغ المدخل',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'inputValues',
    label: 'القيمة المدخلة',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'outputValue',
    label: 'المبلغ الصادر',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'outputValues',
    label: 'القيمة الصادرة',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'withdrawalsValue',
    label: 'المبلغ المسحوب',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'withdrawalsValues',
    label: 'القيمة المسحوبة',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'expenseValue',
    label: 'المبلغ المصروف',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'expenseValues',
    label: 'القيمة المصروفة',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'transferValue',
    label: 'المبلغ المحول',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
  {
    id: 'transferValues',
    label: 'القيمة المحولة',
    minWidth: 100,
    align: 'center',
    isField: true,
    isMoney: true,
  },
];
const LOGS_VALIDATION_SCHEMA = Yup.object({
  input: Yup.number().required('يرجى إدخال الدخل '),
  output: Yup.string().required('يرجى إدخال الصادر'),
  withdrawal: Yup.string().required('يرجى إدخال السحوبات'),
  expense: Yup.string().required('يرجى إدخال المصروف'),
});
const MonthlyInventoryPage = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.monthlyInventory.data);
  console.log(logs);
  useEffect(() => {
    dispatch(getMonthly());
  }, []);

  return (
    <PageLayout>
      <PageHeading title="الجرد الشهري" />
      <LogsTable
        deletedLabel={`فاتورة ${PAGE_TITLE}`}
        rows={logs}
        validationSchema={LOGS_VALIDATION_SCHEMA}
        columns={LOGS_COLUMNS}
        rowInitialValue={LOGS_ROW_INTIAL_VALUE}
        isMonthly={true}
      />
    </PageLayout>
  );
};

export default MonthlyInventoryPage;
