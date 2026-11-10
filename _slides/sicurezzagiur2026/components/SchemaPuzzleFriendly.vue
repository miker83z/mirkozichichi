<!--
  Diagram (2024 deck, pp. 58–59), CORRECTED: the original flowchart (given x, choose a random r, hash r|x) showed
  hiding. Same flowchart style, now for puzzle-friendliness: given a random k, I choose x, hash k ‖ x and want
  an output with a given form (starts with 0000). There is no shortcut: one can only try x = 1, 2, 3…
  Real values computed with utils/crypto.ts: k = "7f3c19ab", output = SHA-256(k + x) (UTF-8 string concatenation,
  e.g. "7f3c19ab1"); x = 85349 is the first x giving an output that starts with 0000 (found by brute force).
  4 clicks: k and x; k ‖ x → hash function → output; the target "deve iniziare con 0000" (not met);
  the tries and "nessuna scorciatoia: si può solo provare x = 1, 2, 3…".
  <SchemaPuzzleFriendly />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const k = '7f3c19ab'
const uscita = (x: number) => sha256(k + x)
const tentativi = [1, 2, 3].map((x, i) => ({ x, y: 50 + i * 24, h: short(uscita(x)) }))
const vincente = 85349
const hVincente = short(uscita(vincente))
const prima = short(uscita(1))
</script>

<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: dato k casuale, si cerca x tale che l'hash di k concatenato a x inizi con 0000, e si può solo provare">
    <g v-click>
      <text x="130" y="18" text-anchor="middle" class="tx-15">dato k (scelto a caso)</text>
      <SvRiquadro :x="40" :y="26" :w="180" :h="36" :testo="k" mono />
      <text x="350" y="18" text-anchor="middle" class="tx-15">scelgo x</text>
      <SvRiquadro :x="280" :y="26" :w="140" :h="36" testo="x = 1" variante="rubrica" mono />
    </g>
    <g v-click>
      <SvFreccia :x1="140" :y1="62" :x2="196" :y2="92" variante="grigio" />
      <SvFreccia :x1="340" :y1="62" :x2="284" :y2="92" variante="grigio" />
      <text x="130" y="115" text-anchor="end" class="nota">k ‖ x</text>
      <SvRiquadro :x="140" :y="94" :w="200" :h="34" :testo="`${k} ‖ 1`" variante="vuoto" mono piccolo />
      <SvFreccia :x1="240" :y1="128" :x2="240" :y2="152" />
      <SvRiquadro :x="170" :y="152" :w="140" :h="44" testo="funzione hash" variante="rubrica" />
      <SvFreccia :x1="240" :y1="196" :x2="240" :y2="220" />
      <text x="120" y="243" text-anchor="end" class="nota">uscita</text>
      <SvRiquadro :x="130" :y="220" :w="220" :h="36" :testo="prima" variante="vuoto" mono piccolo />
    </g>
    <g v-click>
      <SvFreccia :x1="352" :y1="238" :x2="408" :y2="238" />
      <SvRiquadro :x="410" :y="218" :w="210" :h="40" testo="deve iniziare con 0000" variante="rubrica" />
      <text x="634" y="244" class="tx-16 tx-b tx-ko">✗ no</text>
    </g>
    <g v-click>
      <text x="490" y="22" class="nota">tentativi</text>
      <g v-for="t in tentativi" :key="t.x">
        <text x="490" :y="t.y" class="mono tx-14">x = {{ t.x }}</text>
        <text x="600" :y="t.y" class="tx-14 tx-g">→</text>
        <text x="625" :y="t.y" class="mono tx-14">{{ t.h }}</text>
        <text x="790" :y="t.y" class="tx-15 tx-b tx-ko">✗</text>
      </g>
      <text x="515" y="124" class="tx-15 tx-g">⋮</text>
      <text x="490" y="150" class="mono tx-14 tx-b tx-ok">x = {{ vincente }}</text>
      <text x="600" y="150" class="tx-14 tx-g">→</text>
      <text x="625" y="150" class="mono tx-14 tx-b tx-ok">{{ hVincente }}</text>
      <text x="790" y="150" class="tx-15 tx-b tx-ok">✓</text>
      <text x="490" y="186" class="tx-16 tx-b tx-r">nessuna scorciatoia:</text>
      <text x="490" y="206" class="tx-16 tx-b tx-r">si può solo provare x = 1, 2, 3…</text>
    </g>
  </svg>
</template>

<style scoped>
.tx-14 { font-size: 14px; }
.tx-15 { font-size: 15px; }
.tx-16 { font-size: 16px; }
.tx-b { font-weight: 700; }
.tx-r { fill: var(--rubrica); }
.tx-g { fill: var(--grigio); }
.tx-ok { fill: var(--ok); }
.tx-ko { fill: var(--ko); }
</style>
