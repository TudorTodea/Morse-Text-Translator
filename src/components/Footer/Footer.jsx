import React from 'react';
import { Box, Container } from '@mui/system';

import { Link, Typography } from '@mui/material';


function Footer() {

  return (
    <Box sx={{ backgroundColor:'#333333',color:'white' }}>
      <Container maxWidth="sm" >
        <Typography variant="h6">My App</Typography>
        <Box component="nav">
          <Link href="#">About</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Terms of Service</Link>
        </Box>
        <Typography variant="body2">Copyright © My App 2021</Typography>
      </Container>
    </Box>
  );
}

export default Footer;