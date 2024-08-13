import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid, Box, Divider, Typography } from '@mui/material';

export const CreateDialog = ({ open, onClose, onCreate }) => {
  const [newDriver, setNewDriver] = useState({
    movilCode: '',
    personalInfo: {
      fullName: '',
      idNumber: '',
      dateOfBirth: '',
      homeAddress: '',
      phone: '',
      cellPhone: '',
      personalReference: {
        name: '',
        phone: '',
        cellPhone: ''
      }
    },
    vehicleInfo: {
      brand: '',
      model: '',
      color: '',
      licensePlateNumber: '',
      type: ''
    },
    additionalInfo: {
      entryDate: '',
      guaranteeType: '',
      vehicleNumber: '',
      radioBrand: ''
    }
  });

  const handleChange = (section, field, value) => {
    setNewDriver(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    onCreate(newDriver);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle><b>CREAR NUEVO CONDUCTOR</b></DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h6">Información Personal</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <TextField
                label="Nombre Completo"
                value={newDriver.personalInfo.fullName}
                onChange={(e) => handleChange('personalInfo', 'fullName', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número de ID"
                value={newDriver.personalInfo.idNumber}
                onChange={(e) => handleChange('personalInfo', 'idNumber', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Fecha de Nacimiento"
                type="date"
                value={newDriver.personalInfo.dateOfBirth}
                onChange={(e) => handleChange('personalInfo', 'dateOfBirth', e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Dirección"
                value={newDriver.personalInfo.homeAddress}
                onChange={(e) => handleChange('personalInfo', 'homeAddress', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                value={newDriver.personalInfo.phone}
                onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Celular"
                value={newDriver.personalInfo.cellPhone}
                onChange={(e) => handleChange('personalInfo', 'cellPhone', e.target.value)}
                fullWidth
                margin="normal"
              />
              <Typography variant="h6" sx={{ marginTop: 2 }}>Referencia Personal</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <TextField
                label="Nombre"
                value={newDriver.personalInfo.personalReference.name}
                onChange={(e) => handleChange('personalInfo', 'personalReference.name', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Teléfono"
                value={newDriver.personalInfo.personalReference.phone}
                onChange={(e) => handleChange('personalInfo', 'personalReference.phone', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Celular"
                value={newDriver.personalInfo.personalReference.cellPhone}
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
                value={newDriver.vehicleInfo.brand}
                onChange={(e) => handleChange('vehicleInfo', 'brand', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Modelo"
                value={newDriver.vehicleInfo.model}
                onChange={(e) => handleChange('vehicleInfo', 'model', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Color"
                value={newDriver.vehicleInfo.color}
                onChange={(e) => handleChange('vehicleInfo', 'color', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número de Placa"
                value={newDriver.vehicleInfo.licensePlateNumber}
                onChange={(e) => handleChange('vehicleInfo', 'licensePlateNumber', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Tipo"
                value={newDriver.vehicleInfo.type}
                onChange={(e) => handleChange('vehicleInfo', 'type', e.target.value)}
                fullWidth
                margin="normal"
              />
              <Typography variant="h6" sx={{ marginTop: 2 }}>Información Adicional</Typography>
              <Divider sx={{ marginBottom: 2 }} />
              <TextField
                label="Fecha de Ingreso"
                type="date"
                value={newDriver.additionalInfo.entryDate}
                onChange={(e) => handleChange('additionalInfo', 'entryDate', e.target.value)}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Tipo de Garantía"
                value={newDriver.additionalInfo.guaranteeType}
                onChange={(e) => handleChange('additionalInfo', 'guaranteeType', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Número de Vehículo"
                value={newDriver.additionalInfo.vehicleNumber}
                onChange={(e) => handleChange('additionalInfo', 'vehicleNumber', e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Marca del Radio"
                value={newDriver.additionalInfo.radioBrand}
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
        <Button onClick={handleSubmit} color="primary">Crear</Button>
      </DialogActions>
    </Dialog>
  );
};
