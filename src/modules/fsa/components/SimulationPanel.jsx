import { useState } from 'react'
import { simulateFSA } from '../../../shared/fsaModel.js'

export default function SimulationPanel({ fsa }) {
  const [input, setInput] = useState('001')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  function runSimulation() {
    setError('')
    if (!fsa.startState) {
      setError('Start state belum dipilih. Atur dulu di bagian definisi mesin.')
      setResult(null)
      return
    }
    const invalidChars = [...input].filter((ch) => !fsa.alphabet.includes(ch))
    if (invalidChars.length > 0) {
      setError(`Input mengandung simbol di luar alfabet: ${[...new Set(invalidChars)].join(', ')}`)
      setResult(null)
      return
    }
    setResult(simulateFSA(fsa, input))
  }

  return (
    <div>
      <label className="block text-sm font-semibold mb-1">Uji String</label>
      <div className="flex gap-2 mb-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-slate-300 rounded px-2 py-1 text-sm font-mono flex-1"
          placeholder="mis. 001"
        />
        <button
          onClick={runSimulation}
          className="bg-slate-900 text-white text-sm px-4 py-1 rounded hover:bg-slate-700"
        >
          Jalankan
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 border border-red-200 bg-red-50 rounded px-3 py-2">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-3">
          <div
            className={`inline-block text-sm font-semibold px-3 py-1 rounded mb-3 ${
              result.accepted
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {result.accepted ? 'ACCEPTED' : 'REJECTED'}
          </div>

          <table className="border border-slate-300 text-sm w-full">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-3 py-1">Step</th>
                <th className="border border-slate-300 px-3 py-1">Simbol Dibaca</th>
                <th className="border border-slate-300 px-3 py-1">State Sebelum</th>
                <th className="border border-slate-300 px-3 py-1">State Sesudah</th>
              </tr>
            </thead>
            <tbody>
              {result.trace.map((row) => (
                <tr key={row.step}>
                  <td className="border border-slate-300 px-3 py-1 text-center">{row.step}</td>
                  <td className="border border-slate-300 px-3 py-1 text-center font-mono">
                    {row.symbol ?? '—'}
                  </td>
                  <td className="border border-slate-300 px-3 py-1 text-center font-mono">
                    {row.from.length ? `{${row.from.join(', ')}}` : '—'}
                  </td>
                  <td className="border border-slate-300 px-3 py-1 text-center font-mono">
                    {row.to.length ? `{${row.to.join(', ')}}` : '∅ (dead state)'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
