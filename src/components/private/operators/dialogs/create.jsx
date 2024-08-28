import React, { useState } from 'react';
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

export const CreateOperatorDialog = ({ open, onClose, refresh }) => {
  const { handleOpenToast } = useToast();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [username, setUsername] = useState('');

  const handleCreate = async () => {
    const operatorData = {
      name,
      contact,
      user: username,
    };
    try {
      await operatorsEndpoints.createOperator(operatorData);
      refresh();
      handleClose();
      handleOpenToast("Operadora creada exitosamente", "success");
    } catch (error) {
      console.error("Error creando operadora:", error);
      handleOpenToast("Error al crear la operadora", "error");
    }
  };

  const handleClose = () => {
    setName('');
    setContact('');
    setUsername('');
    onClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && name && contact && username) {
      handleCreate();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear Nueva Operadora</DialogTitle>
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
          type="number"
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
          onClick={handleCreate}
          disabled={!name || !contact || !username}
          variant="contained"
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};
