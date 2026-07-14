/**
 * Model data untuk Context-Free Grammar (CFG).
 * Dipakai oleh modul PDA/CFG dan modul Hierarki Chomsky/CNF.
 *
 * Struktur:
 * {
 *   variables: string[]     // non-terminal, mis. ['S','A']
 *   terminals: string[]     // terminal, mis. ['a','b']
 *   productions: {
 *     [variable: string]: string[][]   // tiap production = array simbol
 *                                       // mis. S -> Ab | a  =>  { S: [['A','b'], ['a']] }
 *                                       // epsilon production ditandai dengan [] (array kosong)
 *   }
 *   startSymbol: string
 * }
 */

export function createEmptyCFG() {
  return {
    variables: ['S'],
    terminals: ['a', 'b'],
    productions: { S: [['a']] },
    startSymbol: 'S',
  }
}

/** Parse teks aturan produksi mentah, mis. "S -> Ab | a" menjadi format internal. */
export function parseProductionLine(line) {
  const [lhsRaw, rhsRaw] = line.split('->')
  const lhs = lhsRaw.trim()
  const alternatives = rhsRaw.split('|').map((alt) => {
    const trimmed = alt.trim()
    if (trimmed === 'ε' || trimmed === '') return []
    return trimmed.split(/\s+/)
  })
  return { lhs, alternatives }
}

/** Cek apakah suatu variabel nullable (bisa menurunkan string kosong). */
export function findNullableVariables(cfg) {
  const nullable = new Set()
  let changed = true
  while (changed) {
    changed = false
    for (const v of cfg.variables) {
      if (nullable.has(v)) continue
      const prods = cfg.productions[v] || []
      const isNullable = prods.some((rhs) =>
        rhs.every((sym) => sym === v ? false : nullable.has(sym) || rhs.length === 0)
      )
      const hasEpsilon = prods.some((rhs) => rhs.length === 0)
      if (hasEpsilon || isNullable) {
        nullable.add(v)
        changed = true
      }
    }
  }
  return nullable
}
