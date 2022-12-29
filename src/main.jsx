import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AudioPlayContextProvider } from './context/audio-context'
import { BrowserRouter } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AudioPlayContextProvider>
      <BrowserRouter>
    <App />
    </BrowserRouter>
    </AudioPlayContextProvider>
  </React.StrictMode>,
)
