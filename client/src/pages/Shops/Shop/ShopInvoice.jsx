import React, { useEffect, useState } from 'react';
import MyTable from '../../../components/MyTable';
import PageLayout from '../../../components/PageLayout';
import MyDialog from '../../../components/MyDialog';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useTable from '../../../hooks/useTable';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
// import { addCustomer, deleteCustomer, editCustomer } from '../store/users';
import { useDispatch } from 'react-redux';
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from '../../../store/products';
import Logs from '../../../components/Logs';
import PageHeading from '../../../components/PageHeading';
import TableSubHeader from '../../../components/TableSubHeader';
import LogsTable from '../../../components/LogsTable';
import { Link, useParams } from 'react-router-dom';
import {
  addBillItem,
  deleteBillItem,
  editBillItem,
  getBill,
} from '../../../store/bill';
import Grid from '@mui/material/Grid';
const PAGE_TITLE = 'فاتورة رقم';

const DAILY_ROW_INTIAL_VALUE = {
  id: '',
  ProductId: '',
  count: 0,
  value: 0,
  values: 0,
  // totalValue: '',
  // totalValues: '',
  note: '',
};

const validationSchema = Yup.object({
  ProductId: Yup.number().required('يرجى إدخال اسم المنتج'),
  count: Yup.number().required('يرجى إدخال الكمية المتاحة'),
  value: Yup.number().required('يرجى إدخال مبلغ القطعة الواحدة'),
  values: Yup.number().required('يرجى إدخال قيمة القطعة الواحدة'),
  note: Yup.string(),
});

const CustomerInvoice = () => {
  const { invoiceId } = useParams();
  const { dialog, setDialog, handleOpenAddDialog } = useTable(
    DAILY_ROW_INTIAL_VALUE
  );
  const dispatch = useDispatch();
  const bill = useSelector((state) => state.bills.data);
  const rows = bill?.BillItems?.map((billItem) => ({
    ...billItem,
    ProductId: billItem.ProductId,
    name: billItem.Product.name,
    totalValue: parseInt(billItem.value, 10) * parseInt(billItem.count, 10),
    totalValues: parseInt(billItem.values, 10) * parseInt(billItem.count, 10),
  }));
  const productsRows = useSelector((state) => state.products.data);
  const products = productsRows.map((row) => ({
    value: row.name,
    id: row.id,
  }));
  const COLUMNS = [
    {
      id: `ProductId`,
      label: 'رقم المنتج',
      minWidth: 80,
      align: 'center',
      options: products,
      isField: true,
    },
    {
      id: `id`,
      label: 'رقم سطر الفاتورة',
      minWidth: 80,
      align: 'center',
      isField: false,
    },
    {
      id: 'name',
      label: 'اسم المنتج',
      minWidth: 150,
      align: 'left',
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
      id: 'value',
      label: 'المبلغ للواحدة',
      minWidth: 100,
      align: 'center',
      isField: true,
    },
    {
      id: 'values',
      label: 'القيمة للواحدة',
      minWidth: 100,
      align: 'center',
      isField: true,
    },
    {
      id: 'totalValue',
      label: 'المبلغ الاجمالي',
      minWidth: 100,
      align: 'center',
      isField: false,
    },
    {
      id: 'totalValues',
      label: 'القيمة الاجمالية',
      minWidth: 100,
      align: 'center',
      isField: false,
    },

    {
      id: 'note',
      label: 'ملاحظة',
      minWidth: 100,
      align: 'center',
      isField: true,
    },
  ];

  const dispatchers = {
    add: (row) => {
      console.log(row, 'test');
      dispatch(addBillItem({ billId: invoiceId, row, shop: true })).then(() =>
        dispatch(getBill(invoiceId))
      );
    },
    edit: (row) => {
      dispatch(
        editBillItem({ billId: invoiceId, row, shop: true, billItem: row.id })
      ).then(() => dispatch(getBill(invoiceId)));
    },
    delete: (row) => {
      dispatch(deleteBillItem({ billId: invoiceId, billItemId: row })).then(
        () => dispatch(getBill(invoiceId))
      );
    },
  };

  useEffect(() => {
    dispatch(getBill(invoiceId));
    dispatch(getProducts());
  }, []);

  return (
    <PageLayout title={`صفحة ${PAGE_TITLE}`}>
      <Grid container spacing={2} mb={2}>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid container>
            <Grid
              item
              xs={6}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant="body1">ملاحظة الفاتورة</Typography>
              <Typography variant="body1">{bill.note || 'لايوجد'}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid container>
            <Grid
              item
              xs={6}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant="body1">اجمالي المبلغ</Typography>
              <Typography variant="body1">{bill.value || 'لايوجد'}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid container>
            <Grid
              item
              xs={6}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant="body1">اجمالي القيمة</Typography>
              <Typography variant="body1">{bill.values || 'لايوجد'}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid container>
            <Grid
              item
              xs={6}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant="body1">نوع الفاتورة</Typography>
              <Typography variant="body1">
                {bill.billType || 'لايوجد'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Grid container>
            <Grid
              item
              xs={6}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography variant="body1">تاريخ الاصدار</Typography>
              <Typography variant="body1">
                {bill.createdAt || 'لايوجد'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box>
        <MyTable
          columns={COLUMNS}
          deletedLabel={`فاتورة ${PAGE_TITLE}`}
          setDialog={setDialog}
          rows={rows}
          COLUMNS={COLUMNS}
          validationSchema={validationSchema}
          dispatchers={dispatchers}
        />
        {bill.billType === 'ادخال' && (
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
            {'إضافة منتج للفاتورة'}
          </Button>
        )}
      </Box>
      <MyDialog
        title={`منتج جديد للفاتورة`}
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

export default CustomerInvoice;
