<!--
  Diagram (2025 deck, p. 40): who is who in a smart contract platform. The user is, for the network, a
  portafoglio (wallet): an app on the phone, a dApp. The user's transactions reach a node (peer) running the
  node software (APP); the nodes that take part in consensus are the validatori, and together they form the
  network of validators. Legend: dApp = interface for the users, APP = interface (software) of the nodes.
  Note: in IOTA a wallet usually talks to a full node, which forwards the transaction to the validators
  (docs.iota.org/about-iota/iota-architecture/transaction-lifecycle); the 2025 slide's "peer node =
  validator" simplifies this, and so does the diagram.
  Sources: the 2025 deck, pp. 25 and 40; docs.iota.org/about-iota/iota-architecture/validator-committee.
  4 clicks: the user = portafoglio; the node = validatore; the network of validators; the two interfaces.
  <SchemaRuoliPiattaforma />
-->
<script setup lang="ts">
const RIGHE = [
  { y: 24, xs: [545, 645, 745, 845] },
  { y: 80, xs: [495, 595, 695, 795] },
  { y: 136, xs: [545, 645, 745, 845] },
]
const NODI = RIGHE.flatMap(r => r.xs.map(x => [x, r.y] as [number, number]))
const ARCHI: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [8, 9], [9, 10], [10, 11],
  [0, 4], [0, 5], [1, 5], [1, 6], [2, 6], [2, 7], [3, 7],
  [8, 4], [8, 5], [9, 5], [9, 6], [10, 6], [10, 7], [11, 7],
]
const MIO = 4 // the network node that stands for the node box
</script>

<template>
  <svg viewBox="0 0 880 268" class="schema" role="img" aria-label="Schema: l'utente è un wallet con una dApp; il nodo è un validatore; i validatori formano la rete">
    <!-- 1. utente = portafoglio -->
    <g v-click>
      <SvPersona :x="50" :y="40" nome="Utente" :scala="0.9" />
      <rect x="86" y="36" width="46" height="70" rx="7" class="telefono" />
      <circle cx="109" cy="71" r="20" class="dapp" />
      <text x="109" y="76" text-anchor="middle" class="badge">dApp</text>
      <text x="90" y="142" text-anchor="middle" class="t16 b">= wallet</text>
    </g>
    <!-- 2. nodo = validatore -->
    <g v-click>
      <SvFreccia :x1="138" :y1="71" :x2="298" :y2="71" etichetta="transazioni" variante="rubrica" />
      <rect x="300" y="18" width="110" height="146" rx="4" class="scatola" />
      <rect v-for="i in 3" :key="i" x="325" :y="18 + i * 13" width="60" height="10" rx="2" class="server" />
      <path d="M331,84 V106 A24,6 0 0 0 379,106 V84" class="disco" />
      <ellipse cx="355" cy="84" rx="24" ry="6" class="disco" />
      <circle cx="355" cy="138" r="19" class="app" />
      <text x="355" y="143" text-anchor="middle" class="badge">APP</text>
      <text x="355" y="186" text-anchor="middle" class="t15">nodo (peer)</text>
      <text x="355" y="206" text-anchor="middle" class="t16 b">= validatore</text>
    </g>
    <!-- 3. la rete di validatori -->
    <g v-click>
      <line v-for="([a, b], i) in ARCHI" :key="`a${i}`" :x1="NODI[a][0]" :y1="NODI[a][1]" :x2="NODI[b][0]" :y2="NODI[b][1]" class="arco" />
      <g v-for="([x, y], i) in NODI" :key="`n${i}`" :transform="`translate(${x},${y})`" :class="['nodo', { mio: i === MIO }]">
        <path d="M-9,-7 V7 A9,3.5 0 0 0 9,7 V-7" />
        <ellipse cx="0" cy="-7" rx="9" ry="3.5" />
      </g>
      <line x1="412" y1="86" x2="484" y2="81" class="legame" />
      <text x="695" y="176" text-anchor="middle" class="t16 b">rete di validatori</text>
    </g>
    <!-- 4. le due interfacce -->
    <g v-click>
      <circle cx="109" cy="71" r="25" class="anello" />
      <circle cx="355" cy="138" r="24" class="anello" />
      <line x1="10" y1="222" x2="870" y2="222" class="divisorio" />
      <circle cx="34" cy="248" r="20" class="dapp" />
      <text x="34" y="253" text-anchor="middle" class="badge">dApp</text>
      <text x="64" y="253" class="t15"><tspan class="b">dApp</tspan> = interfaccia per gli utenti</text>
      <circle cx="470" cy="248" r="20" class="app" />
      <text x="470" y="253" text-anchor="middle" class="badge">APP</text>
      <text x="500" y="253" class="t15"><tspan class="b">APP</tspan> = interfaccia dei nodi</text>
    </g>
  </svg>
</template>

<style scoped>
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.telefono { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 2; }
.dapp { fill: var(--glossa); }
.app { fill: var(--rubrica); }
.badge { font-size: 13px; font-weight: 700; fill: var(--carta); letter-spacing: -0.2px; }
.scatola { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.server { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.3; }
.disco { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.arco { stroke: var(--grigio); stroke-width: 1.2; }
.nodo path, .nodo ellipse { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.3; }
.nodo.mio path, .nodo.mio ellipse { fill: color-mix(in srgb, var(--rubrica) 30%, var(--carta)); stroke: var(--rubrica); }
.legame { stroke: var(--rubrica); stroke-width: 1.5; stroke-dasharray: 5 4; }
.anello { fill: none; stroke: var(--rubrica); stroke-width: 2; stroke-dasharray: 4 3; }
.divisorio { stroke: var(--linea); stroke-width: 1.2; }
</style>
