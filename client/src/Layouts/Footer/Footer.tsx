import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <footer>
      <Container maxWidth="lg">
        <Typography variant="body2" color="textSecondary" align="center">
          &copy; {new Date().getFullYear()} Metazare
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
