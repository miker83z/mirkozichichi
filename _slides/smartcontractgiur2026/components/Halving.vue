<!--
  Bitcoin's issuance rule, live. A slider moves through the "eras" of 210,000 blocks: in era n the block
  subsidy is 50 BTC halved n times, in whole satoshis (integer shift: 5,000,000,000 >> n, as in Bitcoin
  Core's GetBlockSubsidy). It shows the subsidy, the bitcoins issued by the end of the era and the share of
  the final total, 20,999,999.9769 BTC (the geometric series 210,000 × 50 × (1 + ½ + ¼ + …) = 21 million,
  a little less because of the rounding to satoshis). Dates: the real ones for the halvings so far
  (28/11/2012, 9/7/2016, 11/5/2020, 20/4/2024); afterwards about every 4 years (estimate).
  In the PDF: the current era (era 4, since April 2024).

  <Halving />
-->
<script setup lang="ts">
import { computed, ref } from 'vue'

const BLOCCHI = 210_000
const SAT = 100_000_000n
const date = ['3 gen 2009', '28 nov 2012', '9 lug 2016', '11 mag 2020', '20 apr 2024']

const era = ref(4)

const premio = (n: number) => (5_000_000_000n >> BigInt(n)) // satoshi
const emessi = (fine: number) => {
  let s = 0n
  for (let n = 0; n <= fine; n++) s += premio(n) * BigInt(BLOCCHI)
  return s
}
const TOTALE = emessi(64)

const btc = (sat: bigint, cifre = 8) => {
  const intero = sat / SAT
  const resto = (sat % SAT).toString().padStart(8, '0').slice(0, cifre).replace(/0+$/, '')
  return `${intero.toLocaleString('it-IT')}${resto ? `,${resto}` : ''}`
}
const inizio = computed(() => era.value < date.length ? date[era.value] : `circa ${2024 + 4 * (era.value - 4)}`)
const quota = computed(() => Number((emessi(era.value) * 1_000_000n) / TOTALE) / 10_000)
</script>

<template>
  <div class="demo halving">
    <label for="hv-era">Epoca: <strong>{{ era }}</strong> ({{ era === 0 ? 'nessun dimezzamento' : `dopo ${era} ${era === 1 ? 'dimezzamento' : 'dimezzamenti'}` }}), dal blocco {{ (era * BLOCCHI).toLocaleString('it-IT') }}, {{ inizio }}</label>
    <input id="hv-era" v-model.number="era" type="range" min="0" max="33" step="1">
    <div class="cifre">
      <div>
        <span class="etichetta">Premio per blocco</span>
        <span class="valore">{{ premio(era) > 0n ? `${btc(premio(era))} BTC` : '0' }}</span>
      </div>
      <div>
        <span class="etichetta">Bitcoin emessi a fine epoca</span>
        <span class="valore">{{ btc(emessi(era), 4) }}</span>
      </div>
      <div>
        <span class="etichetta">Del totale finale</span>
        <span class="valore">{{ quota.toLocaleString('it-IT', { maximumFractionDigits: 2 }) }}%</span>
      </div>
    </div>
    <div class="barra" aria-hidden="true"><span :style="{ width: `${quota}%` }" /></div>
    <p class="nota">Totale finale: <strong>{{ btc(TOTALE, 4) }}</strong> BTC, raggiunto intorno al 2140. Nessuno può cambiarlo senza il consenso della rete.</p>
  </div>
</template>

<style scoped>
.halving {
  padding: 0.7rem 1rem;
  max-width: 46rem;
}
label {
  font-size: 0.95rem;
  color: var(--inchiostro) !important;
}
.cifre {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.8rem;
  margin-top: 0.6rem;
}
.cifre div {
  display: flex;
  flex-direction: column;
}
.etichetta {
  font-size: 0.85rem;
  color: var(--grigio);
}
.valore {
  font-family: var(--titoli);
  font-weight: 700;
  font-size: 1.45rem;
}
.barra {
  height: 0.7rem;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 999px;
  overflow: hidden;
  margin-top: 0.6rem;
}
.barra span {
  display: block;
  height: 100%;
  background: var(--glossa);
}
.nota {
  font-size: 0.9rem;
  margin: 0.5rem 0 0 !important;
}
</style>
