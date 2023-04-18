import { useState } from 'react';

export default (ROW_INTIAL_VALUE) => {
  const [dialog, setDialog] = useState({
    status: false,
    selectedRow: ROW_INTIAL_VALUE,
    editing: false,
  });

  const handleOpenAddDialog = () => {
    setDialog(() => ({
      editing: false,
      selectedRow: ROW_INTIAL_VALUE,
      status: true,
    }));
  };

  return { dialog, setDialog, handleOpenAddDialog };
};
