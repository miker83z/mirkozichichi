<!--
  Diagram (2024 deck, p. 83): Alice signs a document for Bob, in two columns.
  Alice: document → SHA-256 → fingerprint (real SHA-256 of "Contratto", shortened) → Firma with her
  private key S_Alice → signature, which travels to Bob together with the document.
  Bob: document → SHA-256 → fingerprint; Verifica with Alice's public key P_Alice turns the signature
  back into the fingerprint Alice signed; the two fingerprints are equal → "✓ firma valida".
  6 clicks: Alice's fingerprint; the signature with S_Alice; document and signature sent to Bob;
  Bob recomputes the fingerprint; Verifica with P_Alice (the signature enters it); comparison "=" and
  "✓ firma valida".
  <SchemaFirma />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const impronta = short(sha256('Contratto'), 6, 6)
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: Alice firma l'impronta del documento con la chiave privata, Bob la verifica con la chiave pubblica">
    <!-- 1. Alice: documento → SHA-256 → impronta -->
    <g v-click>
      <SvPersona :x="60" :y="6" nome="Alice" :scala="0.9" />
      <SvDocumento :x="178" :y="2" :w="44" :h="58" />
      <text x="230" y="36" class="etichetta">Contratto</text>
      <SvFreccia :x1="200" :y1="62" :x2="200" :y2="80" />
      <SvRiquadro :x="135" :y="80" :w="130" :h="32" testo="SHA-256" />
      <SvFreccia :x1="200" :y1="112" :x2="200" :y2="128" />
      <SvRiquadro :x="120" :y="128" :w="160" :h="34" :testo="impronta" variante="vuoto" mono />
      <text x="112" y="150" text-anchor="end" class="nota">impronta</text>
    </g>
    <!-- 2. Firma con la chiave privata di Alice -->
    <g v-click>
      <SvFreccia :x1="200" :y1="162" :x2="200" :y2="180" />
      <SvRiquadro :x="135" :y="180" :w="130" :h="34" testo="Firma" variante="rubrica" />
      <SvChiave :x="40" :y="197" tipo="privata" etichetta="S_Alice" />
      <SvFreccia :x1="90" :y1="197" :x2="133" :y2="197" variante="grigio" />
    </g>
    <!-- 3. Documento e firma arrivano a Bob -->
    <g v-click>
      <SvFreccia :x1="200" :y1="214" :x2="360" :y2="254" angolo="vh" variante="rubrica" />
      <SvRiquadro :x="362" :y="238" :w="110" :h="32" testo="firma" variante="rubrica" />
      <SvFreccia :x1="300" :y1="32" :x2="470" :y2="32" etichetta="documento" variante="grigio" />
      <SvDocumento :x="478" :y="2" :w="44" :h="58" />
      <text x="530" y="36" class="etichetta">Contratto</text>
      <SvPersona :x="835" :y="6" nome="Bob" :scala="0.9" />
    </g>
    <!-- 4. Bob ricalcola l'impronta -->
    <g v-click>
      <SvFreccia :x1="500" :y1="62" :x2="500" :y2="80" />
      <SvRiquadro :x="435" :y="80" :w="130" :h="32" testo="SHA-256" />
      <SvFreccia :x1="500" :y1="112" :x2="500" :y2="128" />
      <SvRiquadro :x="420" :y="128" :w="160" :h="34" :testo="impronta" variante="vuoto" mono />
      <text x="500" y="180" text-anchor="middle" class="nota">calcolata da Bob</text>
    </g>
    <!-- 5. Verifica con la chiave pubblica di Alice -->
    <g v-click>
      <SvFreccia :x1="472" :y1="254" :x2="680" :y2="218" angolo="hv" variante="rubrica" />
      <SvRiquadro :x="645" :y="182" :w="110" :h="34" testo="Verifica" />
      <SvChiave :x="800" :y="199" tipo="pubblica" etichetta="P_Alice" />
      <SvFreccia :x1="787" :y1="199" :x2="757" :y2="199" variante="grigio" />
      <SvFreccia :x1="700" :y1="182" :x2="700" :y2="164" />
      <SvRiquadro :x="620" :y="128" :w="160" :h="34" :testo="impronta" variante="vuoto" mono />
      <text x="788" y="142" class="nota">firmata</text>
      <text x="788" y="157" class="nota">da Alice</text>
    </g>
    <!-- 6. Confronto: firma valida -->
    <g v-click>
      <text x="600" y="155" text-anchor="middle" class="segno ok">=</text>
      <text x="540" y="212" text-anchor="middle" class="esito ok">✓ firma valida</text>
    </g>
  </svg>
</template>

<style scoped>
.etichetta { font-size: 14px; }
.segno { font-size: 30px; font-weight: 700; }
.esito { font-size: 17px; font-weight: 700; }
.ok { fill: var(--ok); }
</style>
