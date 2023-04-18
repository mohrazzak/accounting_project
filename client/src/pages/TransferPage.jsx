import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import TableSubHeader from '../components/TableSubHeader';
import Box from '@mui/material/Box';
import { number, object, string } from 'yup';
import { Field, Form, Formik, useFormikContext } from 'formik';
import { Switch, TextField, Select } from 'formik-material-ui';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Swal from 'sweetalert2';
import api from '../api';

const TransferPage = () => {
  const [valueToValues, setValueToValues] = useState(true);
  useEffect(() => {}, []);
  return (
    <PageLayout>
      <TableSubHeader title="التحويل" />
      <Box>
        <Formik
          initialValues={{
            value: 0,
            values: 0,
            price: 0,
            transferType: '',
          }}
          validationSchema={object({
            value: number()
              // .min(1, 'يرجى تحويل مبلغ اكثر من الصفر')
              .required('يرجى كتابة المبلغ المراد تحويله'),
            values: number()
              // .min(1, 'يرجى تحويل قيمة اكثر من الصفر')
              .required('يرجى كتابة القيمة المراد تحويلها'),
            price: number()
              .min(1, 'السعر يجب ان يكون اكثر من الصفر')
              .required('يرجى كتابة السعر للواحدة'),
            transferType: string().required('يرجى كتابة نوع التحويل'),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (values.transferType === 'valueToValues') {
              console.log(values.values);
              values.values = values.value / values.price || 0;
            } else if (values.transferType === 'valuesToValue') {
              values.value = values.values * values.price || 0;
            }
            if (
              parseInt(values.values, 10) === 0 ||
              parseInt(values.value, 10) === 0 ||
              parseInt(values.price, 10) === 0
            ) {
              Swal.fire('حدث خطأ', 'لايمكنك التحويل بقيم صفرية', 'error');
              console.log(values);
              setSubmitting(false);
              return;
            }
            console.log(values);
            await api.post('/bills/transfer', values);
            setSubmitting(false);
          }}
          enableReinitialize={true}
        >
          {({ values, isSubmitting, handleChange }) => (
            <Form autoComplete="off">
              <Grid container>
                <Grid
                  item
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                    mb: 3,
                  }}
                >
                  <FormControl fullWidth>
                    <Field
                      component={Select}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="transferType"
                      onChange={handleChange}
                      label="نوع التحويل"
                    >
                      <MenuItem value={'valueToValues'}>
                        من المبلغ للقيمة
                      </MenuItem>
                      <MenuItem value={'valuesToValue'}>
                        من القيمة للمبلغ
                      </MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item sx={{ width: '100%' }}>
                  <Field
                    name={'price'}
                    color="success"
                    component={TextField}
                    label={`السعر للواحدة`}
                    fullWidth
                    sx={{ mb: 3 }}
                  />
                </Grid>
                {values.transferType === 'valueToValues' ? (
                  <>
                    <Grid item sx={{ width: '100%' }}>
                      <Field
                        name={`value`}
                        component={TextField}
                        color="success"
                        fullWidth
                        label={'المبلغ'}
                        value={
                          values.transferType === 'valuesToValue'
                            ? values.values * values.price || 0
                            : values.value
                        }
                        sx={{ mb: 3 }}
                        variant={
                          values.transferType === 'valuesToValue'
                            ? 'filled'
                            : 'outlined'
                        }
                        disabled={
                          values.transferType === 'valuesToValue' ||
                          isSubmitting
                        }
                      />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                      <Field
                        name={`values`}
                        component={TextField}
                        label={'القيمة'}
                        fullWidth
                        value={
                          values.transferType === 'valueToValues'
                            ? values.value / values.price || 0
                            : values.values
                        }
                        sx={{ mb: 3 }}
                        variant={
                          values.transferType === 'valueToValues'
                            ? 'filled'
                            : 'outlined'
                        }
                        disabled={
                          values.transferType === 'valueToValues' ||
                          isSubmitting
                        }
                      />
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item sx={{ width: '100%' }}>
                      <Field
                        name={`values`}
                        component={TextField}
                        label={'القيمة'}
                        fullWidth
                        value={
                          values.transferType === 'valueToValues'
                            ? values.value / values.price || 0
                            : values.values
                        }
                        sx={{ mb: 3 }}
                        variant={
                          values.transferType === 'valueToValues'
                            ? 'filled'
                            : 'outlined'
                        }
                        disabled={values.transferType === 'valueToValues'}
                      />
                    </Grid>
                    <Grid item sx={{ width: '100%' }}>
                      <Field
                        name={`value`}
                        component={TextField}
                        color="success"
                        fullWidth
                        label={'المبلغ'}
                        value={
                          values.transferType === 'valuesToValue'
                            ? values.values * values.price || 0
                            : values.value
                        }
                        sx={{ mb: 3 }}
                        variant={
                          values.transferType === 'valuesToValue'
                            ? 'filled'
                            : 'outlined'
                        }
                        disabled={values.transferType === 'valuesToValue'}
                      />
                    </Grid>
                  </>
                )}

                <Grid item sx={{ direction: 'rtl', width: '100%' }}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ p: 2, mt: 3 }}
                    type="submit"
                    disabled={isSubmitting}
                    fullWidth
                    startIcon={
                      isSubmitting && (
                        <CircularProgress size={'1rem'} sx={{ ml: 2 }} />
                      )
                    }
                  >
                    {isSubmitting ? 'جاري الانشاء' : 'التحويل'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </PageLayout>
  );
};

export default TransferPage;
// <Box>
//   <Formik
//     initialValues={{
//       value: 0,
//       values: 0,
//       price: 0,
//       valueToValues: false,
//     }}
//     validationSchema={object({
//       value: number().required('يرجى كتابة المبلغ المراد تحويله'),
//       values: number().required('يرجى كتابة القيمة المراد تحويلها'),
//       price: number().required('يرجى كتابة السعر للواحدة'),
//     })}
//     onSubmit={(values) => {
//       console.log(values);
//     }}
//   >
//     {({ values, isSubmitting }) => (
//       <Form autoComplete="off">
//         <Grid container>
//           <Grid
//             item
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               width: '100%',
//               alignItems: 'center',
//               mb: 3,
//             }}
//           >
//             <Typography mx={2}>
//               {values.valueToValues
//                 ? 'من المبلغ للقيمة'
//                 : 'من القيمة للمبلغ'}
//             </Typography>
//             <Field
//               type={'checkbox'}
//               name={'valueToValues'}
//               component={Switch}
//               label={`من المبلغ للقيمة`}
//               color="success"
//             />
//           </Grid>
//           <Grid item sx={{ width: '100%' }}>
//             <Field
//               name={'price'}
//               component={TextField}
//               label={`السعر للواحدة`}
//               fullWidth
//               sx={{ mb: 3 }}
//             />
//           </Grid>
//           <Grid item sx={{ width: '100%' }}>
//             <Field
//               name={`values`}
//               component={TextField}
//               label={'القيمة'}
//               fullWidth
//               value={
//                 values.valueToValues
//                   ? values.values / values.price || 0
//                   : values.values
//               }
//               sx={{ mb: 3 }}
//             />
//           </Grid>
//           <Grid item sx={{ width: '100%' }}>
//             <Field
//               name={`value`}
//               component={TextField}
//               fullWidth
//               value={
//                 values.valueToValues
//                   ? values.value
//                   : values.price * values.values || 0
//               }
//               label={'المبلغ'}
//               sx={{ mb: 3 }}
//             />
//           </Grid>

//           <Grid item sx={{ direction: 'rtl', width: '100%' }}>
//             <Button
//               variant="contained"
//               color="success"
//               sx={{ p: 2, mt: 3 }}
//               type="submit"
//               disabled={isSubmitting}
//               fullWidth
//               startIcon={
//                 isSubmitting && (
//                   <CircularProgress size={'1rem'} sx={{ ml: 2 }} />
//                 )
//               }
//             >
//               {isSubmitting ? 'جاري الانشاء' : 'التحويل'}
//             </Button>
//           </Grid>
//         </Grid>
//       </Form>
//     )}
//   </Formik>
// </Box>;
