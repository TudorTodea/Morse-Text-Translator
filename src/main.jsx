import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { AudioPlayContextProvider } from './context/audio-context'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AudioPlayContextProvider>
    <App />
    </AudioPlayContextProvider>
  </React.StrictMode>,
)
