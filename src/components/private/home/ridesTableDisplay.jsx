import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Box } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material";

const rides = [
  { movil: "XYZ2", conductor: "Ana Gómez", cliente: "Lucía López", calificacion: null, estado: "en camino" },
  { movil: "LMN3", conductor: "Luis Silva", cliente: "Pedro González", calificacion: null, estado: "esperando" },
  { movil: "GHI4", conductor: "María Ruiz", cliente: "Sofía Ramírez", calificacion: null, estado: "llevando" },
  { movil: "JKL5", conductor: "Carlos Sánchez", cliente: "Miguel Torres", calificacion: null, estado: "esperando" },
  { movil: "MNO6", conductor: "Laura Fernández", cliente: "Ana Díaz", calificacion: null, estado: "en camino" },
  { movil: "PQR7", conductor: "José Herrera", cliente: "Juan Ortiz", calificacion: null, estado: "llevando" },
  { movil: "EFG4", conductor: "Jorge Ramírez", cliente: "Luis Pérez", calificacion: null, estado: "llevando" },
  { movil: "GHI5", conductor: "Andrea Díaz", cliente: "Gabriela Fernández", calificacion: 4, estado: "completado" },
  { movil: "JKL6", conductor: "Pedro Castillo", cliente: "José Sánchez", calificacion: null, estado: "esperando" },
  { movil: "MNO7", conductor: "Laura Herrera", cliente: "Lucía Jiménez", calificacion: null, estado: "en camino" },
  { movil: "PQR8", conductor: "María Ortiz", cliente: "Mario García", calificacion: null, estado: "llevando" },
  { movil: "ABC1", conductor: "Juan Pérez", cliente: "Carlos Martínez", calificacion: 4, estado: "completado" },
  { movil: "STU8", conductor: "Patricia Castillo", cliente: "María Ruiz", calificacion: 5, estado: "completado" },
  { movil: "VWX9", conductor: "Mario Jiménez", cliente: "Laura García", calificacion: 3, estado: "completado" },
  { movil: "YZA1", conductor: "Lucía Hernández", cliente: "Fernando Pérez", calificacion: null, estado: "esperando" },
  { movil: "BCD2", conductor: "Manuel Gómez", cliente: "Patricia López", calificacion: null, estado: "en camino" },
  { movil: "DEF3", conductor: "Andrés Torres", cliente: "Sofía Martínez", calificacion: 2, estado: "completado" },
  { movil: "EFG4", conductor: "Jorge Ramírez", cliente: "Luis Pérez", calificacion: null, estado: "llevando" },
  { movil: "GHI5", conductor: "Andrea Díaz", cliente: "Gabriela Fernández", calificacion: 4, estado: "completado" },
  { movil: "JKL6", conductor: "Pedro Castillo", cliente: "José Sánchez", calificacion: null, estado: "esperando" },
  { movil: "MNO7", conductor: "Laura Herrera", cliente: "Lucía Jiménez", calificacion: null, estado: "en camino" },
  { movil: "PQR8", conductor: "María Ortiz", cliente: "Mario García", calificacion: null, estado: "llevando" },
  { movil: "STU9", conductor: "Carlos Ramírez", cliente: "Laura Pérez", calificacion: 5, estado: "completado" },
  { movil: "VWX0", conductor: "Patricia Hernández", cliente: "Fernando López", calificacion: 3, estado: "completado" },
  { movil: "YZA2", conductor: "Mario Gómez", cliente: "Ana Ortiz", calificacion: 4, estado: "completado" },
];

const getEstadoChip = (estado) => {
  switch (estado) {
    case "en camino":
      return <Chip label="En camino" color="primary" />;
    case "esperando":
      return <Chip label="Esperando" color="secondary" />;
    case "llevando":
      return <Chip label="Llevando" color="default" />;
    case "completado":
      return <Chip label="Completado" color="success" />;
    default:
      return <Chip label="Desconocido" />;
  }
};

const getCalificacion = (calificacion) => {
  if (!calificacion) return null;
  const estrellas = [];
  for (let i = 0; i < 5; i++) {
    if (i < calificacion) {
      estrellas.push(<Star key={i} />);
    } else {
      estrellas.push(<StarBorder key={i} />);
    }
  }
  return estrellas;
};

export const RidesTableDisplay = () => {
  return (
    <TableContainer component={Paper} sx={{ height: '100%', overflowY: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Móvil</b></TableCell>
            <TableCell><b>Conductor</b></TableCell>
            <TableCell><b>Cliente</b></TableCell>
            <TableCell><b>Calificación</b></TableCell>
            <TableCell><b>Estado</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rides.map((ride, index) => (
            <TableRow key={index}>
              <TableCell>{ride.movil}</TableCell>
              <TableCell>{ride.conductor}</TableCell>
              <TableCell>{ride.cliente}</TableCell>
              <TableCell>{ride.estado === "completado" ? getCalificacion(ride.calificacion) : "-"}</TableCell>
              <TableCell><b>{getEstadoChip(ride.estado)}</b></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
