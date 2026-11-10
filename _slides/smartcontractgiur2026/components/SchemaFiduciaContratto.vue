<!--
  Diagram (2025 deck, pp. 36–37): why one can trust a smart contract without a trusted third party. Every
  node of the blockchain network keeps and runs the same contract; Alice and the Produttore both reach it
  through a dApp. When the Produttore tries to change it on his own, the network rejects the change: the
  contract can be neither changed nor removed unilaterally. Caption: open source code + agreement of more
  than ⅔ of the validators → no technical deviation from the initial agreement.
  Correction: BFT consensus needs MORE THAN ⅔ of the validators (n ≥ 3f + 1, quorum 2f + 1), not "⅔ + 1"
  as on the 2025 slide.
  Sources: Castro & Liskov, "Practical Byzantine Fault Tolerance", OSDI 1999 (n ≥ 3f + 1);
  docs.iota.org/about-iota/iota-architecture/validator-committee ("a quorum is a set of validators whose
  combined voting power is greater than two-thirds (>2/3)"); the 2025 deck, pp. 36–37.
  5 clicks: the network with the contract on every node; Alice with her dApp; the Produttore with his dApp;
  his change, rejected (orange); the caption.
  <SchemaFiduciaContratto />
-->
<script setup lang="ts">
const RIGHE = [
  { y: 30, xs: [290, 400, 510, 620] },
  { y: 84, xs: [240, 345, 455, 565, 670] },
  { y: 138, xs: [290, 400, 510, 620] },
]
const NODI = RIGHE.flatMap(r => r.xs.map(x => [x, r.y] as [number, number]))
const ARCHI: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [4, 5], [5, 6], [6, 7], [7, 8], [9, 10], [10, 11], [11, 12],
  [0, 4], [0, 5], [1, 5], [1, 6], [2, 6], [2, 7], [3, 7], [3, 8],
  [9, 4], [9, 5], [10, 5], [10, 6], [11, 6], [11, 7], [12, 7], [12, 8],
]
</script>

<template>
  <svg viewBox="0 0 880 282" class="schema" role="img" aria-label="Schema: Alice e il produttore usano lo stesso smart contract sulla rete; il produttore non può cambiarlo da solo">
    <!-- 1. la rete: ogni nodo ha lo stesso contratto -->
    <g v-click>
      <line v-for="([a, b], i) in ARCHI" :key="`a${i}`" :x1="NODI[a][0]" :y1="NODI[a][1]" :x2="NODI[b][0]" :y2="NODI[b][1]" class="arco" />
      <g v-for="([x, y], i) in NODI" :key="`n${i}`" :transform="`translate(${x},${y})`">
        <path d="M-9,-7 V7 A9,3.5 0 0 0 9,7 V-7" class="nodo" />
        <ellipse cx="0" cy="-7" rx="9" ry="3.5" class="nodo" />
        <rect x="9" y="-24" width="14" height="17" rx="1.5" class="contratto" />
        <line x1="12" x2="20" y1="-18" y2="-18" class="riga" />
        <line x1="12" x2="18" y1="-13" y2="-13" class="riga" />
      </g>
      <text x="455" y="172" text-anchor="middle" class="t14">rete blockchain: ogni nodo ha lo stesso contratto</text>
    </g>
    <!-- 2. Alice con la sua dApp -->
    <g v-click>
      <SvPersona :x="50" :y="148" nome="Alice" :scala="0.9" />
      <rect x="88" y="144" width="46" height="66" rx="7" class="telefono" />
      <circle cx="111" cy="177" r="20" class="dapp" />
      <text x="111" y="182" text-anchor="middle" class="badge">dApp</text>
      <SvFreccia :x1="138" :y1="160" :x2="276" :y2="143" />
    </g>
    <!-- 3. il Produttore con la sua dApp -->
    <g v-click>
      <SvPersona :x="832" :y="148" nome="Produttore" :scala="0.9" />
      <rect x="730" y="144" width="46" height="66" rx="7" class="telefono" />
      <circle cx="753" cy="177" r="20" class="dapp" />
      <text x="753" y="182" text-anchor="middle" class="badge">dApp</text>
      <SvFreccia :x1="726" :y1="160" :x2="634" :y2="143" />
    </g>
    <!-- 4. tenta di cambiarlo da solo: la rete rifiuta -->
    <g v-click>
      <SvFreccia :x1="753" :y1="142" :x2="700" :y2="84" angolo="vh" variante="ko" tratteggiata />
      <text x="764" y="112" class="t14 arancio">tenta di</text>
      <text x="764" y="129" class="t14 arancio">cambiarlo</text>
      <text x="688" y="92" text-anchor="middle" class="croce">✗</text>
      <text x="876" y="22" text-anchor="end" class="t15 b arancio">modifica rifiutata</text>
      <text x="876" y="39" text-anchor="end" class="nota">da solo non può cambiarlo</text>
      <text x="876" y="54" text-anchor="end" class="nota">(salvo poteri scritti nel codice)</text>
    </g>
    <!-- 5. didascalia -->
    <g v-click>
      <text x="440" y="250" text-anchor="middle" class="t15">codice aperto (open source) + accordo di più di ⅔ del potere di voto</text>
      <text x="440" y="274" text-anchor="middle" class="didascalia">→ nessuna deviazione tecnica dall'accordo iniziale</text>
    </g>
  </svg>
</template>

<style scoped>
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.b { font-weight: 700; }
.arco { stroke: var(--grigio); stroke-width: 1.2; }
.nodo { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.3; }
.contratto { fill: var(--carta); stroke: var(--rubrica); stroke-width: 1.5; }
.riga { stroke: var(--rubrica); stroke-width: 1.3; }
.telefono { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 2; }
.dapp { fill: var(--glossa); }
.badge { font-size: 13px; font-weight: 700; fill: var(--carta); letter-spacing: -0.2px; }
.croce { font-size: 22px; font-weight: 700; fill: var(--ko); }
.arancio { fill: var(--ko); }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
