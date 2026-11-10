<!--
  Diagram (2025 deck, pp. 13–14): a distributed ledger. A peer-to-peer network of 12 nodes (database
  cylinders joined by links); four nodes "think" of their own local copy of the ledger, the same three blocks
  in each bubble (yellow bar and arrow = the link to the previous block).
  Sources: a DLT replicates the ledger on every node, and nodes update their copy by one consensus rule
  (Bitcoin whitepaper §5 "Network": blocks are broadcast to all nodes, which accept them and build on them;
  NIST IR 8202 "Blockchain Technology Overview", 2018: §1 "New blocks are replicated across copies of the
  ledger within the network"; §3.5 "every user can maintain their own copy of the ledger", the copies
  "updating and syncing to the same ledger data between peers").
  3 clicks: nodes and links; the copies of the ledger; the caption
  "ogni nodo aggiorna la sua copia con lo stesso meccanismo di consenso".
  <SchemaReteDLT />
-->
<script setup lang="ts">
// Lattice of 12 nodes, as in the 2025 deck: rows of 2, 3, 4, 3 nodes.
const CX = 440, HX = 62
const RIGHE = [42, 100, 158, 216]
const COLONNE = [[2, 4], [1, 3, 5], [0, 2, 4, 6], [1, 3, 5]]
const nodi = COLONNE.flatMap((r, i) => r.map(k => ({ x: CX + (k - 3) * HX, y: RIGHE[i] })))
const ARCHI = [[0, 1], [0, 2], [0, 3], [1, 3], [1, 4], [0, 6], [1, 7], [2, 3], [3, 4], [2, 5], [2, 6], [3, 6], [3, 7],
  [4, 7], [4, 8], [2, 9], [3, 10], [4, 11], [5, 6], [6, 7], [7, 8], [5, 9], [6, 9], [6, 10], [7, 10], [7, 11], [8, 11],
  [9, 10], [10, 11]]
/** Link between two nodes, stopping short of the node glyphs. */
const archi = ARCHI.map(([a, b]) => {
  const p = nodi[a], q = nodi[b]
  const l = Math.hypot(q.x - p.x, q.y - p.y), ux = (q.x - p.x) / l, uy = (q.y - p.y) / l
  return { x1: p.x + ux * 17, y1: p.y + uy * 17, x2: q.x - ux * 17, y2: q.y - uy * 17 }
})

// Thought bubbles: box, and the three small circles that lead to the node.
const nuvole = [
  { x: 20, y: 26, bolle: [[227, 74, 5], [252, 83, 3.6], [275, 90, 2.5]] },
  { x: 20, y: 188, bolle: [[228, 216, 5], [254, 216, 3.6], [277, 216, 2.5]] },
  { x: 670, y: 26, bolle: [[653, 74, 5], [628, 83, 3.6], [605, 90, 2.5]] },
  { x: 670, y: 188, bolle: [[652, 216, 5], [626, 216, 3.6], [603, 216, 2.5]] },
]
const BW = 34, BH = 26, PASSO = 54 // small block, and step between blocks
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: rete da pari a pari di dodici nodi; ogni nodo tiene una copia locale dello stesso registro a blocchi">
    <!-- 1. Nodes and links -->
    <g v-click>
      <text x="440" y="14" text-anchor="middle" class="nota">rete da pari a pari (P2P)</text>
      <line v-for="(e, i) in archi" :key="i" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" class="arco" />
      <g v-for="(n, i) in nodi" :key="i" :transform="`translate(${n.x},${n.y})`" class="nodo">
        <path d="M-13,-10 V10 A13,5 0 0 0 13,10 V-10 Z" />
        <ellipse cx="0" cy="-10" rx="13" ry="5" />
        <path d="M-13,0 A13,5 0 0 0 13,0" class="giro" />
      </g>
    </g>
    <!-- 2. Every node has its own copy of the same ledger -->
    <g v-click>
      <text x="115" y="16" text-anchor="middle" class="nota">copia locale del registro</text>
      <g v-for="(c, i) in nuvole" :key="i">
        <rect :x="c.x" :y="c.y" width="190" height="56" rx="28" class="nuvola" />
        <circle v-for="(b, j) in c.bolle" :key="j" :cx="b[0]" :cy="b[1]" :r="b[2]" class="nuvola" />
        <g v-for="k in 3" :key="k">
          <rect :x="c.x + 24 + (k - 1) * PASSO" :y="c.y + 15" :width="BW" :height="BH" rx="2" class="blocchetto" />
          <rect :x="c.x + 28 + (k - 1) * PASSO" :y="c.y + 32" :width="BW - 8" height="5" class="barra" />
          <g v-if="k > 1">
            <line :x1="c.x + 22 + (k - 1) * PASSO" :y1="c.y + 28" :x2="c.x + 66 + (k - 2) * PASSO" :y2="c.y + 28" class="freccina" />
            <polygon :points="`${c.x + 60 + (k - 2) * PASSO},${c.y + 28} ${c.x + 67 + (k - 2) * PASSO},${c.y + 24} ${c.x + 67 + (k - 2) * PASSO},${c.y + 32}`" class="punta" />
          </g>
        </g>
      </g>
    </g>
    <!-- 3. One consensus rule -->
    <g v-click>
      <text x="440" y="272" text-anchor="middle" class="didascalia">ogni nodo aggiorna la sua copia con lo stesso meccanismo di consenso</text>
    </g>
  </svg>
</template>

<style scoped>
.arco { stroke: var(--grigio); stroke-width: 1.5; }
.nodo path, .nodo ellipse { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.nodo .giro { fill: none; }
.nuvola { fill: var(--carta); stroke: var(--grigio); stroke-width: 1.5; }
.blocchetto { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.barra { fill: var(--glossa); }
.freccina { stroke: var(--glossa); stroke-width: 2; }
.punta { fill: var(--glossa); }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
