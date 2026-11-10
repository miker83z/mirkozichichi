<!--
  Diagram (2024 deck, p. 112, corrected: the TSA receives only the fingerprint, never the document).
  Alice's studio: Documento → SHA-256 → impronta (the real SHA-256 of the TsaFlow demo document);
  only the impronta travels to the TSA; the TSA adds date and time (2026-11-15T10:00:00Z) and signs
  impronta + data e ora with its private key S_TSA; the signed time stamp goes back to Alice;
  PKI: Alice's certificate (P_Alice) signed by a CA, the TSA's certificate (P_TSA) signed by another CA.
  5 clicks: Alice computes the impronta, only the impronta goes to the TSA, date/time and signature,
  the stamp returns to Alice, the two certificates.
  <SchemaMarcaturaTSA />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'
import { ISTANTE_STAMPA, isoUtc } from '../utils/tempo'

// Same document as <TsaFlow />, so the fingerprint on the slide matches the live demo.
const impronta = short(sha256('Parere legale sul contratto di fornitura Rossi–Bianchi, versione definitiva.'), 6, 4)
const dataOra = isoUtc(ISTANTE_STAMPA)
</script>

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: marcatura temporale, alla TSA arriva solo l'impronta">
    <g v-click>
      <rect x="10" y="8" width="440" height="172" rx="10" class="zona" />
      <text x="24" y="28" class="nota">studio di Alice</text>
      <SvPersona :x="50" :y="40" nome="Alice" />
      <SvDocumento :x="98" :y="52" etichetta="Documento" />
      <SvFreccia :x1="158" :y1="86" :x2="196" :y2="86" />
      <SvRiquadro :x="196" :y="64" :w="86" :h="44" testo="SHA-256" />
      <SvFreccia :x1="282" :y1="86" :x2="312" :y2="86" />
      <SvRiquadro :x="312" :y="58" :w="126" :h="56" variante="rubrica" />
      <text x="375" y="80" text-anchor="middle" class="etich">impronta</text>
      <text x="375" y="101" text-anchor="middle" class="mono hex">{{ impronta }}</text>
    </g>
    <g v-click>
      <text x="125" y="163" text-anchor="middle" class="resta">il documento resta nello studio</text>
      <SvFreccia :x1="438" :y1="86" :x2="580" :y2="86" variante="rubrica" etichetta="solo l'impronta" />
      <rect x="580" y="8" width="290" height="172" rx="10" class="tsa" />
      <text x="596" y="30" class="titoletto">TSA</text>
      <text x="632" y="30" class="nota">autorità di marcatura temporale</text>
      <rect x="596" y="42" width="196" height="96" rx="5" class="marca" />
      <text x="608" y="61" class="nota">impronta</text>
      <text x="608" y="80" class="mono hex">{{ impronta }}</text>
    </g>
    <g v-click>
      <text x="608" y="103" class="nota">data e ora</text>
      <text x="608" y="122" class="mono hex rosso">{{ dataOra }}</text>
      <rect x="596" y="42" width="196" height="96" rx="5" class="firmata" />
      <SvChiave :x="812" :y="96" tipo="privata" etichetta="S_TSA" />
      <text x="694" y="160" text-anchor="middle" class="firma">firma: impronta + data e ora</text>
    </g>
    <g v-click>
      <SvFreccia :x1="580" :y1="147" :x2="438" :y2="147" variante="rubrica" />
      <SvRiquadro :x="312" :y="128" :w="126" :h="38" testo="marca temporale" variante="rubrica" piccolo />
    </g>
    <g v-click>
      <rect x="10" y="194" width="420" height="88" rx="8" class="certificato" />
      <text x="24" y="217" class="titoletto">Certificato di Alice</text>
      <SvChiave :x="38" :y="255" tipo="pubblica" etichetta="P_Alice" />
      <text x="96" y="260" class="etich">chiave pubblica di Alice</text>
      <SvRiquadro :x="296" :y="212" :w="120" :h="56" :testo="'firmato da\nuna CA'" piccolo />

      <rect x="450" y="194" width="420" height="88" rx="8" class="certificato" />
      <text x="464" y="217" class="titoletto">Certificato della TSA</text>
      <SvChiave :x="478" :y="255" tipo="pubblica" etichetta="P_TSA" />
      <text x="536" y="260" class="etich">chiave pubblica della TSA</text>
      <SvRiquadro :x="736" :y="212" :w="120" :h="56" :testo="`firmato da\nun'altra CA`" piccolo />
    </g>
  </svg>
</template>

<style scoped>
.zona { fill: none; stroke: var(--grigio); stroke-width: 1.2; stroke-dasharray: 6 5; }
.tsa { fill: none; stroke: var(--inchiostro); stroke-width: 1.5; }
.marca { fill: var(--carta); stroke: var(--linea); stroke-width: 1.5; }
.firmata { fill: none; stroke: var(--rubrica); stroke-width: 2; }
.certificato { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.2; }
.etich { font-size: 14px; }
.hex { font-size: 13px; }
.rosso { fill: var(--rubrica); }
.resta { font-size: 14px; fill: var(--ok); font-weight: 600; }
.firma { font-size: 14px; fill: var(--rubrica); }
</style>
