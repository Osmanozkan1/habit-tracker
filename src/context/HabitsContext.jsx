import { createContext, useContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { toKey, addDays } from '../utils/dates'

const HabitsContext = createContext(null)

const DEMO = [
  { name: 'Günde 2 litre su iç', icon: '💧', color: '#5eb8ff', category: 'Sağlık', p: 0.85 },
  { name: '20 sayfa kitap oku', icon: '📚', color: '#b69cff', category: 'Öğrenme', p: 0.7 },
  { name: '30 dk yürüyüş', icon: '🏃', color: '#7be0a8', category: 'Spor', p: 0.6 },
  { name: 'Günlük yaz', icon: '✍️', color: '#ff7a8a', category: 'Kişisel', p: 0.5 },
]

export function HabitsProvider({ children }) {
  const [habits, setHabits] = useLocalStorage('habits', [])
  const [formOpen, setFormOpen] = useState(false)

  const addHabit = (data) =>
    setHabits((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...data, createdAt: toKey(), completions: [] },
    ])

  const deleteHabit = (id) =>
    setHabits((prev) => prev.filter((h) => h.id !== id))

  const toggleToday = (id) => {
    const today = toKey()
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h
        const done = h.completions.includes(today)
        return {
          ...h,
          completions: done
            ? h.completions.filter((d) => d !== today)
            : [...h.completions, today],
        }
      }),
    )
  }

  // Test ve ekran görüntüsü için: son 70 güne rastgele geçmiş ekler
  const loadDemo = () => {
    const now = new Date()
    const demo = DEMO.map(({ p, ...h }) => {
      const completions = []
      for (let i = 0; i < 70; i++) {
        if (Math.random() < p) completions.push(toKey(addDays(now, -i)))
      }
      return {
        id: crypto.randomUUID(),
        ...h,
        createdAt: toKey(addDays(now, -70)),
        completions,
      }
    })
    setHabits((prev) => [...prev, ...demo])
  }

  const value = {
    habits,
    addHabit,
    deleteHabit,
    toggleToday,
    loadDemo,
    formOpen,
    openForm: () => setFormOpen(true),
    closeForm: () => setFormOpen(false),
  }

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>
}

export function useHabits() {
  const ctx = useContext(HabitsContext)
  if (!ctx) throw new Error('useHabits, HabitsProvider içinde kullanılmalı')
  return ctx
}
