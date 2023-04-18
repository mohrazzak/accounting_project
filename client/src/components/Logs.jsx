import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useTable from '../hooks/useTable';
import LogsTable from './LogsTable';
import MyTable from './MyTable';
import TableSubHeader from './TableSubHeader';
const DAILY_ROW_INTIAL_VALUE = {
  id: '',
  name: '',
  mobileNumber: '',
  landLineNumber: '',
  address: '',
  note: '',
  accountBalance: 0,
  accountBalanceValue: 0,
};

const Logs = ({ title }) => {
  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const rows = users.filter((customer) => customer.isCustomer);
  const dispatchers = {
    add: (customer) => dispatch(addCustomer({ ...customer, isCustomer: true })),
    edit: (editedCustomer) =>
      dispatch(editCustomer({ ...editedCustomer, isCustomer: true })),
    delete: (customerId) => dispatch(deleteCustomer(customerId)),
  };
  const columns = [
    {
      id: 'invoice',
      label: 'رقم الفاتورة',
      minWidth: 50,
      align: 'center',
      isField: false,
    },
    {
      id: 'accountId',
      label: 'رقم الحساب',
      minWidth: 50,
      align: 'left',
      isField: false,
    },
    {
      id: 'accountName',
      label: 'اسم الحساب',
      minWidth: 100,
      align: 'center',
      required: true,
      isLink: true,
    },
    {
      id: 'productName',
      label: 'المنتج',
      minWidth: 80,
      align: 'center',
      isField: true,
      required: true,
    },
    {
      id: 'billType',
      label: 'نوع الفاتورة',
      minWidth: 100,
      align: 'center',
      isField: true,
      required: true,
    },
    {
      id: 'billNote',
      label: 'ملاحظة الفاتورة',
      minWidth: 170,
      align: 'left',
      isField: true,
    },
    {
      id: 'value',
      label: 'المبلغ',
      minWidth: 120,
      align: 'center',
      isField: true,
      format: (value) => value.toLocaleString('en-US'),
      isMoney: true,
    },
    {
      id: 'accountBalanceValue',
      label: 'قيمة صافي الحساب',
      minWidth: 100,
      align: 'center',
      isField: true,
      format: (value) => value.toLocaleString('en-US'),
      isMoney: true,
    },
  ];
  return (
    <>
      <TableSubHeader title={title} />
      <LogsTable
        columns={columns}
        // deletedLabel={`فاتورة ${PAGE_TITLE}`}
        // setDialog={setDialog}
        // rows={rows}
        // validationSchema
        // dispatchers={dispatchers}
      />
    </>
  );
};

export default Logs;
