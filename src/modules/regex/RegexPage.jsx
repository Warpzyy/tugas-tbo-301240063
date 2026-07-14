// src/modules/regex/RegexPage.jsx
import { useState } from 'react';
import { regexToNFA, generateRegularGrammar } from './logic/regexParser';
import StateDiagram from '../fsa/components/StateDiagram'; // Menggunakan kembali komponen dari Modul 1!

export default function RegexPage() {
  const [regexInput, setRegexInput] = useState('(a|b)*abb');
  const [testString, setTestString] = useState('abb');
  const [simulationResult, setSimulationResult] = useState(null);

  // Lakukan parsing rumus RegEx ke bentuk mesin NFA secara dinamis
  const generatedNFA = regexToNFA(regexInput);
  const grammarRules = generatedNFA ? generateRegularGrammar(generatedNFA) : [];

  const handleTestRegex = (e) => {
    e.preventDefault();
    
    // Uji kecocokan ekspresi menggunakan engine JavaScript bawaan regex
    try {
      // Membersihkan penulisan rumus agar kompatibel dengan JS RegExp Engine
      const cleanPattern = regexInput.replace(/ε/g, '');
      const pattern = new RegExp(`^(${cleanPattern})$`);
      const isMatched = pattern.test(testString);
      
      setSimulationResult(isMatched ? 'ACCEPTED' : 'REJECTED');
    } catch (err) {
      setSimulationResult('ERROR: Format RegEx Tidak Valid');
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-xl font-bold">Modul 2: Regular Expression</h2>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-purple-100 text-purple-700">RE → NFA</span>
      </div>
      <p className="text-slate-500 mb-6">
        Masukkan ekspresi reguler Anda untuk dianalisis menjadi mesin NFA secara otomatis, menguji string, 
        dan melihat struktur aturan produksi tata bahasa reguler (*Regular Grammar*) yang setara.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* PANEL KIRI: DEFINISI REGEX & ATURAN PRODUKSI */}
        <section className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-3">Definisi Rumus RegEx</h3>
          
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-600 mb-1">Formula Ekspresi Reguler (RE):</label>
            <input 
              type="text" 
              value={regexInput}
              onChange={(e) => { setRegexInput(e.target.value); setSimulationResult(null); }}
              className="w-full border rounded px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-purple-400"
              placeholder="Contoh: a*b, (a|b)*abb"
            />
          </div>

          <div className="mt-5">
            <label className="block text-xs font-bold text-gray-600 mb-2">Regular Grammar yang Setara:</label>
            <div className="border rounded bg-slate-50 p-3 max-h-48 overflow-y-auto font-mono text-sm text-gray-700">
              {grammarRules.map((rule, idx) => (
                <div key={idx} className="py-0.5">• {rule}</div>
              ))}
            </div>
          </div>
        </section>

        {/* PANEL KANAN: PENGUJIAN STRING */}
        <section className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm h-fit">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-3">Pengujian Validasi String</h3>
          <form onSubmit={handleTestRegex} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">String Uji:</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  className="flex-1 border rounded px-3 py-1.5 text-sm font-mono focus:ring-2 focus:ring-purple-400"
                  placeholder="Masukkan string, misal: abb"
                />
                <button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm px-4 py-1.5 rounded transition-colors">
                  Uji String
                </button>
              </div>
            </div>
          </form>

          {simulationResult && (
            <div className="mt-5 pt-4 border-t border-gray-100">
              <span className="text-xs font-bold text-gray-500 block mb-1">Status Kecocokan:</span>
              <span className={`inline-block font-bold px-3 py-1 rounded text-sm ${
                simulationResult === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-700' : 
                simulationResult === 'REJECTED' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {simulationResult}
              </span>
            </div>
          )}
        </section>
      </div>

      {/* VISUALISASI GRAFIS MESIN DI BAGIAN BAWAH */}
      {generatedNFA && (
        <div className="mt-8">
          <StateDiagram 
            states={generatedNFA.states}
            alphabet={generatedNFA.alphabet}
            transitions={generatedNFA.transitions}
            startState={generatedNFA.startState}
            finalStates={generatedNFA.finalStates}
            activeState={simulationResult === 'ACCEPTED' ? generatedNFA.finalStates[0] : generatedNFA.startState}
          />
        </div>
      )}
    </div>
  );
}