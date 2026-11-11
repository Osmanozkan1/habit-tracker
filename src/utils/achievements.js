import { longestStreak } from './streaks'

export function getAchievements(habits) {
  const totalDone = habits.reduce((sum, h) => sum + h.completions.length, 0)
  const best = Math.max(0, ...habits.map((h) => longestStreak(h.completions)))

  return [
    { id: 'first', icon: '🌱', title: 'İlk adım', desc: 'İlk alışkanlığını ekle', unlocked: habits.length >= 1 },
    { id: 'check10', icon: '🔥', title: 'Isınma', desc: '10 kez tamamla', unlocked: totalDone >= 10 },
    { id: 'streak7', icon: '📅', title: 'Bir hafta', desc: '7 günlük seri yap', unlocked: best >= 7 },
    { id: 'five', icon: '🎯', title: 'Çok yönlü', desc: '5 alışkanlık takip et', unlocked: habits.length >= 5 },
    { id: 'streak30', icon: '🏆', title: 'Bir ay', desc: '30 günlük seri yap', unlocked: best >= 30 },
    { id: 'check100', icon: '💯', title: 'Yüzlük', desc: '100 kez tamamla', unlocked: totalDone >= 100 },
  ]
}
