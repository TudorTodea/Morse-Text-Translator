import { Container } from '@mui/system'
import Footer from './components/Footer/Footer'
import Morse from './components/Morse/Morse'
import AppNavbar from './components/Navbar/navbar'



function App() {

  return (
<>

   <Container maxWidth="lg" disableGutters sx={{ backgroundColor:'white', boxShadow: 3  }}>
   <AppNavbar/>
    <Morse/>
    <Footer/>
   </Container>
   </>
  )
}

export default App
