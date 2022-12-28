import { Container } from '@mui/system'

import Morse from './components/Morse/Morse'
import AppNavbar from './components/Navbar/navbar'



function App() {

  return (
<>

   <Container maxWidth="lg" disableGutters sx={{ backgroundColor:'white', boxShadow: 3  }}>
   <AppNavbar/>
    <Morse/>
   </Container>
   </>
  )
}

export default App
