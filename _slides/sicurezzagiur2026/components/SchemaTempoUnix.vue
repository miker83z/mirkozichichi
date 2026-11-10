<!--
  Diagram (new, for the 2024 deck p. 110): Unix time as a time axis that starts at
  1 January 1970, 00:00 UTC = 0 and reaches 15 November 2026, 10:00 UTC = 1.794.736.800 seconds;
  then the same instant as the ISO 8601 string 2026-11-15T10:00:00Z, with each part labelled.
  3 clicks: the axis with its origin (0), the lecture's instant and its seconds,
  the ISO 8601 string broken into anno, mese, giorno, T, ora, Z = UTC.
  <SchemaTempoUnix />
-->
<script setup lang="ts">
import { ISTANTE_STAMPA, isoUtc } from '../utils/tempo'

const SECONDI = ISTANTE_STAMPA / 1000 // 1794736800
const X0 = 110
const X1 = 760
const xDi = (secondi: number) => X0 + (secondi / SECONDI) * (X1 - X0)
const decenni = [1980, 1990, 2000, 2010, 2020].map(a => ({ a, x: xDi(Date.UTC(a, 0, 1) / 1000) }))
const secondiIt = SECONDI.toLocaleString('it-IT')

// The ISO string, cut into its parts. JetBrains Mono: every character is 0.6 em wide (30 px → 18 px).
const ISO = isoUtc(ISTANTE_STAMPA) // 2026-11-15T10:00:00Z
const CAR = 18
const XS = 380
const tagli: { da: number, a: number, etichetta?: string, sopra?: boolean, rosso?: boolean, grigio?: boolean }[] = [
  { da: 0, a: 4, etichetta: 'anno' },
  { da: 4, a: 5, grigio: true },
  { da: 5, a: 7, etichetta: 'mese' },
  { da: 7, a: 8, grigio: true },
  { da: 8, a: 10, etichetta: 'giorno' },
  { da: 10, a: 11, etichetta: 'T separa data e ora', sopra: true, rosso: true },
  { da: 11, a: 19, etichetta: 'ora (hh:mm:ss)' },
  { da: 19, a: 20, etichetta: 'Z = UTC', sopra: true, rosso: true },
]
const parti = tagli.map(p => ({
  ...p,
  testo: ISO.slice(p.da, p.a),
  x: XS + p.da * CAR,
  fine: XS + p.a * CAR,
  centro: XS + ((p.da + p.a) / 2) * CAR,
}))
</script>

<template>
  <svg viewBox="0 0 880 262" class="schema" role="img" aria-label="Schema: Unix time dal 1° gennaio 1970 al 15 novembre 2026 e la stessa data in ISO 8601">
    <g v-click>
      <SvFreccia :x1="X0" :y1="86" :x2="846" :y2="86" />
      <line v-for="d in decenni" :key="d.a" :x1="d.x" :y1="81" :x2="d.x" :y2="91" class="tacca" />
      <text v-for="d in decenni" :key="`t${d.a}`" :x="d.x" :y="108" text-anchor="middle" class="nota">{{ d.a }}</text>
      <line :x1="X0" y1="72" :x2="X0" y2="100" class="estremo" />
      <text :x="X0" y="58" text-anchor="middle" class="data">1° gen 1970, 00:00 UTC</text>
      <text :x="X0" y="132" text-anchor="middle" class="mono numero">0</text>
    </g>
    <g v-click>
      <line :x1="X1" y1="72" :x2="X1" y2="100" class="estremo rosso-linea" />
      <text :x="X1" y="58" text-anchor="middle" class="data">15 nov 2026, 10:00 UTC</text>
      <text :x="X1" y="132" text-anchor="middle" class="mono numero rosso">{{ secondiIt }}</text>
      <text :x="X1" y="151" text-anchor="middle" class="nota">secondi</text>
      <text x="420" y="132" text-anchor="middle" class="spiega">Unix time: i secondi trascorsi da allora</text>
    </g>
    <g v-click>
      <text x="40" y="206" class="titoletto">Lo stesso istante in ISO 8601</text>
      <text x="40" y="225" class="nota">come lo scrivono i protocolli</text>
      <text v-for="p in parti" :key="p.da" :x="p.x" y="214" class="mono iso" :class="{ rosso: p.rosso, tenue: p.grigio }">{{ p.testo }}</text>
      <template v-for="p in parti" :key="`e${p.da}`">
        <template v-if="p.etichetta && !p.sopra">
          <path :d="`M${p.x + 2},224 v6 H${p.fine - 2} v-6`" class="graffa" />
          <text :x="p.centro" y="249" text-anchor="middle" class="parte">{{ p.etichetta }}</text>
        </template>
        <template v-else-if="p.etichetta">
          <line :x1="p.centro" y1="181" :x2="p.centro" y2="190" class="graffa" />
          <text :x="p.centro" y="176" text-anchor="middle" class="parte rosso">{{ p.etichetta }}</text>
        </template>
      </template>
    </g>
  </svg>
</template>

<style scoped>
.tacca { stroke: var(--grigio); stroke-width: 1.5; }
.estremo { stroke: var(--inchiostro); stroke-width: 3; }
.rosso-linea { stroke: var(--rubrica); }
.data { font-size: 15px; font-weight: 600; }
.numero { font-size: 22px; font-weight: 700; }
.spiega { font-size: 15px; fill: var(--grigio); }
.iso { font-size: 30px; font-weight: 500; }
.parte { font-size: 14px; }
.graffa { fill: none; stroke: var(--grigio); stroke-width: 1.5; }
.rosso { fill: var(--rubrica); }
.tenue { fill: var(--grigio); }
</style>
