import { useState } from 'react'
import { Download, Moon, Sun, Trash2, Upload } from 'lucide-react'
import { useHabits } from '../context/HabitsContext'
import { useSettings } from '../context/SettingsContext'
import { toKey } from '../utils/dates'

const isValidHabit = (h) =>
  h && typeof h.id === 'string' && typeof h.name === 'string' && Array.isArray(h.completions)

function Card({ title, children }) {
  return (
    <div className="mt-6 rounded-xl border border-line bg-panel p-5">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

const outlineBtn =
  'flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-medium hover:border-flame hover:text-flame'

export default function SettingsPage() {
  const { habits, replaceHabits } = useHabits()
  const { settings, update } = useSettings()
  const [message, setMessage] = useState('')

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ habits }, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `seri-yedek-${toKey()}.json`
    a.click()
    URL.revokeObjectURL(url)
    setMessage('Yedek indirildi.')
  }

  const importData = async (e) => {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file) return
    try {
      const data = JSON.parse(await file.text())
      if (!Array.isArray(data.habits) || !data.habits.every(isValidHabit)) {
        throw new Error('invalid')
      }
      const ok = window.confirm(
        `${data.habits.length} alışkanlık yüklenecek ve mevcut veriler silinecek. Devam edilsin mi?`,
      )
      if (ok) {
        replaceHabits(
          data.habits.map((h) => ({
            icon: '✅',
            color: '#f2b441',
            category: 'Kişisel',
            createdAt: toKey(),
            ...h,
          })),
        )
        setMessage('Yedek yüklendi.')
      }
    } catch {
      setMessage('Dosya okunamadı. Seri uygulamasından alınmış bir yedek seç.')
    }
  }

  const resetAll = () => {
    if (window.confirm('Tüm alışkanlıkların ve geçmişin silinecek. Bu geri alınamaz. Emin misin?')) {
      replaceHabits([])
      setMessage('Tüm veriler silindi.')
    }
  }

  return (
    <section>
      <h2 className="font-display text-3xl font-semibold">Ayarlar</h2>

      <Card title="Profil">
        <label htmlFor="user-name" className="text-sm font-medium">
          Adın
        </label>
        <input
          id="user-name"
          type="text"
          value={settings.name}
          maxLength={30}
          onChange={(e) => update({ name: e.target.value })}
          placeholder="Bugün sayfasında selamlamak için"
          className="mt-1.5 w-full max-w-sm rounded-lg border border-line bg-ink px-3 py-2.5 text-sm placeholder:text-muted focus:border-flame focus:outline-none"
        />
      </Card>

      <Card title="Görünüm">
        <div className="flex gap-3" role="group" aria-label="Tema">
          {[
            ['dark', 'Koyu', Moon],
            ['light', 'Açık', Sun],
          ].map(([value, text, Icon]) => (
            <button
              key={value}
              type="button"
              onClick={() => update({ theme: value })}
              aria-pressed={settings.theme === value}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium ${
                settings.theme === value
                  ? 'border-flame bg-flame/15 text-flame'
                  : 'border-line text-muted hover:text-fg'
              }`}
            >
              <Icon size={16} />
              {text}
            </button>
          ))}
        </div>
      </Card>

      <Card title="Veri">
        <p className="text-sm text-muted">
          Verilerin yalnızca bu tarayıcıda (LocalStorage) saklanır. Yedek alıp başka bir
          cihazda yükleyebilirsin.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" onClick={exportData} className={outlineBtn}>
            <Download size={16} />
            Yedek indir
          </button>
          <label className={`${outlineBtn} cursor-pointer`}>
            <Upload size={16} />
            Yedek yükle
            <input type="file" accept="application/json,.json" onChange={importData} className="sr-only" />
          </label>
          <button
            type="button"
            onClick={resetAll}
            className="flex items-center gap-2 rounded-lg border border-red-400/40 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10"
          >
            <Trash2 size={16} />
            Tüm verileri sil
          </button>
        </div>
        {message && (
          <p role="status" className="mt-4 text-sm text-flame">
            {message}
          </p>
        )}
      </Card>
    </section>
  )
}
