<!--
  Diagram (2024 deck, p. 49): a (long) document is hashed into a small fixed-size impronta, enough to recognise
  the file. The impronta is the real SHA-256 of "Testo originale" (UTF-8), computed with utils/crypto.ts and
  shortened. Correct only if the hash resists collisions (not MD5 or SHA-1).
  2 clicks: document → hashing → impronta; the caption "per riconoscere un file basta la sua impronta".
  <SchemaIdentificazione />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const impronta = short(sha256('Testo originale'))
</script>

<template>
  <svg viewBox="0 0 880 245" class="schema" role="img" aria-label="Schema: un documento passa nella funzione hash e diventa una piccola impronta">
    <g v-click>
      <SvDocumento :x="130" :y="14" :w="100" :h="132" etichetta="Testo originale" />
      <line v-for="i in 5" :key="i" x1="139" x2="221" :y1="66 + i * 10" :y2="66 + i * 10" class="riga" />
      <path d="M180,134 c6,-10 10,-10 12,0 s6,8 10,-2 s6,-6 10,2" class="firma" />
      <path d="M280,72 H440 V52 L500,92 L440,132 V112 H280 Z" class="freccione" />
      <text x="372" y="98" text-anchor="middle" class="tx-16 tx-b tx-r">hashing</text>
      <text x="640" y="58" text-anchor="middle" class="titoletto">impronta</text>
      <SvRiquadro :x="540" :y="68" :w="200" :h="48" :testo="impronta" variante="vuoto" mono piccolo />
      <text x="640" y="136" text-anchor="middle" class="nota">256 bit, qualunque sia il file</text>
    </g>
    <g v-click>
      <text x="440" y="208" text-anchor="middle" class="tx-18 tx-b tx-r">per riconoscere un file basta la sua impronta</text>
      <text x="440" y="232" text-anchor="middle" class="nota">stessa impronta ⇒ stesso file (se l'hash resiste alle collisioni)</text>
    </g>
  </svg>
</template>

<style scoped>
.riga { stroke: var(--linea); stroke-width: 2; }
.firma { fill: none; stroke: var(--inchiostro); stroke-width: 1.5; }
.freccione { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1.5; }
.tx-16 { font-size: 16px; }
.tx-18 { font-size: 18px; }
.tx-b { font-weight: 700; }
.tx-r { fill: var(--rubrica); }
</style>
