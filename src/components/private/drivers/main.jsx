import React, { useState, useEffect, useCallback } from "react";
import { Typography, Box } from "@mui/material";
import driversEndpoints from "../../../services/drivers";
import { CreateDriverButton } from "./createDriverButton";
import { DisplayDriversTable } from "./displayDriversTable";
import { SearchBar } from "./searchBar";
import { useLogout } from "../../../helpers/logout";
import { TablePagination } from "@mui/material";

// Función de animación suave mejorada
const smoothScrollTo = (targetY, duration) => {
  const startY = window.pageYOffset;
  const difference = targetY - startY;
  const startTime = performance.now();

  const step = (currentTime) => {
    const progress = (currentTime - startTime) / duration;
    if (progress < 1) {
      window.scrollTo(0, startY + difference * easeInOutCubic(progress));
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
    }
  };

  // Función de aceleración cúbica
  const easeInOutCubic = (t) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };

  requestAnimationFrame(step);
};

export const DriversMain = () => {
  const [refreshState, setRefreshState] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getDrivers();
  }, [refreshState, filter, page, rowsPerPage]);

  const refresh = () => {
    setRefreshState((prevState) => !prevState);
  };

  const getDrivers = async () => {
    try {
      const response = await driversEndpoints.getDrivers({ filter });
      setDrivers(response.drivers);
    } catch (error) {
      if (error.response?.status === 498) {
        useLogout();
      }
      console.error("Error fetching users:", error);
    }
  };

  const handleSearch = useCallback((searchTerm) => {
    setFilter(searchTerm);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    smoothScrollTo(0, 800); // Aumentado a 800ms para una animación más suave
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    smoothScrollTo(0, 800);
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Conductores
      </Typography>
      <Box mb={2}>
        <CreateDriverButton
          drivers={drivers}
          setDrivers={setDrivers}
          refresh={refresh}
        />
      </Box>
      <SearchBar onSearch={handleSearch} />
      <DisplayDriversTable
        drivers={drivers.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage
        )}
        setDrivers={setDrivers}
        refresh={refresh}
      />
      <TablePagination
        component="div"
        count={drivers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Resultados por página:"
      />
    </>
  );
};