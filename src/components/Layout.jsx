import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import HabitForm from './HabitForm'

export default function Layout() {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[15rem_1fr]">
      <Sidebar />
      <div className="flex min-w-0 flex-col pb-20 md:pb-0">
        <Topbar />
        <main className="flex-1 px-5 py-6 md:px-10">
          <Outlet />
        </main>
      </div>
      <HabitForm />
    </div>
  )
}
