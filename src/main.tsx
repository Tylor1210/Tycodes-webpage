import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import StartupPackage from './pages/StartupPackage.tsx'
import Brand from './pages/Brand.tsx'
import Projects from './pages/Projects.tsx'
import Services from './pages/Services.tsx'
import ShipComPage from './pages/ShipCom.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/startup-package" element={<StartupPackage />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/services" element={<Services />} />
        <Route path="/ship-com" element={<ShipComPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
