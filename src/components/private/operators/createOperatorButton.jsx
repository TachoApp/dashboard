import React, { useState } from 'react';
import { Button } from '@mui/material';
import { CreateOperatorDialog } from './dialogs/create';

export const CreateOperatorButton = ({ refresh }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        <b>Crear Operador</b>
      </Button>
      <CreateOperatorDialog open={open} onClose={handleClose} refresh={refresh} />
    </>
  );
};
