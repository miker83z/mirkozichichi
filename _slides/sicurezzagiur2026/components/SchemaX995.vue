<!--
  Diagram (new, for the 2024 deck p. 114): six small icons for the families of time-stamping schemes.
  Not "the methods of ANSI X9.95" (paywalled, not verifiable): a general classification (see VERIFICA.md).
  basati su firma (PKI: a stamp sealed with the TSA's private key), collegati (linked: a mini Merkle
  tree whose root points to the previous one), chiave transitoria (a signing key and an hourglass),
  MAC (the same secret key on both sides), database (fingerprints kept in a trusted archive),
  distribuiti (fingerprints in a chain of blocks, no TSA; separated by a dashed line).
  6 clicks, one per family, in the order of the slide's list.
  <SchemaX995 />
-->
<script setup lang="ts">
import { sha256 } from '../utils/crypto'

// Real fingerprints, cut to their first characters, for the database icon.
const archivio = ['Contratto Rossi.pdf', 'Parere Bianchi.pdf', 'Brevetto v3.pdf'].map(n => `${sha256(n).slice(0, 6)}…`)
const C = [73, 220, 367, 513, 660, 807]
</script>

<template>
  <svg viewBox="0 0 880 222" class="schema" role="img" aria-label="Schema: famiglie di schemi di marcatura temporale">
    <!-- 1. basati su firma (PKI) -->
    <g v-click>
      <rect :x="C[0] - 30" y="16" width="58" height="72" rx="4" class="foglio" />
      <line v-for="i in 3" :key="i" :x1="C[0] - 22" :x2="C[0] + (i === 1 ? 6 : 18)" :y1="22 + i * 12" :y2="22 + i * 12" class="riga" />
      <circle :cx="C[0] + 18" :cy="76" r="13" class="sigillo" />
      <text :x="C[0] + 18" y="81" text-anchor="middle" class="spunta">✓</text>
      <SvChiave :x="C[0] - 18" :y="106" tipo="privata" :scala="0.8" />
      <text :x="C[0]" y="146" text-anchor="middle" class="titolo">Basati su firma</text>
      <text :x="C[0]" y="166" text-anchor="middle" class="nota">la TSA firma</text>
      <text :x="C[0]" y="182" text-anchor="middle" class="nota">(PKI, RFC 3161)</text>
    </g>
    <!-- 2. collegati (linked) -->
    <g v-click>
      <path :d="`M${C[1]},34 L${C[1] - 28},62 M${C[1]},34 L${C[1] + 28},62 M${C[1] - 28},62 L${C[1] - 42},94 M${C[1] - 28},62 L${C[1] - 14},94 M${C[1] + 28},62 L${C[1] + 14},94 M${C[1] + 28},62 L${C[1] + 42},94`" class="ramo" />
      <rect :x="C[1] - 14" y="24" width="28" height="18" rx="3" class="radice" />
      <rect v-for="dx in [-28, 28]" :key="dx" :x="C[1] + dx - 11" y="55" width="22" height="15" rx="3" class="nodo" />
      <rect v-for="dx in [-42, -14, 14, 42]" :key="dx" :x="C[1] + dx - 9" y="88" width="18" height="22" rx="2" class="foglia" />
      <rect :x="C[1] - 70" y="24" width="28" height="18" rx="3" class="precedente" />
      <SvFreccia :x1="C[1] - 15" :y1="33" :x2="C[1] - 41" :y2="33" variante="grigio" />
      <text :x="C[1] - 56" y="58" text-anchor="middle" class="nota">prima</text>
      <text :x="C[1]" y="146" text-anchor="middle" class="titolo">Collegati</text>
      <text :x="C[1]" y="166" text-anchor="middle" class="nota">ogni marca è legata</text>
      <text :x="C[1]" y="182" text-anchor="middle" class="nota">alle precedenti</text>
    </g>
    <!-- 3. chiave transitoria -->
    <g v-click>
      <SvChiave :x="C[2] - 40" :y="66" tipo="privata" />
      <path :d="`M${C[2] + 18},28 h32 M${C[2] + 18},104 h32`" class="cornice" />
      <path :d="`M${C[2] + 21},30 L${C[2] + 47},30 L${C[2] + 34},66 L${C[2] + 47},102 L${C[2] + 21},102 L${C[2] + 34},66 Z`" class="clessidra" />
      <path :d="`M${C[2] + 27},47 L${C[2] + 41},47 L${C[2] + 34},64 Z M${C[2] + 34},68 L${C[2] + 44},100 L${C[2] + 24},100 Z`" class="sabbia" />
      <text :x="C[2]" y="146" text-anchor="middle" class="titolo">Chiave transitoria</text>
      <text :x="C[2]" y="166" text-anchor="middle" class="nota">chiavi di firma</text>
      <text :x="C[2]" y="182" text-anchor="middle" class="nota">di breve durata</text>
    </g>
    <!-- 4. MAC -->
    <g v-click>
      <SvPersona :x="C[3] - 36" :y="20" :scala="0.75" />
      <SvPersona :x="C[3] + 36" :y="20" variante="rubrica" :scala="0.75" />
      <SvChiave :x="C[3] - 52" :y="94" :scala="0.7" />
      <SvChiave :x="C[3] + 22" :y="94" :scala="0.7" />
      <text :x="C[3] + 1" y="100" text-anchor="middle" class="uguale">=</text>
      <text :x="C[3]" y="146" text-anchor="middle" class="titolo">MAC</text>
      <text :x="C[3]" y="166" text-anchor="middle" class="nota">una chiave segreta</text>
      <text :x="C[3]" y="182" text-anchor="middle" class="nota">condivisa con la TSA</text>
    </g>
    <!-- 5. database -->
    <g v-click>
      <path :d="`M${C[4] - 44},30 v74 a44,10 0 0 0 88,0 v-74`" class="cilindro" />
      <ellipse :cx="C[4]" cy="30" rx="44" ry="10" class="cilindro" />
      <text v-for="(h, i) in archivio" :key="h" :x="C[4]" :y="62 + i * 18" text-anchor="middle" class="mono impronta">{{ h }}</text>
      <text :x="C[4]" y="146" text-anchor="middle" class="titolo">Database</text>
      <text :x="C[4]" y="166" text-anchor="middle" class="nota">impronte in un</text>
      <text :x="C[4]" y="182" text-anchor="middle" class="nota">archivio fidato</text>
    </g>
    <!-- 6. distribuiti -->
    <g v-click>
      <line x1="734" y1="14" x2="734" y2="196" class="separa" />
      <rect v-for="i in 3" :key="i" :x="C[5] - 56 + (i - 1) * 42" y="44" width="26" height="40" rx="3" class="blocco" />
      <line v-for="i in 3" :key="`r${i}`" :x1="C[5] - 51 + (i - 1) * 42" :x2="C[5] - 35 + (i - 1) * 42" y1="58" y2="58" class="riga" />
      <line v-for="i in 3" :key="`s${i}`" :x1="C[5] - 51 + (i - 1) * 42" :x2="C[5] - 41 + (i - 1) * 42" y1="68" y2="68" class="riga" />
      <SvFreccia :x1="C[5] - 14" :y1="64" :x2="C[5] - 30" :y2="64" variante="grigio" />
      <SvFreccia :x1="C[5] + 28" :y1="64" :x2="C[5] + 12" :y2="64" variante="grigio" />
      <text :x="C[5]" y="146" text-anchor="middle" class="titolo">Distribuiti</text>
      <text :x="C[5]" y="166" text-anchor="middle" class="nota">impronte in blockchain</text>
      <text :x="C[5]" y="182" text-anchor="middle" class="nota">nessuna TSA</text>
    </g>
  </svg>
</template>

<style scoped>
.titolo { font-size: 15px; font-weight: 700; }
.foglio { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.riga { stroke: var(--linea); stroke-width: 2; }
.sigillo { fill: var(--rubrica); }
.schema .spunta { fill: var(--carta); font-size: 14px; font-weight: 700; }
.ramo { fill: none; stroke: var(--grigio); stroke-width: 1.5; }
.radice { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1.5; }
.nodo { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.2; }
.foglia { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.2; }
.precedente { fill: var(--campo); stroke: var(--grigio); stroke-width: 1.2; stroke-dasharray: 3 3; }
.cornice { stroke: var(--inchiostro); stroke-width: 3; stroke-linecap: round; }
.clessidra { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; stroke-linejoin: round; }
.sabbia { fill: #b08a2e; }
.uguale { font-size: 22px; font-weight: 700; fill: var(--grigio); }
.cilindro { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.impronta { font-size: 13px; }
.separa { stroke: var(--linea); stroke-width: 1.5; stroke-dasharray: 5 5; }
.blocco { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
</style>
