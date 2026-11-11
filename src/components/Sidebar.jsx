import { NavLink } from 'react-router-dom'
import { CalendarCheck, ListChecks, BarChart3, Flame } from 'lucide-react'

const links = [
  { to: '/', label: 'Bugün', icon: CalendarCheck, end: true },
  { to: '/aliskanliklar', label: 'Alışkanlıklar', icon: ListChecks },
  { to: '/istatistikler', label: 'İstatistikler', icon: BarChart3 },
]

const desktopLink = ({ isActive }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-flame/15 text-flame' : 'text-muted hover:bg-panel hover:text-fg'
  }`

const mobileLink = ({ isActive }) =>
  `flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium ${
    isActive ? 'text-flame' : 'text-muted'
  }`

export default function Sidebar() {
  return (
    <>
      {/* Masaüstü */}
      <aside className="sticky top-0 hidden h-screen flex-col gap-8 border-r border-line px-4 py-6 md:flex">
        <div className="flex items-center gap-2 px-3">
          <Flame className="text-flame" size={24} />
          <span className="font-display text-xl font-semibold">Seri</span>
        </div>
        <nav className="flex flex-col gap-1" aria-label="Ana menü">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={desktopLink}>
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobil */}
      <nav
        className="fixed inset-x-0 bottom-0 z-10 flex border-t border-line bg-panel md:hidden"
        aria-label="Ana menü"
      >
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={mobileLink}>
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
