import { useHabits } from '../context/HabitsContext'
import HabitCard from '../components/HabitCard'
import { toKey } from '../utils/dates'
import { currentStreak } from '../utils/streaks'

export default function TodayPage() {
  const { habits, toggleToday, openForm } = useHabits()
  const today = toKey()
  const doneCount = habits.filter((h) => h.completions.includes(today)).length
  const percent = habits.length ? Math.round((doneCount / habits.length) * 100) : 0

  return (
    <section>
      <h2 className="font-display text-3xl font-semibold">Bugün</h2>

      {habits.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-line p-10 text-center">
          <p className="font-medium">Henüz alışkanlık yok</p>
          <p className="mt-1 text-sm text-muted">
            İlk alışkanlığını ekleyerek serini başlat.
          </p>
          <button
            type="button"
            onClick={openForm}
            className="mt-5 rounded-lg bg-flame px-4 py-2 text-sm font-semibold text-ink hover:opacity-90"
          >
            İlk alışkanlığını ekle
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 rounded-xl border border-line bg-panel p-5">
            <div className="flex items-baseline justify-between">
              <p className="font-display text-2xl font-semibold">
                {doneCount} / {habits.length} tamamlandı
              </p>
              <p className="text-sm text-muted">%{percent}</p>
            </div>
            <div
              role="progressbar"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-3 h-2 overflow-hidden rounded-full bg-ink"
            >
              <div
                className="h-full rounded-full bg-flame transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <ul className="mt-6 flex flex-col gap-3">
            {habits.map((h) => (
              <HabitCard
                key={h.id}
                habit={h}
                done={h.completions.includes(today)}
                streak={currentStreak(h.completions)}
                onToggle={() => toggleToday(h.id)}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
