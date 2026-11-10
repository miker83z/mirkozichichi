<!--
  Who enforces Bitcoin's monetary policy: every node. The presenter picks the height of the block and how much
  the miner pays itself in the block's first transaction (the "coinbase"); five nodes compute the allowed
  amount, block subsidy + fees, and accept or reject the block. The subsidy is 50 BTC halved once every
  210,000 blocks, in whole satoshis, as in Bitcoin Core's GetBlockSubsidy (50 * COIN >> halvings); a coinbase
  above subsidy + fees is rejected with the error "bad-cb-amount" ("coinbase pays too much"). Fees are an
  illustrative 0.02 BTC. In the PDF: block 975,328 with a miner asking for 6.25 BTC, rejected.

  <PremioMiner />
-->
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useNav } from '@slidev/client'

const { isPrintMode } = useNav()
const ALTEZZE = [
  { h: 0, nome: 'blocco 0 (2009)' },
  { h: 210_000, nome: 'blocco 210.000 (2012)' },
  { h: 420_000, nome: 'blocco 420.000 (2016)' },
  { h: 630_000, nome: 'blocco 630.000 (2020)' },
  { h: 840_000, nome: 'blocco 840.000 (2024)' },
  { h: 975_328, nome: 'blocco 975.328 (oggi)' },
]
const COMMISSIONI = 2_000_000n // 0.02 BTC in satoshi, illustrative
const SAT = 100_000_000n

const altezza = ref(975_328)
const richiesta = ref(3.145)

const premio = computed(() => 5_000_000_000n >> BigInt(Math.floor(altezza.value / 210_000)))
const massimo = computed(() => premio.value + COMMISSIONI)
const richiestaSat = computed(() => BigInt(Math.round(richiesta.value * 1e8)))
const valido = computed(() => richiestaSat.value <= massimo.value)
const btc = (s: bigint) => (Number(s) / Number(SAT)).toLocaleString('it-IT', { maximumFractionDigits: 8 })

onMounted(() => {
  if (isPrintMode.value) richiesta.value = 6.25
})
</script>

<template>
  <div class="demo premio">
    <div class="comandi">
      <label>Blocco
        <select v-model.number="altezza">
          <option v-for="a in ALTEZZE" :key="a.h" :value="a.h">{{ a.nome }}</option>
        </select>
      </label>
      <label>Il miner si paga <strong>{{ richiesta.toLocaleString('it-IT', { maximumFractionDigits: 3 }) }} BTC</strong>
        <input v-model.number="richiesta" type="range" min="0" max="55" step="0.005">
      </label>
    </div>

    <div class="conti">
      <p>Premio previsto dal protocollo a questa altezza: <strong>{{ btc(premio) }} BTC</strong> (50 dimezzato {{ Math.floor(altezza / 210000) }} volte)</p>
      <p>+ commissioni delle transazioni nel blocco: <strong>{{ btc(COMMISSIONI) }} BTC</strong> = massimo <strong>{{ btc(massimo) }} BTC</strong></p>
    </div>

    <div class="nodi">
      <div v-for="n in 5" :key="n" class="nodo" :class="valido ? 'ok' : 'ko'">
        <span class="icona" aria-hidden="true">{{ valido ? '✓' : '✗' }}</span>
        <span>nodo {{ n }}</span>
      </div>
    </div>
    <p class="esito" :class="valido ? 'esito-ok' : 'esito-ko'" role="status">
      <template v-if="valido">Ogni nodo fa lo stesso conto: il blocco è valido e si aggiunge alla catena.</template>
      <template v-else>Ogni nodo rifiuta il blocco: «coinbase pays too much». Il miner ha fatto il lavoro per niente.</template>
    </p>
  </div>
</template>

<style scoped>
.premio {
  padding: 0.7rem 1rem;
}
.comandi {
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: 1.2rem;
  align-items: end;
}
.comandi label {
  font-size: 0.95rem;
  color: var(--inchiostro) !important;
}
.conti p {
  margin: 0.25rem 0 !important;
  font-size: 0.95rem;
}
.conti {
  margin: 0.6rem 0;
  padding: 0.4rem 0.7rem;
  border-left: 3px solid var(--glossa);
  background: var(--carta);
}
.nodi {
  display: flex;
  gap: 0.6rem;
}
.nodo {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  justify-content: center;
  padding: 0.45rem;
  border: 1.5px solid;
  border-radius: 6px;
  font-weight: 600;
}
.nodo.ok {
  border-color: var(--ok);
  color: var(--ok);
}
.nodo.ko {
  border-color: var(--ko);
  color: var(--ko);
}
.icona {
  font-size: 1.2rem;
}
.esito {
  margin: 0.6rem 0 0 !important;
}
</style>
