<!--
  Diagram (2024 deck, pp. 73–74): a Merkle tree, a binary tree of hash pointers. Eight data blocks at the bottom;
  above them nodes "H( ) H( )" whose two hash pointers point to the two nodes below, up to a single root.
  5 clicks: the data (leaves), level 1, level 2, the root, then the labels ("transazioni (dati)",
  "impronta delle due sottostanti", "radice") with the question "quanti livelli per n dati? log₂ n".
  <SchemaAlberoMerkle />
-->
<script setup lang="ts">
const FOGLIE = Array.from({ length: 8 }, (_, i) => 45 + 74 * i) // centres of the data blocks
const L1 = [0, 1, 2, 3].map(i => (FOGLIE[2 * i] + FOGLIE[2 * i + 1]) / 2)
const L2 = [0, 1].map(i => (L1[2 * i] + L1[2 * i + 1]) / 2)
const RADICE = [(L2[0] + L2[1]) / 2]

const NW = 100 // node width
const NH = 32
const Y = { radice: 16, l2: 86, l1: 156, foglie: 222 }
const FW = 56
const FH = 46

interface Livello { centri: number[], y: number, figli: number[], yFigli: number }
const livelli: Livello[] = [
  { centri: L1, y: Y.l1, figli: FOGLIE, yFigli: Y.foglie },
  { centri: L2, y: Y.l2, figli: L1, yFigli: Y.l1 },
  { centri: RADICE, y: Y.radice, figli: L2, yFigli: Y.l2 },
]

/** Arrows of one node: from inside each "H( )" down, across and down to the child. */
function frecce(l: Livello, k: number) {
  const cx = l.centri[k]
  const my = (l.y + NH + l.yFigli) / 2
  return [0, 1].map((j) => {
    const hx = cx + (j ? 25 : -25)
    const fx = l.figli[2 * k + j]
    const ft = l.yFigli
    return {
      d: `M${hx},${l.y + 15} V${my} H${fx} V${ft - 2}`,
      punta: `${fx},${ft} ${fx - 5.5},${ft - 11} ${fx + 5.5},${ft - 11}`,
      hx,
    }
  })
}
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: albero di Merkle con otto dati, tre livelli di impronte e la radice">
    <g v-click>
      <g v-for="(cx, i) in FOGLIE" :key="i">
        <rect :x="cx - FW / 2" :y="Y.foglie" :width="FW" :height="FH" rx="3" class="dato" />
        <text :x="cx" :y="Y.foglie + 28" text-anchor="middle" class="nota">(dati)</text>
      </g>
    </g>
    <g v-for="(l, li) in livelli" :key="li" v-click>
      <g v-for="(cx, k) in l.centri" :key="k">
        <rect :x="cx - NW / 2" :y="l.y" :width="NW" :height="NH" rx="4" :class="li === 2 ? 'nodo radice' : 'nodo'" />
        <g v-for="(f, j) in frecce(l, k)" :key="j">
          <text :x="f.hx - 3" :y="l.y + 21" text-anchor="end" class="mono h">H(</text>
          <text :x="f.hx + 3" :y="l.y + 21" class="mono h">)</text>
          <path :d="f.d" class="filo" />
          <polygon :points="f.punta" class="punta" />
        </g>
      </g>
    </g>
    <g v-click>
      <text :x="RADICE[0] + NW / 2 + 12" :y="Y.radice + 22" class="etichetta-radice">radice (root)</text>
      <path :d="`M612,${Y.l2} h6 V${Y.l1 + NH} h-6`" class="graffa" />
      <text x="628" :y="Y.l2 + 44" class="etichetta">impronta delle</text>
      <text x="628" :y="Y.l2 + 62" class="etichetta">due sottostanti</text>
      <text x="612" :y="Y.foglie + 29" class="etichetta">transazioni (dati)</text>
      <text x="628" y="28" class="domanda">quanti livelli per n dati?</text>
      <text x="628" y="52" class="risposta">log<tspan class="pedice">2</tspan> n <tspan class="nota-in">(8 dati → 3 livelli)</tspan></text>
    </g>
  </svg>
</template>

<style scoped>
.dato { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.2; }
.nodo { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.2; }
.nodo.radice { fill: color-mix(in srgb, var(--rubrica) 14%, var(--carta)); stroke: var(--rubrica); stroke-width: 2; }
.h { font-size: 15px; }
.filo { fill: none; stroke: var(--rubrica); stroke-width: 1.6; }
.punta { fill: var(--rubrica); }
.graffa { fill: none; stroke: var(--grigio); stroke-width: 1.5; }
.etichetta { font-size: 15px; }
.etichetta-radice { font-size: 15px; font-weight: 700; fill: var(--rubrica); }
.domanda { font-size: 15px; font-weight: 700; }
.risposta { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
.nota-in { font-size: 13px; font-weight: 400; fill: var(--grigio); }
</style>
