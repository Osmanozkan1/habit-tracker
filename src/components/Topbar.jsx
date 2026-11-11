import { Moon, Plus, Sun } from 'lucide-react'
import { useHabits } from '../context/HabitsContext'
import { useSettings } from '../context/SettingsContext'

export default function Topbar() {
  const { openForm } = useHabits()
  const { settings, toggleTheme } = useSettings()
  const isDark = settings.theme === 'dark'
  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-10">
      <p className="text-sm text-muted">{today}</p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
          className="rounded-lg border border-line p-2 text-muted transition-colors hover:text-fg"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          type="button"
          onClick={openForm}
          className="flex items-center gap-2 rounded-lg bg-flame px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
        >
          <Plus size={16} />
          Alışkanlık ekle
        </button>
      </div>
    </header>
  )
}
