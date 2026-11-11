import { Trash2 } from 'lucide-react'
import { useHabits } from '../context/HabitsContext'

export default function HabitsPage() {
  const { habits, deleteHabit, openForm, loadDemo } = useHabits()

  const handleDelete = (habit) => {
    if (window.confirm(`"${habit.name}" silinsin mi? Tüm geçmişi de silinir.`)) {
      deleteHabit(habit.id)
    }
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-3xl font-semibold">Alışkanlıklar</h2>
        <button
          type="button"
          onClick={loadDemo}
          className="rounded-lg border border-line px-3 py-2 text-sm text-muted hover:text-fg"
        >
          Örnek veri ekle
        </button>
      </div>

      {habits.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          Liste boş.{' '}
          <button type="button" onClick={openForm} className="text-flame underline">
            Alışkanlık ekle
          </button>
        </p>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {habits.map((h) => (
            <li
              key={h.id}
              className="flex items-center gap-4 rounded-xl border border-line bg-panel p-4"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-lg text-xl"
                style={{ backgroundColor: `${h.color}26` }}
              >
                {h.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{h.name}</p>
                <p className="text-sm text-muted">{h.category}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(h)}
                aria-label={`${h.name} alışkanlığını sil`}
                className="rounded-md p-2 text-muted hover:text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
