import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useHabits } from '../context/HabitsContext'

const ICONS = ['💧', '📚', '🏃', '🧘', '💪', '🥗', '😴', '✍️']
const COLORS = ['#f2b441', '#5eb8ff', '#7be0a8', '#ff7a8a', '#b69cff']
const CATEGORIES = ['Sağlık', 'Öğrenme', 'Spor', 'Kişisel']

function FormBody() {
  const { addHabit, updateHabit, editing, closeForm } = useHabits()
  const [name, setName] = useState(editing?.name ?? '')
  const [icon, setIcon] = useState(editing?.icon ?? ICONS[0])
  const [color, setColor] = useState(editing?.color ?? COLORS[0])
  const [category, setCategory] = useState(editing?.category ?? CATEGORIES[0])
  const [error, setError] = useState('')

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeForm()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeForm])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Alışkanlığa bir ad ver.')
      return
    }
    const data = { name: trimmed, icon, color, category }
    if (editing) updateHabit(editing.id, data)
    else addHabit(data)
    closeForm()
  }

  return (
    <div
      className="fixed inset-0 z-20 flex items-end justify-center bg-black/60 p-4 md:items-center"
      onMouseDown={(e) => e.target === e.currentTarget && closeForm()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="habit-form-title"
        className="w-full max-w-md rounded-xl border border-line bg-panel p-6"
      >
        <div className="flex items-center justify-between">
          <h2 id="habit-form-title" className="font-display text-xl font-semibold">
            {editing ? 'Alışkanlığı düzenle' : 'Yeni alışkanlık'}
          </h2>
          <button
            type="button"
            onClick={closeForm}
            aria-label="Kapat"
            className="rounded-md p-1 text-muted hover:text-fg"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-5">
          <div>
            <label htmlFor="habit-name" className="text-sm font-medium">
              Ad
            </label>
            <input
              id="habit-name"
              type="text"
              value={name}
              maxLength={40}
              autoFocus
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              placeholder="Örn. Günde 2 litre su iç"
              className="mt-1.5 w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-sm placeholder:text-muted focus:border-flame focus:outline-none"
            />
            {error && <p className="mt-1.5 text-sm text-red-400">{error}</p>}
          </div>

          <fieldset>
            <legend className="text-sm font-medium">Simge</legend>
            <div className="mt-1.5 flex flex-wrap gap-2">
              {ICONS.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIcon(i)}
                  aria-pressed={icon === i}
                  className={`h-10 w-10 rounded-lg border text-lg ${
                    icon === i ? 'border-flame bg-flame/15' : 'border-line'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium">Renk</legend>
            <div className="mt-1.5 flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={`Renk ${c}`}
                  aria-pressed={color === c}
                  style={{ backgroundColor: c }}
                  className={`h-8 w-8 rounded-full ${
                    color === c ? 'ring-2 ring-fg ring-offset-2 ring-offset-panel' : ''
                  }`}
                />
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="habit-category" className="text-sm font-medium">
              Kategori
            </label>
            <select
              id="habit-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-line bg-ink px-3 py-2.5 text-sm focus:border-flame focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeForm}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted hover:text-fg"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="rounded-lg bg-flame px-4 py-2 text-sm font-semibold text-ink hover:opacity-90"
            >
              {editing ? 'Kaydet' : 'Alışkanlığı ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function HabitForm() {
  const { formOpen } = useHabits()
  return formOpen ? <FormBody /> : null
}
