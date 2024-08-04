// LoginForm.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Box 
} from '@mui/material';
import Logo from '../../../assets/img/TachoLogo.png'

export const LoginForm = () => {
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
          />
          <Button 
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