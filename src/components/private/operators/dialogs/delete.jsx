import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useToast } from '../../feedback/toast';
import operatorsEndpoints from '../../../../services/operators';
import { useLogout } from '../../../../helpers/logout';

export const DeleteOperatorDialog = ({ open, onClose, operator, refresh }) => {
  const { handleOpenToast } = useToast();
  const [confirmName, setConfirmName] = useState('');

  const handleDelete = async () => {
    try {
      await operatorsEndpoints.deleteOperator(operator._id);
      refresh();
      handleClose();
      handleOpenToast("Operadora eliminada exitosamente", "success");
    } catch (error) {
      if (error.response.status === 498) {
        useLogout();
      }
      console.error("Error eliminando operadora:", error);
      handleOpenToast("Error al eliminar la operadora", "error");
    }
  };

  const handleClose = () => {
    setConfirmName('');
    onClose();
  };

  const isDeleteEnabled = confirmName === operator.user;

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && isDeleteEnabled) {
      handleDelete();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Eliminar Operadora</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          ¿Estás seguro de que deseas eliminar a la operadora <b>"{operator.user}"</b>?
          Esta acción no se puede deshacer.
        </Typography>
        <Typography variant="body2" color="error" gutterBottom>
          Para confirmar, escribe el usuario de la operadora:
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Usuario de la Operadora"
          type="text"
          fullWidth
          variant="outlined"
          value={confirmName}
          onChange={(e) => setConfirmName(e.target.value)}
          onKeyPress={handleKeyPress}
          required
        />
      </DialogContent>
      <DialogActions sx={{ mx: 2, mb: 1 }}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button 
          onClick={handleDelete} 
          disabled={!isDeleteEnabled} 
          variant="contained" 
          color="error"
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
