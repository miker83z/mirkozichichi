<!--
  Diagram (2025 deck, pp. 10–11): from client/server to peer-to-peer. Two machines, side by side.
  First a client on the right asks a server on the left (request, response); then the roles are
  reversed in a second pair underneath. Then each column is one machine: a peer node that holds a
  server, an app and its own database, i.e. client and server at the same time.
  4 clicks: the first client→server pair; the second pair, roles reversed; the two peer nodes
  (outer boxes, each with its database); the caption "I nodi peer sono client e server insieme".
  <SchemaVersoP2P />
-->
<script setup lang="ts">
const COLONNE = [150, 510] // left edge of each peer node
const IW = 188 // inner box width
const IH = 70
const TOP = 18
const BOT = 156
type Ruolo = 'server' | 'client'
// Top row: server on the left, client on the right; bottom row: the opposite.
const COPPIE: { y: number, ruoli: [Ruolo, Ruolo] }[] = [
  { y: TOP, ruoli: ['server', 'client'] },
  { y: BOT, ruoli: ['client', 'server'] },
]
const nomeRuolo = (r: Ruolo) => (r === 'server' ? 'Server' : 'Client')
const ix = (c: number) => COLONNE[c] + 16 // inner box left edge
</script>

<template>
  <svg viewBox="0 0 880 300" class="schema" role="img" aria-label="Schema: due coppie client e server con i ruoli invertiti diventano due nodi peer, ciascuno client e server insieme">
    <g v-for="(p, k) in COPPIE" :key="k" v-click>
      <g v-for="(r, c) in p.ruoli" :key="c">
        <rect :x="ix(c)" :y="p.y" :width="IW" :height="IH" rx="6" class="interno" />
        <g v-if="r === 'server'">
          <g v-for="u in 3" :key="u">
            <rect :x="ix(c) + 18" :y="p.y + 7 + (u - 1) * 19.5" width="64" height="16" rx="3" class="unita" />
            <path :d="`M${ix(c) + 26},${p.y + 12 + (u - 1) * 19.5} v6 M${ix(c) + 31},${p.y + 12 + (u - 1) * 19.5} v6 M${ix(c) + 36},${p.y + 12 + (u - 1) * 19.5} v6`" class="tratto" />
            <circle :cx="ix(c) + 72" :cy="p.y + 15 + (u - 1) * 19.5" r="3" class="tratto" />
          </g>
        </g>
        <g v-else>
          <circle :cx="ix(c) + 50" :cy="p.y + IH / 2" r="24" class="app" />
          <text :x="ix(c) + 50" :y="p.y + IH / 2 + 5" text-anchor="middle" class="app-testo">app</text>
        </g>
        <text :x="ix(c) + 136" :y="p.y + IH / 2 + 6" text-anchor="middle" class="ruolo">{{ nomeRuolo(r) }}</text>
      </g>
      <!-- the client on one side asks, the server on the other answers -->
      <template v-if="k === 0">
        <SvFreccia :x1="ix(1) - 2" :y1="p.y + 20" :x2="ix(0) + IW + 2" :y2="p.y + 20" etichetta="richiesta" />
        <SvFreccia :x1="ix(0) + IW + 2" :y1="p.y + 52" :x2="ix(1) - 2" :y2="p.y + 52" etichetta="risposta" lato="sotto" />
      </template>
      <template v-else>
        <SvFreccia :x1="ix(0) + IW + 2" :y1="p.y + 20" :x2="ix(1) - 2" :y2="p.y + 20" etichetta="richiesta" />
        <SvFreccia :x1="ix(1) - 2" :y1="p.y + 52" :x2="ix(0) + IW + 2" :y2="p.y + 52" etichetta="risposta" lato="sotto" />
      </template>
    </g>

    <!-- each column is one machine: a peer node with app, database and server -->
    <g v-click>
      <g v-for="(x, c) in COLONNE" :key="c">
        <rect :x="x" y="4" width="220" height="236" rx="9" class="peer" />
        <path :d="`M${x + 84},104 V140 A26,7 0 0 0 ${x + 136},140 V104`" class="unita" />
        <ellipse :cx="x + 110" cy="104" rx="26" ry="7" class="unita" />
        <text :x="x + 146" y="128" class="nota">database</text>
        <text :x="x + 110" y="266" text-anchor="middle" class="nome">nodo peer</text>
      </g>
    </g>
    <g v-click>
      <text x="440" y="294" text-anchor="middle" class="didascalia">I nodi peer sono client e server insieme</text>
    </g>
  </svg>
</template>

<style scoped>
.interno { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.8; }
.peer { fill: none; stroke: var(--rubrica); stroke-width: 3; }
.unita { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.tratto { fill: none; stroke: var(--inchiostro); stroke-width: 1.4; }
.app { fill: color-mix(in srgb, var(--rubrica) 22%, var(--carta)); stroke: var(--rubrica); stroke-width: 2; }
.app-testo { font-size: 14px; font-weight: 700; }
.ruolo { font-size: 16px; font-weight: 700; }
.nome { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
.didascalia { font-size: 17px; font-weight: 700; fill: var(--rubrica); }
</style>
