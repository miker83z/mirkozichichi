<!--
  Diagram (2024 deck, p. 51): data integrity, receiver side. Alice receives text + impronta, recomputes the
  impronta from the text and compares it with the one received: equal → verified. Then the variant where the
  text was altered on the way ("a" instead of "A"): the impronte differ → altered. Real SHA-256 of "A" and "a"
  (UTF-8), computed with utils/crypto.ts and shortened; same impronta as in SchemaIntegritaInvio.
  4 clicks: Alice receives text + impronta; she recomputes the impronta; received = recomputed → ✓ verificato;
  the altered variant → ✗ alterato.
  <SchemaIntegritaVerifica />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const ricevuta = short(sha256('A'))
const alterata = short(sha256('a'))
</script>

<template>
  <svg viewBox="0 0 880 285" class="schema" role="img" aria-label="Schema: Alice ricalcola l'impronta e la confronta con quella ricevuta">
    <g v-click>
      <SvPersona :x="34" :y="20" nome="Alice" :scala="0.85" />
      <rect x="70" y="8" width="168" height="112" rx="10" class="pacchetto" />
      <SvDocumento :x="126" :y="14" />
      <SvRiquadro :x="80" :y="88" :w="148" :h="28" :testo="ricevuta" variante="vuoto" mono piccolo />
    </g>
    <g v-click>
      <SvFreccia :x1="182" :y1="46" :x2="290" :y2="46" />
      <SvRiquadro :x="290" :y="22" :w="120" :h="48" :testo="'algoritmo\ndi hash'" variante="rubrica" piccolo />
      <SvFreccia :x1="410" :y1="46" :x2="450" :y2="46" />
      <SvRiquadro :x="450" :y="28" :w="200" :h="36" :testo="ricevuta" variante="vuoto" mono piccolo />
      <text x="550" y="18" text-anchor="middle" class="nota">impronta ricalcolata</text>
    </g>
    <g v-click>
      <SvFreccia :x1="230" :y1="102" :x2="450" :y2="102" variante="grigio" />
      <SvRiquadro :x="450" :y="84" :w="200" :h="36" :testo="ricevuta" variante="vuoto" mono piccolo />
      <text x="550" y="134" text-anchor="middle" class="nota">impronta ricevuta</text>
      <text x="550" y="81" text-anchor="middle" class="tx-20 tx-b tx-ok">=</text>
      <path d="M656,30 h10 v86 h-10" class="graffa-ok" />
      <SvFreccia :x1="666" :y1="73" :x2="694" :y2="73" variante="ok" />
      <SvRiquadro :x="696" :y="51" :w="170" :h="44" testo="✓ verificato" variante="ok" />
    </g>
    <g v-click>
      <text x="70" y="158" class="nota">se il testo è stato alterato in viaggio («a» al posto di «A»):</text>
      <rect x="70" y="166" width="168" height="112" rx="10" class="pacchetto" />
      <SvDocumento :x="126" :y="172" variante="ko" alterato />
      <SvRiquadro :x="80" :y="246" :w="148" :h="28" :testo="ricevuta" variante="vuoto" mono piccolo />
      <SvFreccia :x1="182" :y1="204" :x2="290" :y2="204" />
      <SvRiquadro :x="290" :y="180" :w="120" :h="48" :testo="'algoritmo\ndi hash'" variante="rubrica" piccolo />
      <SvFreccia :x1="410" :y1="204" :x2="450" :y2="204" />
      <SvRiquadro :x="450" :y="186" :w="200" :h="36" :testo="alterata" variante="ko" mono piccolo />
      <SvFreccia :x1="230" :y1="260" :x2="450" :y2="260" variante="grigio" />
      <SvRiquadro :x="450" :y="242" :w="200" :h="36" :testo="ricevuta" variante="vuoto" mono piccolo />
      <text x="550" y="239" text-anchor="middle" class="tx-20 tx-b tx-ko">≠</text>
      <path d="M656,188 h10 v86 h-10" class="graffa-ko" />
      <SvFreccia :x1="666" :y1="231" :x2="694" :y2="231" variante="ko" />
      <SvRiquadro :x="696" :y="209" :w="170" :h="44" testo="✗ alterato" variante="ko" />
    </g>
  </svg>
</template>

<style scoped>
.pacchetto { fill: none; stroke: var(--grigio); stroke-width: 1.2; stroke-dasharray: 6 5; }
.graffa-ok { fill: none; stroke: var(--ok); stroke-width: 1.5; }
.graffa-ko { fill: none; stroke: var(--ko); stroke-width: 1.5; }
.tx-20 { font-size: 20px; }
.tx-b { font-weight: 700; }
.tx-ok { fill: var(--ok); }
.tx-ko { fill: var(--ko); }
</style>
