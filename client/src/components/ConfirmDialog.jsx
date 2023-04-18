import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
const ConfirmDialog = ({
  openConfirm,
  setOpenConfirm,
  deletedLabel,
  dispatchers,
}) => {
  const confirmClick = () => {
    dispatchers.delete(openConfirm.id);
    setOpenConfirm({
      id: null,
      status: false,
    });
  };
  const exitClick = () => {
    setOpenConfirm((state) => ({ id: null, status: false }));
  };
  return (
    <Dialog
      open={openConfirm.status}
      onClose={() => setOpenConfirm(() => ({ id: null, status: false }))}
      aria-labelledby="confirmation-title"
      aria-describedby="confirmation-desc"
    >
      <DialogTitle id="confirmation-title">{'هل انت متاكد؟'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirmation-desc">
          {`سيتم حذف ${deletedLabel} من قاعدة البيانات للابد.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ direction: 'rtl', p: 4, pb: 2, pt: 1 }}>
        <Button onClick={exitClick} variant="contained" color="error">
          الغاء
        </Button>
        <Button
          onClick={confirmClick}
          autoFocus
          variant="contained"
          color="success"
          sx={{ marginRight: 'auto' }}
        >
          تأكيد
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
