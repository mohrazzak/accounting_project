import React, { useEffect, useState } from 'react';
import PageLayout from '../../../components/PageLayout';
// import { AiOutlineCloseCircle } from 'react-icons/ai';
import { XCircle as AiOutlineCloseCircle } from 'react-feather';

const PAGE_TITLE = 'انشاء فاتورة';
import { Formik, Form, Field, FieldArray, useFormik } from 'formik';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { TextField, Select } from 'formik-material-ui';

import {
  FormControl,
  InputLabel,
  TextField as MUI_TextField,
  MenuItem,
} from '@mui/material';

import { object, number, string, array } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../store/products';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { addDaily } from '../../../store/dailyRows';

const AddShopInvoice = (props) => {
  const [formSubmitted, setFormSubmitted] = useState(false); // Add formSubmitted state variable
  const navigate = useNavigate();
  const { isSuccess } = useSelector((state) => state.dailyRows);
  const params = useParams();
  const data = useSelector((state) => state.products);
  const products = data?.data.map((product) => ({
    label: product.name,
    id: product.id,
  }));

  const dispatchers = {
    add: (rows) => {
      const { totalValue, totalValues } = rows.products.reduce(
        (acc, product) => {
          const productValue = product.value * product.count;
          const productValues = product.values * product.count;
          acc.totalValue += productValue;
          acc.totalValues += productValues;
          return acc;
        },
        { totalValue: 0, totalValues: 0 }
      );
      const products = rows.products.map((row) => ({
        ProductId: row.id,
        count: row.count,
        value: row.value,
        values: row.values,
        note: row.note,
      }));

      dispatch(
        addDaily({
          products,
          note: rows.note,
          userId: params.shopId,
          value: totalValue,
          values: totalValues,
          billType: 'ادخال',
          isDaily: false,
        })
      );
    },
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    if (isSuccess && formSubmitted) {
      // Redirect logic here
      navigate(-1);
    }
  }, [isSuccess]);

  return (
    <PageLayout title={`صفحة ${PAGE_TITLE}`}>
      <Formik
        initialValues={{
          products: [{ id: '', count: '', value: '', values: '', note: '' }],
          note: '',
        }}
        validationSchema={object({
          products: array(
            object({
              id: string().required('يرجى اختيار المنتج'),
              count: number()
                .min(1, 'يرجى كتابة عدد اكبر من الصفر')
                .required('يرجى تحديد عدد البضاعة'),
              value: number().required('يرجى كتابة المبلغ'),
              values: number()
                .min(1, 'يرجى كتابة عدد اكبر من الصفر')
                .required('يرجى كتابة القيمة'),
              note: string(),
            })
          ).min(1, 'يرجى اضافة منتج واحد على الاقل للفاتورة'),
          note: string(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatchers.add(values);
          setSubmitting(false);
          setFormSubmitted(true);
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
        }) => (
          <Form autoComplete="off">
            <Grid container>
              <Field
                name={`note`}
                component={TextField}
                label={'ملاحظة الفاتورة'}
                fullWidth
                sx={{ mb: 3 }}
              />
              <FieldArray name="products">
                {({ push, remove }) => (
                  <>
                    <Grid container>
                      {values.products.map((_, index) => (
                        <Box
                          key={index}
                          sx={{
                            width: '100%',
                            p: 2,
                            mb: 3,
                            boxShadow: '0px 0px 10px 1px #0d0d0d4a',
                            borderRadius: '.5rem',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              mb: 2,
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '1.3rem',
                                width: '100%',
                              }}
                            >
                              المنتج رقم {index + 1}
                            </Typography>
                            <IconButton
                              onClick={() => remove(index)}
                              variant="outlined"
                              color="error"
                              size="large"
                            >
                              <AiOutlineCloseCircle />
                            </IconButton>
                          </Box>
                          <Grid item sx={{ width: '100%' }}>
                            <FormControl
                              fullWidth
                              sx={{ mb: 3 }}
                              error={
                                touched?.products?.[`${index}`]?.id &&
                                Boolean(errors?.products?.[`${index}`]?.id)
                              }
                            >
                              <Field
                                component={Select}
                                fullWidth={true}
                                sx={{ width: '100%' }}
                                name={`products.[${index}].id`}
                                id="product-select"
                                label="المنتج"
                                onChange={handleChange}
                                value={values.products[index]?.id || ''}
                                error={
                                  touched?.products?.[`${index}`]?.id &&
                                  !!errors?.products?.[`${index}`]?.id
                                }
                              >
                                {products.map((product) => (
                                  <MenuItem value={product.id} key={product.id}>
                                    {product.label}
                                  </MenuItem>
                                ))}
                              </Field>
                            </FormControl>
                          </Grid>
                          <Grid item sx={{ width: '100%' }}>
                            <Field
                              name={`products.[${index}].count`}
                              type="number"
                              component={TextField}
                              label="العدد"
                              fullWidth
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item sx={{ width: '100%' }}>
                            <Field
                              name={`products.[${index}].value`}
                              type="number"
                              component={TextField}
                              label="المبلغ للواحدة"
                              fullWidth
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item sx={{ width: '100%' }}>
                            <Field
                              name={`products.[${index}].values`}
                              type="number"
                              component={TextField}
                              label="القيمة للواحدة"
                              fullWidth
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                          <Grid item sx={{ width: '100%' }}>
                            <Field
                              name={`products.[${index}].note`}
                              component={TextField}
                              label="ملاحظة"
                              fullWidth
                              sx={{ mb: 3 }}
                            />
                          </Grid>
                        </Box>
                      ))}
                      <Grid
                        container
                        sx={{ width: '100%' }}
                        spacing={3}
                        justifyContent={'space-between'}
                      >
                        <Grid item sx={{ width: '50%' }}>
                          <Button
                            onClick={() =>
                              push({
                                id: '',
                                count: '',
                                value: '',
                                values: '',
                                note: '',
                              })
                            }
                            fullWidth
                            variant="outlined"
                            color="info"
                          >
                            اضافة منتج جديد
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )}
              </FieldArray>
              <Grid item sx={{ direction: 'rtl', width: '100%' }}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ p: 2, mt: 3 }}
                  type="submit"
                  fullWidth
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting && (
                      <CircularProgress size={'1rem'} sx={{ ml: 2 }} />
                    )
                  }
                >
                  {isSubmitting ? 'جاري الانشاء' : 'انشاء الفاتورة'}
                </Button>
                <Typography
                  sx={{
                    color: 'tomato',
                    mt: 3,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {values.products.length === 0 &&
                    'يرجى تحديد منتج واحد على الاقل'}
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </PageLayout>
  );
};

export default AddShopInvoice;
