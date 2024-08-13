import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Box, Divider, Typography } from '@mui/material';

export const UpdateDialog = ({ open, onClose, driver, onUpdate }) => {
  const [updatedDriver, setUpdatedDriver] = useState(driver || {});

  useEffect(() => {
    setUpdatedDriver(driver || {});
  }, [driver]);

  const handleChange = (section, field, value) => {
    setUpdatedDriver(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    onUpdate(updatedDriver);
    onClose();
  };

  if (!driver) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>ACTUALIZAR CONDUCTOR</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6">Información Personal</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <TextField
                label="Nombre Completo"
                value={updatedDriver.personalInfo.fullName}
                onChange={(e) => handleChange('personalInfo', 'fullName', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número de ID"
                value={updatedDriver.personalInfo.idNumber}
                onChange={(e) => handleChange('personalInfo', 'idNumber', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Fecha de Nacimiento"
                type="date"
                value={updatedDriver.personalInfo.dateOfBirth}
                onChange={(e) => handleChange('personalInfo', 'dateOfBirth', e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
                            <TextField
                label="Dirección"
                value={updatedDriver.personalInfo.homeAddress}
                onChange={(e) => handleChange('personalInfo', 'homeAddress', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                value={updatedDriver.personalInfo.phone}
                onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Celular"
                value={updatedDriver.personalInfo.cellPhone}
                onChange={(e) => handleChange('personalInfo', 'cellPhone', e.target.value)}
                fullWidth
                margin="normal"
              />
              <Typography variant="h6" sx={{ marginTop: 2 }}>Referencia Personal</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <TextField
                label="Nombre"
                value={updatedDriver.personalInfo.personalReference.name}
                onChange={(e) => handleChange('personalInfo', 'personalReference.name', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                value={updatedDriver.personalInfo.personalReference.phone}
                onChange={(e) => handleChange('personalInfo', 'personalReference.phone', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Celular"
                value={updatedDriver.personalInfo.personalReference.cellPhone}
                onChange={(e) => handleChange('personalInfo', 'personalReference.cellPhone', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6">Información del Vehículo</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <TextField
                label="Marca"
                value={updatedDriver.vehicleInfo.brand}
                onChange={(e) => handleChange('vehicleInfo', 'brand', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Modelo"
                value={updatedDriver.vehicleInfo.model}
                onChange={(e) => handleChange('vehicleInfo', 'model', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Color"
                value={updatedDriver.vehicleInfo.color}
                onChange={(e) => handleChange('vehicleInfo', 'color', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número de Placa"
                value={updatedDriver.vehicleInfo.licensePlateNumber}
                onChange={(e) => handleChange('vehicleInfo', 'licensePlateNumber', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Tipo"
                value={updatedDriver.vehicleInfo.type}
                onChange={(e) => handleChange('vehicleInfo', 'type', e.target.value)}
                fullWidth
                margin="normal"
              />
              <Typography variant="h6" sx={{ marginTop: 2 }}>Información Adicional</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <TextField
                label="Fecha de Ingreso"
                type="date"
                value={updatedDriver.additionalInfo.entryDate}
                onChange={(e) => handleChange('additionalInfo', 'entryDate', e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Tipo de Garantía"
                value={updatedDriver.additionalInfo.guaranteeType}
                onChange={(e) => handleChange('additionalInfo', 'guaranteeType', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número de Vehículo"
                value={updatedDriver.additionalInfo.vehicleNumber}
                onChange={(e) => handleChange('additionalInfo', 'vehicleNumber', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Marca del Radio"
                value={updatedDriver.additionalInfo.radioBrand}
                onChange={(e) => handleChange('additionalInfo', 'radioBrand', e.target.value)}
                fullWidth
                margin="normal"
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{mx: 2, mb: 1}}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} color="primary">Actualizar</Button>
      </DialogActions>
    </Dialog>
  );
};
