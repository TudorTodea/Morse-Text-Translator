import { Container } from '@mui/system'
import Footer from './components/Footer/Footer'
import Morse from './components/Morse/Morse'
import AppNavbar from './components/Navbar/navbar'
import { Routes, Route } from 'react-router-dom';
import Learn from './components/Learn/Learn';
import Game from './components/Game/Game';


function App() {

  return (
<>
<Container maxWidth="lg" disableGutters sx={{ backgroundColor:'white', boxShadow: 3  }}>
<AppNavbar/>
<Routes>
<Route path="/" element={<Learn/>} />
<Route path="/translator" element={<Morse/>} />
<Route path="/game" element={<Game/>} />
   </Routes>
   <Footer/>
   </Container>
   </>
  )
}

export default App
