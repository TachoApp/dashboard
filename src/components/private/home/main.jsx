import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Map } from "./map";
import { RidesTableDisplay } from "./ridesTableDisplay";
import { useLogout } from "../../../helpers/logout";
import driversEndpoints from "../../../services/drivers";
import ridesEndpoints from "../../../services/rides";
import { useSocket } from "../../../helpers/SocketContext";

export const HomeMain = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [drivers, setDrivers] = useState([]);
  const [stops, setStops] = useState([]);
  const [rides, setRides] = useState([]);
  const socket = useSocket(); // Obtenemos el socket del contexto

  useEffect(() => {
    if (!socket) return;

    socket.on("locationUpdate", (data) => {
      console.log(data);
      setDrivers((prevDrivers) => {
        const existingDriverIndex = prevDrivers.findIndex((driver) => driver.movilCode === data.movilCode);

        if (existingDriverIndex !== -1) {
          // Actualiza la ubicación y el estado del conductor si ya existe
          const updatedDrivers = [...prevDrivers];
          updatedDrivers[existingDriverIndex] = { 
            ...updatedDrivers[existingDriverIndex], 
            lat: data.lat, 
            lng: data.lng,
            isFree: data.isFree 
          };
          return updatedDrivers;
        } else {
          // Agrega un nuevo conductor
          return [...prevDrivers, data];
        }
      });
    });

    socket.on("driverStatusUpdate", (data) => {
      console.log('Driver status updated:', data);
      setDrivers((prevDrivers) => {
        return prevDrivers.map(driver => 
          driver.movilCode === data.movilCode 
            ? { ...driver, isFree: data.isFree }
            : driver
        );
      });
    });

    socket.on("driverDisconnect", (data) => {
      console.log('Driver disconnected:', data);
      setDrivers((prevDrivers) => {
        const updatedDrivers = prevDrivers.filter((driver) => driver.socketId !== data.socketId);
        console.log('Updated drivers:', updatedDrivers);
        return updatedDrivers;
      });
    });

    return () => {
      socket.off("locationUpdate");
      socket.off("driverStatusUpdate");
      socket.off("driverDisconnect");
    };
  }, [socket]);

  useEffect(() => {
    getRides();
    getStops();
  }, []);

  const getRides = async () => {
    try {
      const response = await ridesEndpoints.getRides(); 
      console.log(response);
      setRides(response);
    } catch (error) {
      if (error.response?.status === 498) {
        useLogout();
      }
      console.error(error);
    }
  };

  const getStops = async () => {
    try {
      const response = await driversEndpoints.getDriversStops(); 
      setStops(response);
    } catch (error) {
      if (error.response?.status === 498) {
        useLogout();
      }
      console.error(error);
    }
  };

  return (
    <Box display="flex">
      {!isMobile && (
        <Box marginRight={2} flexShrink={0}>
          <Map drivers={drivers} stops={stops} />
        </Box>
      )}

      <Box
        flexGrow={1}
        width={{ xs: "76vw", sm: "84vw", md: "88vw", lg: "49vw", xl: "52vw" }}
        height="86vh"
        overflow="hidden"
      >
        <RidesTableDisplay />
      </Box>
    </Box>
  );
};
