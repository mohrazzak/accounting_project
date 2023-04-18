import React, { useState } from 'react';
import MyTable from '../components/MyTable';
import PageLayout from '../components/PageLayout';
import MyDialog from '../components/MyDialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useTable from '../hooks/useTable';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
// import { addCustomer, deleteCustomer, editCustomer } from '../store/users';
import { useDispatch } from 'react-redux';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from '../store/products';
import Logs from '../components/Logs';
import PageHeading from '../components/PageHeading';
import TableSubHeader from '../components/TableSubHeader';
import LogsTable from '../components/LogsTable';
import { useEffect } from 'react';
const PAGE_TITLE = 'المستودع';
const COLUMNS = [
  {
    id: 'id',
    label: 'رقم المنتج',
    minWidth: 80,
    align: 'center',
    isField: false,
  },
  {
    id: 'modelId',
    label: 'رقم الموديل',
    minWidth: 80,
    align: 'center',
    isField: true,
  },
  {
    id: 'name',
    label: 'اسم المنتج',
    minWidth: 150,
    align: 'left',
    isField: true,
    required: true,
  },
  {
    id: 'count',
    label: 'العدد',
    minWidth: 100,
    align: 'center',
    isField: true,
    required: true,
  },
  {
    id: 'values',
    label: 'القيمة للواحدة',
    minWidth: 100,
    align: 'center',
    isField: true,
    isPrice: true,
  },
  {
    id: 'value',
    label: 'المبلغ للواحدة',
    minWidth: 100,
    align: 'center',
    isField: true,
    isPrice: true,
  },
  {
    id: 'colors',
    label: 'الألوان',
    minWidth: 100,
    align: 'center',
    isField: true,
    // required: true,
  },
  {
    id: 'sizes',
    label: 'المقاسات',
    minWidth: 100,
    align: 'center',
    isField: true,
    // required: true,
  },
  {
    id: 'note',
    label: 'ملاحظة',
    minWidth: 100,
    align: 'center',
    isField: true,
  },
];

const DAILY_ROW_INTIAL_VALUE = {
  id: '',
  modelId: '',
  name: '',
  count: '',
  value: '',
  values: '',
  note: '',
  sizes: '',
  colors: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('يرجى إدخال اسم المنتج'),
  modelId: Yup.string(),
  count: Yup.number().required('يرجى إدخال الكمية المتاحة'),
  value: Yup.number().required('يرجى إدخال مبلغ القطعة الواحدة'),
  values: Yup.number().required('يرجى إدخال قيمة القطعة الواحدة'),
  note: Yup.string(),
  colors: Yup.string(),
  sizes: Yup.string(),
});

const ShopsPage = () => {
  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.products.data);

  const dispatchers = {
    add: (prod) => dispatch(addProduct(prod)),
    edit: (editedProd) => dispatch(editProduct(editedProd)),
    delete: (prodId) => dispatch(deleteProduct(prodId)),
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <PageLayout title={`صفحة ${PAGE_TITLE}`}>
      <TableSubHeader title="المستودع" />
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
          {`اضافة منتج`}
        </Button>
      </Box>
      {/* <TableSubHeader title="سجل المستودع" />
      <LogsTable
        deletedLabel={`فاتورة ${PAGE_TITLE}`}
        rows={logs}
        validationSchema={LOGS_VALIDATION_SCHEMA}
        columns={LOGS_COLUMNS}
        rowInitialValue={LOGS_ROW_INTIAL_VALUE}
        dispatchers={dispatchers}
      /> */}
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

export default ShopsPage;
