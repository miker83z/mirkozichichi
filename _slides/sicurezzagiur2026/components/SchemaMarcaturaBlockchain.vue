<!--
  Diagram (new, for the 2024 deck p. 115): time-stamping on a blockchain. Documento → SHA-256 →
  impronta (real digest, same document as <TsaFlow />) → a transaction that carries only the impronta →
  included in block N, which has its own (approximate) time → blocks N+1, N+2 … pile up on top
  ("conferme") → "il documento esisteva non più tardi del blocco N".
  5 clicks: document and impronta, the transaction, block N with its time, the confirmations,
  the conclusion.
  <SchemaMarcaturaBlockchain />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const impronta = short(sha256('Parere legale sul contratto di fornitura Rossi–Bianchi, versione definitiva.'), 6, 4)
</script>

<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: l'impronta del documento registrata in un blocco della blockchain">
    <g v-click>
      <SvDocumento :x="30" :y="20" etichetta="Documento" />
      <SvFreccia :x1="92" :y1="54" :x2="160" :y2="54" etichetta="SHA-256" />
      <SvRiquadro :x="160" :y="28" :w="140" :h="52" variante="rubrica" />
      <text x="230" y="48" text-anchor="middle" class="etich">impronta</text>
      <text x="230" y="69" text-anchor="middle" class="mono hex">{{ impronta }}</text>
    </g>
    <g v-click>
      <SvFreccia :x1="300" :y1="54" :x2="360" :y2="54" />
      <rect x="360" y="22" width="200" height="64" rx="6" class="tx" />
      <text x="376" y="45" class="titoletto">transazione</text>
      <text x="376" y="70" class="nota">dati:</text>
      <text x="412" y="70" class="mono hex rosso">{{ impronta }}</text>
      <text x="580" y="50" class="nota">in rete va solo l'impronta,</text>
      <text x="580" y="67" class="nota">non il documento</text>
    </g>
    <g v-click>
      <SvFreccia :x1="460" :y1="86" :x2="460" :y2="134" variante="rubrica" />
      <rect x="220" y="148" width="104" height="78" rx="6" class="vecchio" />
      <text x="272" y="170" text-anchor="middle" class="nota">blocco N−1</text>
      <line v-for="i in 3" :key="i" x1="236" x2="308" :y1="178 + i * 12" :y2="178 + i * 12" class="riga" />
      <text x="196" y="192" text-anchor="middle" class="nota">…</text>
      <SvFreccia :x1="360" :y1="187" :x2="324" :y2="187" variante="grigio" />
      <rect x="360" y="134" width="200" height="98" rx="6" class="blocco" />
      <text x="376" y="156" class="titoletto">blocco N</text>
      <text x="376" y="177" class="ora">ora indicata: 10:13 UTC</text>
      <line x1="376" x2="544" y1="192" y2="192" class="riga" />
      <rect x="374" y="200" width="172" height="12" rx="2" class="mia" />
      <line x1="376" x2="520" y1="222" y2="222" class="riga" />
    </g>
    <g v-click>
      <rect x="604" y="134" width="96" height="98" rx="6" class="blocco" />
      <text x="652" y="156" text-anchor="middle" class="titoletto">N+1</text>
      <rect x="730" y="134" width="96" height="98" rx="6" class="blocco" />
      <text x="778" y="156" text-anchor="middle" class="titoletto">N+2</text>
      <line v-for="i in 3" :key="`a${i}`" x1="616" x2="688" :y1="168 + i * 14" :y2="168 + i * 14" class="riga" />
      <line v-for="i in 3" :key="`b${i}`" x1="742" x2="814" :y1="168 + i * 14" :y2="168 + i * 14" class="riga" />
      <SvFreccia :x1="604" :y1="187" :x2="560" :y2="187" variante="grigio" />
      <SvFreccia :x1="730" :y1="187" :x2="700" :y2="187" variante="grigio" />
      <text x="852" y="192" text-anchor="middle" class="nota">…</text>
      <path d="M604,124 v-8 H862 v8" class="graffa" />
      <text x="733" y="106" text-anchor="middle" class="conferme"><tspan class="grassetto">conferme</tspan> (blocchi successivi)</text>
    </g>
    <g v-click>
      <rect x="356" y="130" width="208" height="106" rx="8" class="esito-bordo" />
      <line x1="460" y1="236" x2="460" y2="246" class="esito-linea" />
      <text x="460" y="264" text-anchor="middle" class="esito">✓ il documento esisteva non più tardi del blocco N</text>
    </g>
  </svg>
</template>

<style scoped>
.etich { font-size: 14px; }
.hex { font-size: 13px; }
.rosso { fill: var(--rubrica); }
.tx { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.blocco { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.vecchio { fill: var(--carta); stroke: var(--linea); stroke-width: 1.5; }
.riga { stroke: var(--linea); stroke-width: 6; stroke-linecap: round; }
.mia { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1.5; }
.ora { font-size: 14px; }
.graffa { fill: none; stroke: var(--grigio); stroke-width: 1.5; }
.conferme { font-size: 15px; }
.grassetto { font-weight: 700; }
.esito-bordo { fill: none; stroke: var(--ok); stroke-width: 2.5; }
.esito-linea { stroke: var(--ok); stroke-width: 2; }
.esito { font-size: 16px; font-weight: 700; fill: var(--ok); }
</style>
