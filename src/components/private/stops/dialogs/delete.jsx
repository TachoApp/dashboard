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
import driversEndpoints from '../../../../services/drivers';

export const DeleteStopDialog = ({ open, onClose, stop, refresh }) => {
  const { handleOpenToast } = useToast();
  const [confirmName, setConfirmName] = useState('');

  const handleDelete = async () => {
    try {
      await driversEndpoints.deleteDriversStop(stop._id);
      refresh();
      handleClose();
      handleOpenToast("Parada eliminada exitosamente", "success");
    } catch (error) {
      console.error("Error eliminando parada:", error);
      handleOpenToast("Error al eliminar la parada", "error");
    }
  };

  const handleClose = () => {
    setConfirmName('');
    onClose();
  };

  const isDeleteEnabled = confirmName === stop.name;

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && isDeleteEnabled) {
      handleDelete();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Eliminar Parada</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
          ¿Estás seguro de que deseas eliminar la parada <b>"{stop.name}"</b>?
          Esta acción no se puede deshacer.
        </Typography>
        <Typography variant="body2" color="error" gutterBottom>
          Para confirmar, escribe el nombre de la parada:
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre de la Parada"
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
