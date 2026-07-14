/**
 * Model data untuk Finite State Automata (DFA/NFA).
 * Dipakai oleh modul FSA (langsung) dan modul Regex (hasil konversi RE->NFA).
 *
 * Struktur:
 * {
 *   states: string[]                 // daftar semua state, mis. ['q0','q1']
 *   alphabet: string[]                // simbol input, mis. ['0','1']
 *   transitions: {
 *     [state: string]: {
 *       [symbol: string]: string[]    // array agar mendukung NFA (banyak tujuan)
 *                                     // dan epsilon-transition (symbol = 'ε')
 *     }
 *   }
 *   startState: string
 *   finalStates: string[]
 * }
 */

/** Buat FSA kosong sebagai starting point form builder. */
export function createEmptyFSA() {
  return {
    states: ['q0'],
    alphabet: ['0', '1'],
    transitions: {},
    startState: 'q0',
    finalStates: [],
  }
}

/** Cek apakah FSA ini deterministik (DFA) atau bukan (NFA). */
export function isDeterministic(fsa) {
  for (const state of fsa.states) {
    const trans = fsa.transitions[state] || {}
    for (const symbol of fsa.alphabet) {
      const targets = trans[symbol] || []
      if (targets.length > 1) return false
    }
    // epsilon transition -> otomatis NFA
    if (trans['ε'] && trans['ε'].length > 0) return false
  }
  return true
}

/**
 * Hitung epsilon-closure dari sekumpulan state.
 * @param {object} fsa
 * @param {Set<string>} states
 * @returns {Set<string>}
 */
export function epsilonClosure(fsa, states) {
  const stack = [...states]
  const closure = new Set(states)
  while (stack.length) {
    const s = stack.pop()
    const targets = (fsa.transitions[s] || {})['ε'] || []
    for (const t of targets) {
      if (!closure.has(t)) {
        closure.add(t)
        stack.push(t)
      }
    }
  }
  return closure
}

/**
 * Simulasikan sebuah string pada FSA (mendukung DFA maupun NFA).
 * Mengembalikan { accepted: boolean, trace: Array<{ step, symbol, from: string[], to: string[] }> }
 */
export function simulateFSA(fsa, input) {
  let current = epsilonClosure(fsa, new Set([fsa.startState]))
  const trace = [{ step: 0, symbol: null, from: [], to: [...current] }]

  for (let i = 0; i < input.length; i++) {
    const symbol = input[i]
    let next = new Set()
    for (const state of current) {
      const targets = (fsa.transitions[state] || {})[symbol] || []
      targets.forEach((t) => next.add(t))
    }
    next = epsilonClosure(fsa, next)
    trace.push({ step: i + 1, symbol, from: [...current], to: [...next] })
    current = next
    if (current.size === 0) break // dead state, berhenti lebih awal
  }

  const accepted = [...current].some((s) => fsa.finalStates.includes(s))
  return { accepted, trace }
}
