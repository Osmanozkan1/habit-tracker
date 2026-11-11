import { dayStats, lastDays } from '../utils/stats'
import { toKey } from '../utils/dates'

export default function WeeklyChart({ habits }) {
  const days = lastDays(7).map((d) => dayStats(habits, d))
  const todayKey = toKey()

  return (
    <div className="flex h-48 items-stretch gap-2 sm:gap-3">
      {days.map(({ key, date, total, done }) => {
        const pct = total ? (done / total) * 100 : 0
        const isToday = key === todayKey
        return (
          <div
            key={key}
            className="flex flex-1 flex-col items-center gap-2"
            title={`${done} / ${total} tamamlandı`}
          >
            <span className="text-xs text-muted">{total ? `${done}/${total}` : '-'}</span>
            <div className="flex w-full flex-1 items-end rounded-md bg-ink">
              <div
                className={`w-full rounded-md ${isToday ? 'bg-flame' : 'bg-flame/50'}`}
                style={{ height: `${pct}%` }}
              />
            </div>
            <span className={`text-xs ${isToday ? 'font-semibold text-flame' : 'text-muted'}`}>
              {date.toLocaleDateString('tr-TR', { weekday: 'short' })}
            </span>
          </div>
        )
      })}
    </div>
  )
}
