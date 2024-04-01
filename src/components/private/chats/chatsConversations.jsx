import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

const ChatConversation = ({ selectedDriver, chats }) => {
  return (
    <div style={{ padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Avatar alt={selectedDriver.name} src={selectedDriver.avatar} />
        <Typography variant="h6" style={{ marginLeft: '10px' }}>{selectedDriver.name}</Typography>
      </div>
      <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 144px)', marginBottom: '10px' }}>
        <List sx={{ padding: 0 }}>
          {chats[selectedDriver.id]?.map((chat) => (
            <ListItem key={chat.id} alignItems="flex-start" disablePadding>
              <ListItemAvatar>
                <Avatar alt={chat.sender} src={chat.avatar} />
              </ListItemAvatar>
              <ListItemText primary={chat.sender} secondary={chat.message} />
            </ListItem>
          ))}
        </List>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input type="text" placeholder="Escribe un mensaje..." style={{ flex: 1, padding: '8px', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        <button style={{ padding: '8px', borderRadius: '5px', background: '#007aff', color: '#fff', border: 'none', cursor: 'pointer' }}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatConversation;
