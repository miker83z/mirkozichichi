<!--
  Diagram (new): the double-spending problem. Alice owns one coin (the 5 btc she received with TX3, as in
  SchemaEsempioTx) and signs two transactions that spend it: TX4 to Bob and TX4′ to Carol, sent at the same
  time to different parts of the network. Both signatures are valid, so the signature alone cannot settle
  the conflict. The network puts transactions in order inside blocks: the block that includes TX4 first
  makes it valid, and TX4′ is rejected because the coin is already spent.
  Sources: Bitcoin whitepaper §2 "Transactions" ("the payee can't verify that one of the owners did not
  double-spend the coin"; "the earliest transaction is the one that counts"; the participants must "agree on
  a single history of the order in which they were received") and §5 "Network" ("Nodes accept the block
  only if all transactions in it are valid and not already spent").
  Left out on purpose: a temporary fork (two blocks found at the same time, one with TX4 and one with TX4′),
  which the network resolves by following the longest chain (whitepaper §5); this is why a payee waits for
  a few more blocks before trusting a payment (§11).
  5 clicks: the coin; the two transactions reaching the network; the conflict; the block that includes TX4;
  TX4′ rejected.
  <SchemaDoppiaSpesa />
-->
<script setup lang="ts">
const nodi = [[492, 52], [604, 42], [484, 136], [612, 132], [496, 220], [606, 226]]
const ARCHI = [[0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [2, 4], [3, 5], [4, 5], [2, 5]]
const archi = ARCHI.map(([a, b]) => {
  const [px, py] = nodi[a], [qx, qy] = nodi[b]
  const l = Math.hypot(qx - px, qy - py), ux = (qx - px) / l, uy = (qy - py) / l
  return { x1: px + ux * 17, y1: py + uy * 17, x2: qx - ux * 17, y2: qy - uy * 17 }
})
const carte = [
  { y: 22, titolo: 'TX4: Alice → Bob' },
  { y: 172, titolo: 'TX4′: Alice → Carol' },
]
</script>

<template>
  <svg viewBox="0 0 880 286" class="schema" role="img" aria-label="Schema: Alice firma due transazioni che spendono la stessa moneta, una a Bob e una a Carol; il primo blocco include quella a Bob e la rete rifiuta quella a Carol">
    <!-- 1. Alice and her one coin -->
    <g v-click>
      <SvPersona :x="62" :y="40" nome="Alice" />
      <circle cx="62" cy="180" r="27" class="moneta" />
      <text x="62" y="185" text-anchor="middle" class="valore">5 btc</text>
      <text x="62" y="228" text-anchor="middle" class="nota">una sola moneta</text>
      <text x="62" y="245" text-anchor="middle" class="nota">(ricevuta con TX3)</text>
    </g>
    <!-- 2. Two transactions spend it, sent to different nodes -->
    <g v-click>
      <g v-for="c in carte" :key="c.y">
        <rect x="190" :y="c.y" width="222" height="76" rx="6" class="carta-tx" />
        <text x="301" :y="c.y + 23" text-anchor="middle" class="titoletto">{{ c.titolo }}</text>
        <text x="301" :y="c.y + 45" text-anchor="middle" class="riga">spende la moneta di TX3</text>
        <text x="301" :y="c.y + 66" text-anchor="middle" class="riga">firmata da Alice <tspan class="ok">✓</tspan></text>
      </g>
      <SvFreccia :x1="84" :y1="164" :x2="187" :y2="62" />
      <SvFreccia :x1="90" :y1="186" :x2="187" :y2="210" />
      <text x="548" y="14" text-anchor="middle" class="nota">inviate insieme a nodi diversi della rete</text>
      <line v-for="(e, i) in archi" :key="i" :x1="e.x1" :y1="e.y1" :x2="e.x2" :y2="e.y2" class="arco" />
      <g v-for="(n, i) in nodi" :key="i" :transform="`translate(${n[0]},${n[1]})`" class="nodo">
        <path d="M-13,-10 V10 A13,5 0 0 0 13,10 V-10 Z" />
        <ellipse cx="0" cy="-10" rx="13" ry="5" />
        <path d="M-13,0 A13,5 0 0 0 13,0" class="giro" />
      </g>
      <SvFreccia :x1="414" :y1="56" :x2="474" :y2="53" />
      <SvFreccia :x1="414" :y1="214" :x2="478" :y2="219" />
    </g>
    <!-- 3. The conflict -->
    <g v-click>
      <SvFreccia :x1="84" :y1="164" :x2="187" :y2="62" variante="ko" />
      <SvFreccia :x1="90" :y1="186" :x2="187" :y2="210" variante="ko" />
      <text x="200" y="128" class="conflitto">✗ conflitto: la stessa</text>
      <text x="200" y="148" class="conflitto">moneta spesa due volte</text>
    </g>
    <!-- 4. A block puts TX4 first -->
    <g v-click>
      <SvFreccia :x1="622" :y1="42" :x2="822" :y2="78" angolo="hv" etichetta="nuovo blocco" variante="rubrica" />
      <rect x="664" y="92" width="72" height="76" rx="4" class="blocco" />
      <text x="700" y="124" text-anchor="middle" class="riga">B<tspan class="pedice">n-1</tspan></text>
      <text x="700" y="148" text-anchor="middle" class="riga">…</text>
      <rect x="772" y="80" width="100" height="100" rx="4" class="blocco nuovo" />
      <text x="822" y="104" text-anchor="middle" class="riga">B<tspan class="pedice">n</tspan></text>
      <text x="822" y="130" text-anchor="middle" class="titoletto">TX4</text>
      <text x="822" y="150" text-anchor="middle" class="piccolo">Alice → Bob</text>
      <text x="822" y="171" text-anchor="middle" class="esito ok">✓</text>
      <SvFreccia :x1="770" :y1="130" :x2="738" :y2="130" variante="rubrica" />
      <text x="768" y="206" text-anchor="middle" class="esito ok">✓ vale TX4</text>
      <text x="768" y="224" text-anchor="middle" class="nota">la prima nella catena</text>
    </g>
    <!-- 5. TX4′ rejected -->
    <g v-click>
      <rect x="187" y="169" width="228" height="82" rx="8" class="rifiuto" />
      <line x1="196" y1="244" x2="406" y2="176" class="barrata" />
      <text x="301" y="276" text-anchor="middle" class="conflitto">✗ TX4′ rifiutata: la moneta è già spesa</text>
    </g>
  </svg>
</template>

<style scoped>
.moneta { fill: color-mix(in srgb, var(--glossa) 28%, var(--carta)); stroke: var(--glossa); stroke-width: 2.5; }
.valore { font-size: 15px; font-weight: 700; }
.carta-tx { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.riga { font-size: 15px; }
.piccolo { font-size: 14px; }
.ok { fill: var(--ok); font-weight: 700; }
.arco { stroke: var(--grigio); stroke-width: 1.5; }
.nodo path, .nodo ellipse { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.nodo .giro { fill: none; }
.conflitto { font-size: 15px; font-weight: 700; fill: var(--ko); }
.blocco { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.blocco.nuovo { fill: color-mix(in srgb, var(--rubrica) 12%, var(--carta)); stroke: var(--rubrica); stroke-width: 2; }
.esito { font-size: 16px; }
.rifiuto { fill: none; stroke: var(--ko); stroke-width: 3; }
.barrata { stroke: var(--ko); stroke-width: 3; }
</style>
