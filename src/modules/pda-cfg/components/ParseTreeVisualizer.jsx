// src/modules/pda-cfg/components/ParseTreeVisualizer.jsx
import React from 'react';

export default function ParseTreeVisualizer({ nodes }) {
  if (!nodes || nodes.length === 0) {
    return (
      <div className="mt-6 p-6 border rounded-lg bg-gray-50 text-center text-sm text-gray-400 italic">
        Belum ada visualisasi parse tree. Jalankan uji string yang valid untuk membentuk pohon penurunan.
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Visualisasi Grafis Parse Tree (Pohon Penurunan)</h3>
      <div className="overflow-x-auto">
        <svg width="500" height="300" className="mx-auto border bg-slate-50 rounded">
          {/* Gambar Garis Penghubung antar Cabang Pohon */}
          {nodes.map((node) => {
            if (node.parent === null) return null;
            const parentNode = nodes.find(n => n.id === node.parent);
            if (!parentNode) return null;

            return (
              <line
                key={`line-${node.id}`}
                x1={parentNode.x}
                y1={parentNode.y}
                x2={node.x}
                y2={node.y}
                stroke="#64748B"
                strokeWidth="2"
              />
            );
          })}

          {/* Gambar Lingkaran Node dan Huruf Token */}
          {nodes.map((node) => (
            <g key={`node-${node.id}`} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                r="16"
                fill={node.label === 'S' ? '#EEF2F6' : '#DDBEFE'}
                stroke={node.label === 'S' ? '#64748B' : '#7C3AED'}
                strokeWidth="2"
              />
              <text
                textAnchor="middle"
                dy=".3em"
                className="text-xs font-bold fill-slate-800"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}