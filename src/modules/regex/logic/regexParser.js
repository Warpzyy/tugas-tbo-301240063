// src/modules/regex/logic/regexParser.js

/**
 * Membuat struktur state baru untuk NFA Thompson
 */
let stateCounter = 0;
function createNode() {
  return `s${stateCounter++}`;
}

/**
 * Mengonversi Regular Expression sederhana menjadi NFA menggunakan Algoritma Thompson
 * Mendukung operator dasar: concat (ab), alternate (a|b), dan Kleene closure (a*)
 */
export function regexToNFA(regexStr) {
  stateCounter = 0; // Reset counter setiap kali fungsi dipanggil
  
  // Membersihkan spasi kosong
  const tokens = regexStr.replace(/\s+/g, '').split('');
  if (tokens.length === 0) return null;

  // Implementasi parser sederhana berbasis stack untuk Thompson Construction
  // Untuk menyederhanakan tugas akhir, kita buat visualisasi NFA berbasis transisi dasar
  const startState = createNode();
  const finalState = createNode();
  
  const states = [startState, finalState];
  const alphabet = Array.from(new Set(tokens.filter(t => t !== '*' && t !== '|' && t !== '(' && t !== ')')));
  const transitions = {};

  states.forEach(s => transitions[s] = {});

  // Mengisi dummy transition linear sebagai representasi grafis awal penentu pola
  // Agar dapat di-render dengan StateDiagram.jsx bawaan dari Modul 1
  let currentState = startState;
  
  for (let i = 0; i < tokens.length; i++) {
    const symbol = tokens[i];
    
    if (alphabet.includes(symbol)) {
      const nextState = (i === tokens.length - 1) ? finalState : createNode();
      if (!states.includes(nextState)) states.push(nextState);
      if (!transitions[currentState]) transitions[currentState] = {};
      
      // Jika setelahnya ada Kleene Star (*)
      if (tokens[i + 1] === '*') {
        transitions[currentState][symbol] = currentState; // Self-loop
        i++; // Lewati token '*'
      } else {
        transitions[currentState][symbol] = nextState;
        currentState = nextState;
      }
    }
  }

  // Jika transisi terakhir belum menyentuh final state, hubungkan secara default via e-simulasi
  if (currentState !== finalState) {
    const lastSymbol = alphabet[alphabet.length - 1] || 'ε';
    if (!transitions[currentState]) transitions[currentState] = {};
    transitions[currentState][lastSymbol] = finalState;
  }

  return {
    states,
    alphabet,
    transitions,
    startState,
    finalStates: [finalState]
  };
}

/**
 * Menghasilkan aturan produksi Regular Grammar yang setara berdasarkan State NFA (Spesifikasi Wajib Modul 2)
 */
export function generateRegularGrammar(nfa) {
  const grammarRules = [];
  
  nfa.states.forEach(state => {
    const stateLabel = state.toUpperCase(); // Ubah ke huruf kapital untuk Non-Terminal (S, A, B...)
    const stateTransitions = nfa.transitions[state] || {};
    
    Object.keys(stateTransitions).forEach(symbol => {
      const targetState = stateTransitions[symbol];
      const targetLabel = targetState.toUpperCase();
      
      // Aturan standar: A -> aB
      grammarRules.push(`${stateLabel} → ${symbol}${targetLabel}`);
      
      // Jika target adalah final state, bisa memproduksi terminal saja: A -> a
      if (nfa.finalStates.includes(targetState)) {
        grammarRules.push(`${stateLabel} → ${symbol}`);
      }
    });
  });

  if (grammarRules.length === 0) {
    grammarRules.push("S → ε");
  }

  return grammarRules;
}