import { toKey, addDays } from './dates'

// Bugünden (bugün yapılmadıysa dünden) geriye doğru kesintisiz gün sayısı
export function currentStreak(completions) {
  const done = new Set(completions)
  let day = new Date()
  if (!done.has(toKey(day))) day = addDays(day, -1)

  let count = 0
  while (done.has(toKey(day))) {
    count++
    day = addDays(day, -1)
  }
  return count
}

// Geçmişteki en uzun kesintisiz gün sayısı
export function longestStreak(completions) {
  const sorted = [...new Set(completions)].sort()
  let best = 0
  let run = 0
  let prev = null

  for (const key of sorted) {
    if (prev && toKey(addDays(new Date(`${prev}T00:00:00`), 1)) === key) run++
    else run = 1
    best = Math.max(best, run)
    prev = key
  }
  return best
}
