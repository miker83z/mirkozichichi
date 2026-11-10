<!--
  Nakamoto's calculation (Bitcoin whitepaper, 2008, §11): an attacker who controls a share q of the
  computing power tries to rewrite a payment that already has z confirmations (blocks on top of it).
  Probability that he ever catches up:  λ = z·q/p,  P = 1 − Σ_{k=0..z} (λ^k e^{−λ} / k!) · (1 − (q/p)^{z−k}),
  with p = 1 − q (P = 1 if q ≥ p). Sliders for q and z; it also shows how many confirmations are needed to
  go below 0.1%. Checked against the whitepaper's tables (q = 0.1: z = 5 → 0.0009137, z = 6 → 0.0002428;
  q = 0.3: z = 10 → 0.0416605; P < 0.001 needs z = 5 for q = 0.10 and z = 24 for q = 0.30).
  In the PDF: q = 10%, z = 6. Source: bitcoin.org/bitcoin.pdf

  <ProbabilitaAttacco />
  <ProbabilitaAttacco :quota="30" :conferme="6" />
-->
<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(defineProps<{ quota?: number, conferme?: number }>(), { quota: 10, conferme: 6 })

const quota = ref(props.quota) // percent of the computing power
const conferme = ref(props.conferme)

function probabilita(q: number, z: number): number {
  const p = 1 - q
  if (q >= p) return 1
  const lambda = z * (q / p)
  let somma = 1
  let poisson = Math.exp(-lambda)
  for (let k = 0; k <= z; k++) {
    if (k > 0) poisson *= lambda / k
    somma -= poisson * (1 - (q / p) ** (z - k))
  }
  return Math.max(0, somma)
}

const P = computed(() => probabilita(quota.value / 100, conferme.value))
const percento = computed(() => {
  const v = P.value * 100
  if (v >= 1) return `${v.toLocaleString('it-IT', { maximumFractionDigits: 1 })}%`
  if (v >= 0.001) return `${v.toLocaleString('it-IT', { maximumSignificantDigits: 2 })}%`
  return 'meno di 0,001%'
})
const unoSu = computed(() => (P.value > 0 && P.value < 0.5 ? Math.round(1 / P.value).toLocaleString('it-IT') : null))
const necessarie = computed(() => {
  const q = quota.value / 100
  if (q >= 0.5) return null
  for (let z = 0; z <= 400; z++) if (probabilita(q, z) < 0.001) return z
  return null
})
</script>

<template>
  <div class="demo attacco">
    <div class="riga">
      <label for="pa-q">Potenza di calcolo dell'attaccante: <strong>{{ quota }}%</strong></label>
      <input id="pa-q" v-model.number="quota" type="range" min="1" max="50" step="1">
    </div>
    <div class="riga">
      <label for="pa-z">Conferme già ricevute dal pagamento: <strong>{{ conferme }}</strong> blocchi (circa {{ conferme * 10 }} minuti)</label>
      <input id="pa-z" v-model.number="conferme" type="range" min="0" max="12" step="1">
    </div>
    <div class="esito">
      <span class="etichetta">Probabilità che l'attaccante riscriva la storia</span>
      <span class="valore" :class="P >= 0.5 ? 'esito-ko' : P < 0.001 ? 'esito-ok' : ''">{{ percento }}</span>
      <span v-if="unoSu" class="grigio">circa 1 volta su {{ unoSu }}</span>
    </div>
    <p class="nota">
      <template v-if="necessarie !== null">Per scendere sotto lo 0,1% servono <strong>{{ necessarie }}</strong> conferme.</template>
      <template v-else>Con metà o più della potenza di calcolo l'attaccante vince sempre: è l'«attacco del 51%».</template>
    </p>
  </div>
</template>

<style scoped>
.attacco {
  padding: 0.7rem 1rem;
  max-width: 44rem;
}
.riga {
  margin-bottom: 0.55rem;
}
.riga label {
  font-size: 0.95rem;
  color: var(--inchiostro);
}
.esito {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.2rem 1rem;
  border-top: 1px solid var(--linea);
  padding-top: 0.5rem;
}
.etichetta {
  font-size: 0.95rem;
}
.valore {
  font-family: var(--titoli);
  font-weight: 700;
  font-size: 1.9rem;
}
.nota {
  font-size: 0.9rem;
  margin: 0.4rem 0 0 !important;
}
</style>
