import React from 'react';
import { Box } from '@mui/material';
import { LoginForm } from './loginForm';

export const LoginMain = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '98vh',
        backgroundColor: '#2fa7e9',
        m: -1,
        pb: 2
      }}
    >
      <LoginForm />
    </Box>
  );
};