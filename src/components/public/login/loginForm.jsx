import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Switch, 
  FormControlLabel, 
  IconButton, 
  InputAdornment 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from '../../../assets/img/TachoLogo.png';
import authEndpoints from '../../../services/auth';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = isAdmin
        ? await authEndpoints.loginAdm({ user: username, password }) 
        : await authEndpoints.loginOp({ user: username, password }); 

      console.log('Login successful:', response);
      localStorage.setItem('tachoTokenBusiness', response.token);
      localStorage.setItem('userRolTachoBusiness', response.user.rol);
      localStorage.setItem('businessIdTachoBusiness', response.user.businessId);
      localStorage.setItem('businessNameTachoBusiness', response.user.businessName);
      localStorage.setItem('userIdTachoBusiness', response.user.id);
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
          <FormControlLabel
            control={
              <Switch 
                checked={isAdmin} 
                onChange={() => setIsAdmin(!isAdmin)} 
                color="primary"
              />
            }
            label={isAdmin ? "Administrador" : "Operadora"}
            labelPlacement="end"
            sx={{
              alignSelf: 'flex-start',
              mb: -.8
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
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{mr: .1}}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {error && (
            <Typography color="error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button 
            type="submit"
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
