import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const SettingsContext = createContext(null)
const DEFAULTS = { name: '', theme: 'dark' }

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', DEFAULTS)

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme
  }, [settings.theme])

  const update = (patch) => setSettings((prev) => ({ ...prev, ...patch }))
  const toggleTheme = () =>
    update({ theme: settings.theme === 'dark' ? 'light' : 'dark' })

  return (
    <SettingsContext.Provider value={{ settings, update, toggleTheme }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings, SettingsProvider içinde kullanılmalı')
  return ctx
}
