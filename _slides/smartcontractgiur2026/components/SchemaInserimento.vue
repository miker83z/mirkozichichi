<!--
  Diagram (2025 deck, p. 19): inserting transactions into the distributed ledger. Alice and Bob (left) and
  a crowd of other users (right) send TX1…TX6 to different nodes of the peer-to-peer network; each node
  forwards the new transactions to its neighbours (the green links, as on p. 19).
  Source: Bitcoin whitepaper §5 "Network" ("New transactions are broadcast to all nodes"; they need not
  reach every node at once: "As long as they reach many nodes, they will get into a block before long").
  4 clicks: the network; Alice and Bob send TX1 and TX2; the other users send TX3–TX6; the nodes forward
  them to their neighbours, with the caption.
  <SchemaInserimento />
-->
<script setup lang="ts">
const CX = 440, HX = 70
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

// Transactions: from (x1, y1) to the node, with the label tag centred at (tx, ty).
const primi = [
  { nome: 'TX1', x1: 88, y1: 50, x2: 283, y2: 96, tx: 178, ty: 50 },
  { nome: 'TX2', x1: 88, y1: 180, x2: 212, y2: 163, tx: 150, ty: 150 },
]
const altri = [
  { nome: 'TX3', x1: 756, y1: 58, x2: 528, y2: 42, tx: 650, ty: 28 },
  { nome: 'TX4', x1: 756, y1: 100, x2: 598, y2: 100, tx: 690, ty: 82 },
  { nome: 'TX5', x1: 756, y1: 150, x2: 668, y2: 158, tx: 712, ty: 134 },
  { nome: 'TX6', x1: 756, y1: 196, x2: 598, y2: 218, tx: 690, ty: 228 },
]
const folla = [[790, 54], [840, 54], [790, 106], [840, 106], [790, 158], [840, 158]]
// Nodes that received a transaction forward it to their neighbours.
const ingressi = new Set([2, 5, 1, 4, 8, 11])
const inoltri = ARCHI.filter(([a, b]) => ingressi.has(a) || ingressi.has(b)).map(segmento)
</script>

<template>
  <svg viewBox="0 0 880 272" class="schema" role="img" aria-label="Schema: Alice, Bob e altri utenti inviano le transazioni TX1-TX6 a nodi diversi della rete, che le inoltrano ai vicini">
    <!-- 1. The network -->
    <g v-click>
      <line v-for="(e, i) in archi" :key="i" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" class="arco" />
      <g v-for="(n, i) in nodi" :key="i" :transform="`translate(${n.x},${n.y})`" class="nodo">
        <path d="M-13,-10 V10 A13,5 0 0 0 13,10 V-10 Z" />
        <ellipse cx="0" cy="-10" rx="13" ry="5" />
        <path d="M-13,0 A13,5 0 0 0 13,0" class="giro" />
      </g>
    </g>
    <!-- 2. Alice and Bob -->
    <g v-click>
      <SvPersona :x="58" :y="18" nome="Alice" :scala="0.9" />
      <SvPersona :x="58" :y="148" nome="Bob" :scala="0.9" />
      <g v-for="t in primi" :key="t.nome">
        <SvFreccia :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2" variante="ok" />
        <rect :x="t.tx - 23" :y="t.ty - 11" width="46" height="22" rx="3" class="etichetta" />
        <text :x="t.tx" :y="t.ty + 5" text-anchor="middle" class="mono tx">{{ t.nome }}</text>
      </g>
    </g>
    <!-- 3. Everybody else -->
    <g v-click>
      <rect x="760" y="30" width="110" height="168" rx="6" class="folla" />
      <SvPersona v-for="(p, i) in folla" :key="i" :x="p[0]" :y="p[1]" :scala="0.55" />
      <text x="815" y="216" text-anchor="middle" class="nota">altri utenti</text>
      <g v-for="t in altri" :key="t.nome">
        <SvFreccia :x1="t.x1" :y1="t.y1" :x2="t.x2" :y2="t.y2" variante="ok" />
        <rect :x="t.tx - 23" :y="t.ty - 11" width="46" height="22" rx="3" class="etichetta" />
        <text :x="t.tx" :y="t.ty + 5" text-anchor="middle" class="mono tx">{{ t.nome }}</text>
      </g>
    </g>
    <!-- 4. The nodes forward them -->
    <g v-click>
      <line v-for="(e, i) in inoltri" :key="i" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" class="inoltro" />
      <text x="440" y="264" text-anchor="middle" class="didascalia">ogni nodo inoltra le nuove transazioni ai vicini</text>
    </g>
  </svg>
</template>

<style scoped>
.arco { stroke: var(--grigio); stroke-width: 1.5; }
.inoltro { stroke: var(--ok); stroke-width: 3; }
.nodo path, .nodo ellipse { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.nodo .giro { fill: none; }
.etichetta { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.tx { font-size: 13px; font-weight: 700; }
.folla { fill: none; stroke: var(--ok); stroke-width: 1.5; }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--ok); }
</style>
