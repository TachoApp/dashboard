import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { useToast } from '../../feedback/toast';
import operatorsEndpoints from '../../../../services/operators';

export const UpdateOperatorDialog = ({ open, onClose, operatorData, refresh }) => {
  const { handleOpenToast } = useToast();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    setName(operatorData.name);
    setContact(operatorData.contact);
    setUsername(operatorData.user);
  }, [operatorData]);

  const hasChanges = () => {
    return (
      name !== operatorData.name ||
      contact !== operatorData.contact ||
      username !== operatorData.user
    );
  };

  const handleUpdate = async () => {
    const updatedData = {
      name,
      contact,
      user: username,
    };

    try {
      await operatorsEndpoints.updateOperator(operatorData._id, updatedData);
      refresh();
      handleClose();
      handleOpenToast("Operadora actualizada exitosamente", "success");
    } catch (error) {
      console.error("Error actualizando operadora:", error);
      handleOpenToast("Error al actualizar la operadora", "error");
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && hasChanges() && name && contact && username) {
      handleUpdate();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Editar Operadora</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          required
        />
        <TextField
          margin="dense"
          label="Contacto"
          type="text"
          fullWidth
          variant="outlined"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          onKeyPress={handleKeyPress}
          required
        />
        <TextField
          margin="dense"
          label="Usuario"
          type="text"
          fullWidth
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
          required
        />
      </DialogContent>
      <DialogActions sx={{ mx: 2, mb: 1 }}>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={handleUpdate}
          disabled={!hasChanges() || !name || !contact || !username}
          variant="contained"
        >
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};
