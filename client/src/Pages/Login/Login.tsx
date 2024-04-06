import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';

// Hooks
import { useAuth } from '../../Hooks/useAuth';

export default function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Create a form object with the values
    const formData = {
      email: email,
      password: password
    };

    console.log(formData);
    login(formData);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Box display="flex" justifyContent="center">
          <AccountCircle style={{ fontSize: 64, color: 'gray' }} />
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          Log In
        </Typography>
        <form>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Log In
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
