import React, { useState } from 'react';
import { Button } from '@mui/material';
import { CreateDialog } from './dialogs/create';

export const CreateDriverButton = ({ refresh }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Crear Conductor
      </Button>
      <CreateDialog open={open} onClose={handleClose} refresh={refresh} />
    </>
  );
};
