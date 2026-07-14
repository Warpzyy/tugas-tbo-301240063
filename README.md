# TBO Capstone — Simulator Otomata

Aplikasi web yang mengintegrasikan empat topik inti Teori Bahasa dan Otomata:
Finite State Automata, Regular Expression, Pushdown Automata & Context-Free
Grammar, serta Hierarki Chomsky & Chomsky Normal Form.

**Live:** https://namakamu.my.id (ganti sesuai domain kamu)
**Video Demo:** (tempel link YouTube di sini)

## Fitur per Modul

- **Finite State Automata** — simulator DFA/NFA, konversi NFA→DFA, trace transisi, bonus Moore/Mealy Machine.
- **Regular Expression** — konversi RE→NFA/DFA, pencocokan pola string, tampilan grammar reguler setara.
- **Pushdown Automata & CFG** — simulator PDA berbasis CFG buatan pengguna, derivasi leftmost/rightmost, parse tree grafis.
- **Hierarki Chomsky & CNF** — konversi CFG ke Chomsky Normal Form step-by-step, visualisasi hierarki Tipe 0–3.

## Tech Stack

- React 18 + Vite
- React Router (HashRouter, agar kompatibel dengan static hosting)
- Tailwind CSS
- Deploy: GitHub Pages + custom domain `.my.id`

## Cara Instalasi Lokal

```bash
git clone https://github.com/<username>/tbo-capstone.git
cd tbo-capstone
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build & Deploy

Push ke branch `main` akan otomatis build & deploy ke GitHub Pages lewat
GitHub Actions (`.github/workflows/deploy.yml`). Domain custom diatur lewat
file `public/CNAME`.

## Struktur Project

```
src/
  modules/       # 1 folder per modul (fsa, regex, pda-cfg, chomsky)
  shared/        # model data & util yang dipakai lintas modul
docs/            # proposal & draft laporan
tests/           # test case per modul
```

## Penggunaan AI Generatif

(Isi bagian ini sesuai ketentuan tugas: tools yang dipakai, bagian mana yang
dibantu AI, dan bagaimana kamu memahami/memodifikasi hasilnya.)
