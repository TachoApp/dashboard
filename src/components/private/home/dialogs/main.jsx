import React, { useState, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Box, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import { SideBarOptions } from './sideBarOptions';
import { RideMap } from './rideMap';

export const ManualRideDialog = ({ open, onClose, driverData }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    userMobile: '',
    points: []
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleFormChange = useCallback((newData) => {
    setFormData(newData);
    validateForm(newData);
  }, []);

  const validateForm = useCallback((data) => {
    const isValid = data.userName && (data.userPhone || data.userMobile) && data.points.length >= 2;
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

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <b>ASIGNAR CARRERA MANUAL</b>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title="Reiniciar rutas">
            <IconButton onClick={clearAllPoints}>
              <ReplayIcon />
            </IconButton>
          </Tooltip>
          <IconButton
            aria-label="close"
            onClick={onClose}
          >
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
              driverData={driverData}
              formData={formData}
              onFormChange={handleFormChange}
              clearAllPoints={clearAllPoints}
            />
          </Box>
          <Box flexGrow={1}>
            <RideMap
              points={formData.points}
              onPointsUpdate={handleMapUpdate}
              initialCenter={driverData.coordinates}
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
