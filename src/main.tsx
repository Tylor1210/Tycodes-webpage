import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DigitalPresence from './pages/DigitalPresence.tsx'
import Brand from './pages/Brand.tsx'
import Projects from './pages/Projects.tsx'
import Services from './pages/Services.tsx'
import ShipComPage from './pages/ShipCom.tsx'
import Automation from './pages/Automation.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/digital-presence" element={<DigitalPresence />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ship-com" element={<ShipComPage />} />
          <Route path="/automation" element={<Automation />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
