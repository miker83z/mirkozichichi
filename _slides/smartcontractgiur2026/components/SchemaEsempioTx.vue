<!--
  Diagram (2025 deck, p. 17): an example of transactions. Above, the wallets of Charlie, Bob and Alice and
  the 5 btc going from one to the next; below, the three transactions: TX1 gives 5 btc to Charlie; TX2
  (Charlie → Bob) spends TX1 and is signed by Charlie; TX3 (Bob → Alice) spends TX2 and is signed by Bob.
  The red "spende" arrows show that a coin is a chain of signed transfers: Bitcoin's idea that every
  transaction spends an output of an earlier one (the UTXO model).
  Sources: Bitcoin whitepaper §2 "Transactions" ("We define an electronic coin as a chain of digital
  signatures"); developer.bitcoin.org/devguide/transactions.html (inputs spend previous outputs, the
  signature proves the right to spend them).
  4 clicks: TX1 (Charlie's wallet); TX2 (Bob's wallet, the transfer, the card, "spende"); TX3 (the same for
  Alice); the caption.
  <SchemaEsempioTx />
-->
<script setup lang="ts">
const C = [160, 445, 730] // centres of the three columns
const tx = [
  { nome: 'TX1', chi: 'Charlie', testo: '5 btc → Charlie', firma: '' },
  { nome: 'TX2', chi: 'Bob', testo: 'Charlie → Bob: 5 btc', firma: 'firmata da Charlie' },
  { nome: 'TX3', chi: 'Alice', testo: 'Bob → Alice: 5 btc', firma: 'firmata da Bob' },
]
</script>

<template>
  <svg viewBox="0 0 880 266" class="schema" role="img" aria-label="Schema: Charlie riceve 5 btc con TX1; TX2 li passa a Bob spendendo TX1, firmata da Charlie; TX3 li passa ad Alice spendendo TX2, firmata da Bob">
    <g v-for="(t, i) in tx" :key="t.nome" v-click>
      <!-- the wallet -->
      <text :x="C[i]" y="18" text-anchor="middle" class="riga">wallet di <tspan class="nome">{{ t.chi }}</tspan></text>
      <rect :x="C[i] - 65" y="28" width="130" height="72" rx="6" class="portafoglio" />
      <SvPersona :x="C[i]" :y="36" />
      <!-- the 5 btc arriving -->
      <SvFreccia :x1="i === 0 ? 10 : C[i - 1] + 67" :y1="64" :x2="C[i] - 67" :y2="64" :etichetta="`${t.nome}: 5 btc`" />
      <!-- the transaction -->
      <rect :x="C[i] - 105" y="136" width="210" :height="t.firma ? 76 : 56" rx="6" :class="['carta-tx', { prima: !t.firma }]" />
      <text :x="C[i]" y="158" text-anchor="middle" class="titoletto">{{ t.nome }}</text>
      <text :x="C[i]" y="180" text-anchor="middle" class="riga">{{ t.testo }}</text>
      <g v-if="t.firma">
        <SvChiave :x="C[i] - 74" :y="198" tipo="privata" :scala="0.6" />
        <text :x="C[i] - 40" y="203" class="riga piccola">{{ t.firma }}</text>
        <SvFreccia :x1="C[i] - 107" :y1="174" :x2="C[i - 1] + 107" :y2="174" etichetta="spende" variante="rubrica" />
      </g>
    </g>
    <g v-click>
      <text x="440" y="254" text-anchor="middle" class="didascalia">una moneta è una catena di firme: ogni transazione spende la precedente</text>
    </g>
  </svg>
</template>

<style scoped>
.portafoglio { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.carta-tx { fill: var(--carta); stroke: var(--rubrica); stroke-width: 1.5; }
.carta-tx.prima { stroke: var(--inchiostro); }
.riga { font-size: 15px; }
.piccola { font-size: 14px; }
.nome { font-weight: 700; }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
