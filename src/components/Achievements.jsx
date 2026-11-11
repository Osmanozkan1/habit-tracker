import { getAchievements } from '../utils/achievements'

export default function Achievements({ habits }) {
  const items = getAchievements(habits)
  const unlockedCount = items.filter((i) => i.unlocked).length

  return (
    <div>
      <p className="text-sm text-muted">
        {unlockedCount} / {items.length} rozet açıldı
      </p>
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {items.map(({ id, icon, title, desc, unlocked }) => (
          <li
            key={id}
            className={`rounded-lg border p-4 ${
              unlocked ? 'border-flame/50 bg-flame/10' : 'border-line opacity-50'
            }`}
          >
            <span className={`text-2xl ${unlocked ? '' : 'grayscale'}`}>{icon}</span>
            <p className="mt-2 text-sm font-semibold">{title}</p>
            <p className="text-xs text-muted">{desc}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
