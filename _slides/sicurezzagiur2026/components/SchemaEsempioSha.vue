<!--
  Diagram (2024 deck, p. 66): two messages that differ in one letter ("Jack" → "jack" in line 2) give completely
  different SHA-256 impronte. The full real digests (64 hex) are computed with utils/crypto.ts; the hashed text is
  the three lines joined by "\n" with a final "\n" (like a text file), UTF-8. The original digests could not be
  reproduced, so they are not reused.
  3 clicks: message 1 → SHA-256 → impronta; message 2 → SHA-256 → impronta; the differing hex digits are
  highlighted, with the count of differing digits and bits.
  <SchemaEsempioSha />
-->
<script setup lang="ts">
import { bitDiff, sha256 } from '../utils/crypto'

const riga = 'All work and no play makes Jack a dull boy'
const testo1 = `${riga}\n${riga}\n${riga}\n`
const testo2 = `${riga}\n${riga.replace('Jack', 'jack')}\n${riga}\n`
const d1 = sha256(testo1)
const d2 = sha256(testo2)

const cw = 8.4 // advance of JetBrains Mono at 14px (0.6 em)
const x0 = 592
const xs = (n: number) => Array.from({ length: n }, (_, i) => (x0 + i * cw).toFixed(1)).join(' ')
const xRiga = xs(32)
const diverse = [...d1].map((c, i) => i).filter(i => d1[i] !== d2[i])
const segni = (y0: number, d: string) => diverse.map(i => ({ i, c: d[i], x: x0 + (i % 32) * cw, y: y0 + Math.floor(i / 32) * 22 }))
const segni1 = segni(44, d1)
const segni2 = segni(164, d2)
const nCifre = diverse.length
const nBit = bitDiff(d1, d2)
</script>

<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: due messaggi che differiscono per una lettera hanno impronte SHA-256 completamente diverse">
    <g v-click>
      <rect x="10" y="10" width="380" height="78" rx="6" class="messaggio" />
      <text x="22" y="34" class="mono tx-14">{{ riga }}</text>
      <text x="22" y="54" class="mono tx-14">All work and no play makes <tspan class="lettera">J</tspan>ack a dull boy</text>
      <text x="22" y="74" class="mono tx-14">{{ riga }}</text>
      <SvFreccia :x1="392" :y1="49" :x2="438" :y2="49" />
      <SvRiquadro :x="440" :y="29" :w="100" :h="40" testo="SHA-256" variante="rubrica" />
      <SvFreccia :x1="540" :y1="49" :x2="578" :y2="49" />
      <rect x="580" y="19" width="290" height="60" rx="6" class="digest" />
      <text :x="xRiga" y="44" class="mono tx-14">{{ d1.slice(0, 32) }}</text>
      <text :x="xRiga" y="66" class="mono tx-14">{{ d1.slice(32) }}</text>
    </g>
    <g v-click>
      <rect x="10" y="130" width="380" height="78" rx="6" class="messaggio" />
      <text x="22" y="154" class="mono tx-14">{{ riga }}</text>
      <text x="22" y="174" class="mono tx-14">All work and no play makes <tspan class="lettera">j</tspan>ack a dull boy</text>
      <text x="22" y="194" class="mono tx-14">{{ riga }}</text>
      <SvFreccia :x1="392" :y1="169" :x2="438" :y2="169" />
      <SvRiquadro :x="440" :y="149" :w="100" :h="40" testo="SHA-256" variante="rubrica" />
      <SvFreccia :x1="540" :y1="169" :x2="578" :y2="169" />
      <rect x="580" y="139" width="290" height="60" rx="6" class="digest" />
      <text :x="xRiga" y="164" class="mono tx-14">{{ d2.slice(0, 32) }}</text>
      <text :x="xRiga" y="186" class="mono tx-14">{{ d2.slice(32) }}</text>
    </g>
    <g v-click>
      <g v-for="s in [...segni1, ...segni2]" :key="`${s.y}-${s.i}`">
        <rect :x="s.x - 0.4" :y="s.y - 13" :width="cw + 0.8" height="17" class="evidenza" />
        <text :x="s.x" :y="s.y" class="mono tx-14 tx-r">{{ s.c }}</text>
      </g>
      <text x="440" y="240" text-anchor="middle" class="tx-16 tx-b tx-r">una lettera diversa: cambiano {{ nCifre }} cifre su 64 ({{ nBit }} bit su 256)</text>
      <text x="440" y="262" text-anchor="middle" class="nota">le cifre uguali sono poche e capitano per caso (effetto valanga)</text>
    </g>
  </svg>
</template>

<style scoped>
.messaggio { fill: #eef3f8; stroke: var(--linea); stroke-width: 1.5; }
.digest { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.lettera { fill: var(--rubrica); font-weight: 700; }
.evidenza { fill: #fbe3e3; }
.tx-14 { font-size: 14px; }
.tx-16 { font-size: 16px; }
.tx-b { font-weight: 700; }
.tx-r { fill: var(--rubrica); }
</style>
