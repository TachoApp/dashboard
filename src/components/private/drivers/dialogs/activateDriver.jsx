import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import driversEndpoints from '../../../../services/drivers';
import { useToast } from '../../feedback/toast';

export const ActivateDriverDialog = ({ open, onClose, driver, refresh }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { handleOpenToast } = useToast();

  useEffect(() => {
    if (!open) {
      setIsButtonDisabled(false);
    }
  }, [open]);

  const handleActivate = async () => {
    try {
      await driversEndpoints.toggleDriverStatus(driver._id); 
      refresh();
      handleOpenToast("Conductor activado exitosamente por 24 horas", "success");
      onClose();
    } catch (error) {
      console.error("Error activando conductor:", error);
      handleOpenToast("Error al activar el conductor", "error");
    }
  };

  if (!driver) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle><b>ACTIVAR CONDUCTOR</b></DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro que deseas activar al conductor <strong>{driver.personalInfo.fullName}</strong>? 
          <br />
          Esta acción costará 1 crédito y tendrá una duración de 24 horas.
          <br />
          <Typography variant="body2" color="error" gutterBottom>
            Nota: Una vez realizado, el crédito no será reembolsable.
          </Typography>
        </Typography>
      </DialogContent>
      <DialogActions sx={{ mx: 2, mb: 1 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleActivate} sx={{fontWeight: 'bold'}} variant='contained' disabled={isButtonDisabled}>Activar</Button>
      </DialogActions>
    </Dialog>
  );
};
