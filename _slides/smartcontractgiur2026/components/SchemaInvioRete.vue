<!--
  Diagram (2025 deck, p. 30, after the Chainlink "blockchain trust model" figure): how a transaction
  reaches the blockchain. The user (Alice) uses a client, her wallet, which creates and signs the
  transaction (TX); the wallet sends the signed TX to one node; that node passes it on to its
  neighbours, and so on, until all the block producers of the peer-to-peer network have it.
  Sources: S. Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System" (2008), §5: "New
  transactions are broadcast to all nodes"; ethereum.org, "Transactions": the transaction "is then
  broadcasted to the network" and a validator must "include it in a block".
  4 clicks: the user; the client (wallet) that signs the TX; sending to one node (the network appears);
  the spread to the whole network.
  <SchemaInvioRete />
-->
<script setup lang="ts">
type P = { x: number, y: number }
// Block producers: a hexagon of six nodes around a central one. Index 6 is the centre.
const NODI: P[] = [
  { x: 580, y: 150 }, { x: 640, y: 82 }, { x: 760, y: 82 },
  { x: 820, y: 150 }, { x: 760, y: 218 }, { x: 640, y: 218 },
  { x: 700, y: 150 },
]
const RX = 22
const HH = 15 // half height of a cylinder
const ARCHI: [number, number][] = []
for (let i = 0; i < 6; i++) ARCHI.push([i, (i + 1) % 6], [i, 6], [i, (i + 2) % 6])
const RETE = ARCHI.map(([a, b]) => `M${NODI[a].x},${NODI[a].y} L${NODI[b].x},${NODI[b].y}`).join(' ')
// The transaction spreads from the entry node (0) to its neighbours, then from the centre to the rest.
const DIFFUSIONE = [[0, 1], [0, 5], [0, 6], [6, 2], [6, 3], [6, 4]].map(([a, b]) => {
  const p = NODI[a]
  const q = NODI[b]
  const l = Math.hypot(q.x - p.x, q.y - p.y)
  const ux = (q.x - p.x) / l
  const uy = (q.y - p.y) / l
  return { x1: p.x + ux * 25, y1: p.y + uy * 22, x2: q.x - ux * 27, y2: q.y - uy * 24 }
})
const cilindro = (n: P) => `M${n.x - RX},${n.y - HH} V${n.y + HH} A${RX},6 0 0 0 ${n.x + RX},${n.y + HH} V${n.y - HH}`
const TEL = { x: 215, y: 88, w: 70, h: 124 }
</script>

<template>
  <svg viewBox="0 0 880 272" class="schema" role="img" aria-label="Schema: Alice usa il suo wallet, che firma la transazione e la invia a un nodo; il nodo la diffonde a tutta la rete dei produttori di blocchi">
    <g v-click>
      <text x="80" y="24" text-anchor="middle" class="testata">Utente</text>
      <SvPersona :x="80" :y="118" nome="Alice" />
    </g>

    <g v-click>
      <text x="250" y="24" text-anchor="middle" class="testata">Client (wallet)</text>
      <SvFreccia :x1="108" :y1="150" :x2="211" :y2="150" variante="grigio" />
      <rect :x="TEL.x" :y="TEL.y" :width="TEL.w" :height="TEL.h" rx="9" class="telefono" />
      <rect :x="TEL.x + 5" :y="TEL.y + 12" :width="TEL.w - 10" :height="TEL.h - 28" rx="2" class="schermo" />
      <path :d="`M${TEL.x + TEL.w / 2 - 8},${TEL.y + 6} h16`" class="tratto" />
      <circle :cx="TEL.x + TEL.w / 2" :cy="TEL.y + TEL.h - 8" r="4" class="tratto" />
      <circle :cx="TEL.x + TEL.w / 2" :cy="TEL.y + 60" r="26" class="dapp" />
      <text :x="TEL.x + TEL.w / 2" :y="TEL.y + 65" text-anchor="middle" class="app-testo">wallet</text>
      <text x="250" y="236" text-anchor="middle" class="nota">crea e firma</text>
      <text x="250" y="254" text-anchor="middle" class="nota">la transazione</text>
    </g>

    <!-- the network appears; the signed TX goes to one node -->
    <g v-click>
      <text x="700" y="24" text-anchor="middle" class="testata">Produttori di blocchi</text>
      <text x="700" y="44" text-anchor="middle" class="nota">i nodi della rete</text>
      <path :d="RETE" class="arco" />
      <g v-for="(n, i) in NODI" :key="i">
        <path :d="cilindro(n)" class="cilindro" />
        <ellipse :cx="n.x" :cy="n.y - HH" :rx="RX" ry="6" class="cilindro" />
      </g>
      <SvFreccia :x1="288" :y1="150" :x2="554" :y2="150" variante="rubrica" />
      <path d="M402,128 h26 l10,10 v34 h-36 Z" class="foglio" />
      <path d="M428,128 v10 h10" class="piega" />
      <text x="420" y="161" text-anchor="middle" class="mono tx">TX</text>
      <text x="420" y="192" text-anchor="middle" class="nota">firmata</text>
      <text x="420" y="116" text-anchor="middle" class="passo">invio a un nodo</text>
      <path :d="cilindro(NODI[0])" class="raggiunto" />
      <ellipse :cx="NODI[0].x" :cy="NODI[0].y - HH" :rx="RX" ry="6" class="raggiunto" />
    </g>

    <!-- the TX spreads from node to node -->
    <g v-click>
      <SvFreccia v-for="(d, i) in DIFFUSIONE" :key="i" v-bind="d" variante="rubrica" />
      <g v-for="(n, i) in NODI.slice(1)" :key="i">
        <path :d="cilindro(n)" class="raggiunto" />
        <ellipse :cx="n.x" :cy="n.y - HH" :rx="RX" ry="6" class="raggiunto" />
      </g>
      <text x="700" y="266" text-anchor="middle" class="didascalia">diffusione a tutta la rete (P2P)</text>
    </g>
  </svg>
</template>

<style scoped>
.testata { font-size: 16px; font-weight: 700; }
.telefono { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.schermo { fill: var(--campo); }
.tratto { fill: none; stroke: var(--inchiostro); stroke-width: 1.8; }
.dapp { fill: color-mix(in srgb, var(--glossa) 28%, var(--carta)); stroke: var(--glossa); stroke-width: 2; }
.app-testo { font-size: 13px; font-weight: 700; }
.arco { fill: none; stroke: var(--grigio); stroke-width: 1.2; }
.cilindro { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.6; }
.raggiunto { fill: color-mix(in srgb, var(--rubrica) 26%, var(--carta)); stroke: var(--rubrica); stroke-width: 2.2; }
.foglio { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.6; }
.piega { fill: none; stroke: var(--inchiostro); stroke-width: 1.6; }
.tx { font-size: 13px; font-weight: 700; }
.passo { font-size: 15px; font-weight: 700; fill: var(--rubrica); }
.didascalia { font-size: 15px; font-weight: 700; fill: var(--rubrica); }
</style>
