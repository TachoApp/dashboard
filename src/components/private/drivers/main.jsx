import React, { useState, useEffect, useCallback } from "react";
import { Typography, Box, IconButton, Tooltip } from "@mui/material";
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import driversEndpoints from "../../../services/drivers";
import walletEndpoints from "../../../services/wallet";
import { CreateDriverButton } from "./createDriverButton";
import { DisplayDriversTable } from "./displayDriversTable";
import { SearchBar } from "./searchBar";
import { useLogout } from "../../../helpers/logout";
import { TablePagination } from "@mui/material";

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
  const [wallet, setWallet] = useState(null); // Inicializa con null para evitar renderizados innecesarios

  useEffect(() => {
    getDrivers();
  }, [refreshState, filter, page, rowsPerPage]);

  useEffect(() => {
    getWallet();
  }, [refreshState]);

  const refresh = () => {
    setRefreshState((prevState) => !prevState);
  };

  const getDrivers = async () => {
    try {
      const response = await driversEndpoints.getDrivers({ filter });
      console.log(response)
      setDrivers(response.drivers);
    } catch (error) {
      if (error.response?.status === 498) {
        useLogout();
      }
      console.error("Error fetching users:", error);
    }
  };

  const getWallet = async () => {
    try {
      const response = await walletEndpoints.getWallet();
      setWallet(response.wallet); // Guarda la respuesta en el estado wallet
    } catch (error) {
      if (error.response?.status === 498) {
        useLogout();
      }
      console.error("Error fetching wallet:", error);
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
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" component="h1" gutterBottom>
          Gestión de Conductores
        </Typography>
        {wallet && (
          <Box display="flex" alignItems="center">
          <Tooltip title="Créditos disponibles" arrow>
            <IconButton color="primary">
              <OfflineBoltIcon style={{ fontSize: 38 }} />
            </IconButton>
          </Tooltip>
          <Typography variant="h5" component="p" sx={{ml: 1}}>
            <b>{wallet.credits}</b> créditos
          </Typography>
        </Box>
        
        )}
      </Box>

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
