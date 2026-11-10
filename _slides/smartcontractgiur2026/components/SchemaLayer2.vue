<!--
  Diagram (new): two Layer 2 ideas over the same Layer 1 chain (bottom band; a dashed line separates
  "fuori catena" from "sulla catena").
  (a) Payment channel (Lightning): Alice and Bob lock 0,05 + 0,05 BTC on chain in a 2-of-2 multisignature
  (apertura); off chain they exchange many balance updates signed by both (0,06/0,04, 0,08/0,02,
  0,07/0,03); only the final balance goes on chain (chiusura: 0,07 to Alice, 0,03 to Bob). The numbers
  are the example of the Lightning paper.
  (b) Rollup: many transactions are executed off chain and posted to Layer 1 as one batch with a proof
  (validity proof for zk-rollups; optimistic rollups are assumed valid and can be challenged).
  Sources: J. Poon, T. Dryja, "The Bitcoin Lightning Network: Scalable Off-Chain Instant Payments", draft
  0.5.9.2, 14 Jan 2016 (lightning.network/lightning-network-paper.pdf) §2: Alice and Bob "commit funds
  into a 2-of-2 multisignature address", update the balance (0.05/0.05 → 0.07/0.03) without broadcasting,
  "deferring what is broadcast to the blockchain in a single transaction netting out the total balance".
  ethereum.org/en/developers/docs/scaling: "Rollups perform transaction execution outside layer 1 and
  then the data is posted to layer 1", batched; .../scaling/zk-rollups: batches "executed offchain",
  validity proof; optimistic rollups: "assumes transactions are valid by default", challenge period.
  4 clicks: channel open; off-chain updates; settlement; rollup batch.
  <SchemaLayer2 />
-->
<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: canale di pagamento tra Alice e Bob con apertura e chiusura sulla catena, e rollup che invia alla Layer 1 un solo lotto con una prova">
    <!-- 1. Apertura del canale, sulla catena -->
    <g v-click>
      <line x1="0" y1="172" x2="880" y2="172" class="confine" />
      <text x="510" y="164" text-anchor="middle" class="nota">fuori catena (off-chain)</text>
      <text x="510" y="190" text-anchor="middle" class="nota">sulla catena (Layer 1)</text>
      <line x1="0" y1="224" x2="880" y2="224" class="legame" />
      <rect v-for="bx in [8, 228, 460, 510, 560]" :key="bx" :x="bx" y="200" width="24" height="48" rx="3" class="blocco" />
      <rect x="260" y="200" width="180" height="48" rx="6" class="blocco" />
      <rect x="600" y="200" width="260" height="48" rx="6" class="blocco" />
      <SvRiquadro :x="40" :y="200" :w="180" :h="48" testo="apertura\nA 0,05 + B 0,05" variante="rubrica" />

      <SvPersona :x="55" :y="6" nome="Alice" :scala="0.9" />
      <SvPersona :x="425" :y="6" nome="Bob" :scala="0.9" />
      <rect x="90" y="22" width="300" height="42" rx="21" class="canale" />
      <text x="240" y="14" text-anchor="middle" class="nota">canale di pagamento (Lightning)</text>
      <SvFreccia :x1="130" :y1="66" :x2="130" :y2="198" variante="rubrica" />
      <text x="120" y="102" text-anchor="end" class="nota">fondi bloccati</text>
      <text x="120" y="118" text-anchor="end" class="nota">(2 firme su 2)</text>
      <SvLucchetto :x="92" :y="140" />
    </g>

    <!-- 2. Aggiornamenti firmati, fuori catena -->
    <g v-click>
      <SvRiquadro :x="118" :y="26" :w="62" :h="34" testo="A 0,06\nB 0,04" variante="vuoto" mono piccolo />
      <SvFreccia :x1="182" :y1="43" :x2="206" :y2="43" variante="grigio" />
      <SvRiquadro :x="209" :y="26" :w="62" :h="34" testo="A 0,08\nB 0,02" variante="vuoto" mono piccolo />
      <SvFreccia :x1="273" :y1="43" :x2="297" :y2="43" variante="grigio" />
      <SvRiquadro :x="300" :y="26" :w="62" :h="34" testo="A 0,07\nB 0,03" variante="vuoto" mono piccolo />
      <text x="240" y="88" text-anchor="middle" class="testo">molti aggiornamenti,</text>
      <text x="240" y="106" text-anchor="middle" class="testo">firmati da Alice e Bob</text>
    </g>

    <!-- 3. Chiusura: solo il saldo finale va sulla catena -->
    <g v-click>
      <SvFreccia :x1="350" :y1="66" :x2="350" :y2="198" variante="rubrica" />
      <text x="360" y="102" class="nota">solo il saldo</text>
      <text x="360" y="118" class="nota">finale</text>
      <SvRiquadro :x="260" :y="200" :w="180" :h="48" testo="chiusura\nA 0,07 · B 0,03" variante="rubrica" />
    </g>

    <!-- 4. Rollup: molte transazioni, un solo lotto con una prova -->
    <g v-click>
      <text x="740" y="14" text-anchor="middle" class="nota">molte transazioni</text>
      <g v-for="r in 3" :key="r">
        <rect v-for="c in 7" :key="c" :x="650 + (c - 1) * 24" :y="4 + r * 18" width="18" height="12" rx="2" class="tx" />
      </g>
      <SvFreccia :x1="740" :y1="74" :x2="740" :y2="88" />
      <SvRiquadro :x="620" :y="90" :w="240" :h="44" testo="rollup\nle esegue fuori catena" />
      <SvFreccia :x1="740" :y1="134" :x2="740" :y2="198" variante="rubrica" />
      <text x="750" y="160" class="nota">un solo invio</text>
      <SvRiquadro :x="600" :y="200" :w="260" :h="48" testo="1 lotto sulla catena" variante="rubrica" />
      <text x="876" y="270" text-anchor="end" class="nota">zk: prova di validità; optimistic: contestabile</text>
    </g>
  </svg>
</template>

<style scoped>
.confine { stroke: var(--grigio); stroke-width: 1.2; stroke-dasharray: 6 5; }
.legame { stroke: var(--linea); stroke-width: 3; }
.blocco { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.canale { fill: none; stroke: var(--inchiostro); stroke-width: 1.5; stroke-dasharray: 4 4; }
.testo { font-size: 15px; }
.tx { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1; }
</style>
