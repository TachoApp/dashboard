import React from 'react';
import { Typography, TextField, Box, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const SideBarOptions = ({ driverData, formData, onFormChange, clearAllPoints }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ ...formData, [name]: value });
  };

  const handleDeleteRoute = (index) => {
    if (index === 0 && formData.points.length > 1) {
      alert('No puedes eliminar el punto A si hay más rutas.');
      return;
    }

    const newPoints = formData.points.filter((_, i) => i !== index);
    onFormChange({ ...formData, points: newPoints });
  };

  return (
    <Box>
      <Typography sx={{ fontSize: 18, fontWeight: "bold" }} gutterBottom>Datos del móvil</Typography>
      <Typography>Nombre: {driverData.fullName}</Typography>
      <Typography>Código: {driverData.movilCode}</Typography>

      <Typography sx={{ fontSize: 18, fontWeight: "bold", mt: 3, mb: 2 }} gutterBottom>Datos del usuario</Typography>
      <TextField
        label="Nombre"
        name="userName"
        autoComplete='new-password'
        value={formData.userName}
        onChange={handleInputChange}
        required
        sx={{ width: '100%', mb: 2 }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <TextField
          label="Celular"
          name="userMobile"
          value={formData.userMobile}
          onChange={handleInputChange}
          sx={{ width: '48%' }}
        />
        <TextField
          label="Teléfono"
          name="userPhone"
          value={formData.userPhone}
          onChange={handleInputChange}
          sx={{ width: '48%' }}
        />
      </Box>


      <Typography gutterBottom sx={{ fontSize: 18, fontWeight: "bold", mt: 4, mb: 2 }}>Datos de la carrera</Typography>
      {formData.points.length === 0 && (
        <Typography color='primary' sx={{ fontSize: 14}}> 
          - Haz click izquierdo en el mapa para agregar un punto de recojo y rutas a la carrera.
        </Typography>
      )}
      {formData.points.map((point, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              width: 5,
              height: 30,
              backgroundColor: index === 0 ? 'green' : '#3b87e2',
              mr: 1
            }}
          />
          <Typography flexGrow={1} sx={{fontSize: 14}}>
            {`${String.fromCharCode(65 + index)}: ${point.name}`}
          </Typography>
          <IconButton
            onClick={() => handleDeleteRoute(index)}
            disabled={index === 0 && formData.points.length > 1}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}

      {formData.points.length > 0 && (
        <Button
        fullWidth
        color="error"
        variant="contained"
        onClick={clearAllPoints}
        sx={{ mt: 1 }}
      >
        Reiniciar rutas
      </Button>
      )}
    </Box>
  );
};
