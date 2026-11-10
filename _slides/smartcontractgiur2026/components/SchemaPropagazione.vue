<!--
  Diagram (2025 deck, p. 20): a block spreading through the network. One node (the light bulb) proposes a
  new block; it sends it to its neighbours, which check it and pass it on: the links and nodes turn red hop
  by hop, until the whole network has the block. The hop of each node is its distance from the proposer
  (breadth-first search over the links); a link turns red when the block crosses it (one hop later for a
  link between two nodes reached at the same hop, capped at the last hop).
  Source: Bitcoin whitepaper §5 "Network" ("When a node finds a proof-of-work, it broadcasts the block to
  all nodes"; "Nodes accept the block only if all transactions in it are valid and not already spent");
  NIST IR 8202 §4.1: the full nodes verify the new block, "add the block to their copy of the blockchain and
  resend the block to their peer nodes".
  4 clicks: the network with the proposer; hop 1 (with the caption); hop 2; hop 3, the whole network.
  <SchemaPropagazione />
-->
<script setup lang="ts">
const CX = 420, HX = 88
const RIGHE = [40, 102, 164, 226]
const COLONNE = [[2, 4], [1, 3, 5], [0, 2, 4, 6], [1, 3, 5]]
const nodi = COLONNE.flatMap((r, i) => r.map(k => ({ x: CX + (k - 3) * HX, y: RIGHE[i] })))
const ARCHI = [[0, 1], [0, 2], [0, 3], [1, 3], [1, 4], [0, 6], [1, 7], [2, 3], [3, 4], [2, 5], [2, 6], [3, 6], [3, 7],
  [4, 7], [4, 8], [2, 9], [3, 10], [4, 11], [5, 6], [6, 7], [7, 8], [5, 9], [6, 9], [6, 10], [7, 10], [7, 11], [8, 11],
  [9, 10], [10, 11]]
const ORIGINE = 2 // the node that proposes the block
const ULTIMO = 3 // number of hops shown

// Hop of each node: breadth-first search from the proposer.
const passo = nodi.map(() => Infinity)
passo[ORIGINE] = 0
const coda = [ORIGINE]
while (coda.length) {
  const a = coda.shift()!
  for (const [p, q] of ARCHI) {
    const b = p === a ? q : q === a ? p : -1
    if (b >= 0 && passo[b] === Infinity) { passo[b] = passo[a] + 1; coda.push(b) }
  }
}
const archi = ARCHI.map(([a, b]) => {
  const p = nodi[a], q = nodi[b]
  const l = Math.hypot(q.x - p.x, q.y - p.y), ux = (q.x - p.x) / l, uy = (q.y - p.y) / l
  const onda = Math.min(ULTIMO, Math.max(passo[a], passo[b]) + (passo[a] === passo[b] ? 1 : 0))
  return { x1: p.x + ux * 17, y1: p.y + uy * 17, x2: q.x - ux * 17, y2: q.y - uy * 17, onda }
})
const onde = [1, 2, 3].map(k => ({
  archi: archi.filter(e => e.onda === k),
  nodi: nodi.filter((_, i) => passo[i] === k),
}))
const legenda = [
  { titolo: '1° passaggio', testo: 'ai vicini' },
  { titolo: '2° passaggio', testo: 'ai vicini dei vicini' },
  { titolo: '3° passaggio', testo: 'tutta la rete' },
]
const o = nodi[ORIGINE]
</script>

<template>
  <svg viewBox="0 0 880 274" class="schema" role="img" aria-label="Schema: un nodo propone un blocco e la rete lo propaga di vicino in vicino, in tre passaggi, fino a tutti i nodi">
    <!-- 1. The network and the node that proposes the block -->
    <g v-click>
      <line v-for="(e, i) in archi" :key="i" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" class="arco" />
      <g v-for="(n, i) in nodi" :key="i" :transform="`translate(${n.x},${n.y})`" :class="['nodo', { rosso: i === ORIGINE }]">
        <path d="M-13,-10 V10 A13,5 0 0 0 13,10 V-10 Z" />
        <ellipse cx="0" cy="-10" rx="13" ry="5" />
        <path d="M-13,0 A13,5 0 0 0 13,0" class="giro" />
      </g>
      <!-- light bulb -->
      <g :transform="`translate(${o.x - 46},${o.y - 46})`" class="lampadina">
        <path d="M-7,6 C-15,0 -13,-14 0,-14 C13,-14 15,0 7,6 V11 H-7 Z" />
        <line x1="-5" y1="15" x2="5" y2="15" />
        <line v-for="a in [-150, -110, -70, -30, 10, 170]" :key="a" :x1="Math.cos(a * Math.PI / 180) * 19" :y1="-3 + Math.sin(a * Math.PI / 180) * 19" :x2="Math.cos(a * Math.PI / 180) * 25" :y2="-3 + Math.sin(a * Math.PI / 180) * 25" />
      </g>
      <text :x="o.x - 78" :y="o.y - 52" text-anchor="end" class="etichetta">un nodo propone</text>
      <text :x="o.x - 78" :y="o.y - 34" text-anchor="end" class="etichetta">un nuovo blocco</text>
    </g>
    <!-- 2–4. The block spreads hop by hop -->
    <g v-for="(w, k) in onde" :key="k" v-click>
      <line v-for="(e, i) in w.archi" :key="i" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" class="arco acceso" />
      <g v-for="(n, i) in w.nodi" :key="i" :transform="`translate(${n.x},${n.y})`" class="nodo rosso">
        <path d="M-13,-10 V10 A13,5 0 0 0 13,10 V-10 Z" />
        <ellipse cx="0" cy="-10" rx="13" ry="5" />
        <path d="M-13,0 A13,5 0 0 0 13,0" class="giro" />
      </g>
      <text x="740" :y="64 + k * 62" class="passo">{{ legenda[k].titolo }}</text>
      <text x="740" :y="83 + k * 62" class="nota">{{ legenda[k].testo }}</text>
      <text v-if="k === 0" x="420" y="266" text-anchor="middle" class="didascalia">ogni nodo controlla il blocco e lo passa ai vicini</text>
    </g>
  </svg>
</template>

<style scoped>
.arco { stroke: var(--grigio); stroke-width: 1.5; }
.arco.acceso { stroke: var(--rubrica); stroke-width: 3; }
.nodo path, .nodo ellipse { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.nodo .giro { fill: none; }
.nodo.rosso path, .nodo.rosso ellipse { fill: color-mix(in srgb, var(--rubrica) 22%, var(--carta)); stroke: var(--rubrica); stroke-width: 2; }
.nodo.rosso .giro { fill: none; }
.lampadina path { fill: color-mix(in srgb, var(--glossa) 30%, var(--carta)); stroke: var(--glossa); stroke-width: 2; }
.lampadina line { stroke: var(--glossa); stroke-width: 2; stroke-linecap: round; }
.etichetta { font-size: 15px; }
.passo { font-size: 15px; font-weight: 700; fill: var(--rubrica); }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
