<!--
  Diagram (2024 deck, p. 113): the final bundle that travels with the document, as two rows of cards.
  Row 1 (Alice): Documento | Firma di Alice | Certificato di Alice.
  Row 2 (TSA): Marca temporale (impronta + data e ora) | Firma della TSA | Certificato della TSA.
  3 clicks: Alice's row, the TSA's row, the caption "verificabile anche dopo anni".
  <SchemaPacchetto />
-->
<script setup lang="ts">
const COLONNE = [24, 308, 592]
const L = 264
const H = 74
const righe = [
  {
    y: 24,
    tsa: false,
    voci: [
      { icona: 'documento', titolo: 'Documento', sotto: 'il file originale' },
      { icona: 'firma', titolo: 'Firma di Alice', sotto: "sull'impronta del documento" },
      { icona: 'certificato', titolo: 'Certificato di Alice', sotto: 'firmato da una CA' },
    ],
  },
  {
    y: 110,
    tsa: true,
    voci: [
      { icona: 'orologio', titolo: 'Marca temporale', sotto: 'impronta + data e ora' },
      { icona: 'firma', titolo: 'Firma della TSA', sotto: 'sulla marca temporale' },
      { icona: 'certificato', titolo: 'Certificato della TSA', sotto: "firmato da un'altra CA" },
    ],
  },
]
</script>

<template>
  <svg viewBox="0 0 880 258" class="schema" role="img" aria-label="Schema: il pacchetto finale, documento, firme, certificati e marca temporale">
    <g v-for="(r, i) in righe" :key="i" v-click>
      <rect v-if="i === 0" x="10" y="10" width="860" height="188" rx="10" class="busta" />
      <g v-for="(v, j) in r.voci" :key="j">
        <rect :x="COLONNE[j]" :y="r.y" :width="L" :height="H" rx="6" class="scheda" :class="{ tsa: r.tsa }" />
        <!-- icon, centred at (x + 36, y + 37) -->
        <SvDocumento v-if="v.icona === 'documento'" :x="COLONNE[j] + 16" :y="r.y + 8" :w="42" :h="58" />
        <path v-else-if="v.icona === 'firma'" :d="`M${COLONNE[j] + 12},${r.y + 44} c6,-22 14,-22 12,-4 c-2,14 8,4 12,-8 c3,-9 6,4 9,2 c4,-3 6,-8 10,-2 M${COLONNE[j] + 12},${r.y + 54} h48`" class="firma" />
        <g v-else-if="v.icona === 'certificato'">
          <rect :x="COLONNE[j] + 12" :y="r.y + 18" width="48" height="36" rx="3" class="cert" />
          <line :x1="COLONNE[j] + 19" :y1="r.y + 28" :x2="COLONNE[j] + 52" :y2="r.y + 28" class="riga" />
          <line :x1="COLONNE[j] + 19" :y1="r.y + 37" :x2="COLONNE[j] + 40" :y2="r.y + 37" class="riga" />
          <path :d="`M${COLONNE[j] + 47},${r.y + 52} l-4,12 l6,-3 l4,5 l2,-13`" class="nastro" />
          <circle :cx="COLONNE[j] + 51" :cy="r.y + 48" r="7" class="sigillo" />
        </g>
        <g v-else>
          <circle :cx="COLONNE[j] + 36" :cy="r.y + 37" r="20" class="quadrante" />
          <path :d="`M${COLONNE[j] + 36},${r.y + 37} v-13 M${COLONNE[j] + 36},${r.y + 37} h10`" class="lancette" />
        </g>
        <text :x="COLONNE[j] + 76" :y="r.y + 32" class="titolo">{{ v.titolo }}</text>
        <text :x="COLONNE[j] + 76" :y="r.y + 54" class="nota">{{ v.sotto }}</text>
      </g>
    </g>
    <g v-click>
      <path d="M30,204 v8 H850 v-8" class="graffa" />
      <text x="440" y="234" text-anchor="middle" class="esito">✓ verificabile anche dopo anni</text>
      <text x="440" y="251" text-anchor="middle" class="nota">chi ha firmato (certificato di Alice) e da quando il documento esisteva (marca temporale)</text>
    </g>
  </svg>
</template>

<style scoped>
.busta { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.scheda { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.scheda.tsa { stroke: var(--rubrica); }
.titolo { font-size: 16px; font-weight: 700; }
.firma { fill: none; stroke: var(--rubrica); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.cert { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.riga { stroke: var(--linea); stroke-width: 2; }
.nastro { fill: var(--rubrica); }
.sigillo { fill: var(--rubrica); stroke: var(--carta); stroke-width: 1.5; }
.quadrante { fill: var(--carta); stroke: var(--rubrica); stroke-width: 2; }
.lancette { fill: none; stroke: var(--rubrica); stroke-width: 2.5; stroke-linecap: round; }
.graffa { fill: none; stroke: var(--ok); stroke-width: 1.5; }
.esito { font-size: 17px; font-weight: 700; fill: var(--ok); }
</style>
