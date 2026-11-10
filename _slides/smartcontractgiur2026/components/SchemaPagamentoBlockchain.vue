<!--
  Diagram (2025 deck, p. 23): "Alice paga Bob 5 bitcoin". Left: the client, Alice with her wallet
  (a dApp) on the phone. Middle: the blockchain node the wallet talks to. Right: the other nodes of the
  network. Every node keeps its own copy of the register (a small chain of blocks).
  Numbered steps: 1 pay(Bob, 5), the transaction signed by Alice, from the wallet to a node;
  2 broadcastTX(Alice, Bob, 5): the node relays it to the other nodes; 3 newBlock(Alice, Bob, 5): the
  network agrees on a new block containing it, and the block is added to every copy (drawn in red);
  4 "ok" back to the wallet. Last, every node is outlined: no single company holds the register.
  Same positions as SchemaPagamentoServer (client box, arrows 1 and 4, arrows 2 and 3), so the two can
  be compared on consecutive slides.
  Source: S. Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System" (2008), §5 Network: "New
  transactions are broadcast to all nodes. Each node collects new transactions into a block. [...] When
  a node finds a proof-of-work, it broadcasts the block to all nodes. Nodes accept the block only if all
  transactions in it are valid and not already spent."
  6 clicks: client and nodes; step 1; step 2; step 3 with the new block in every copy; step 4; the
  outlines with the caption.
  <SchemaPagamentoBlockchain />
-->
<script setup lang="ts">
const TEL = { x: 106, y: 46, w: 72, h: 128 } // Alice's phone
// The node the wallet talks to: a chain with three blocks and room for a fourth one.
const NODO = { x: 330, y: 10, w: 150, h: 200 }
const BLOCCHI = [0, 1, 2, 3].map(i => 346 + i * 32)
// The other nodes of the network, each with its own copy of the chain.
const RETE = [
  { x: 624, y: 38 }, { x: 752, y: 38 },
  { x: 624, y: 134 }, { x: 752, y: 134 },
]
const NW = 104
const NH = 72
const centro = (n: { x: number, y: number }) => [n.x + NW / 2, n.y + NH / 2]
const LINKS = [[0, 1], [2, 3], [0, 2], [1, 3], [0, 3], [1, 2]].map(([a, b]) => {
  const [x1, y1] = centro(RETE[a])
  const [x2, y2] = centro(RETE[b])
  return `M${x1},${y1} L${x2},${y2}`
}).join(' ')
const MINI = [0, 1, 2, 3].map(i => 10 + i * 23)
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: Alice paga Bob 5 bitcoin; il wallet invia la transazione a un nodo, che la diffonde agli altri; la rete concorda un nuovo blocco, aggiunto a ogni copia del registro">
    <!-- client, node and the other nodes -->
    <g v-click>
      <rect x="20" y="10" width="190" height="200" rx="8" class="cornice" />
      <SvPersona :x="60" :y="78" nome="Alice" :scala="0.9" />
      <rect :x="TEL.x" :y="TEL.y" :width="TEL.w" :height="TEL.h" rx="9" class="telefono" />
      <rect :x="TEL.x + 5" :y="TEL.y + 12" :width="TEL.w - 10" :height="TEL.h - 28" rx="2" class="schermo" />
      <path :d="`M${TEL.x + TEL.w / 2 - 8},${TEL.y + 6} h16`" class="tratto" />
      <circle :cx="TEL.x + TEL.w / 2" :cy="TEL.y + TEL.h - 8" r="4" class="tratto" />
      <circle :cx="TEL.x + TEL.w / 2" :cy="TEL.y + 62" r="26" class="dapp" />
      <text :x="TEL.x + TEL.w / 2" :y="TEL.y + 67" text-anchor="middle" class="app-testo">dApp</text>
      <text x="115" y="198" text-anchor="middle" class="nota">wallet</text>
      <text x="115" y="234" text-anchor="middle" class="nome">Client</text>

      <rect :x="NODO.x" :y="NODO.y" :width="NODO.w" :height="NODO.h" rx="8" class="cornice" />
      <g v-for="(bx, i) in BLOCCHI.slice(0, 3)" :key="bx">
        <rect :x="bx" y="95" width="22" height="22" rx="2" class="blocco" />
        <path v-if="i > 0" :d="`M${bx - 10},106 h10`" class="tratto" />
      </g>
      <text x="405" y="142" text-anchor="middle" class="nota">copia del registro</text>
      <text x="405" y="234" text-anchor="middle" class="nome">Nodo blockchain</text>

      <path :d="LINKS" class="collegamento" />
      <g v-for="(n, k) in RETE" :key="k">
        <rect :x="n.x" :y="n.y" :width="NW" :height="NH" rx="6" class="nodo" />
        <g v-for="(m, i) in MINI.slice(0, 3)" :key="m">
          <rect :x="n.x + m" :y="n.y + 28" width="16" height="16" rx="2" class="blocco" />
          <path v-if="i > 0" :d="`M${n.x + m - 7},${n.y + 36} h7`" class="tratto" />
        </g>
      </g>
      <text x="740" y="234" text-anchor="middle" class="nome">altri nodi della rete</text>
    </g>

    <!-- 1: pay, signed by Alice -->
    <g v-click>
      <SvFreccia :x1="212" :y1="80" :x2="328" :y2="80" variante="rubrica" />
      <text x="270" y="71" text-anchor="middle" class="mono codice">pay(Bob, 5)</text>
      <circle cx="230" cy="97" r="11" class="passo" />
      <text x="230" y="102" text-anchor="middle" class="passo-n">1</text>
      <text x="247" y="102" class="nota">firmata</text>
    </g>
    <!-- 2: the node relays the transaction to the others -->
    <g v-click>
      <SvFreccia :x1="482" :y1="96" :x2="622" :y2="96" variante="rubrica" />
      <text x="552" y="68" text-anchor="middle" class="mono codice">broadcastTX</text>
      <text x="552" y="86" text-anchor="middle" class="mono codice">(Alice, Bob, 5)</text>
      <circle cx="498" cy="113" r="11" class="passo" />
      <text x="498" y="118" text-anchor="middle" class="passo-n">2</text>
    </g>
    <!-- 3: the network agrees on a new block; every copy gets it -->
    <g v-click>
      <SvFreccia :x1="622" :y1="156" :x2="482" :y2="156" variante="rubrica" />
      <text x="552" y="128" text-anchor="middle" class="mono codice">newBlock</text>
      <text x="552" y="146" text-anchor="middle" class="mono codice">(Alice, Bob, 5)</text>
      <circle cx="606" cy="173" r="11" class="passo" />
      <text x="606" y="178" text-anchor="middle" class="passo-n">3</text>
      <path :d="`M${BLOCCHI[3] - 10},106 h10`" class="tratto" />
      <rect :x="BLOCCHI[3]" y="95" width="22" height="22" rx="2" class="nuovo" />
      <g v-for="(n, k) in RETE" :key="k">
        <path :d="`M${n.x + MINI[3] - 7},${n.y + 36} h7`" class="tratto" />
        <rect :x="n.x + MINI[3]" :y="n.y + 28" width="16" height="16" rx="2" class="nuovo" />
      </g>
    </g>
    <!-- 4: ok -->
    <g v-click>
      <SvFreccia :x1="328" :y1="160" :x2="212" :y2="160" variante="rubrica" />
      <text x="270" y="151" text-anchor="middle" class="mono codice">ok</text>
      <circle cx="298" cy="177" r="11" class="passo" />
      <text x="298" y="182" text-anchor="middle" class="passo-n">4</text>
    </g>
    <!-- many independent nodes, many copies -->
    <g v-click>
      <rect :x="NODO.x - 6" :y="NODO.y - 6" :width="NODO.w + 12" :height="NODO.h + 12" rx="11" class="evidenza" />
      <rect v-for="(n, k) in RETE" :key="k" :x="n.x - 5" :y="n.y - 5" :width="NW + 10" :height="NH + 10" rx="9" class="evidenza" />
      <text x="440" y="270" text-anchor="middle" class="didascalia">nessuna società custodisce da sola il registro: ogni nodo ne ha una copia</text>
    </g>
  </svg>
</template>

<style scoped>
.cornice { fill: none; stroke: var(--inchiostro); stroke-width: 2.5; }
.nodo { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.collegamento { fill: none; stroke: var(--grigio); stroke-width: 1.5; }
.telefono { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.schermo { fill: var(--campo); }
.blocco { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.nuovo { fill: color-mix(in srgb, var(--rubrica) 30%, var(--carta)); stroke: var(--rubrica); stroke-width: 2; }
.tratto { fill: none; stroke: var(--inchiostro); stroke-width: 1.8; }
.dapp { fill: color-mix(in srgb, var(--glossa) 28%, var(--carta)); stroke: var(--glossa); stroke-width: 2; }
.app-testo { font-size: 14px; font-weight: 700; }
.nome { font-size: 16px; font-weight: 700; }
.codice { font-size: 14px; }
.passo { fill: var(--rubrica); }
.passo-n { font-size: 14px; font-weight: 700; fill: var(--carta); }
.evidenza { fill: none; stroke: var(--rubrica); stroke-width: 3; }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
