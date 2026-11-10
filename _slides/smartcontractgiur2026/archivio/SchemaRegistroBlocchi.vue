<!--
  Diagram (2025 deck, p. 18): a ledger "a blocchi". Instead of one long document with every transaction
  (TX1, TX2, … crossed out), the blockchain splits the ledger into blocks: Blocco i holds TX1–TX3,
  Blocco i+1 holds TX4–TX6.
  Source: Bitcoin whitepaper §3 "Timestamp Server" (a hash of a block of items is timestamped and published)
  and §5 "Network" (each node collects new transactions into a block).
  3 clicks: the long list; the cross; the two blocks.
  <SchemaRegistroBlocchi />
-->
<script setup lang="ts">
const blocchi = [
  { x: 360, pedice: 'i', nome: 'i', tx: ['TX1', 'TX2', 'TX3'] },
  { x: 620, pedice: 'i+1', nome: 'i + 1', tx: ['TX4', 'TX5', 'TX6'] },
]
</script>

<template>
  <svg viewBox="0 0 880 240" class="schema" role="img" aria-label="Schema: invece di un unico documento con tutte le transazioni, il registro è diviso in blocchi: blocco i con TX1-TX3, blocco i+1 con TX4-TX6">
    <!-- 1. One long document -->
    <g v-click>
      <text x="130" y="18" text-anchor="middle" class="nota">un unico documento</text>
      <rect x="50" y="28" width="160" height="206" rx="4" class="foglio" />
      <text v-for="k in 6" :key="k" x="130" :y="34 + k * 28" text-anchor="middle" class="tx">TX{{ k }}</text>
      <text x="130" y="224" text-anchor="middle" class="tx">⋮</text>
    </g>
    <!-- 2. Crossed out -->
    <g v-click>
      <path d="M78,62 L182,200 M182,62 L78,200" class="croce" />
    </g>
    <!-- 3. Split into blocks -->
    <g v-click>
      <SvFreccia :x1="236" :y1="131" :x2="340" :y2="131" etichetta="in blocchi" />
      <g v-for="b in blocchi" :key="b.nome">
        <text :x="b.x + 100" y="18" text-anchor="middle" class="titoletto">Blocco <tspan class="corsivo">{{ b.nome }}</tspan></text>
        <rect :x="b.x" y="28" width="200" height="206" rx="4" class="foglio" />
        <text :x="b.x + 100" y="54" text-anchor="middle" class="tx">contenuto di B<tspan class="pedice">{{ b.pedice }}</tspan></text>
        <SvRiquadro v-for="(t, k) in b.tx" :key="t" :x="b.x + 30" :y="70 + k * 54" :w="140" :h="40" :testo="t" />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.foglio { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.tx { font-size: 16px; }
.croce { fill: none; stroke: var(--rubrica); stroke-width: 12; stroke-linecap: round; }
.corsivo { font-style: italic; }
</style>
