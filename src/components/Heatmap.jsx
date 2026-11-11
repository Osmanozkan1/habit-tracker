import { addDays } from '../utils/dates'
import { dayStats } from '../utils/stats'

const WEEKS = 12

function levelClass(done, total) {
  if (!total || done === 0) return 'bg-ink'
  const ratio = done / total
  if (ratio >= 1) return 'bg-flame'
  if (ratio > 0.66) return 'bg-flame/75'
  if (ratio > 0.33) return 'bg-flame/50'
  return 'bg-flame/25'
}

export default function Heatmap({ habits }) {
  const today = new Date()
  const weekdayIndex = (today.getDay() + 6) % 7 // Pazartesi = 0
  const start = addDays(today, -(weekdayIndex + 7 * (WEEKS - 1)))

  const cells = Array.from({ length: WEEKS * 7 }, (_, i) => {
    const date = addDays(start, i)
    return { ...dayStats(habits, date), future: date > today }
  })

  return (
    <div>
      <div className="grid auto-cols-fr grid-flow-col grid-rows-7 gap-1">
        {cells.map(({ key, date, total, done, future }) => (
          <div
            key={key}
            title={`${date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}: ${done}/${total}`}
            className={`aspect-square rounded-sm ${future ? 'opacity-0' : levelClass(done, total)}`}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-1.5 text-xs text-muted">
        Az
        <span className="h-3 w-3 rounded-sm bg-ink" />
        <span className="h-3 w-3 rounded-sm bg-flame/25" />
        <span className="h-3 w-3 rounded-sm bg-flame/50" />
        <span className="h-3 w-3 rounded-sm bg-flame/75" />
        <span className="h-3 w-3 rounded-sm bg-flame" />
        Çok
      </div>
    </div>
  )
}
