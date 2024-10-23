// SocketContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const businessId = localStorage.getItem('businessIdTachoBusiness');
const userId = localStorage.getItem('userIdTachoBusiness');

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Inicia la conexión solo en rutas privadas
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: false,
    });

    socketInstance.connect();
    
    socketInstance.on('connect', () => {
      console.log('Conectado al servidor de WebSocket');
      socketInstance.emit('registerUser', { userId, role: 'business', businessId });
    });

    socketInstance.on('disconnect', () => {
      console.log('Desconectado del servidor de WebSocket');
    });

    // Guardar la instancia del socket en el estado
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
