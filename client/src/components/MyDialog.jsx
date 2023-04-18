import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';

export default function MyDialog({
  title,
  dialog,
  setDialog,
  ROW_INTIAL_VALUE,
  validationSchema,
  FIELDS,
  rows,
  dispatchers = { add: () => {}, edit: () => {}, delete: () => {} },
}) {
  const handleResetDialog = () => {
    setDialog(() => ({
      selectedRow: ROW_INTIAL_VALUE,
      status: false,
      editing: false,
    }));
  };
  const formik = useFormik({
    initialValues: ROW_INTIAL_VALUE,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (!dialog.editing)
        dispatchers.add({
          ...values,
          value: parseInt(values.value),
          values: parseInt(values.values),
          // invoice: (Math.floor(Math.random() * 91) + 10).toString(),
        });
      else {
        dispatchers.edit(values);
      }
      formik.handleReset();
      handleResetDialog();
    },
    onReset: (values) => {
      handleResetDialog();
    },
  });

  useEffect(() => {
    if (rows?.length > 0) {
      const columns = Object.keys(rows[0]);
      columns.map((column) => {
        formik.setFieldValue(column, dialog.selectedRow[column]);
      });
    }
  }, [dialog.editing]);


  return (
    <div style={{ textAlign: 'center' }}>
      <form autoComplete="off">
        <Dialog open={dialog.status} onClose={formik.handleReset}>
          <DialogTitle textAlign="center" sx={{ fontweight: 'bold' }}>
            {title}
          </DialogTitle>
          <DialogContent>
            <Box>
              <DialogContentText sx={{ mb: 2 }}>
                يرجى كتابة المعلومات الأساسية وترك الحقل فارغ في حال عدم الحاجة
                له
              </DialogContentText>
              {FIELDS.map((field, i) => {
                if (field?.options) {
                  return (
                    <FormControl
                      key={i}
                      fullWidth
                      sx={{ mb: 3 }}
                      error={
                        formik.touched[field.id] &&
                        Boolean(formik.errors[field.id])
                      }
                    >
                      <InputLabel
                        id={`${field.id}-label`}
                        error={
                          formik.touched[field.id] &&
                          Boolean(formik.errors[field.id])
                        }
                      >
                        {field.label}
                      </InputLabel>
                      <Select
                        labelId={`${field.id}-label`}
                        id={`${field.id}`}
                        name={field.id}
                        value={formik.values[field.id]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label={field.label}
                        error={
                          formik.touched[field.accountId] &&
                          Boolean(formik.errors[field.id])
                        }
                      >
                        {checkIfRelatedToUsers(field.options)
                          ? [
                              field.options.map((option) => {
                                if (option.type === 'مصروف')
                                  return (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.value}
                                    </MenuItem>
                                  );
                              }),
                              <ListSubheader
                                key={'customers-select'}
                                sx={{
                                  borderTop: '2px solid black',
                                  color: 'GrayText',
                                }}
                              >
                                {'- الزبائن'}
                              </ListSubheader>,
                              field.options.map((option) => {
                                if (option.type === 'زبون')
                                  return (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.value}
                                    </MenuItem>
                                  );
                              }),
                              <ListSubheader
                                key={'shops-select'}
                                sx={{
                                  borderTop: '2px solid black',
                                  color: 'GrayText',
                                }}
                              >
                                {'- تجار السوق'}
                              </ListSubheader>,
                              field.options.map((option) => {
                                if (option.type === 'تاجر سوق')
                                  return (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.value}
                                    </MenuItem>
                                  );
                              }),
                              <ListSubheader
                                key={'partner-select'}
                                sx={{
                                  borderTop: '2px solid black',
                                  color: 'GrayText',
                                }}
                              >
                                {'- الشركاء'}
                              </ListSubheader>,
                              field.options.map((option) => {
                                if (option.type === 'شريك')
                                  return (
                                    <MenuItem key={option.id} value={option.id}>
                                      {option.value}
                                    </MenuItem>
                                  );
                              }),
                            ]
                          : field.options.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.value}
                              </MenuItem>
                            ))}
                      </Select>
                      {formik.touched[field.id] && formik.errors[field.id] && (
                        <FormHelperText>
                          {formik.errors[field.id]}
                        </FormHelperText>
                      )}
                    </FormControl>
                  );
                }
                return (
                  <TextField
                    key={i}
                    name={field.id}
                    margin="dense"
                    onBlur={formik.handleBlur}
                    fullWidth
                    variant="standard"
                    label={field.label}
                    type={field.type}
                    onChange={formik.handleChange}
                    value={formik.values[field.id]}
                    error={
                      formik.touched[field.id] &&
                      Boolean(formik.errors[field.id])
                    }
                    helperText={
                      formik.touched[field.id] && formik.errors[field.id]
                    }
                    sx={{ mb: 3 }}
                  />
                );
              })}
            </Box>
          </DialogContent>
          <DialogActions dir="ltr" sx={{ p: 2 }}>
            <Button
              onClick={formik.handleReset}
              color="error"
              variant="outlined"
              sx={{ ml: 3 }}
            >
              الغاء
            </Button>
            <Button
              onClick={formik.handleSubmit}
              color="success"
              variant="outlined"
            >
              {dialog.editing ? 'تعديل' : 'انشاء'}
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
}

function checkIfRelatedToUsers(options) {
  return options.some((option) => option.type);
}

const RenderCustomers = ({ options }) => {
  const returnedArr = [];

  returnedArr.push(
    <MenuItem key={`${options[0].id}-menuItem`} value={options[0].value}>
      {options[0].value}
    </MenuItem>
  );
  // });
  return [
    <MenuItem key={`${options[0].id}-menuItem`} value={options[0].value}>
      {options[0].value}
    </MenuItem>,
  ];
};
