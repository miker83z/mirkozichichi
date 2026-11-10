<!--
  Diagram (2025 deck, pp. 48–49): a vote in a smart contract. Alice's dApp sends to a node the call
  execute(SmartContractAddress: VotingContract, methodToExecute: vote, parameters: challengeID, true);
  the node passes it on, every node of the network runs vote(challengeID, true), and the state of the
  contract (the same on every node) changes: one more vote in favour. The counts 12 → 13 and 7 are
  illustrative; the call is the one of the 2025 slide (p. 48), and vote() adds msg.sender (Alice) to the
  "in favour" or "against" list (p. 49).
  Sources: the 2025 deck, pp. 47–49; ethereum.org/developers/docs/smart-contracts (a contract is code and
  data at an address; calling a function by a transaction changes its state).
  4 clicks: Alice and the call; the node that receives it; the network executing the contract; the new state.
  <SchemaVoto />
-->
<script setup lang="ts">
const RIGHE = [
  { y: 20, xs: [400, 510, 620, 730, 840] },
  { y: 72, xs: [345, 455, 565, 675, 785] },
  { y: 124, xs: [400, 510, 620, 730, 840] },
]
const NODI = RIGHE.flatMap(r => r.xs.map(x => [x, r.y] as [number, number]))
const ARCHI: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [5, 6], [6, 7], [7, 8], [8, 9], [10, 11], [11, 12], [12, 13], [13, 14],
  [0, 5], [0, 6], [1, 6], [1, 7], [2, 7], [2, 8], [3, 8], [3, 9], [4, 9],
  [10, 5], [10, 6], [11, 6], [11, 7], [12, 7], [12, 8], [13, 8], [13, 9], [14, 9],
]
const INGRESSO = 10
const vicini = ARCHI.filter(([a, b]) => a === INGRESSO || b === INGRESSO)
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: la dApp di Alice chiede a un nodo di eseguire il metodo vote del contratto VotingContract; tutta la rete lo esegue e il conteggio dei voti favorevoli sale">
    <!-- 1. Alice e la chiamata -->
    <g v-click>
      <SvPersona :x="44" :y="170" nome="Alice" :scala="0.9" />
      <rect x="78" y="166" width="46" height="70" rx="7" class="telefono" />
      <circle cx="101" cy="201" r="20" class="dapp" />
      <text x="101" y="206" text-anchor="middle" class="badge">dApp</text>
      <text x="150" y="190" class="mono t14">execute(</text>
      <text x="166" y="210" class="mono t14">SmartContractAddress: <tspan class="b">VotingContract</tspan>,</text>
      <text x="166" y="230" class="mono t14">methodToExecute: <tspan class="b">vote</tspan>,</text>
      <text x="166" y="250" class="mono t14">parameters: <tspan class="b">challengeID</tspan>, <tspan class="b">true</tspan>)</text>
      <text x="150" y="274" class="nota">«esegui il metodo vote del contratto: voto favorevole (true)»</text>
    </g>
    <!-- 2. il nodo -->
    <g v-click>
      <line v-for="([a, b], i) in ARCHI" :key="`a${i}`" :x1="NODI[a][0]" :y1="NODI[a][1]" :x2="NODI[b][0]" :y2="NODI[b][1]" class="arco" />
      <g v-for="([x, y], i) in NODI" :key="`n${i}`" :transform="`translate(${x},${y})`" :class="['nodo', { acceso: i === INGRESSO }]">
        <path d="M-9,-7 V7 A9,3.5 0 0 0 9,7 V-7" />
        <ellipse cx="0" cy="-7" rx="9" ry="3.5" />
      </g>
      <text x="330" y="24" text-anchor="end" class="t14">rete blockchain</text>
      <SvFreccia :x1="128" :y1="172" :x2="386" :y2="130" variante="rubrica" />
      <text x="416" y="150" class="t14 b">nodo</text>
    </g>
    <!-- 3. tutta la rete esegue il contratto -->
    <g v-click>
      <line v-for="([a, b], i) in vicini" :key="`v${i}`" :x1="NODI[a][0]" :y1="NODI[a][1]" :x2="NODI[b][0]" :y2="NODI[b][1]" class="arco-rosso" />
      <g v-for="([x, y], i) in NODI" :key="`e${i}`" :transform="`translate(${x},${y})`" class="nodo acceso">
        <path d="M-9,-7 V7 A9,3.5 0 0 0 9,7 V-7" />
        <ellipse cx="0" cy="-7" rx="9" ry="3.5" />
      </g>
      <text x="836" y="154" text-anchor="end" class="t14 rosso">ogni nodo esegue vote(challengeID, true)</text>
    </g>
    <!-- 4. lo stato aggiornato -->
    <g v-click>
      <rect x="606" y="172" width="260" height="102" rx="6" class="stato" />
      <text x="736" y="194" text-anchor="middle" class="t14 b">stato di VotingContract</text>
      <line x1="618" y1="203" x2="854" y2="203" class="riga" />
      <text x="622" y="228" class="t15">favorevoli</text>
      <text x="850" y="228" text-anchor="end" class="t15"><tspan class="spento">12 →</tspan> <tspan class="b verde">13</tspan></text>
      <text x="622" y="256" class="t15">contrari</text>
      <text x="850" y="256" text-anchor="end" class="t15">7</text>
      <SvFreccia :x1="852" :y1="132" :x2="852" :y2="170" variante="ok" />
    </g>
  </svg>
</template>

<style scoped>
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.b { font-weight: 700; }
.telefono { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 2; }
.dapp { fill: var(--glossa); }
.badge { font-size: 13px; font-weight: 700; fill: var(--carta); letter-spacing: -0.2px; }
.arco { stroke: var(--grigio); stroke-width: 1.2; }
.arco-rosso { stroke: var(--rubrica); stroke-width: 2.2; }
.nodo path, .nodo ellipse { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.3; }
.nodo.acceso path, .nodo.acceso ellipse { fill: color-mix(in srgb, var(--rubrica) 30%, var(--carta)); stroke: var(--rubrica); }
.rosso { fill: var(--rubrica); font-weight: 700; }
.stato { fill: var(--campo); stroke: var(--ok); stroke-width: 1.5; }
.riga { stroke: var(--linea); stroke-width: 1.2; }
.spento { fill: var(--grigio); }
.verde { fill: var(--ok); }
</style>
