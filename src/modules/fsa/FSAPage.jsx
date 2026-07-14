import { useState } from 'react'
import DefinitionEditor from './components/DefinitionEditor.jsx'
import SimulationPanel from './components/SimulationPanel.jsx'
import { exampleDFA } from './logic/exampleFSA.js'
import { isDeterministic } from '../../shared/fsaModel.js'

export default function FSAPage() {
  const [fsa, setFsa] = useState(exampleDFA)
  const deterministic = isDeterministic(fsa)

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-xl font-bold">Modul 1: Finite State Automata</h2>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded ${
            deterministic ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
          }`}
        >
          {deterministic ? 'DFA' : 'NFA'}
        </span>
      </div>
      <p className="text-slate-500 mb-6">
        Definisikan state, alfabet, dan tabel transisi di bawah, lalu uji string untuk
        melihat proses transisi step-by-step. Contoh bawaan: DFA yang menerima string
        biner berakhiran <span className="font-mono">01</span>.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="border border-slate-200 rounded-lg p-4">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-3">
            Definisi Mesin
          </h3>
          <DefinitionEditor fsa={fsa} onChange={setFsa} />
        </section>

        <section className="border border-slate-200 rounded-lg p-4 h-fit">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-3">
            Simulasi
          </h3>
          <SimulationPanel fsa={fsa} />
        </section>
      </div>
    </div>
  )
}