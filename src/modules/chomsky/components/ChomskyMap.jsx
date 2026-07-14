// src/modules/chomsky/components/ChomskyMap.jsx
import React from 'react';

export default function ChomskyMap() {
  return (
    <div className="mt-6 p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-sm font-bold uppercase text-slate-400 mb-4">Peta Visualisasi Hierarki Chomsky</h3>
      <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded border space-y-3">
        
        {/* Lapisan Tipe 0 */}
        <div className="w-full max-w-md p-3 bg-red-50 border border-red-300 rounded text-center">
          <span className="font-bold text-red-800 text-xs block">Tipe 0: Unrestricted Grammar (Mesin Turing)</span>
          
          {/* Lapisan Tipe 1 */}
          <div className="mt-2 p-3 bg-amber-50 border border-amber-300 rounded text-center">
            <span className="font-bold text-amber-800 text-xs block">Tipe 1: Context-Sensitive Grammar (LBA)</span>
            
            {/* Lapisan Tipe 2 */}
            <div className="mt-2 p-3 bg-indigo-50 border border-indigo-400 rounded text-center ring-2 ring-indigo-600 ring-offset-1">
              <span className="font-bold text-indigo-900 text-xs block">⭐ Tipe 2: Context-Free Grammar (PDA / CNF)</span>
              
              {/* Lapisan Tipe 3 */}
              <div className="mt-2 p-3 bg-emerald-50 border border-emerald-300 rounded text-center">
                <span className="font-bold text-emerald-800 text-xs block">Tipe 3: Regular Grammar (DFA/NFA)</span>
              </div>
            </div>

          </div>
        </div>

      </div>
      <p className="text-xs text-slate-400 mt-2 text-center">
        💡 Kotak bergaris tebal <span className="text-indigo-600 font-bold">Indigo</span> menandakan posisi cakupan tata bahasa bebas konteks yang sedang diproses di modul ini.
      </p>
    </div>
  );
}