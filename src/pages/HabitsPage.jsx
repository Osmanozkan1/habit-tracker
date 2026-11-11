import { useState } from 'react'
import { Pencil, Search, Trash2 } from 'lucide-react'
import { useHabits } from '../context/HabitsContext'

const lower = (text) => text.toLocaleLowerCase('tr-TR')

export default function HabitsPage() {
  const { habits, deleteHabit, openForm, openEdit, loadDemo } = useHabits()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Tümü')

  const categories = ['Tümü', ...new Set(habits.map((h) => h.category))]
  const activeCategory = categories.includes(category) ? category : 'Tümü'

  const visible = habits.filter(
    (h) =>
      lower(h.name).includes(lower(query.trim())) &&
      (activeCategory === 'Tümü' || h.category === activeCategory),
  )

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
        <>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative sm:w-72">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Alışkanlık ara"
                aria-label="Alışkanlık ara"
                className="w-full rounded-lg border border-line bg-panel py-2.5 pl-9 pr-3 text-sm placeholder:text-muted focus:border-flame focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Kategori filtresi">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={activeCategory === c}
                  className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                    activeCategory === c
                      ? 'border-flame bg-flame/15 text-flame'
                      : 'border-line text-muted hover:text-fg'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-4 text-sm text-muted">{visible.length} alışkanlık</p>

          {visible.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-line p-8 text-center text-sm text-muted">
              Aramana uyan alışkanlık yok.
            </div>
          ) : (
            <ul className="mt-4 flex flex-col gap-3">
              {visible.map((h) => (
                <li
                  key={h.id}
                  className="flex items-center gap-4 rounded-xl border border-line bg-panel p-4"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl"
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
                    onClick={() => openEdit(h)}
                    aria-label={`${h.name} alışkanlığını düzenle`}
                    className="rounded-md p-2 text-muted hover:text-fg"
                  >
                    <Pencil size={18} />
                  </button>
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
        </>
      )}
    </section>
  )
}
