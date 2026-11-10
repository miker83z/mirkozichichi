<!--
  Diagram (2025 deck, p. 45): where the requests of an app are processed.
  Left, traditional apps: four phones reach, through their Internet providers (ISP), one data center,
  which does the work. Right, dApps: the phones talk to the network of blockchain nodes, and every node
  runs the request and keeps the result. Correction: the 2025 drawing labelled the blockchain nodes
  "ISP"; here they are nodes (the providers are still there on the way, but they process nothing).
  Sources: ethereum.org, "Ethereum Virtual Machine (EVM)": the EVM "executes code consistently and
  securely across all Ethereum nodes"; ethereum.org, "Introduction to dapps": a dapp's backend runs on
  a decentralized network, in contrast with "an app where the backend code is running on centralized servers".
  3 clicks: the left panel; the right panel; the two captions, with the processing nodes in red.
  <SchemaComputazione />
-->
<script setup lang="ts">
const PW = 430
const TEL_Y = [48, 126] // phone tops; centres at +29
const TEL_X = [16, 380]
// Right panel: a 3 × 3 grid of blockchain nodes.
const GX = [140, 215, 290]
const GY = [77, 116, 155]
const NODI = GY.flatMap(y => GX.map(x => ({ x: 450 + x, y })))
const GRIGLIA = [
  ...GY.flatMap(y => [`M${450 + GX[0]},${y} H${450 + GX[2]}`]),
  ...GX.map(x => `M${450 + x},${GY[0]} V${GY[2]}`),
].join(' ')
const RX = 17
const HH = 9
const cilindro = (n: { x: number, y: number }) => `M${n.x - RX},${n.y - HH} V${n.y + HH} A${RX},5 0 0 0 ${n.x + RX},${n.y + HH} V${n.y - HH}`
const NUVOLA = 'M160,146 A18,18 0 0 1 162,110 A28,28 0 0 1 210,90 A26,26 0 0 1 256,104 A21,21 0 0 1 266,146 Z'
</script>

<template>
  <svg viewBox="0 0 880 244" class="schema" role="img" aria-label="Schema: le app tradizionali passano dai provider a un unico data center; le dApp sono elaborate da tutti i nodi della rete blockchain">
    <!-- app tradizionali -->
    <g v-click>
      <rect x="0" y="0" :width="PW" height="200" rx="8" class="pannello" />
      <text x="16" y="27" class="titolo">App tradizionali</text>
      <path d="M50,77 H75 M50,155 H75 M125,80 L166,108 M125,152 L163,140 M380,77 H355 M380,155 H355 M305,80 L254,104 M305,152 L266,140" class="filo" />
      <g v-for="x in TEL_X" :key="x">
        <g v-for="y in TEL_Y" :key="y">
          <rect :x="x" :y="y" width="34" height="58" rx="5" class="telefono" />
          <rect :x="x + 3" :y="y + 8" width="28" height="40" class="schermo" />
          <circle :cx="x + 17" :cy="y + 28" r="9" class="app" />
        </g>
      </g>
      <g v-for="(p, i) in [[100, 77], [100, 155], [330, 77], [330, 155]]" :key="i">
        <ellipse :cx="p[0]" :cy="p[1]" rx="25" ry="15" class="isp" />
        <text :x="p[0]" :y="p[1] + 5" text-anchor="middle" class="t13">ISP</text>
      </g>
      <path :d="NUVOLA" class="nuvola" />
      <text x="213" y="133" text-anchor="middle" class="t14 b">data center</text>
    </g>

    <!-- dApp -->
    <g v-click>
      <rect x="450" y="0" :width="PW" height="200" rx="8" class="pannello" />
      <text x="466" y="27" class="titolo">dApp (app decentralizzate)</text>
      <path :d="GRIGLIA" class="arco" />
      <path :d="`M500,77 H${450 + GX[0] - RX} M500,155 H${450 + GX[0] - RX} M830,77 H${450 + GX[2] + RX} M830,155 H${450 + GX[2] + RX}`" class="filo" />
      <g v-for="x in TEL_X" :key="x">
        <g v-for="y in TEL_Y" :key="y">
          <rect :x="450 + x" :y="y" width="34" height="58" rx="5" class="telefono" />
          <rect :x="450 + x + 3" :y="y + 8" width="28" height="40" class="schermo" />
          <circle :cx="450 + x + 17" :cy="y + 28" r="9" class="dapp" />
        </g>
      </g>
      <g v-for="(n, i) in NODI" :key="i">
        <path :d="cilindro(n)" class="cilindro" />
        <ellipse :cx="n.x" :cy="n.y - HH" :rx="RX" ry="5" class="cilindro" />
      </g>
      <text x="665" y="190" text-anchor="middle" class="nota">nodi della blockchain</text>
    </g>

    <!-- who does the work -->
    <g v-click>
      <path :d="NUVOLA" class="nuvola-rossa" />
      <text x="213" y="133" text-anchor="middle" class="t14 b">data center</text>
      <g v-for="(n, i) in NODI" :key="i">
        <path :d="cilindro(n)" class="cilindro-rosso" />
        <ellipse :cx="n.x" :cy="n.y - HH" :rx="RX" ry="5" class="cilindro-rosso" />
      </g>
      <text :x="PW / 2" y="232" text-anchor="middle" class="didascalia">richieste elaborate da <tspan class="rosso">uno o pochi server</tspan></text>
      <text :x="450 + PW / 2" y="232" text-anchor="middle" class="didascalia">richieste elaborate da <tspan class="rosso">tutti i nodi</tspan></text>
    </g>
  </svg>
</template>

<style scoped>
.pannello { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.titolo { font-size: 16px; font-weight: 700; }
.filo { fill: none; stroke: var(--inchiostro); stroke-width: 2; }
.arco { fill: none; stroke: var(--grigio); stroke-width: 1.5; }
.telefono { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.6; }
.schermo { fill: var(--campo); }
.app { fill: color-mix(in srgb, var(--rubrica) 30%, var(--carta)); stroke: var(--rubrica); stroke-width: 1.6; }
.dapp { fill: color-mix(in srgb, var(--glossa) 32%, var(--carta)); stroke: var(--glossa); stroke-width: 1.6; }
.isp { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.6; }
.nuvola { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.nuvola-rossa { fill: color-mix(in srgb, var(--rubrica) 18%, var(--carta)); stroke: var(--rubrica); stroke-width: 3; }
.cilindro { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.cilindro-rosso { fill: color-mix(in srgb, var(--rubrica) 26%, var(--carta)); stroke: var(--rubrica); stroke-width: 2; }
.t13 { font-size: 13px; }
.t14 { font-size: 14px; }
.b { font-weight: 700; }
.didascalia { font-size: 16px; }
.rosso { font-weight: 700; fill: var(--rubrica); }
</style>
