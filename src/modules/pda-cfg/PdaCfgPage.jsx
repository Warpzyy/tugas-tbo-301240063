// src/modules/pda-cfg/PdaCfgPage.jsx
import { useState } from 'react';
import { parseCFG, generateDerivationAndTree } from './logic/cfgParser';
import ParseTreeVisualizer from './components/ParseTreeVisualizer';

export default function PdaCfgPage() {
  const [cfgInput, setCfgInput] = useState("S -> aSb\nS -> ε");
  const [testString, setTestString] = useState("aabb");
  const [result, setResult] = useState(null);

  const handleSimulate = (e) => {
    e.preventDefault();
    const rules = parseCFG(cfgInput);
    const analysis = generateDerivationAndTree(rules, "S", testString);
    setResult(analysis);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-xl font-bold">Modul 3: Pushdown Automata & CFG</h2>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">CFG → PDA</span>
      </div>
      <p className="text-slate-500 mb-6">
        Definisikan Aturan Produksi Context-Free Grammar (CFG) Anda, lalu uji string untuk melihat langkah 
        derivasi serta visualisasi diagram pohon penurunan (*Parse Tree*).
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* PANEL KIRI: INPUT CFG */}
        <section className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-3">Definisi Tata Bahasa (CFG)</h3>
          <div className="mb-4">
            <label className="block text-xs font-bold text-gray-600 mb-1">Aturan Produksi (Gunakan '->' dan enter untuk baris baru):</label>
            <textarea
              rows="4"
              value={cfgInput}
              onChange={(e) => { setCfgInput(e.target.value); setResult(null); }}
              className="w-full border rounded px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-indigo-400"
              placeholder="S -> aSb&#10;S -> ε"
            />
          </div>
          <p className="text-xs text-slate-400 italic">💡 Catatan: Gunakan simbol 'ε' atau 'e' untuk melambangkan string kosong/null.</p>
        </section>

        {/* PANEL KANAN: SIMULASI STRING & DERIVASI */}
        <section className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm h-fit">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-3">Uji Validasi String PDA</h3>
          <form onSubmit={handleSimulate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">String Input:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  className="flex-1 border rounded px-3 py-1.5 text-sm font-mono focus:ring-2 focus:ring-indigo-400"
                  placeholder="Masukkan string, contoh: aabb"
                />
                <button type="submit" className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm px-4 py-1.5 rounded transition-colors">
                  Jalankan
                </button>
              </div>
            </div>
          </form>

          {result && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="mb-3">
                <span className="text-xs font-bold text-gray-500 block mb-1">Status Validasi PDA:</span>
                <span className={`inline-block font-bold px-3 py-1 rounded text-sm ${
                  result.isAccepted ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {result.isAccepted ? 'ACCEPTED' : 'REJECTED'}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-500 block mb-1">Trace Derivasi (Leftmost):</span>
                <div className="font-mono text-xs bg-slate-50 p-2 rounded text-slate-700 max-h-32 overflow-y-auto">
                  {result.derivationSteps.map((step, idx) => (
                    <div key={idx}>
                      {idx > 0 && " ⇒ "} {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* AREA GRAFIK TATA POHON PENURUNAN */}
      <ParseTreeVisualizer nodes={result ? result.treeNodes : []} />
    </div>
  );
}