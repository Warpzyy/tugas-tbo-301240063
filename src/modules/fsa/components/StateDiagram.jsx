import React from 'react';

export default function StateDiagram({ states, alphabet, transitions, startState, finalStates, activeState }) {
  // 1. Tentukan posisi otomatis untuk lingkaran (State) agar membentuk susunan melingkar/horizontal
  const radius = 40;
  const padding = 100;
  
  const statePositions = {};
  states.forEach((state, index) => {
    // Menyusun state secara horizontal berjejer agar mudah dibaca
    statePositions[state] = {
      x: padding + index * 160,
      y: 150
    };
  });

  return (
    <div className="mt-6 p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Visualisasi Diagram State (FSA)</h3>
      <div className="overflow-x-auto">
        <svg width={states.length * 180 + 100} height="300" className="mx-auto border bg-gray-50 rounded">
          {/* DEFINISI PENANDA PANAH (ARROWHEADS) */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563" />
            </marker>
            <marker id="arrow-active" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
            </marker>
          </defs>

          {/* 2. MENGGAMBAR GARIS TRANSISI (PANAH) */}
          {states.map((fromState) => {
            return alphabet.map((symbol) => {
              const toState = transitions[fromState]?.[symbol];
              if (!toState) return null;

              const from = statePositions[fromState];
              const to = statePositions[toState];
              if (!from || !to) return null;

              // Deteksi jika transisi ini sedang aktif dilewati
              const isActiveTransition = fromState === activeState;

              // Kasus 1: Transisi ke diri sendiri (Looping / Self-loop)
              if (fromState === toState) {
                return (
                  <g key={`${fromState}-${symbol}-loop`}>
                    <path
                      d={`M ${from.x - 10} ${from.y - radius} C ${from.x - 30} ${from.y - 90}, ${from.x + 30} ${from.y - 90}, ${from.x + 10} ${from.y - radius}`}
                      fill="none"
                      stroke={isActiveTransition ? "#10B981" : "#4B5563"}
                      strokeWidth={isActiveTransition ? "3" : "2"}
                      markerEnd={`url(#${isActiveTransition ? 'arrow-active' : 'arrow'})`}
                    />
                    <text x={from.x} y={from.y - 75} className="text-xs font-semibold fill-gray-700" textAnchor="middle">
                      {symbol}
                    </text>
                  </g>
                );
              }

              // Kasus 2: Transisi ke state lain (Garis Lurus)
              return (
                <g key={`${fromState}-${symbol}-${toState}`}>
                  <line
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke={isActiveTransition ? "#10B981" : "#9CA3AF"}
                    strokeWidth={isActiveTransition ? "3" : "2"}
                    markerEnd={`url(#${isActiveTransition ? 'arrow-active' : 'arrow'})`}
                  />
                  <text x={(from.x + to.x) / 2} y={from.y - 10} className="text-xs font-bold fill-indigo-600" textAnchor="middle">
                    {symbol}
                  </text>
                </g>
              );
            });
          })}

          {/* 3. MENGGAMBAR LINGKARAN STATE */}
          {states.map((state) => {
            const pos = statePositions[state];
            if (!pos) return null;

            const isStart = state === startState;
            const isFinal = finalStates.includes(state);
            const isActive = state === activeState;

            return (
              <g key={state} transform={`translate(${pos.x}, ${pos.y})`}>
                {/* Panah Indikator Awal untuk Start State */}
                {isStart && (
                  <path d="M -80 0 L -45 0" fill="none" stroke="#4B5563" strokeWidth="2" markerEnd="url(#arrow)" />
                )}

                {/* Lingkaran Luar untuk Final State (Double Circle) */}
                {isFinal && (
                  <circle r={radius + 6} fill="none" stroke={isActive ? "#10B981" : "#4B5563"} strokeWidth="2" />
                )}

                {/* Lingkaran Utama State */}
                <circle
                  r={radius}
                  fill={isActive ? "#D1FAE5" : "#FFFFFF"}
                  stroke={isActive ? "#10B981" : "#4B5563"}
                  strokeWidth={isActive ? "3" : "2"}
                  className="transition-colors duration-300"
                />

                {/* Tulisan Nama State */}
                <text textAnchor="middle" dy=".3em" className={`text-sm font-bold ${isActive ? 'fill-emerald-800' : 'fill-gray-800'}`}>
                  {state}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="text-xs text-gray-500 mt-2 text-center">
        💡 State berwarna <span className="text-emerald-600 font-bold">Hijau</span> menandakan posisi *state* aktif saat ini selama simulasi kata/string berjalan.
      </p>
    </div>
  );
}