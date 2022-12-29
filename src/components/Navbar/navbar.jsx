import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router';
const AppNavbar = () => {
  const navigate=useNavigate();
  return (
    
    <>
     <Toolbar sx={{ borderBottom: 1, borderColor: 'divider',backgroundColor:'#333333' }}>
        <Button size="small" sx={{ letterSpacing:'3px',color:'white' }}onClick={()=>navigate(`/`)}>Learn Morse Code</Button>
        <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor:'white' }} />
        <Button size="small" sx={{ letterSpacing:'3px',color:'white' }} onClick={()=>navigate(`/translator`)}>Morse Translator</Button>
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
        <Divider orientation="vertical" variant="middle" flexItem sx={{ backgroundColor:'white' }} />
        <Button size="small" sx={{ letterSpacing:'3px',color:'white' }}onClick={()=>navigate(`/game`)}>Morse Game</Button>
       
      </Toolbar>

    </>
  )
}

export default AppNavbar