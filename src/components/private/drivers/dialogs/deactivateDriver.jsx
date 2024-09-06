import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import driversEndpoints from '../../../../services/drivers';
import { useToast } from '../../feedback/toast';
import { useLogout } from '../../../../helpers/logout';

export const DeactivateDriverDialog = ({ open, onClose, driver, refresh }) => {
    console.log(driver)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { handleOpenToast } = useToast();

  useEffect(() => {
    if (!open) {
      setIsButtonDisabled(false);
    }
  }, [open]);

  const handleDeactivate = async () => {
    try {
      await driversEndpoints.toggleDriverStatus(driver._id); 
      refresh();
      handleOpenToast("Conductor desactivado exitosamente", "success");
      onClose();
    } catch (error) {
      if (error.response.status === 498) {
        useLogout();
      }
      console.error("Error desactivando conductor:", error);
      handleOpenToast("Error al desactivar el conductor", "error");
    }
  };

  if (!driver) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle><b>DESACTIVAR CONDUCTOR</b></DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro que deseas desactivar al conductor <strong>{driver.personalInfo.fullName}</strong>? 
          <br />
          <b>Cuidado: </b><u>Para volver a activar al conductor, deberás gastar otro crédito.</u> 
          <br />
        </Typography>
      </DialogContent>
      <DialogActions sx={{ mx: 2, mb: 1 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleDeactivate} sx={{fontWeight: 'bold'}}  color="error" variant='contained' disabled={isButtonDisabled}>Desactivar</Button>
      </DialogActions>
    </Dialog>
  );
};
