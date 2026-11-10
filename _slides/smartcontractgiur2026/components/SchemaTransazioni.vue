<!--
  Diagram (2025 deck, pp. 15–16): the ledger is a list of transactions TX1, TX2, TX3
  (the state is what you get by applying them). A new transaction TX4 refers to an earlier one (TX3), is signed by the owner of what TX3
  transferred, and is appended: the updated ledger is TX1…TX4.
  Sources: Bitcoin whitepaper §2 "Transactions" (each owner transfers the coin by signing a hash of the
  previous transaction and the next owner's public key); developer.bitcoin.org/devguide/transactions.html
  (every input points to an output of an earlier transaction and carries a signature that satisfies it).
  3 clicks: the list (the ledger); the new TX4 with its reference and signature; TX4 appended.
  <SchemaTransazioni />
-->
<template>
  <svg viewBox="0 0 880 226" class="schema" role="img" aria-label="Schema: il registro è un elenco di transazioni; una nuova transazione TX4 si riferisce a TX3, è firmata dal suo titolare e si aggiunge all'elenco">
    <!-- 1. The ledger: a list of transactions -->
    <g v-click>
      <text x="140" y="36" text-anchor="middle" class="titoletto">registro</text>
      <rect x="40" y="50" width="200" height="164" rx="4" class="registro" />
      <SvRiquadro v-for="(t, i) in ['TX1', 'TX2', 'TX3']" :key="t" :x="60" :y="66 + i * 46" :w="160" :h="36" :testo="t" />
    </g>
    <!-- 2. A new transaction: refers to TX3, signed by its owner -->
    <g v-click>
      <rect x="330" y="70" width="230" height="110" rx="6" class="nuova" />
      <text x="445" y="96" text-anchor="middle" class="titoletto">TX4</text>
      <text x="445" y="120" text-anchor="middle" class="riga">si riferisce a TX3</text>
      <SvChiave :x="356" :y="152" tipo="privata" :scala="0.8" />
      <text x="400" y="149" class="riga">firmata da chi</text>
      <text x="400" y="167" class="riga">ha ricevuto TX3</text>
      <SvFreccia :x1="328" :y1="116" :x2="223" :y2="178" variante="rubrica" tratteggiata />
    </g>
    <!-- 3. Appended: the updated ledger -->
    <g v-click>
      <SvFreccia :x1="562" :y1="125" :x2="647" :y2="125" etichetta="si aggiunge" />
      <text x="750" y="36" text-anchor="middle" class="titoletto">registro aggiornato</text>
      <rect x="650" y="50" width="200" height="164" rx="4" class="registro" />
      <SvRiquadro v-for="(t, i) in ['TX1', 'TX2', 'TX3', 'TX4']" :key="t" :x="670" :y="60 + i * 38" :w="160" :h="32" :testo="t" :variante="i === 3 ? 'rubrica' : 'campo'" />
    </g>
  </svg>
</template>

<style scoped>
.registro { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.nuova { fill: color-mix(in srgb, var(--rubrica) 12%, var(--carta)); stroke: var(--rubrica); stroke-width: 1.5; }
.riga { font-size: 15px; }
</style>
