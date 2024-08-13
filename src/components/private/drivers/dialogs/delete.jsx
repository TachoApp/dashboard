import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export const DeleteDialog = ({ open, onClose, driver, onDelete }) => {

  const handleDelete = () => {
    onDelete(driver.movilCode);
    onClose();
  };

  if (!driver) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle><b>ELIMINAR CONDUCTOR</b></DialogTitle>
      <DialogContent>
        <Typography>¿Estás seguro que deseas eliminar al conductor <strong>{driver.personalInfo.fullName}</strong>?</Typography>
      </DialogContent>
      <DialogActions sx={{mx: 2, mb: 1}}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleDelete} color="error">Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
};
