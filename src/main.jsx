import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { HabitsProvider } from './context/HabitsContext'
import { SettingsProvider } from './context/SettingsContext'

// Sayfa açılırken tema yanıp sönmesin diye kayıtlı temayı hemen uygula
try {
  document.documentElement.dataset.theme =
    JSON.parse(localStorage.getItem('settings'))?.theme ?? 'dark'
} catch {
  document.documentElement.dataset.theme = 'dark'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SettingsProvider>
        <HabitsProvider>
          <App />
        </HabitsProvider>
      </SettingsProvider>
    </BrowserRouter>
  </StrictMode>,
)
