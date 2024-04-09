import React, { useState } from 'react';
import { Container, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { AccountCircle} from '@mui/icons-material';

// Hooks
import { useRegister } from '../../Hooks/useAuth';

export default function Register() {
  const { register } = useRegister();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    register({
      first: firstName,
      middle: middleName,
      last: lastName,
      contact: parseInt(contactNum),
      email: email,
      password: password,
      role:'renter'
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Box display="flex" justifyContent="center">
          <AccountCircle style={{ fontSize: 64, color: 'gray' }} />
        </Box>
        <Typography variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        <form>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            label="Middle Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />

          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            label="Contact Number"
            variant="outlined"
            fullWidth
            margin="normal"
            value={contactNum}
            type='number'
            onChange={(e) => setContactNum(e.target.value)}
          />

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
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};