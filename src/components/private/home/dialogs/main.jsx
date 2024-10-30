import React, { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button, Box, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReplayIcon from '@mui/icons-material/Replay';
import { SideBarOptions } from './sideBarOptions';
import { RideMap } from './rideMap';
import ridesEndpoints from '../../../../services/rides';
import { useLogout } from '../../../../helpers/logout';
import { useToast } from '../../feedback/toast';

const initialFormState = {
  userName: '',
  userPhone: '',
  userMobile: '',
  points: [],
  fee: '',
  paymentMethod: '',
  comments: '',
  selectedDriver: null,
};

export const ManualRideDialog = ({ open, onClose, availableDrivers, getRides }) => {
  const { handleOpenToast } = useToast();
  const [isSelectingDriver, setIsSelectingDriver] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
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

  const handleDriverSelection = (driver) => {
    const updatedFormData = {
      ...formData,
      selectedDriver: {
        driverId: driver.driverId,
        fullName: driver.fullName,
        movilCode: driver.movilCode
      }
    };
    setFormData(updatedFormData);
    validateForm(updatedFormData); 
    setIsSelectingDriver(false);
  };

  const clearAllPoints = useCallback(() => {
    setFormData(prev => ({ ...prev, points: [] }));
    validateForm({ ...formData, points: [] });
  }, [formData, validateForm]);

  const resetForm = useCallback(() => {
    setFormData(initialFormState);
    setIsFormValid(false);
    setIsSelectingDriver(false);
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
        driverId: formData.selectedDriver.driverId
      },
      type: "manual"
    };

    try {
      const response = await ridesEndpoints.createManualRide(payload);
      console.log(response);
      getRides()
      handleOpenToast("Carrera manual creada exitosamente", "success");
      resetForm(); // Reset del formulario después de crear exitosamente
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 498) {
        useLogout();
      }
      console.error(error);
      handleOpenToast("Hubo un problema al crear la carrera manual", "error");
    }
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

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
              driverData={formData.selectedDriver}
              formData={formData}
              onFormChange={handleFormChange}
              clearAllPoints={clearAllPoints}
              onToggleDriverSelection={setIsSelectingDriver}
              isSelectingDriver={isSelectingDriver}
            />
          </Box>
          <Box flexGrow={1}>
            <RideMap
              points={formData.points}
              onPointsUpdate={handleMapUpdate}
              availableDrivers={isSelectingDriver ? availableDrivers : []}
              onDriverSelect={handleDriverSelection}
              selectedDriver={formData.selectedDriver?.driverId}
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