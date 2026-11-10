<!--
  Diagram (2025 deck, p. 25): how a transaction is born. Alice has a portafoglio (a dApp on her phone).
  1° the key pair is created in the portafoglio (public P_Alice, private S_Alice); 2° she creates the
  transaction TX and signs it with S_Alice; 3° the dApp sends it to a node of the blockchain (the APP is
  the software of the node: the interface of the nodes); 4° the node passes it on to the other nodes of
  the network.
  Sources: the 2025 deck; Bitcoin whitepaper §5 (new transactions are broadcast to all nodes);
  ethereum.org/developers/docs/transactions (a transaction is signed by the account and submitted to a node,
  which broadcasts it to the network).
  4 clicks: 1° keys in the portafoglio; 2° TX created and signed; 3° sent to the node; 4° spread in the network.
  <SchemaCreaTransazione />
-->
<script setup lang="ts">
// A small mesh of nodes for the network (three staggered rows); the node at index 9 sits right above the peer node box.
const RIGHE = [
  { y: 14, xs: [520, 615, 710, 805] },
  { y: 48, xs: [568, 663, 758, 853] },
  { y: 82, xs: [520, 615, 710, 805] },
]
const NODI = RIGHE.flatMap(r => r.xs.map(x => [x, r.y] as [number, number]))
const ARCHI: [number, number][] = []
for (let r = 0; r < 3; r++) for (let i = 0; i < 3; i++) ARCHI.push([r * 4 + i, r * 4 + i + 1])
for (let i = 0; i < 4; i++) {
  ARCHI.push([i, 4 + i], [8 + i, 4 + i])
  if (i < 3) ARCHI.push([i + 1, 4 + i], [8 + i + 1, 4 + i])
}
const INGRESSO = 9 // the node that receives the transaction
const vicini = ARCHI.filter(([a, b]) => a === INGRESSO || b === INGRESSO)
</script>

<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: Alice crea le chiavi nel wallet, crea e firma la transazione, la invia a un nodo che la diffonde nella rete">
    <!-- 1° chiavi nel portafoglio -->
    <g v-click>
      <SvPersona :x="50" :y="10" nome="Alice" :scala="0.85" />
      <rect x="86" y="8" width="46" height="68" rx="7" class="telefono" />
      <circle cx="109" cy="42" r="20" class="dapp" />
      <text x="109" y="47" text-anchor="middle" class="badge">dApp</text>
      <text x="140" y="38" class="t14 b">wallet</text>
      <text x="140" y="54" class="nota">(app sul telefono)</text>
      <SvFreccia :x1="70" :y1="90" :x2="70" :y2="148" variante="rubrica" />
      <circle cx="92" cy="114" r="10" class="passo" />
      <text x="92" y="119" text-anchor="middle" class="num">1</text>
      <text x="108" y="119" class="t14">crea le chiavi</text>
      <rect x="20" y="150" width="150" height="76" rx="6" class="campo" />
      <SvChiave :x="40" :y="174" tipo="pubblica" etichetta="P_Alice" />
      <text x="96" y="178" class="nota">pubblica</text>
      <SvChiave :x="40" :y="210" tipo="privata" etichetta="S_Alice" />
      <text x="96" y="214" class="nota">privata</text>
    </g>
    <!-- 2° crea e firma la transazione -->
    <g v-click>
      <SvFreccia :x1="172" :y1="188" :x2="298" :y2="188" variante="rubrica" />
      <circle cx="200" cy="211" r="10" class="passo" />
      <text x="200" y="216" text-anchor="middle" class="num">2</text>
      <text x="216" y="216" class="t14">crea e firma</text>
      <SvRiquadro :x="300" :y="165" :w="110" :h="46" testo="TX" variante="vuoto" />
      <text x="355" y="232" text-anchor="middle" class="nota">firmata con S<tspan class="pedice">Alice</tspan></text>
    </g>
    <!-- 3° invio al nodo -->
    <g v-click>
      <SvFreccia :x1="410" :y1="188" :x2="558" :y2="188" variante="rubrica" />
      <circle cx="436" cy="211" r="10" class="passo" />
      <text x="436" y="216" text-anchor="middle" class="num">3</text>
      <text x="452" y="216" class="t14">invia al nodo</text>
      <rect x="560" y="112" width="110" height="146" rx="4" class="scatola" />
      <rect v-for="i in 3" :key="i" x="585" :y="108 + i * 13" width="60" height="10" rx="2" class="server" />
      <path d="M591,170 V192 A24,6 0 0 0 639,192 V170" class="disco" />
      <ellipse cx="615" cy="170" rx="24" ry="6" class="disco" />
      <circle cx="615" cy="226" r="18" class="app" />
      <text x="615" y="231" text-anchor="middle" class="badge">APP</text>
      <text x="682" y="150" class="t15 b">nodo</text>
      <text x="682" y="167" class="nota">(peer) della rete</text>
      <text x="682" y="222" class="nota">APP: il programma</text>
      <text x="682" y="238" class="nota">che fa girare il nodo</text>
    </g>
    <!-- 4° diffusione nella rete -->
    <g v-click>
      <line v-for="([a, b], i) in ARCHI" :key="`a${i}`" :x1="NODI[a][0]" :y1="NODI[a][1]" :x2="NODI[b][0]" :y2="NODI[b][1]" class="arco" />
      <line v-for="([a, b], i) in vicini" :key="`v${i}`" :x1="NODI[a][0]" :y1="NODI[a][1]" :x2="NODI[b][0]" :y2="NODI[b][1]" class="arco-rosso" />
      <g v-for="([x, y], i) in NODI" :key="`n${i}`" :transform="`translate(${x},${y})`" :class="['nodo', { acceso: i === INGRESSO }]">
        <path d="M-9,-7 V7 A9,3.5 0 0 0 9,7 V-7" />
        <ellipse cx="0" cy="-7" rx="9" ry="3.5" />
      </g>
      <SvFreccia :x1="615" :y1="110" :x2="615" :y2="94" variante="rubrica" />
      <circle cx="420" cy="101" r="10" class="passo" />
      <text x="420" y="106" text-anchor="middle" class="num">4</text>
      <text x="436" y="106" class="t14">diffusione nella rete</text>
    </g>
  </svg>
</template>

<style scoped>
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.b { font-weight: 700; }
.passo { fill: var(--rubrica); }
.num { font-size: 13px; font-weight: 700; fill: var(--carta); }
.telefono { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 2; }
.dapp { fill: var(--glossa); }
.app { fill: var(--rubrica); }
.badge { font-size: 13px; font-weight: 700; fill: var(--carta); letter-spacing: -0.2px; }
.campo { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.scatola { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.server { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.3; }
.disco { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.arco { stroke: var(--grigio); stroke-width: 1.2; }
.arco-rosso { stroke: var(--rubrica); stroke-width: 2.2; }
.nodo path, .nodo ellipse { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.3; }
.nodo.acceso path, .nodo.acceso ellipse { fill: color-mix(in srgb, var(--rubrica) 30%, var(--carta)); stroke: var(--rubrica); }
</style>
