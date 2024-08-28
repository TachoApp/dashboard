import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import operatorsEndpoints from '../../../services/operators';
import { DisplayOperatorsTable } from './displayOperatorsTable';
import { CreateOperatorButton } from './createOperatorButton';

export const OperatorMain = () => {
  const [refreshState, setRefreshState] = useState(false);
  const [operators, setOperators] = useState([]);

  useEffect(() => {
    getOperators();
  }, [refreshState]);

  const refresh = () => {
    setRefreshState((prevState) => !prevState);
  };

  const getOperators = async () => {
    try {
      const response = await operatorsEndpoints.getOperators();
      console.log('Response', response);
      setOperators(response);
    } catch (error) {
      console.error('Error fetching operators:', error);
    }
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Operadores
      </Typography>
      <Box mb={2}>
        <CreateOperatorButton operators={operators} setOperators={setOperators} refresh={refresh} />
      </Box>
      <DisplayOperatorsTable operators={operators} setOperators={setOperators} refresh={refresh} />
    </>
  );
};
