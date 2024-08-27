import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography,
  Grid,
  Avatar,
  Divider
} from '@mui/material';

const API_IMAGES_URL = `${import.meta.env.VITE_BASE_URL}/`;

export const ShowInfoDialog = ({ open, onClose, driver }) => {
  if (!driver) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} container justifyContent="center">
            <Avatar 
              src={`${API_IMAGES_URL}${driver.personalInfo.profileImage}`}
              alt={driver.personalInfo.fullName}
              sx={{ width: 150, height: 150, border: '2px solid #ddd', mt: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              {driver.personalInfo.fullName}
            </Typography>
            <Divider sx={{ my: 3 }}/>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Código Móvil:</strong> {driver.movilCode}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>ID Número:</strong> {driver.personalInfo.idNumber}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Fecha de Nacimiento:</strong> {driver.personalInfo.dateOfBirth}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1" gutterBottom>
                  <strong>Teléfono:</strong> {driver.personalInfo.phone}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Celular:</strong> {driver.personalInfo.cellPhone}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              <b>Información del Vehículo</b>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Marca:</strong> {driver.vehicleInfo.brand}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Modelo:</strong> {driver.vehicleInfo.model}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Color:</strong> {driver.vehicleInfo.color}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Placa:</strong> {driver.vehicleInfo.licensePlateNumber}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Tipo:</strong> {driver.vehicleInfo.type}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              <b>Información Adicional</b>
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Fecha de Ingreso:</strong> {driver.additionalInfo.entryDate}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Tipo de Garantía:</strong> {driver.additionalInfo.guaranteeType}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Marca del Radio:</strong> {driver.additionalInfo.radioBrand}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{mx: 2, mb: 1}}>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
