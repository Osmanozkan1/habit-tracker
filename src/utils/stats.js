import { toKey, addDays } from './dates'

// Bugün dahil son n günün Date listesi (eskiden yeniye)
export function lastDays(n, end = new Date()) {
  return Array.from({ length: n }, (_, i) => addDays(end, i - (n - 1)))
}

// O gün var olan alışkanlıklar içinden kaçı tamamlandı
export function dayStats(habits, date) {
  const key = toKey(date)
  const active = habits.filter((h) => h.createdAt <= key)
  const done = active.filter((h) => h.completions.includes(key)).length
  return { key, date, total: active.length, done }
}
