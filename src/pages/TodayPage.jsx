import { useState } from 'react'
import { ChevronLeft, ChevronRight, PartyPopper } from 'lucide-react'
import { useHabits } from '../context/HabitsContext'
import { useSettings } from '../context/SettingsContext'
import HabitCard from '../components/HabitCard'
import ProgressRing from '../components/ProgressRing'
import { toKey, addDays } from '../utils/dates'
import { currentStreak } from '../utils/streaks'

const fromKey = (key) => new Date(`${key}T00:00:00`)

export default function TodayPage() {
  const { habits, toggleDay, openForm } = useHabits()
  const { settings } = useSettings()
  const today = toKey()
  const [dayKey, setDayKey] = useState(today)

  const shift = (n) => setDayKey(toKey(addDays(fromKey(dayKey), n)))
  const isToday = dayKey === today

  const label = isToday
    ? 'Bugün'
    : dayKey === toKey(addDays(new Date(), -1))
      ? 'Dün'
      : fromKey(dayKey).toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
        })

  const active = habits.filter((h) => h.createdAt <= dayKey)
  const doneCount = active.filter((h) => h.completions.includes(dayKey)).length
  const percent = active.length ? Math.round((doneCount / active.length) * 100) : 0
  const allDone = active.length > 0 && doneCount === active.length
  const name = settings.name.trim()

  return (
    <section>
      <div className="flex items-center justify-between gap-4">
        <div>
          {isToday && (
            <p className="text-sm text-muted">{name ? `Merhaba, ${name}` : 'Merhaba'}</p>
          )}
          <h2 className="font-display text-3xl font-semibold">{label}</h2>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label="Önceki gün"
            className="rounded-lg border border-line p-2 text-muted hover:text-fg"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            disabled={isToday}
            aria-label="Sonraki gün"
            className="rounded-lg border border-line p-2 text-muted hover:text-fg disabled:opacity-30 disabled:hover:text-muted"
          >
            <ChevronRight size={18} />
          </button>
          {!isToday && (
            <button
              type="button"
              onClick={() => setDayKey(today)}
              className="ml-2 rounded-lg px-3 py-2 text-sm font-medium text-flame hover:underline"
            >
              Bugüne dön
            </button>
          )}
        </div>
      </div>

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
      ) : active.length === 0 ? (
        <p className="mt-8 text-sm text-muted">Bu tarihte takip edilen alışkanlık yok.</p>
      ) : (
        <>
          <div className="mt-6 flex items-center gap-6 rounded-xl border border-line bg-panel p-5">
            <ProgressRing percent={percent} />
            <div>
              <p className="font-display text-2xl font-semibold">
                {doneCount} / {active.length} tamamlandı
              </p>
              <p className="mt-1 text-sm text-muted">
                {allDone
                  ? 'Hepsi tamam.'
                  : `${active.length - doneCount} alışkanlık kaldı.`}
              </p>
            </div>
          </div>

          {allDone && (
            <div
              role="status"
              className="mt-4 flex items-center gap-3 rounded-xl border border-flame/50 bg-flame/10 p-4 text-sm"
            >
              <PartyPopper size={20} className="shrink-0 text-flame" />
              <p>
                {isToday ? 'Harika iş!' : 'Bu gün tamamdı.'} Tüm alışkanlıklar tamamlandı.
              </p>
            </div>
          )}

          <ul className="mt-6 flex flex-col gap-3">
            {active.map((h) => (
              <HabitCard
                key={h.id}
                habit={h}
                done={h.completions.includes(dayKey)}
                streak={currentStreak(h.completions)}
                onToggle={() => toggleDay(h.id, dayKey)}
              />
            ))}
          </ul>
        </>
      )}
    </section>
  )
}
