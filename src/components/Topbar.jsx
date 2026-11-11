import { Plus } from 'lucide-react'
import { useHabits } from '../context/HabitsContext'

export default function Topbar() {
  const { openForm } = useHabits()
  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <header className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-10">
      <p className="text-sm text-muted">{today}</p>
      <button
        type="button"
        onClick={openForm}
        className="flex items-center gap-2 rounded-lg bg-flame px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
      >
        <Plus size={16} />
        Alışkanlık ekle
      </button>
    </header>
  )
}
