import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { CreateDriverButton } from './createDriverButton';
import { DisplayDriversTable } from './displayDriversTable';

export const DriversMain = () => {
  const [drivers, setDrivers] = useState([
    {
      movilCode: "MOV001",
      personalInfo: {
        profileImage: "https://example.com/profile1.jpg",
        fullName: "Juan Pérez",
        idNumber: "1234567890",
        dateOfBirth: "1985-05-15",
        homeAddress: "Calle Falsa 123, Ciudad",
        phone: "555-1234",
        cellPhone: "555-5678",
        personalReference: {
          name: "Ana Gómez",
          phone: "555-9876",
          cellPhone: "555-6543"
        }
      },
      vehicleInfo: {
        brand: "Toyota",
        model: "Corolla",
        color: "Blanco",
        licensePlateNumber: "ABC123",
        type: "Sedán"
      },
      additionalInfo: {
        entryDate: "2023-01-01",
        guaranteeType: "Cobertura completa",
        exitDate: null,
        exitReason: null,
        vehicleNumber: "V001",
        radioBrand: "Motorola"
      }
    },
    // Añade más conductores si es necesario
  ]);

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Conductores
      </Typography>
      <Box mb={2}>
        <CreateDriverButton drivers={drivers} setDrivers={setDrivers} />
      </Box>
      <DisplayDriversTable drivers={drivers} setDrivers={setDrivers} />
    </>
  );
};
