import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField } from '@mui/material';
import driversEndpoints from '../../../../services/drivers';
import { useToast } from '../../feedback/toast';

export const DeleteDialog = ({ open, onClose, driver, refresh }) => {
  const [confirmCode, setConfirmCode] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { handleOpenToast } = useToast();

  // Actualiza el estado del botón de eliminar en función del código ingresado
  useEffect(() => {
    if (confirmCode === driver?.movilCode) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [confirmCode, driver?.movilCode]);

  // Resetea el estado cuando el diálogo se cierra
  useEffect(() => {
    if (!open) {
      setConfirmCode('');
      setIsButtonDisabled(true);
    }
  }, [open]);

  const handleDelete = async () => {
    if (confirmCode === driver.movilCode) {
      try {
        await driversEndpoints.deleteDriver(driver._id); 
        refresh();
        handleOpenToast("Conductor eliminado exitosamente", "success");
        onClose();
      } catch (error) {
        console.error("Error eliminando conductor:", error);
        handleOpenToast("Error al eliminar el conductor", "error");
      }
    } else {
      handleOpenToast('El código del móvil no coincide.', 'warning');
    }
  };

  if (!driver) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle><b>ELIMINAR CONDUCTOR</b></DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro que deseas eliminar al conductor <strong>{driver.personalInfo.fullName}</strong>? 
          <br />
          Escribe el código del móvil <b>"{driver.movilCode}"</b> para confirmar la acción.
          <br />
          <Typography variant="body2" color="error" gutterBottom>
            Esta acción eliminará todos los datos relacionados con el conductor.
          </Typography>
        </Typography>
        <TextField
          label="Código Móvil"
          value={confirmCode}
          onChange={(e) => setConfirmCode(e.target.value)}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions sx={{mx: 2, mb: 1}}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleDelete} color="error" variant='contained' disabled={isButtonDisabled}>Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
};
