import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { CreateStopButton } from "./createStopButton";
import driversEndpoints from "../../../services/drivers";
import { DisplayStopsTable } from "./displayStopsTable";
import { useLogout } from "../../../helpers/logout";

export const StopsMain = () => {
  const [refresh, setRefresh] = useState(false);
  const [stops, setStops] = useState([]);

  useEffect(() => {
    getStops();
  }, [refresh]);

  const getStops = async () => {
    try {
      const response = await driversEndpoints.getDriversStops();
      setStops(response);
    } catch (error) {
      if (error.response.status === 498) {
        useLogout();
      }
      console.error(error);
    }
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de paradas de moviles
      </Typography>
      <Box mb={2}>
        <CreateStopButton refresh={handleRefresh} />
      </Box>
      <DisplayStopsTable stops={stops} refresh={handleRefresh} />
    </>
  );
};
