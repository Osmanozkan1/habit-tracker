import { Flame } from 'lucide-react'
import { useHabits } from '../context/HabitsContext'
import WeeklyChart from '../components/WeeklyChart'
import Heatmap from '../components/Heatmap'
import { currentStreak, longestStreak } from '../utils/streaks'
import { dayStats, lastDays } from '../utils/stats'

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-panel p-5">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold">{value}</p>
    </div>
  )
}

export default function StatsPage() {
  const { habits } = useHabits()

  if (habits.length === 0) {
    return (
      <section>
        <h2 className="font-display text-3xl font-semibold">İstatistikler</h2>
        <p className="mt-4 text-sm text-muted">
          Henüz veri yok. Alışkanlık ekleyip işaretledikçe grafikler burada görünecek.
        </p>
      </section>
    )
  }

  const totalDone = habits.reduce((sum, h) => sum + h.completions.length, 0)
  const bestEver = Math.max(...habits.map((h) => longestStreak(h.completions)))
  const week = lastDays(7).map((d) => dayStats(habits, d))
  const weekDone = week.reduce((s, d) => s + d.done, 0)
  const weekTotal = week.reduce((s, d) => s + d.total, 0)
  const weekPercent = weekTotal ? Math.round((weekDone / weekTotal) * 100) : 0

  return (
    <section>
      <h2 className="font-display text-3xl font-semibold">İstatistikler</h2>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Bu hafta tamamlama" value={`%${weekPercent}`} />
        <StatCard label="En uzun seri" value={`${bestEver} gün`} />
        <StatCard label="Toplam tamamlama" value={totalDone} />
      </div>

      <div className="mt-6 rounded-xl border border-line bg-panel p-5">
        <h3 className="font-display text-lg font-semibold">Son 7 gün</h3>
        <div className="mt-4">
          <WeeklyChart habits={habits} />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-line bg-panel p-5">
        <h3 className="font-display text-lg font-semibold">Son 12 hafta</h3>
        <div className="mt-4">
          <Heatmap habits={habits} />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-line bg-panel p-5">
        <h3 className="font-display text-lg font-semibold">Alışkanlık serileri</h3>
        <ul className="mt-4 flex flex-col divide-y divide-line">
          {habits.map((h) => (
            <li key={h.id} className="flex items-center gap-3 py-3">
              <span className="text-xl">{h.icon}</span>
              <span className="min-w-0 flex-1 truncate font-medium">{h.name}</span>
              <span className="flex items-center gap-1 text-sm text-muted">
                <Flame size={14} className="text-flame" />
                {currentStreak(h.completions)} güncel
              </span>
              <span className="w-24 text-right text-sm text-muted">
                en uzun {longestStreak(h.completions)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
