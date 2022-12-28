import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
const AppNavbar = () => {
  return (
    
    <>
     <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small" sx={{ letterSpacing:'3px',color:'black' }}>Learn Morse Code</Button>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Button size="small" sx={{ letterSpacing:'3px',color:'black' }}>Morse Translator</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
          letterSpacing={5}
        >
     
        </Typography>
        <Button size="small" sx={{ letterSpacing:'3px',color:'black' }}>Morse Game</Button>
       
      </Toolbar>

    </>
  )
}

export default AppNavbar