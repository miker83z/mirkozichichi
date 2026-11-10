<!--
  An automated market maker (Uniswap v2, constant product x · y = k), live. The pool holds two tokens
  (default 10 ETH and 30,000 USDC: an example, not a market price). A slider sets how many USDC you pay;
  the pool keeps 0.3% as a fee for the liquidity providers and gives back
      out = x · (0.997 · dx) / (y + 0.997 · dx),
  so that the product of the balances does not fall. It shows what you receive, the average price you paid
  against the pool's price before the trade (slippage) and the new pool price. Bigger trades move the
  price more. Source: Uniswap v2 whitepaper (uniswap.org/whitepaper.pdf), §3.1–3.2.
  In the PDF: 3,000 USDC.

  <Amm />
  <Amm :eth="100" :usdc="300000" />
-->
<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{ eth?: number, usdc?: number }>(), { eth: 10, usdc: 30_000 })

const spesa = ref(3_000)
const massimo = computed(() => props.usdc)

const ricevuti = computed(() => props.eth * (0.997 * spesa.value) / (props.usdc + 0.997 * spesa.value))
const prezzoPrima = computed(() => props.usdc / props.eth)
const prezzoMedio = computed(() => (ricevuti.value > 0 ? spesa.value / ricevuti.value : prezzoPrima.value))
const prezzoDopo = computed(() => (props.usdc + spesa.value) / (props.eth - ricevuti.value))
const scarto = computed(() => (prezzoMedio.value / prezzoPrima.value - 1) * 100)

const n = (x: number, cifre = 0) => x.toLocaleString('it-IT', { maximumFractionDigits: cifre, minimumFractionDigits: cifre })
const quotaEth = computed(() => (props.eth - ricevuti.value) / props.eth * 100)
const quotaUsdc = computed(() => (props.usdc + spesa.value) / (2 * props.usdc) * 100)
</script>

<template>
  <div class="demo amm">
    <label for="amm-spesa">Paghi <strong>{{ n(spesa) }} USDC</strong> per comprare ETH dal pool</label>
    <input id="amm-spesa" v-model.number="spesa" type="range" min="0" :max="massimo" step="500">
    <div class="pool">
      <div class="colonna">
        <span class="etichetta">ETH nel pool</span>
        <div class="vasca"><span class="eth" :style="{ height: `${quotaEth}%` }" /></div>
        <span class="mono">{{ n(eth - ricevuti, 3) }}</span>
      </div>
      <div class="colonna">
        <span class="etichetta">USDC nel pool</span>
        <div class="vasca"><span class="usdc" :style="{ height: `${quotaUsdc}%` }" /></div>
        <span class="mono">{{ n(usdc + spesa) }}</span>
      </div>
      <dl class="esiti">
        <dt>Ricevi</dt>
        <dd><strong>{{ n(ricevuti, 3) }} ETH</strong></dd>
        <dt>Prezzo prima dello scambio</dt>
        <dd>{{ n(prezzoPrima) }} USDC per ETH</dd>
        <dt>Prezzo medio che hai pagato</dt>
        <dd>{{ n(prezzoMedio) }} <span :class="scarto > 10 ? 'esito-ko' : 'grigio'">(+{{ n(scarto, 1) }}%)</span></dd>
        <dt>Prezzo nel pool dopo</dt>
        <dd>{{ n(prezzoDopo) }}</dd>
      </dl>
    </div>
    <p class="nota">Nessun banco e nessun ordine: il prezzo lo fa la formula <span class="mono">x · y = k</span>. Lo 0,3% resta a chi ha messo i fondi nel pool.</p>
  </div>
</template>

<style scoped>
.amm {
  padding: 0.7rem 1rem;
}
label {
  font-size: 0.95rem;
  color: var(--inchiostro) !important;
}
.pool {
  display: grid;
  grid-template-columns: 7rem 7rem 1fr;
  gap: 1rem;
  align-items: end;
  margin-top: 0.5rem;
}
.colonna {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}
.etichetta {
  font-size: 0.8rem;
  color: var(--grigio);
}
.vasca {
  width: 3.4rem;
  height: 7rem;
  border: 1.5px solid var(--linea);
  border-radius: 4px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.vasca span {
  display: block;
  width: 100%;
}
.eth {
  background: var(--acqua, var(--link));
}
.usdc {
  background: var(--glossa);
}
.mono {
  font-family: var(--mono);
  font-size: 0.85rem;
}
.esiti {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.15rem 0.8rem;
  margin: 0;
  font-size: 0.95rem;
}
.esiti dt {
  color: var(--grigio);
}
.esiti dd {
  margin: 0;
}
.nota {
  font-size: 0.9rem;
  margin: 0.5rem 0 0 !important;
}
</style>
