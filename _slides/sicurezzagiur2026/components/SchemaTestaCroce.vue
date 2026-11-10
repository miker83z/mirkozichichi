<!--
  Diagram (2024 deck, p. 55): where hiding fails. A coin toss has only two outcomes, so from the published
  impronta anyone can find x: hash "testa" and "croce" and compare. Real SHA-256 of "testa" and "croce"
  (UTF-8, no final newline), computed with utils/crypto.ts and shortened; the published one is H("croce").
  3 clicks: the coin and the two possible impronte; the published impronta, equal to H("croce");
  "scoperto: con 2 possibilità basta provarle".
  <SchemaTestaCroce />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const testa = short(sha256('testa'))
const croce = short(sha256('croce'))
const rigaTesta = `H("testa") = ${testa}`
const rigaCroce = `H("croce") = ${croce}`
</script>

<template>
  <svg viewBox="0 0 880 255" class="schema" role="img" aria-label="Schema: con due soli valori possibili, testa o croce, basta calcolare entrambe le impronte">
    <g v-click>
      <circle cx="95" cy="118" r="48" class="moneta" />
      <circle cx="95" cy="118" r="39" class="bordo" />
      <text x="95" y="132" text-anchor="middle" class="tx-40 tx-b">?</text>
      <text x="95" y="194" text-anchor="middle" class="tx-15">x = testa o croce?</text>
      <SvFreccia :x1="148" :y1="100" :x2="288" :y2="60" />
      <SvFreccia :x1="148" :y1="136" :x2="288" :y2="180" />
      <SvRiquadro :x="292" :y="36" :w="330" :h="46" :testo="rigaTesta" variante="vuoto" mono />
      <SvRiquadro :x="292" :y="158" :w="330" :h="46" :testo="rigaCroce" variante="vuoto" mono />
    </g>
    <g v-click>
      <text x="770" y="96" text-anchor="middle" class="nota">impronta pubblicata</text>
      <SvRiquadro :x="684" :y="104" :w="172" :h="40" :testo="croce" variante="vuoto" mono />
      <path d="M624,64 L682,112" class="confronto" />
      <text x="664" y="80" text-anchor="middle" class="tx-20 tx-b tx-g">≠</text>
      <path d="M624,178 L682,136" class="confronto ko" />
      <text x="666" y="178" text-anchor="middle" class="tx-20 tx-b tx-ko">=</text>
    </g>
    <g v-click>
      <SvRiquadro :x="292" :y="158" :w="330" :h="46" :testo="rigaCroce" variante="ko" mono />
      <text x="440" y="242" text-anchor="middle" class="tx-18 tx-b tx-ko">scoperto: era «croce». Con 2 possibilità basta provarle</text>
    </g>
  </svg>
</template>

<style scoped>
.moneta { fill: #f3ead2; stroke: #8a6d1f; stroke-width: 2; }
.bordo { fill: none; stroke: #8a6d1f; stroke-width: 1; stroke-dasharray: 3 3; }
.confronto { fill: none; stroke: var(--grigio); stroke-width: 1.5; stroke-dasharray: 5 4; }
.confronto.ko { stroke: var(--ko); }
.tx-15 { font-size: 15px; }
.tx-18 { font-size: 18px; }
.tx-20 { font-size: 20px; }
.tx-40 { font-size: 40px; }
.tx-b { font-weight: 700; }
.tx-g { fill: var(--grigio); }
.tx-ko { fill: var(--ko); }
</style>
