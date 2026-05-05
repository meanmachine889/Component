import { useState } from 'react'
import ClockClock24 from './ClockClock24'
import './App.css'

type Mode = 'active' | 'medium' | 'quiet'

function App() {
  const [mode, setMode] = useState<Mode>('active')
  const [use24Hour, setUse24Hour] = useState(true)
  const [theme, setTheme] = useState<'dark' | 'light'>('light')

  return (
    <div className={`app ${theme === 'light' ? 'light-mode' : ''}`}>
      <ClockClock24 mode={mode} use24Hour={use24Hour} size={800} theme={theme} />
      <div className="controls">
        <div className="btn-group">
          {(['active', 'medium', 'quiet'] as Mode[]).map(m => (
            <button
              key={m}
              className={mode === m ? 'sel' : ''}
              onClick={() => setMode(m)}
            >
              {m}
            </button>
          ))}
        </div>
        <button
          className="toggle"
          onClick={() => setUse24Hour(v => !v)}
        >
          {use24Hour ? '24h' : '12h'}
        </button>
        <button
          className="toggle theme-toggle"
          onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </div>
  )
}

export default App
