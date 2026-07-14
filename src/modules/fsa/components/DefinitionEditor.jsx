import { useState } from 'react'

export default function DefinitionEditor({ fsa, onChange }) {
  const [newState, setNewState] = useState('')
  const [newSymbol, setNewSymbol] = useState('')

  function addState() {
    const name = newState.trim()
    if (!name || fsa.states.includes(name)) return
    onChange({ ...fsa, states: [...fsa.states, name] })
    setNewState('')
  }

  function removeState(state) {
    const { [state]: _removed, ...restTransitions } = fsa.transitions
    onChange({
      ...fsa,
      states: fsa.states.filter((s) => s !== state),
      transitions: restTransitions,
      startState: fsa.startState === state ? '' : fsa.startState,
      finalStates: fsa.finalStates.filter((s) => s !== state),
    })
  }

  function addSymbol() {
    const sym = newSymbol.trim()
    if (!sym || fsa.alphabet.includes(sym)) return
    onChange({ ...fsa, alphabet: [...fsa.alphabet, sym] })
    setNewSymbol('')
  }

  function removeSymbol(sym) {
    onChange({ ...fsa, alphabet: fsa.alphabet.filter((s) => s !== sym) })
  }

  function setStart(state) {
    onChange({ ...fsa, startState: state })
  }

  function toggleFinal(state) {
    const isFinal = fsa.finalStates.includes(state)
    onChange({
      ...fsa,
      finalStates: isFinal
        ? fsa.finalStates.filter((s) => s !== state)
        : [...fsa.finalStates, state],
    })
  }

  function updateCell(state, symbol, rawValue) {
    // rawValue = teks dipisah koma, mis. "q1,q2" -> ['q1','q2']
    const targets = rawValue
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    onChange({
      ...fsa,
      transitions: {
        ...fsa.transitions,
        [state]: {
          ...(fsa.transitions[state] || {}),
          [symbol]: targets,
        },
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* States */}
      <div>
        <label className="block text-sm font-semibold mb-1">State</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {fsa.states.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1 border border-slate-300 rounded px-2 py-1 text-sm"
            >
              {s}
              <button
                onClick={() => removeState(s)}
                className="text-slate-400 hover:text-red-600"
                title="Hapus state"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newState}
            onChange={(e) => setNewState(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addState()}
            placeholder="nama state, mis. q3"
            className="border border-slate-300 rounded px-2 py-1 text-sm w-40"
          />
          <button
            onClick={addState}
            className="border border-slate-300 rounded px-3 py-1 text-sm hover:bg-slate-100"
          >
            + Tambah state
          </button>
        </div>
      </div>

      {/* Alphabet */}
      <div>
        <label className="block text-sm font-semibold mb-1">Alfabet (Σ)</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {fsa.alphabet.map((sym) => (
            <span
              key={sym}
              className="inline-flex items-center gap-1 border border-slate-300 rounded px-2 py-1 text-sm font-mono"
            >
              {sym}
              <button
                onClick={() => removeSymbol(sym)}
                className="text-slate-400 hover:text-red-600"
                title="Hapus simbol"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSymbol()}
            placeholder="simbol, mis. a atau ε"
            className="border border-slate-300 rounded px-2 py-1 text-sm w-40"
          />
          <button
            onClick={addSymbol}
            className="border border-slate-300 rounded px-3 py-1 text-sm hover:bg-slate-100"
          >
            + Tambah simbol
          </button>
        </div>
      </div>

      {/* Start & Final state */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Start State</label>
          <select
            value={fsa.startState}
            onChange={(e) => setStart(e.target.value)}
            className="border border-slate-300 rounded px-2 py-1 text-sm w-full"
          >
            <option value="">— pilih —</option>
            {fsa.states.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Final State(s)</label>
          <div className="flex flex-wrap gap-3">
            {fsa.states.map((s) => (
              <label key={s} className="inline-flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={fsa.finalStates.includes(s)}
                  onChange={() => toggleFinal(s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Transition table */}
      <div>
        <label className="block text-sm font-semibold mb-1">Tabel Transisi (δ)</label>
        <p className="text-xs text-slate-500 mb-2">
          Isi target state, pisahkan dengan koma untuk NFA (mis. "q1,q2"). Kosongkan jika tidak ada transisi.
        </p>
        <div className="overflow-x-auto">
          <table className="border border-slate-300 text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-300 px-3 py-1">State</th>
                {fsa.alphabet.map((sym) => (
                  <th key={sym} className="border border-slate-300 px-3 py-1 font-mono">{sym}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fsa.states.map((state) => (
                <tr key={state}>
                  <td className="border border-slate-300 px-3 py-1 font-medium bg-slate-50">
                    {state}
                    {state === fsa.startState && <span className="text-blue-600"> (start)</span>}
                    {fsa.finalStates.includes(state) && <span className="text-green-600"> (final)</span>}
                  </td>
                  {fsa.alphabet.map((sym) => (
                    <td key={sym} className="border border-slate-300 px-1 py-1">
                      <input
                        value={(fsa.transitions[state]?.[sym] || []).join(',')}
                        onChange={(e) => updateCell(state, sym, e.target.value)}
                        className="w-20 px-1 py-0.5 text-sm border border-transparent focus:border-slate-300 rounded"
                        placeholder="-"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
