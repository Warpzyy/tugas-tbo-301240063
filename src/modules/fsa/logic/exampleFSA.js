// Contoh DFA: menerima semua string biner yang berakhiran "01"
// Dipakai sebagai nilai awal form builder, supaya user langsung
// punya contoh konkret untuk dipelajari/diubah.
export const exampleDFA = {
  states: ['q0', 'q1', 'q2'],
  alphabet: ['0', '1'],
  transitions: {
    q0: { '0': ['q1'], '1': ['q0'] },
    q1: { '0': ['q1'], '1': ['q2'] },
    q2: { '0': ['q1'], '1': ['q0'] },
  },
  startState: 'q0',
  finalStates: ['q2'],
}
