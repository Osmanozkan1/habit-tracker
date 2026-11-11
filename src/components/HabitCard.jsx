import { Check, Flame } from 'lucide-react'

export default function HabitCard({ habit, done, streak, onToggle }) {
  return (
    <li className="flex items-center gap-4 rounded-xl border border-line bg-panel p-4">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-xl"
        style={{ backgroundColor: `${habit.color}26` }}
      >
        {habit.icon}
      </span>

      <div className="min-w-0 flex-1">
        <p className={`truncate font-medium ${done ? 'text-muted line-through' : ''}`}>
          {habit.name}
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted">
          <Flame size={14} className={streak > 0 ? 'text-flame' : ''} />
          {streak} günlük seri
        </p>
      </div>

      <span className="hidden rounded-full border border-line px-2.5 py-1 text-xs text-muted sm:inline">
        {habit.category}
      </span>

      <button
        type="button"
        onClick={onToggle}
        aria-pressed={done}
        aria-label={`${habit.name} bugün yapıldı`}
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
          done
            ? 'border-flame bg-flame text-ink'
            : 'border-line text-muted hover:border-flame hover:text-flame'
        }`}
      >
        <Check size={20} />
      </button>
    </li>
  )
}
