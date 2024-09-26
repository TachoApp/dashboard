import React, { useEffect, useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Map } from "./map";
import { RidesTableDisplay } from "./ridesTableDisplay";
import { io } from "socket.io-client"
import { useLogout } from "../../../helpers/logout";
import driversEndpoints from "../../../services/drivers";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const businessId = localStorage.getItem('businessIdTachoBusiness');
const userId = localStorage.getItem('userIdTachoBusiness');

// Crear instancia de Socket.IO
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false,
});

export const HomeMain = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [drivers, setDrivers] = useState([]);
  const [stops, setStops] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Conectado al servidor de WebSocket");
      socket.emit("registerUser", { userId: userId, role: "business", businessId: businessId });
    });

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

    socket.on("disconnect", () => {
      console.log("Desconectado del servidor de WebSocket");
    });

    return () => {
      socket.off("connect");
      socket.off("locationUpdate");
      socket.off("driverStatusUpdate");
      socket.off("driverDisconnect");
      socket.off("disconnect");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    getStops();
  }, []);

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