import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import TodayPage from './pages/TodayPage'
import HabitsPage from './pages/HabitsPage'
import StatsPage from './pages/StatsPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<TodayPage />} />
        <Route path="aliskanliklar" element={<HabitsPage />} />
        <Route path="istatistikler" element={<StatsPage />} />
        <Route path="ayarlar" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
