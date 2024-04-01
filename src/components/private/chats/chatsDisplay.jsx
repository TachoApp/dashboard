import React from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

const ChatsDisplay = ({ drivers, handleDriverClick }) => {
  return (
    <>
      <Typography variant="h6" style={{ textAlign: 'center', margin: '10px 0' }}>Chats</Typography>
      <List sx={{ overflow: 'auto', padding: 0 }}>
        {drivers?.map((driver) => (
          <ListItem button key={driver.id} onClick={() => handleDriverClick(driver)}>
            <ListItemAvatar>
              <Avatar alt={driver.name} src={driver.avatar} />
            </ListItemAvatar>
            <ListItemText primary={driver.name} secondary="Último mensaje" />
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default ChatsDisplay;
