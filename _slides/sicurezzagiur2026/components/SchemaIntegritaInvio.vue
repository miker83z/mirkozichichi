<!--
  Diagram (2024 deck, p. 50): data integrity, sender side. Bob computes the impronta of his text "A" with the
  hash algorithm and sends text + impronta to Alice. The impronta is the real SHA-256 of "A" (UTF-8),
  computed with utils/crypto.ts and shortened (the same value appears in SchemaIntegritaVerifica).
  4 clicks: Bob and his text; hash algorithm → impronta; the message = text + impronta; sent to Alice.
  <SchemaIntegritaInvio />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const impronta = short(sha256('A'))
</script>

<template>
  <svg viewBox="0 0 880 262" class="schema" role="img" aria-label="Schema: Bob calcola l'impronta del testo e invia ad Alice testo più impronta">
    <g v-click>
      <SvPersona :x="40" :y="22" nome="Bob" />
      <SvDocumento :x="88" :y="24" etichetta="testo «A»" />
    </g>
    <g v-click>
      <SvFreccia :x1="146" :y1="58" :x2="220" :y2="58" />
      <SvRiquadro :x="220" :y="34" :w="170" :h="48" testo="algoritmo di hash" variante="rubrica" />
      <SvFreccia :x1="390" :y1="58" :x2="460" :y2="58" />
      <text x="560" y="30" text-anchor="middle" class="nota">impronta</text>
      <SvRiquadro :x="460" :y="38" :w="200" :h="40" :testo="impronta" variante="vuoto" mono piccolo />
    </g>
    <g v-click>
      <rect x="300" y="140" width="390" height="92" rx="10" class="pacchetto" />
      <SvFreccia :x1="115" :y1="118" :x2="326" :y2="186" angolo="vh" variante="grigio" />
      <SvFreccia :x1="560" :y1="80" :x2="560" :y2="166" variante="grigio" />
      <SvDocumento :x="330" :y="152" />
      <text x="420" y="194" text-anchor="middle" class="tx-22 tx-g">+</text>
      <SvRiquadro :x="460" :y="168" :w="200" :h="40" :testo="impronta" variante="vuoto" mono piccolo />
      <text x="495" y="252" text-anchor="middle" class="nota">messaggio: testo + impronta</text>
    </g>
    <g v-click>
      <SvFreccia :x1="692" :y1="186" :x2="818" :y2="186" etichetta="inviato ad Alice" variante="rubrica" />
      <SvPersona :x="845" :y="156" nome="Alice" />
    </g>
  </svg>
</template>

<style scoped>
.pacchetto { fill: none; stroke: var(--grigio); stroke-width: 1.2; stroke-dasharray: 6 5; }
.tx-22 { font-size: 22px; }
.tx-g { fill: var(--grigio); }
</style>
