import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import driversEndpoints from '../../../services/drivers';
import { CreateDriverButton } from './createDriverButton';
import { DisplayDriversTable } from './displayDriversTable';
import { useLogout } from '../../../helpers/logout';

export const DriversMain = () => {
  const [refreshState, setRefreshState] = useState(false);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    getDrivers()
  }, [refreshState]);

  const refresh = () => {
    setRefreshState(prevState => !prevState);
  };

  const getDrivers = async () => {
    try {
      const response = await driversEndpoints.getDrivers();
      console.log('Response', response);
      setDrivers(response.drivers);
    } catch (error) {
      if (error.response.status === 498) {
        useLogout();
      }
      console.error('Error fetching users:', error);
    }
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Conductores
      </Typography>
      <Box mb={2}>
        <CreateDriverButton drivers={drivers} setDrivers={setDrivers} refresh={refresh} />
      </Box>
      <DisplayDriversTable drivers={drivers} setDrivers={setDrivers} refresh={refresh} />
    </>
  );
};
