// src/modules/chomsky/ChomskyPage.jsx
import { useState } from 'react';
import { convertToCNF } from './logic/cnfConverter.js';
import ChomskyMap from './components/ChomskyMap.jsx';

export default function ChomskyPage() {
  const [cfgInput, setCfgInput] = useState("A -> aB | ε\nB -> b");
  const [conversionResult, setConversionResult] = useState(null);

  const handleConvert = (e) => {
    e.preventDefault();
    const result = convertToCNF(cfgInput);
    setConversionResult(result);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-1">
        <h2 className="text-xl font-bold">Modul 4: Hierarki Chomsky & CNF</h2>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-700">CFG → CNF</span>
      </div>
      <p className="text-slate-500 mb-6">
        Ubah aturan tata bahasa bebas konteks (CFG) sembarang ke bentuk normal Chomsky (CNF) secara otomatis 
        lengkap dengan rincian langkah transformasi pembersihannya.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* PANEL KIRI: INPUT CFG */}
        <section className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-3">CFG Awal</h3>
          <form onSubmit={handleConvert} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1">Aturan Produksi:</label>
              <textarea
                rows="4"
                value={cfgInput}
                onChange={(e) => setCfgInput(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-amber-400"
                placeholder="A -> aB | ε&#10;B -> b"
              />
            </div>
            <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm py-2 rounded transition-colors">
              Konversi ke CNF
            </button>
          </form>
        </section>

        {/* PANEL KANAN: LANGKAH & HASIL CNF */}
        <section className="border border-slate-200 rounded-lg p-4 bg-white shadow-sm h-fit">
          <h3 className="text-sm font-bold uppercase text-slate-400 mb-3">Hasil Transformasi CNF</h3>
          
          {conversionResult ? (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-gray-500 block mb-1">Langkah-Langkah Pembersihan:</span>
                <div className="space-y-2 max-h-48 overflow-y-auto text-xs bg-slate-50 p-3 rounded border">
                  {conversionResult.steps.map((step, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-1.5 last:border-0 last:pb-0">
                      <div className="font-bold text-slate-700">{step.title}</div>
                      <div className="text-slate-500">{step.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-500 block mb-1">Bentuk Normal Chomsky Akhir:</span>
                <div className="border rounded bg-amber-50 p-3 font-mono text-sm text-amber-900 font-bold">
                  {conversionResult.finalRules.map((rule, idx) => (
                    <div key={idx}>• {rule}</div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-sm text-gray-400 italic">
              Klik tombol konversi untuk melihat tahapan reduksi aturan tata bahasa bebas konteks.
            </div>
          )}
        </section>
      </div>

      {/* PETA GRAFIS HIERARKI CHOMSKY */}
      <ChomskyMap />
    </div>
  );
}