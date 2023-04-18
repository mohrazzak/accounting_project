import React, { useEffect, useState } from 'react';
import MyTable from '../../../components/MyTable';
import PageLayout from '../../../components/PageLayout';
import MyDialog from '../../../components/MyDialog';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useTable from '../../../hooks/useTable';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  addCustomer,
  deleteCustomer,
  editCustomer,
  getUser,
} from '../../../store/users';
import { useDispatch } from 'react-redux';
import PageHeading from '../../../components/PageHeading';
import { useNavigate, useParams } from 'react-router-dom';
import userImage from '../../../assets/userImage.png';
import { deleteDaily, editDaily, getDaily } from '../../../store//dailyRows';
const PAGE_TITLE = 'الزبائن';
const COLUMNS = [
  {
    id: 'id',
    label: 'رقم الفاتورة',
    minWidth: 80,
    align: 'center',
  },
  {
    id: 'value',
    label: 'المبلغ',
    minWidth: 100,
    align: 'center',
    isField: true,
    required: true,
    isBill: true,
  },
  {
    id: 'values',
    label: 'القيمة',
    minWidth: 80,
    align: 'center',
    isField: true,
    isBill: true,
    required: true,
  },
  {
    id: 'billType',
    label: 'النوع',
    minWidth: 150,
    align: 'center',
    isField: false,
    required: true,
    options: [
      { value: 'سحوبات', id: 'سحوبات' },
      { value: 'مصروف', id: 'مصروف' },
      { value: 'ادخال', id: 'ادخال' },
      { value: 'صادر', id: 'صادر' },
    ],
  },
  {
    id: 'note',
    label: 'ملاحظة',
    minWidth: 170,
    align: 'left',
    isField: true,
  },
  {
    id: 'createdAt',
    label: 'التاريخ',
    minWidth: 200,
    align: 'center',
  },
];
const DAILY_ROW_INTIAL_VALUE = {
  value: 0,
  values: 0,
  billType: 'ادخال',
  note: '',
};
const validationSchema = Yup.object().shape({
  value: Yup.string().required('المبلغ مطلوب'),
  values: Yup.string().required('القيمة مطلوبة'),
  billType: Yup.string().required('نوع الفاتورة مطلوب'),
  note: Yup.string(),
});
const index = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const pageFields = [
    { fieldName: 'رقم الحساب', value: user.id || 'لايوجد' },
    { fieldName: 'النوع', value: user.userType || 'لايوجد' },

    { fieldName: 'رقم الهاتف', value: user.mobileNumber || 'لايوجد' },

    { fieldName: 'العنوان', value: user.address || 'لايوجد' },
    { fieldName: 'ملاحظة', value: user.note || 'لايوجد' },
    {
      fieldName: 'صافي الحساب',
      value: user.accountBalance || 'لايوجد',
      isMoney: true,
    },
    {
      fieldName: 'قيمة صافي الحساب',
      value: user.accountBalanceValues || 'لايوجد',
      isMoney: true,
    },
  ];
  const { dialog, setDialog } = useTable(DAILY_ROW_INTIAL_VALUE);
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.dailyRows.data);
  const dispatchers = {
    edit: (editedDaily) => {
      dispatch(
        editDaily({
          ...editedDaily,
          value: parseInt(editedDaily.value),
          values: parseInt(editedDaily.values),
          userId: editedDaily.UserId,
        })
      ).then(() => dispatch(getUser(params.id)));
    },
    delete: (customerId) =>
      dispatch(deleteDaily(customerId)).then(() =>
        dispatch(getUser(params.id))
      ),
  };

  useEffect(() => {
    dispatch(getUser(params.id));
  }, []);
  useEffect(() => {
    dispatch(
      getDaily({
        all: true,
        userId: params.id,
        isDaily: false,
      })
    );
  }, []);

  return (
    <PageLayout title="صفحة زبون">
      <Box>
        <Box sx={{ width: '100px', overflow: 'hidden', margin: 'auto', mb: 3 }}>
          <img
            src={userImage}
            alt="user image"
            width="100%"
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Box sx={{ mb: 6 }}>
          <Typography
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: '2rem',
              mb: 4,
            }}
          >
            {user.name}
          </Typography>
          {pageFields.map((pf) => (
            <Box sx={{ mb: 3 }} key={pf.fieldName}>
              <Typography
                sx={{
                  display: 'inline-block',
                  mr: 4,
                  fontWeight: 'bold',
                  fontSize: '1.3rem',
                  minWidth: '120px',
                }}
              >
                {`${pf.fieldName}:`}
              </Typography>
              <Typography
                sx={{
                  display: 'inline-block',
                  direction: pf.isMoney && 'rtl',
                  textAlign: pf.isMoney && 'center',

                  color: pf.isMoney
                    ? pf.value >= 0
                      ? 'green'
                      : 'tomato'
                    : 'inherit',
                  fontSize: '1.3rem',
                  fontWeight: pf.isMoney && 'bold',
                  minWidth: '120px',
                }}
              >
                {`${pf.value}`}
              </Typography>
            </Box>
          ))}
        </Box>
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
      </Box>
    </PageLayout>
  );
};

export default index;
