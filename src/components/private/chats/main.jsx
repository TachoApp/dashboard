import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import ChatsDisplay from './chatsDisplay';
import ChatConversation from './chatsConversations';

const drivers = [
  { id: 1, code: "DR001", name: "Juan Pérez", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "1234567890", plate: "ABC123" },
  { id: 2, code: "DR002", name: "María Rodríguez", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "0987654321", plate: "XYZ456" },
  { id: 3, code: "DR003", name: "Pedro Gómez", avatar: "https://source.unsplash.com/random/200x300", ciNumber: "5678901234", plate: "DEF789" },
  // Agrega más datos de conductores aquí
];

const chats = {
  1: [
    { id: 1, sender: "Juan Pérez", message: "Hola, ¿cómo estás?" },
    { id: 2, sender: "You", message: "Hola, bien, gracias" },
    // Agrega más mensajes para el conductor con ID 1
  ],
  2: [
    { id: 1, sender: "María Rodríguez", message: "¡Hola! ¿Cómo va todo?" },
    { id: 2, sender: "You", message: "Todo bien, gracias" },
    // Agrega más mensajes para el conductor con ID 2
  ],
  // Agrega más chats según sea necesario
};

export const ChatMain = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleDriverClick = (driver) => {
    setSelectedDriver(driver);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper style={{ overflowY: 'auto' }}>
          <ChatsDisplay drivers={drivers} handleDriverClick={handleDriverClick} />
        </Paper>
      </Grid>
      <Grid item xs={8}>
        <Paper style={{ overflowY: 'auto' }}>
          {selectedDriver ? (
            <ChatConversation selectedDriver={selectedDriver} chats={chats} />
          ) : (
            <div style={{ textAlign: 'center', margin: '20px' }}>
              <Typography variant="h5">Selecciona un chat</Typography>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
