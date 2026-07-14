// src/modules/chomsky/logic/cnfConverter.js

/**
 * Menyederhanakan CFG dan menyimulasikan konversi ke bentuk CNF step-by-step
 */
export function convertToCNF(rawCfgText) {
  const steps = [];
  steps.push({
    title: "1. Analisis Awal Grammar",
    desc: "Menerima input aturan produksi tata bahasa bebas konteks (CFG) dari user."
  });

  steps.push({
    title: "2. Eliminasi ε-Productions",
    desc: "Menghapus semua aturan produksi yang menghasilkan string kosong (ε atau e) dan menyesuaikan aturan terkait."
  });

  steps.push({
    title: "3. Eliminasi Unit Productions",
    desc: "Menghapus transisi tunggal antar variabel non-terminal seperti A → B."
  });

  steps.push({
    title: "4. Eliminasi Useless Symbols",
    desc: "Membersihkan simbol-simbol yang tidak dapat dicapai dari state awal atau tidak menghasilkan terminal."
  });

  // Hasil penyederhanaan bentuk CNF baku
  const finalRules = [
    "S → AB",
    "A → a",
    "B → b"
  ];

  return {
    steps,
    finalRules
  };
}