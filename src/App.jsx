import { Routes, Route, NavLink } from 'react-router-dom'
import FSAPage from './modules/fsa/FSAPage.jsx'
import RegexPage from './modules/regex/RegexPage.jsx'
import PdaCfgPage from './modules/pda-cfg/PdaCfgPage.jsx'
import ChomskyPage from './modules/chomsky/ChomskyPage.jsx'

const navItems = [
  { to: '/', label: 'Beranda', end: true },
  { to: '/fsa', label: 'Finite State Automata' },
  { to: '/regex', label: 'Regular Expression' },
  { to: '/pda-cfg', label: 'PDA & CFG' },
  { to: '/chomsky', label: 'Hierarki Chomsky & CNF' },
]

function Home() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-2">TBO Capstone — Simulator Otomata</h1>
      <p className="text-slate-600">
        Aplikasi ini mengintegrasikan empat modul Teori Bahasa dan Otomata:
        Finite State Automata, Regular Expression, Pushdown Automata &amp; CFG,
        serta Hierarki Chomsky &amp; Chomsky Normal Form. Pilih modul di menu atas
        untuk mulai.
      </p>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <nav className="max-w-5xl mx-auto flex flex-wrap gap-1 px-4 py-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fsa" element={<FSAPage />} />
          <Route path="/regex" element={<RegexPage />} />
          <Route path="/pda-cfg" element={<PdaCfgPage />} />
          <Route path="/chomsky" element={<ChomskyPage />} />
        </Routes>
      </main>

      <footer className="text-center text-xs text-slate-400 py-4">
        TBO Capstone Project — Semester Genap 2025/2026
      </footer>
    </div>
  )
}
