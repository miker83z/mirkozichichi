<!--
  Diagram (2024 deck, pp. 53–54), corrected: "moat" and "maot" (two letters swapped) have completely different
  impronte of the same length. Real SHA-256 (UTF-8, no final newline), computed with utils/crypto.ts and shortened
  to 16 + 16 hex digits (the original showed invented, non-hex strings). Hiding holds only when the possible texts
  are very many (see SchemaTestaCroce).
  3 clicks: the two impronte; the brace "stessa lunghezza: sempre 256 bit"; "dall'impronta non si risale al testo".
  <SchemaOccultamento />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const moat = short(sha256('moat'), 16, 16)
const maot = short(sha256('maot'), 16, 16)
</script>

<template>
  <svg viewBox="0 0 880 245" class="schema" role="img" aria-label="Schema: moat e maot hanno impronte completamente diverse ma della stessa lunghezza">
    <g v-click>
      <text x="250" y="88" text-anchor="end" class="tx-20">H(m<tspan class="scambio">oa</tspan>t) =</text>
      <text x="262" y="88" class="mono tx-18">{{ moat }}</text>
      <text x="250" y="128" text-anchor="end" class="tx-20">H(m<tspan class="scambio">ao</tspan>t) =</text>
      <text x="262" y="128" class="mono tx-18">{{ maot }}</text>
    </g>
    <g v-click>
      <path d="M262,140 q0,10 10,10 h158 q10,0 10,10 q0,-10 10,-10 h158 q10,0 10,-10" class="graffa" />
      <text x="440" y="186" text-anchor="middle" class="tx-16 tx-r">stessa lunghezza: sempre 256 bit <tspan class="nota">(64 cifre; qui ne mostriamo 32)</tspan></text>
    </g>
    <g v-click>
      <path d="M440,66 C410,14 225,14 195,64" class="ritorno" />
      <polygon points="195,64 205.4,57.4 195.9,51.7" class="punta-ko" />
      <circle cx="318" cy="27" r="13" class="bollo" />
      <text x="318" y="34" text-anchor="middle" class="tx-20 tx-b tx-ko">✗</text>
      <text x="440" y="221" text-anchor="middle" class="tx-18 tx-b tx-r">dall'impronta non si risale al testo</text>
      <text x="440" y="242" text-anchor="middle" class="nota">(purché i testi possibili siano moltissimi)</text>
    </g>
  </svg>
</template>

<style scoped>
.scambio { fill: var(--rubrica); font-weight: 700; }
.graffa { fill: none; stroke: var(--rubrica); stroke-width: 1.5; }
.ritorno { fill: none; stroke: var(--ko); stroke-width: 2; stroke-dasharray: 6 5; }
.punta-ko { fill: var(--ko); }
.bollo { fill: var(--carta); stroke: var(--ko); stroke-width: 1.5; }
.tx-16 { font-size: 16px; }
.tx-18 { font-size: 18px; }
.tx-20 { font-size: 20px; }
.tx-b { font-weight: 700; }
.tx-r { fill: var(--rubrica); }
.tx-ko { fill: var(--ko); }
</style>
