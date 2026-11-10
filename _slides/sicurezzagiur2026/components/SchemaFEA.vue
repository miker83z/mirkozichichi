<!--
  Diagram (2024 deck, p. 95, corrected): the signature flow (Alice, document, SHA-256, fingerprint,
  Firma with S_Alice, Verifica with P_Alice from Alice's certificate) with the four requirements of
  art. 26 eIDAS attached where the cryptography meets them, as numbered tags:
  1 connessa unicamente al firmatario and 2 idonea a identificarlo → the certificate with P_Alice;
  3 sotto il suo esclusivo controllo → the private key S_Alice;
  4 ogni modifica successiva è rilevabile → the fingerprint (not "a prova di manomissione", as in 2024).
  4 clicks: the flow; tags 1 and 2; tag 3; tag 4.
  <SchemaFEA />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const impronta = short(sha256('Contratto'), 6, 6)
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: i quattro requisiti della firma elettronica avanzata (art. 26 eIDAS) sullo schema della firma">
    <!-- 1. Il flusso della firma -->
    <g v-click>
      <SvPersona :x="58" :y="6" nome="Alice" :scala="0.9" />
      <SvDocumento :x="168" :y="2" :w="44" :h="58" />
      <text x="220" y="36" class="etichetta">Contratto</text>
      <SvFreccia :x1="190" :y1="62" :x2="190" :y2="80" />
      <SvRiquadro :x="125" :y="80" :w="130" :h="32" testo="SHA-256" />
      <SvFreccia :x1="190" :y1="112" :x2="190" :y2="128" />
      <SvRiquadro :x="110" :y="128" :w="160" :h="34" :testo="impronta" variante="vuoto" mono />
      <text x="102" y="150" text-anchor="end" class="nota">impronta</text>
      <SvFreccia :x1="190" :y1="162" :x2="190" :y2="180" />
      <SvRiquadro :x="125" :y="180" :w="130" :h="34" testo="Firma" variante="rubrica" />
      <SvChiave :x="34" :y="197" tipo="privata" etichetta="S_Alice" />
      <SvFreccia :x1="84" :y1="197" :x2="123" :y2="197" variante="grigio" />
      <SvFreccia :x1="255" :y1="197" :x2="318" :y2="197" variante="rubrica" />
      <SvRiquadro :x="320" :y="181" :w="100" :h="32" testo="firma" variante="rubrica" />
      <SvFreccia :x1="420" :y1="197" :x2="488" :y2="197" variante="rubrica" />
      <SvRiquadro :x="490" :y="180" :w="110" :h="34" testo="Verifica" />
      <rect x="654" y="148" width="196" height="98" rx="6" class="carta" />
      <text x="752" y="170" text-anchor="middle" class="titolo-cert">Certificato</text>
      <text x="670" y="198" class="campo">Nome</text>
      <text x="730" y="198" class="valore">Alice</text>
      <SvChiave :x="684" :y="226" tipo="pubblica" etichetta="P_Alice" />
      <SvFreccia :x1="652" :y1="210" :x2="602" :y2="200" variante="grigio" />
    </g>
    <!-- 2. Requisiti 1 e 2: il certificato lega la chiave ad Alice -->
    <g v-click>
      <rect x="648" y="142" width="208" height="110" rx="9" class="alone" />
      <circle cx="664" cy="40" r="12" class="numero" />
      <text x="664" y="45" text-anchor="middle" class="cifra">1</text>
      <text x="684" y="37" class="requisito">connessa <tspan class="forte">unicamente</tspan></text>
      <text x="684" y="56" class="requisito">al firmatario</text>
      <circle cx="664" cy="96" r="12" class="numero" />
      <text x="664" y="101" text-anchor="middle" class="cifra">2</text>
      <text x="684" y="101" class="requisito">idonea a <tspan class="forte">identificarlo</tspan></text>
      <line x1="752" y1="112" x2="752" y2="140" class="filo" />
    </g>
    <!-- 3. Requisito 3: la chiave privata resta sotto il controllo di Alice -->
    <g v-click>
      <rect x="18" y="176" width="84" height="38" rx="8" class="alone" />
      <circle cx="30" cy="248" r="12" class="numero" />
      <text x="30" y="253" text-anchor="middle" class="cifra">3</text>
      <text x="50" y="253" class="requisito">sotto il suo <tspan class="forte">esclusivo controllo</tspan></text>
      <line x1="60" y1="216" x2="60" y2="234" class="filo" />
    </g>
    <!-- 4. Requisito 4: l'impronta rende rilevabile ogni modifica -->
    <g v-click>
      <rect x="104" y="122" width="172" height="46" rx="8" class="alone" />
      <circle cx="306" cy="145" r="12" class="numero" />
      <text x="306" y="150" text-anchor="middle" class="cifra">4</text>
      <text x="326" y="141" class="requisito">ogni modifica successiva</text>
      <text x="326" y="160" class="requisito">è <tspan class="forte">rilevabile</tspan></text>
      <line x1="278" y1="145" x2="292" y2="145" class="filo" />
    </g>
  </svg>
</template>

<style scoped>
.etichetta { font-size: 14px; }
.carta { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.titolo-cert { font-family: var(--serif); font-size: 15px; font-weight: 600; fill: var(--rubrica); }
.campo { font-size: 14px; fill: var(--grigio); }
.valore { font-size: 15px; }
.alone { fill: none; stroke: var(--rubrica); stroke-width: 2; stroke-dasharray: 5 4; }
.numero { fill: var(--rubrica); }
.cifra { font-size: 14px; font-weight: 700; fill: var(--carta); }
.requisito { font-size: 16px; }
.forte { font-weight: 700; fill: var(--rubrica); }
.filo { stroke: var(--rubrica); stroke-width: 1.5; }
</style>
