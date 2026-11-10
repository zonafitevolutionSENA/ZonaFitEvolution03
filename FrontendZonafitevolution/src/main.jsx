import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PantallaIngreso from './pages/PantallaIngreso.jsx'
import { activarBloqueoDeBotones } from './utils/antiSpamBotones.js'

activarBloqueoDeBotones()

const parametros = new URLSearchParams(window.location.search)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {parametros.get('pantalla') === 'acceso' ? <PantallaIngreso /> : <App />}
  </StrictMode>,
)
