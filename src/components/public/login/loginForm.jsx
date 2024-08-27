import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';
import Logo from '../../../assets/img/TachoLogo.png';
import authEndpoints from '../../../services/auth';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setError(''); // Resetea el error

    try {
      const response = await authEndpoints.loginAdm({ user: username, password });
      console.log('Login successful:', response);
      localStorage.setItem('tachoTokenBusiness', response.token);
      localStorage.setItem('isLoggedInTachoBusiness', true);
      window.location.reload();
    } catch (err) {
      console.error('Login failed:', err);
      setError('Credenciales inválidas');
    }
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 500, 
        width: '100%', 
        boxShadow: 3,
        borderRadius: 2,
        px: 1,
        pb: 1
      }}
    >
      <CardContent>
        <Box 
          component="form"
          onSubmit={handleLogin}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img 
            src={Logo}
            alt="Logo" 
            style={{ 
              width: 122, 
              height: 122, 
              marginBottom: 16 
            }} 
          />
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
                mb: -.2
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button 
            type="submit" // Establece el tipo de botón como submit
            variant="contained" 
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            <b>Ingresar</b>
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
