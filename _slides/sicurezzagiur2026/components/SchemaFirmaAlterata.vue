<!--
  Diagram (2024 deck, p. 84): the same two-column flow as SchemaFirma, but the document that reaches
  Bob has been modified on the way. Alice signs the fingerprint of "Contratto"; Bob receives
  "Contratto (modificato)", so the fingerprint he recomputes (real SHA-256, shortened) differs from the
  one Alice signed → "≠" → "✗ firma non valida". The change is not prevented, it is detected.
  4 clicks: Alice signs (fingerprint and Firma with S_Alice); document and signature travel, the
  document is modified on the way; Bob recomputes the fingerprint and runs Verifica with P_Alice;
  comparison "≠" and "✗ firma non valida".
  <SchemaFirmaAlterata />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const firmata = short(sha256('Contratto'), 6, 6)
const ricevuta = short(sha256('Contratto (modificato)'), 6, 6)
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: il documento viene modificato dopo la firma, le impronte non coincidono e la firma non è valida">
    <!-- 1. Alice firma l'impronta del documento -->
    <g v-click>
      <SvPersona :x="60" :y="6" nome="Alice" :scala="0.9" />
      <SvDocumento :x="178" :y="2" :w="44" :h="58" />
      <text x="230" y="36" class="etichetta">Contratto</text>
      <SvFreccia :x1="200" :y1="62" :x2="200" :y2="80" />
      <SvRiquadro :x="135" :y="80" :w="130" :h="32" testo="SHA-256" />
      <SvFreccia :x1="200" :y1="112" :x2="200" :y2="128" />
      <SvRiquadro :x="120" :y="128" :w="160" :h="34" :testo="firmata" variante="vuoto" mono />
      <text x="112" y="150" text-anchor="end" class="nota">impronta</text>
      <SvFreccia :x1="200" :y1="162" :x2="200" :y2="180" />
      <SvRiquadro :x="135" :y="180" :w="130" :h="34" testo="Firma" variante="rubrica" />
      <SvChiave :x="40" :y="197" tipo="privata" etichetta="S_Alice" />
      <SvFreccia :x1="90" :y1="197" :x2="133" :y2="197" variante="grigio" />
    </g>
    <!-- 2. Documento e firma viaggiano; il documento viene modificato -->
    <g v-click>
      <SvFreccia :x1="200" :y1="214" :x2="360" :y2="254" angolo="vh" variante="rubrica" />
      <SvRiquadro :x="362" :y="238" :w="110" :h="32" testo="firma" variante="rubrica" />
      <SvFreccia :x1="300" :y1="32" :x2="470" :y2="32" etichetta="modificato in viaggio" variante="ko" />
      <SvDocumento :x="478" :y="2" :w="44" :h="58" variante="ko" alterato />
      <text x="530" y="28" class="etichetta ko">Contratto</text>
      <text x="530" y="45" class="etichetta ko">(modificato)</text>
      <SvPersona :x="835" :y="6" nome="Bob" :scala="0.9" />
    </g>
    <!-- 3. Bob ricalcola l'impronta e verifica la firma -->
    <g v-click>
      <SvFreccia :x1="500" :y1="62" :x2="500" :y2="80" />
      <SvRiquadro :x="435" :y="80" :w="130" :h="32" testo="SHA-256" />
      <SvFreccia :x1="500" :y1="112" :x2="500" :y2="128" />
      <SvRiquadro :x="420" :y="128" :w="160" :h="34" :testo="ricevuta" variante="ko" mono />
      <text x="500" y="180" text-anchor="middle" class="nota">calcolata da Bob</text>
      <SvFreccia :x1="472" :y1="254" :x2="680" :y2="218" angolo="hv" variante="rubrica" />
      <SvRiquadro :x="645" :y="182" :w="110" :h="34" testo="Verifica" />
      <SvChiave :x="800" :y="199" tipo="pubblica" etichetta="P_Alice" />
      <SvFreccia :x1="787" :y1="199" :x2="757" :y2="199" variante="grigio" />
      <SvFreccia :x1="700" :y1="182" :x2="700" :y2="164" />
      <SvRiquadro :x="620" :y="128" :w="160" :h="34" :testo="firmata" variante="vuoto" mono />
      <text x="788" y="142" class="nota">firmata</text>
      <text x="788" y="157" class="nota">da Alice</text>
    </g>
    <!-- 4. Confronto: firma non valida -->
    <g v-click>
      <text x="600" y="155" text-anchor="middle" class="segno ko">≠</text>
      <text x="540" y="212" text-anchor="middle" class="esito ko">✗ firma non valida</text>
    </g>
  </svg>
</template>

<style scoped>
.etichetta { font-size: 14px; }
.segno { font-size: 30px; font-weight: 700; }
.esito { font-size: 17px; font-weight: 700; }
.ko { fill: var(--ko); }
</style>
