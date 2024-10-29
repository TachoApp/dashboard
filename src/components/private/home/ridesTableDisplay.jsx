import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Box,
  Skeleton,
  Tooltip,
} from "@mui/material";
import {
  Star,
  StarBorder,
  DirectionsCar,
  Smartphone,
} from "@mui/icons-material";

const getEstadoChip = (estado) => {
  switch (estado) {
    case "created":
      return <Chip label="Creado" color="default" />;
    case "onway":
      return <Chip label="En camino" color="primary" />;
    case "waiting":
      return <Chip label="Esperando" color="warning" />;
    case "going":
      return <Chip label="Yendo" color="info" />;
    case "riding":
      return <Chip label="En curso" color="success" />;
    case "califications":
      return <Chip label="Calificaciones" color="secondary" />;
    case "completed":
      return <Chip label="Completado" color="success" />;
    case "canceled":
      return <Chip label="Cancelado" color="error" />;
    default:
      return <Chip label="Desconocido" />;
  }
};

const getCalificacion = (calificacion) => {
  if (!calificacion) return "-";
  const estrellas = [];
  for (let i = 0; i < 5; i++) {
    estrellas.push(
      i < calificacion ? <Star key={i} /> : <StarBorder key={i} />
    );
  }
  return estrellas;
};

// Función para mostrar el ícono del tipo de ride con tooltip
const getRideTypeIcon = (type) => {
  return type === "manual" ? (
    <Tooltip title="Manual">
      <DirectionsCar />
    </Tooltip>
  ) : (
    <Tooltip title="App">
      <Smartphone />
    </Tooltip>
  );
};

export const RidesTableDisplay = ({ rides, isLoading }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        height: "100%",
        overflowY: "auto",
        backgroundColor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        "&::-webkit-scrollbar": {
          width: "8px",
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(59, 135, 226, 0.6)", // Color azul con transparencia
          borderRadius: "4px",
          "&:hover": {
            background: "rgba(59, 135, 226, 0.8)", // Más oscuro al pasar el mouse
          },
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        scrollbarWidth: "thin", // Firefox
        scrollbarColor: "#1976d2 transparent",
      }}
    >
      {isLoading ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Skeleton width="60%" />
              </TableCell>
              <TableCell>
                <Skeleton width="60%" />
              </TableCell>
              <TableCell>
                <Skeleton width="60%" />
              </TableCell>
              <TableCell>
                <Skeleton width="60%" />
              </TableCell>
              <TableCell>
                <Skeleton width="60%" />
              </TableCell>
              <TableCell>
                <Skeleton width="60%" />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
                <TableCell>
                  <Skeleton />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : rides && rides.length > 0 ? (
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Tipo</b>
              </TableCell>
              <TableCell>
                <b>Móvil</b>
              </TableCell>
              <TableCell>
                <b>Conductor</b>
              </TableCell>
              <TableCell>
                <b>Cliente</b>
              </TableCell>
              <TableCell>
                <b>Calificación</b>
              </TableCell>
              <TableCell>
                <b>Estado</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rides.map((ride, index) => (
              <TableRow key={index}>
                <TableCell
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  {getRideTypeIcon(ride.type)}
                </TableCell>
                <TableCell>{ride.driver.movilCode}</TableCell>
                <TableCell>{ride.driver.personalInfo.fullName}</TableCell>
                <TableCell>{ride.user.name}</TableCell>
                <TableCell>
                  {ride.type === "manual"
                    ? "-"
                    : getCalificacion(
                        ride.calification?.fromUserToDriver?.rating || 0
                      )}
                </TableCell>
                <TableCell>
                  <b>{getEstadoChip(ride.status)}</b>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          textAlign="center"
          sx={{
            padding: 2,
            backgroundColor: "background.default",
            color: "text.secondary",
          }}
        >
          <Typography variant="h6">
            Aún no hay carreras para mostrar.
          </Typography>
        </Box>
      )}
    </TableContainer>
  );
};