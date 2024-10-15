import React, { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Box, Tooltip, Typography, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import { SideBarOptions } from './sideBarOptions';
import { RideMap } from './rideMap';
import ridesEndpoints from '../../../../services/rides';
import { useLogout } from '../../../../helpers/logout';
import { useToast } from '../../feedback/toast';

export const ManualRideDialog = ({ open, onClose, availableDrivers }) => {
  const { handleOpenToast } = useToast();
  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    userMobile: '',
    points: [],
    fee: '',
    paymentMethod: '',
    comments: '',
    selectedDriver: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = useCallback((newData) => {
    setFormData(newData);
    validateForm(newData);
  }, []);

  const validateForm = useCallback((data) => {
    const isValid = data.userName && 
                    (data.userPhone || data.userMobile) && 
                    data.points.length >= 2 &&
                    data.fee &&
                    data.paymentMethod &&
                    data.selectedDriver;
    setIsFormValid(isValid);
  }, []);

  const handleMapUpdate = useCallback((newPoints) => {
    setFormData(prev => {
      const updatedData = { ...prev, points: newPoints };
      validateForm(updatedData);
      return updatedData;
    });
  }, [validateForm]);

  const clearAllPoints = useCallback(() => {
    setFormData(prev => ({ ...prev, points: [] }));
    setIsFormValid(false);
  }, []);

  const handleSubmit = async () => {
    const payload = {
      user: {
        name: formData.userName,
        cellphone: formData.userMobile,
        phone: formData.userPhone
      },
      locations: formData.points.map((point, index) => ({
        point: index + 1,
        lat: point.lat,
        lng: point.lng,
        direction: point.name
      })),
      ride: {
        fee: parseFloat(formData.fee),
        paymentMethod: formData.paymentMethod,
        comments: formData.comments
      },
      driver: {
        driverId: formData.selectedDriver
      },
      type: "manual"
    };

    console.log('Payload to be sent:', payload);

    try {
      const response = await ridesEndpoints.createManualRide(payload);
      console.log(response)
      handleOpenToast("Carrera manual creada exitosamente", "success");
    } catch (error) {
      if (error.response && error.response.status === 498) {
        useLogout();
      }
      console.error(error);
      handleOpenToast("Hubo un problema al crear la carrera manual", "error");
    }
    onClose();
  };

  // Find the selected driver's data
  const selectedDriverData = availableDrivers.find(driver => driver.driverId === formData.selectedDriver) || {};

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6"><b>ASIGNAR CARRERA MANUAL</b></Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Reiniciar rutas">
            <IconButton onClick={clearAllPoints}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
          <IconButton aria-label="close" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" height="calc(100vh - 154px)">
          <Box 
            width="350px" 
            pr={2} 
            sx={{ overflowY: 'auto', '::-webkit-scrollbar': { background: 'transparent' }, '::-webkit-scrollbar-thumb': { borderRadius: 8 } }}
          >
            <SideBarOptions
              driverData={selectedDriverData}
              formData={formData}
              onFormChange={handleFormChange}
              clearAllPoints={clearAllPoints}
            />
            <Typography sx={{ fontSize: 18, fontWeight: "bold", mt: 3, mb: 2 }}>Detalles de la carrera</Typography>
            <TextField
              label="Tarifa"
              name="fee"
              type="number"
              value={formData.fee}
              onChange={(e) => handleFormChange({ ...formData, fee: e.target.value })}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Método de pago</InputLabel>
              <Select
                value={formData.paymentMethod}
                onChange={(e) => handleFormChange({ ...formData, paymentMethod: e.target.value })}
                label="Método de pago"
              >
                <MenuItem value="cash">Efectivo</MenuItem>
                <MenuItem value="qr">QR</MenuItem>
                <MenuItem value="card">Tarjeta</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Comentarios"
              name="comments"
              multiline
              rows={4}
              value={formData.comments}
              onChange={(e) => handleFormChange({ ...formData, comments: e.target.value })}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Seleccionar conductor</InputLabel>
              <Select
                value={formData.selectedDriver}
                onChange={(e) => handleFormChange({ ...formData, selectedDriver: e.target.value })}
                label="Seleccionar conductor"
              >
                {availableDrivers.map((driver) => (
                  <MenuItem key={driver.driverId} value={driver.driverId}>
                    {`${driver.fullName} (${driver.movilCode})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box flexGrow={1}>
            <RideMap
              points={formData.points}
              onPointsUpdate={handleMapUpdate}
              availableDrivers={availableDrivers}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{mx: 2, mb: 1}}>
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid}
          variant="contained"
          color="primary"
          sx={{mt: -6}}
        >
          Crear carrera manual
        </Button>
      </DialogActions>
    </Dialog>
  );
};