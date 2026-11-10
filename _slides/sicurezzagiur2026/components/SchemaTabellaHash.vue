<!--
  Diagram (2024 deck, p. 48): a hash table. Four names go through the hash function into 16 boxes (00–15).
  The box is the real first hex digit of SHA-256(name) (UTF-8), computed with utils/crypto.ts:
  Mario Rossi → 03, Lucia Bianchi → 03, Sara Neri → 06, Anna Verdi → 05, so Lucia Bianchi collides with
  Mario Rossi. Shows that with enough inputs two outputs coincide (birthday paradox).
  3 clicks: names, hash function and boxes; three names in different boxes; the fourth name collides,
  with the note on the birthday paradox.
  <SchemaTabellaHash />
-->
<script setup lang="ts">
import { sha256 } from '../utils/crypto'

const nomi = ['Mario Rossi', 'Lucia Bianchi', 'Sara Neri', 'Anna Verdi'].map((nome, i) => {
  const casella = Number.parseInt(sha256(nome)[0], 16)
  return { nome, y: 36 + i * 50, casella }
})
// Visible rows: 00–07, then "⋮", then 15 (the four names fall in 03, 03, 06, 05).
const righe = [0, 1, 2, 3, 4, 5, 6, 7].map(b => ({ b, y: 30 + b * 22 }))
const yCasella = (b: number) => (b <= 7 ? 40 + b * 22 : 238)
const [mario, lucia, sara, anna] = nomi
const etichetta = (b: number) => String(b).padStart(2, '0')
</script>

<template>
  <svg viewBox="0 0 880 260" class="schema" role="img" aria-label="Schema: quattro nomi passano nella funzione hash e due finiscono nella stessa casella">
    <g v-click>
      <text x="110" y="20" text-anchor="middle" class="titoletto">nomi</text>
      <SvRiquadro v-for="n in nomi" :key="n.nome" :x="20" :y="n.y" :w="180" :h="34" :testo="n.nome" variante="vuoto" />
      <rect x="250" y="30" width="220" height="220" rx="10" class="fascia" />
      <text x="360" y="20" text-anchor="middle" class="titoletto tx-r">funzione hash</text>
      <text x="545" y="20" text-anchor="middle" class="titoletto">caselle</text>
      <g v-for="r in righe" :key="r.b">
        <rect x="520" :y="r.y" width="50" height="20" rx="3" class="casella" />
        <text x="545" :y="r.y + 15" text-anchor="middle" class="mono tx-13">{{ etichetta(r.b) }}</text>
      </g>
      <text x="545" y="221" text-anchor="middle" class="tx-15">⋮</text>
      <rect x="520" y="228" width="50" height="20" rx="3" class="casella" />
      <text x="545" y="243" text-anchor="middle" class="mono tx-13">15</text>
      <text x="610" y="44" class="nota">casella = prima cifra (0–15)</text>
      <text x="610" y="62" class="nota">dell'impronta SHA-256 del nome</text>
    </g>
    <g v-click>
      <SvFreccia :x1="202" :y1="mario.y + 17" :x2="518" :y2="yCasella(mario.casella)" />
      <SvFreccia :x1="202" :y1="sara.y + 17" :x2="518" :y2="yCasella(sara.casella)" />
      <SvFreccia :x1="202" :y1="anna.y + 17" :x2="518" :y2="yCasella(anna.casella)" />
    </g>
    <g v-click>
      <SvFreccia :x1="202" :y1="lucia.y + 17" :x2="518" :y2="yCasella(lucia.casella)" variante="ko" />
      <rect x="520" :y="yCasella(lucia.casella) - 10" width="50" height="20" rx="3" class="casella-ko" />
      <text x="545" :y="yCasella(lucia.casella) + 5" text-anchor="middle" class="mono tx-13 tx-b">{{ etichetta(lucia.casella) }}</text>
      <text x="580" :y="yCasella(lucia.casella) + 5" class="tx-15 tx-b tx-ko">collisione!</text>
      <text x="610" y="176" class="tx-15">con abbastanza tentativi,</text>
      <text x="610" y="196" class="tx-15">prima o poi due coincidono</text>
      <text x="610" y="216" class="tx-15 tx-g">(paradosso del compleanno)</text>
    </g>
  </svg>
</template>

<style scoped>
.fascia { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1; stroke-dasharray: 5 4; }
.casella { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.casella-ko { fill: #fdf0e8; stroke: var(--ko); stroke-width: 2.5; }
.tx-13 { font-size: 13px; }
.tx-15 { font-size: 15px; }
.tx-b { font-weight: 700; }
.tx-r { fill: var(--rubrica); }
.tx-ko { fill: var(--ko); }
.tx-g { fill: var(--grigio); }
</style>
