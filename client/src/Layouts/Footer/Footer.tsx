import React from 'react';
import { Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <footer className='border-t border-[black]/20 py-5'>
      <Container maxWidth="xl" sx={{display:"flex",opacity:.9}}>
        <Typography variant="body2"  sx={{flexGrow:1}} color="textSecondary" >
          &copy; {new Date().getFullYear()} EventsPlaceReservation
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          <Link href="/privacy">Privacy Policy</Link> | <Link href="/termsncondition">Terms of Service</Link>
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
