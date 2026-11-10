<!--
  Diagram (2024 deck, p. 44): three inputs go through the same hash function. The outputs are the first
  8 hex digits of the real SHA-256 (UTF-8, no final newline), computed here with utils/crypto.ts: a short word and
  a long sentence give outputs of the same length, and changing one word ("corre" → "cammina") gives a
  completely different output. 4 clicks: one row per click, then the note "lunghezza fissa, nessuna somiglianza".
  <SchemaEsempiHash />
-->
<script setup lang="ts">
import { sha256 } from '../utils/crypto'

const righe = [
  { prima: 'Volpe', parola: '', dopo: '' },
  { prima: 'La volpe rossa ', parola: 'corre', dopo: ' sul ghiaccio' },
  { prima: 'La volpe rossa ', parola: 'cammina', dopo: ' sul ghiaccio' },
].map((r, i) => ({ ...r, y: 8 + i * 78, uscita: sha256(r.prima + r.parola + r.dopo).slice(0, 8) }))
const [r1, r2, r3] = righe
</script>

<template>
  <svg viewBox="0 0 880 285" class="schema" role="img" aria-label="Schema: tre testi passano nella funzione hash e danno uscite di lunghezza fissa e senza somiglianze">
    <g v-click>
      <rect x="10" :y="r1.y" width="350" height="56" rx="6" class="ingresso" />
      <text x="185" :y="r1.y + 34" text-anchor="middle" class="tx-16">{{ r1.prima }}</text>
      <SvFreccia :x1="360" :y1="r1.y + 28" :x2="415" :y2="r1.y + 28" />
      <SvRiquadro :x="415" :y="r1.y" :w="150" :h="56" testo="funzione hash" variante="rubrica" />
      <SvFreccia :x1="565" :y1="r1.y + 28" :x2="620" :y2="r1.y + 28" />
      <SvRiquadro :x="620" :y="r1.y" :w="150" :h="56" :testo="r1.uscita" variante="vuoto" mono />
      <text x="695" :y="r1.y + 73" text-anchor="middle" class="nota">prime 8 cifre di SHA-256</text>
    </g>
    <g v-click>
      <rect x="10" :y="r2.y" width="350" height="56" rx="6" class="ingresso" />
      <text x="185" :y="r2.y + 34" text-anchor="middle" class="tx-16">{{ r2.prima }}<tspan class="parola">{{ r2.parola }}</tspan>{{ r2.dopo }}</text>
      <SvFreccia :x1="360" :y1="r2.y + 28" :x2="415" :y2="r2.y + 28" />
      <SvRiquadro :x="415" :y="r2.y" :w="150" :h="56" testo="funzione hash" variante="rubrica" />
      <SvFreccia :x1="565" :y1="r2.y + 28" :x2="620" :y2="r2.y + 28" />
      <SvRiquadro :x="620" :y="r2.y" :w="150" :h="56" :testo="r2.uscita" variante="vuoto" mono />
    </g>
    <g v-click>
      <rect x="10" :y="r3.y" width="350" height="56" rx="6" class="ingresso" />
      <text x="185" :y="r3.y + 34" text-anchor="middle" class="tx-16">{{ r3.prima }}<tspan class="parola">{{ r3.parola }}</tspan>{{ r3.dopo }}</text>
      <SvFreccia :x1="360" :y1="r3.y + 28" :x2="415" :y2="r3.y + 28" />
      <SvRiquadro :x="415" :y="r3.y" :w="150" :h="56" testo="funzione hash" variante="rubrica" />
      <SvFreccia :x1="565" :y1="r3.y + 28" :x2="620" :y2="r3.y + 28" />
      <SvRiquadro :x="620" :y="r3.y" :w="150" :h="56" :testo="r3.uscita" variante="vuoto" mono />
    </g>
    <g v-click>
      <path d="M782,10 h8 v206 h-8" class="graffa" />
      <text x="800" y="108" class="tx-15 tx-r">stessa</text>
      <text x="800" y="127" class="tx-15 tx-r">lunghezza</text>
      <text x="440" y="254" text-anchor="middle" class="tx-16 tx-b tx-r">lunghezza fissa, nessuna somiglianza</text>
      <text x="440" y="276" text-anchor="middle" class="nota">basta cambiare una parola e l'uscita cambia del tutto</text>
    </g>
  </svg>
</template>

<style scoped>
.ingresso { fill: #eef3f8; stroke: var(--linea); stroke-width: 1.5; }
.parola { fill: var(--rubrica); font-weight: 700; text-decoration: underline; }
.graffa { fill: none; stroke: var(--rubrica); stroke-width: 1.5; }
.tx-15 { font-size: 15px; }
.tx-16 { font-size: 16px; }
.tx-b { font-weight: 700; }
.tx-r { fill: var(--rubrica); }
</style>
