import React from 'react';
import { Box, Container } from '@mui/system';
import GitHub from '@mui/icons-material/GitHub';
import { IconButton, Link, Typography } from '@mui/material';
import LinkedIn from '@mui/icons-material/LinkedIn';


function Footer() {

  return (
    <Box sx={{ backgroundColor:'#333333',color:'white',display:'flex',textAlign:'center' }}>
      <Container maxWidth="sm" >
        <Typography variant="h6" sx={{ letterSpacing:'3px' }}>Morse Translator</Typography>
        <Box component="nav">
          <Link href="https://github.com/TudorTodea"><IconButton>
            <GitHub  sx={{ fontSize:'40px' }}color="primary" />
            </IconButton></Link>
            <Link href="https://www.linkedin.com/in/tudor-todea-18b033245/"><IconButton>
            <LinkedIn sx={{ fontSize:'40px' }} color="primary" />
            </IconButton></Link>
        </Box>
        <Typography variant="body2">Copyright © Todea Tudor</Typography>
      </Container>
    </Box>
  );
}

export default Footer;