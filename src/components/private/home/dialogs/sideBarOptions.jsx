import React from "react";
import {
  Typography,
  TextField,
  Box,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

export const SideBarOptions = ({
  driverData,
  formData,
  onFormChange,
  clearAllPoints,
  onToggleDriverSelection = () => {},
  isSelectingDriver = false,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormChange({ ...formData, [name]: value });
  };

  const handleDeleteRoute = (index) => {
    if (index === 0 && formData.points.length > 1) {
      alert("No puedes eliminar el punto A si hay más rutas.");
      return;
    }

    const newPoints = formData.points.filter((_, i) => i !== index);
    onFormChange({ ...formData, points: newPoints });
  };

  const handleDriverSelection = () => {
    onToggleDriverSelection(!isSelectingDriver);
  };

  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto',
        pr: 2,
        '&::-webkit-scrollbar': {
          width: '8px',
          background: 'transparent',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(59, 135, 226, 0.6)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(59, 135, 226, 0.8)',
          }
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        // Firefox
        scrollbarWidth: 'thin',
        scrollbarColor: '#1976d2 transparent',
      }}
    >
      <Box sx={{ pb: 2 }}> {/* Padding bottom para evitar que el último elemento quede cortado */}
        <Typography sx={{ fontSize: 18, fontWeight: "bold", mb: 1 }} gutterBottom>
          Datos del usuario
        </Typography>
        <TextField
          label="Nombre"
          name="userName"
          autoComplete="new-password"
          value={formData.userName}
          onChange={handleInputChange}
          required
          sx={{ width: "100%", mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            label="Celular"
            name="userMobile"
            value={formData.userMobile}
            onChange={handleInputChange}
            sx={{ width: "48%" }}
          />
          <TextField
            label="Teléfono"
            name="userPhone"
            value={formData.userPhone}
            onChange={handleInputChange}
            sx={{ width: "48%" }}
          />
        </Box>

        <Typography
          gutterBottom
          sx={{ fontSize: 18, fontWeight: "bold", mt: 3, mb: 1 }}
        >
          Ruta de la carrera
        </Typography>
        {formData.points.length === 0 && (
          <Typography color="primary" sx={{ fontSize: 14 }}>
            - Haz click izquierdo en el mapa para agregar un punto de recojo y
            rutas a la carrera.
          </Typography>
        )}
        {formData.points.map((point, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Box
              sx={{
                width: 5,
                height: 30,
                backgroundColor: index === 0 ? "green" : "#3b87e2",
                mr: 1,
              }}
            />
            <Typography flexGrow={1} sx={{ fontSize: 14 }}>
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

        <Typography sx={{ fontSize: 18, fontWeight: "bold", mt: 3 }}>
          Detalles de la carrera
        </Typography>
        <TextField
          label="Tarifa"
          name="fee"
          type="number"
          value={formData.fee}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Método de pago</InputLabel>
          <Select
            value={formData.paymentMethod}
            name="paymentMethod"
            onChange={handleInputChange}
            label="Método de pago"
          >
            <MenuItem value="cash">Efectivo</MenuItem>
            <MenuItem value="qr">QR</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Comentarios"
          name="comments"
          multiline
          rows={2}
          value={formData.comments}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Typography
          sx={{ fontSize: 18, fontWeight: "bold", mt: 3, mb: 1 }}
          gutterBottom
        >
          Datos del móvil
        </Typography>

        <Box sx={{ mb: 2 }}>
          {driverData && driverData.fullName ? (
            <>
              <Box sx={{ mb: 2 }}>
                <Typography>
                  <strong>Nombre:</strong> {driverData.fullName}
                </Typography>
                <Typography>
                  <strong>Código:</strong> {driverData.movilCode}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={handleDriverSelection}
                startIcon={<PersonSearchIcon />}
                sx={{ mb: 1 }}
              >
                Seleccionar otro conductor
              </Button>
            </>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleDriverSelection}
              startIcon={<PersonSearchIcon />}
              sx={{ mb: 1, fontWeight: 'bold' }}
            >
              Seleccionar conductor
            </Button>
          )}
          {isSelectingDriver && (
            <Typography
              color="info.main"
              sx={{
                fontSize: 14,
                mt: 1,
                backgroundColor: "info.lighter",
                p: 1,
                borderRadius: 1,
              }}
            >
              Haz click sobre un conductor en el mapa para ver sus datos y
              seleccionarlo
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};