<!--
  Diagram (2025 deck, p. 21): synchronising the copies. Left, three copies of the ledger: 3 blocks (green),
  2 blocks (amber), 1 block (red); right, the network with each node coloured by the copy it holds. The nodes
  that are behind ask their neighbours for the missing blocks (green arrows); in the end every node, and
  every copy, has the same 3 blocks.
  Source: Bitcoin whitepaper §5 "Network" ("If a node does not receive a block, it will request it when it
  receives the next block and realizes it missed one"; "Nodes always consider the longest chain to be the
  correct one"; Bitcoin Core in fact follows the chain with the most cumulative work); NIST IR 8202 §3.5
  (new full nodes "request a full copy of the blockchain network's ledger").
  3 clicks: the different copies; the exchange of the missing blocks; all synchronised
  ("tutti i nodi hanno lo stesso registro").
  <SchemaSincronizzazione />
-->
<script setup lang="ts">
const CX = 560, HX = 78
const RIGHE = [40, 100, 160, 220]
const COLONNE = [[2, 4], [1, 3, 5], [0, 2, 4, 6], [1, 3, 5]]
const nodi = COLONNE.flatMap((r, i) => r.map(k => ({ x: CX + (k - 3) * HX, y: RIGHE[i] })))
const ARCHI = [[0, 1], [0, 2], [0, 3], [1, 3], [1, 4], [0, 6], [1, 7], [2, 3], [3, 4], [2, 5], [2, 6], [3, 6], [3, 7],
  [4, 7], [4, 8], [2, 9], [3, 10], [4, 11], [5, 6], [6, 7], [7, 8], [5, 9], [6, 9], [6, 10], [7, 10], [7, 11], [8, 11],
  [9, 10], [10, 11]]
function segmento([a, b]: number[]) {
  const p = nodi[a], q = nodi[b]
  const l = Math.hypot(q.x - p.x, q.y - p.y), ux = (q.x - p.x) / l, uy = (q.y - p.y) / l
  return { x1: p.x + ux * 17, y1: p.y + uy * 17, x2: q.x - ux * 17, y2: q.y - uy * 17 }
}
const archi = ARCHI.map(segmento)
// How many blocks each node holds, as on p. 21: two nodes are up to date, three are far behind.
const VERDI = [2, 5], ROSSI = [4, 8, 11]
const stato = nodi.map((_, i) => (VERDI.includes(i) ? 'verde' : ROSSI.includes(i) ? 'rosso' : 'ambra'))
// The missing blocks travel from the up-to-date nodes outwards.
const scambi = [[2, 0], [2, 3], [2, 6], [2, 9], [5, 6], [5, 9], [1, 4], [3, 4], [7, 8], [7, 11], [10, 11]].map(segmento)

// The three copies of the ledger.
const copie = [
  { y: 34, n: 3, classe: 'verde' },
  { y: 104, n: 2, classe: 'ambra' },
  { y: 174, n: 1, classe: 'rosso' },
]
const FX = 16, FW = 186, FH = 56, BW = 34, BH = 26, PASSO = 54
const bx = (k: number) => FX + 26 + k * PASSO // left edge of block k (0-based)
</script>

<template>
  <svg viewBox="0 0 880 268" class="schema" role="img" aria-label="Schema: i nodi hanno copie del registro di lunghezza diversa; chi è indietro chiede i blocchi mancanti; alla fine tutti hanno gli stessi tre blocchi">
    <!-- 1. Different copies -->
    <g v-click>
      <text :x="FX + FW / 2" y="22" text-anchor="middle" class="nota">copie del registro</text>
      <g v-for="c in copie" :key="c.y">
        <rect :x="FX" :y="c.y" :width="FW" :height="FH" rx="4" :class="['cornice', c.classe]" />
        <g v-for="k in c.n" :key="k">
          <rect :x="bx(k - 1)" :y="c.y + 15" :width="BW" :height="BH" rx="2" class="blocchetto" />
          <rect :x="bx(k - 1) + 4" :y="c.y + 32" :width="BW - 8" height="5" class="barra" />
          <g v-if="k > 1">
            <line :x1="bx(k - 1) - 2" :y1="c.y + 28" :x2="bx(k - 2) + BW + 8" :y2="c.y + 28" class="freccina" />
            <polygon :points="`${bx(k - 2) + BW + 2},${c.y + 28} ${bx(k - 2) + BW + 9},${c.y + 24} ${bx(k - 2) + BW + 9},${c.y + 32}`" class="punta" />
          </g>
        </g>
      </g>
      <line v-for="(e, i) in archi" :key="i" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" class="arco" />
      <g v-for="(n, i) in nodi" :key="i" :transform="`translate(${n.x},${n.y})`" :class="['nodo', stato[i]]">
        <path d="M-13,-10 V10 A13,5 0 0 0 13,10 V-10 Z" />
        <ellipse cx="0" cy="-10" rx="13" ry="5" />
        <path d="M-13,0 A13,5 0 0 0 13,0" class="giro" />
      </g>
    </g>
    <!-- 2. Who is behind asks for the missing blocks -->
    <g v-click>
      <SvFreccia v-for="(e, i) in scambi" :key="i" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" variante="ok" />
      <text :x="FX" y="258" class="spiega">chi è indietro chiede e riceve i blocchi mancanti</text>
    </g>
    <!-- 3. Everybody has the same ledger -->
    <g v-click>
      <g v-for="c in copie.slice(1)" :key="c.y">
        <rect :x="FX" :y="c.y" :width="FW" :height="FH" rx="4" class="cornice verde" />
        <g v-for="k in 3" :key="k">
          <g v-if="k > c.n">
            <rect :x="bx(k - 1)" :y="c.y + 15" :width="BW" :height="BH" rx="2" class="blocchetto nuovo" />
            <rect :x="bx(k - 1) + 4" :y="c.y + 32" :width="BW - 8" height="5" class="barra" />
            <line :x1="bx(k - 1) - 2" :y1="c.y + 28" :x2="bx(k - 2) + BW + 8" :y2="c.y + 28" class="freccina" />
            <polygon :points="`${bx(k - 2) + BW + 2},${c.y + 28} ${bx(k - 2) + BW + 9},${c.y + 24} ${bx(k - 2) + BW + 9},${c.y + 32}`" class="punta" />
          </g>
        </g>
      </g>
      <g v-for="(n, i) in nodi" :key="i" :transform="`translate(${n.x},${n.y})`" class="nodo verde">
        <path d="M-13,-10 V10 A13,5 0 0 0 13,10 V-10 Z" />
        <ellipse cx="0" cy="-10" rx="13" ry="5" />
        <path d="M-13,0 A13,5 0 0 0 13,0" class="giro" />
      </g>
      <text x="864" y="258" text-anchor="end" class="didascalia">✓ tutti i nodi hanno lo stesso registro</text>
    </g>
  </svg>
</template>

<style scoped>
.arco { stroke: var(--grigio); stroke-width: 1.5; }
.nodo path, .nodo ellipse { stroke-width: 2; }
.nodo .giro { fill: none !important; }
.nodo.verde path, .nodo.verde ellipse { fill: color-mix(in srgb, var(--ok) 22%, var(--carta)); stroke: var(--ok); }
.nodo.ambra path, .nodo.ambra ellipse { fill: color-mix(in srgb, var(--glossa) 22%, var(--carta)); stroke: var(--glossa); }
.nodo.rosso path, .nodo.rosso ellipse { fill: color-mix(in srgb, var(--rubrica) 22%, var(--carta)); stroke: var(--rubrica); }
.cornice { fill: var(--carta); stroke-width: 2; }
.cornice.verde { stroke: var(--ok); stroke-width: 2.5; fill: none; }
.cornice.ambra { stroke: var(--glossa); }
.cornice.rosso { stroke: var(--rubrica); }
.blocchetto { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.blocchetto.nuovo { fill: color-mix(in srgb, var(--ok) 22%, var(--carta)); stroke: var(--ok); }
.barra { fill: var(--glossa); }
.freccina { stroke: var(--glossa); stroke-width: 2; }
.punta { fill: var(--glossa); }
.spiega { font-size: 15px; fill: var(--ok); }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--ok); }
</style>
