<!--
  "Moltiplicare è facile, fattorizzare è difficile": the one-way idea behind RSA.
  1. Pick two primes p and q: n = p·q appears at once (exact, with BigInt).
  2. "Fattorizza n" searches p and q again by trial division (2, 3, 5, 7, 9, …), in small chunks
     per frame so the slide stays responsive; it shows attempts and elapsed time, "Ferma" stops it.
  3. A computed comparison with the 617 decimal digits of an RSA-2048 modulus; after a run, also
     how long the same method would take at the measured speed.
  Browsers run about 10^8 trial divisions per second, so 179424673 (the 10^7-th prime) falls in
  a fraction of a second: the list goes on with the 10^8-th, 10^9-th and 10^10-th primes, with
  which the search visibly drags on (2038074743² takes about 12 s, larger pairs minutes).
  In the PDF the factorisation of the initial p·q is computed synchronously (attempts, no time).

  <Factoring />
  <Factoring :p="1299709" :q="15485863" stretto />

  Props
  - p, q: initial primes, chosen from 53, 61, 7919, 104729, 1299709, 15485863, 179424673,
    2038074743, 22801763489, 252097800623 (default 7919 and 104729; keep them small: the PDF
    computes the factorisation synchronously)
  - stretto: narrower layout for the main column of the `glossa` layout
-->
<script setup lang="ts">
import { computed, onUnmounted, ref, useId, watch } from 'vue'
import { onSlideLeave, useNav } from '@slidev/client'

const props = withDefaults(defineProps<{ p?: number, q?: number, stretto?: boolean }>(), {
  p: 7919,
  q: 104729,
})

const { isPrintMode } = useNav()
const uid = useId()

// The 1000th, 10 000th, … 10 000 000 000th primes (plus 53 and 61, the textbook RSA example).
const PRIMI = [53, 61, 7919, 104729, 1299709, 15485863, 179424673, 2038074743, 22801763489, 252097800623]
const it = (x: number | bigint) => x.toLocaleString('it-IT')

const p = ref(props.p)
const q = ref(props.q)
const n = computed(() => BigInt(p.value) * BigInt(q.value))
const cifre = computed(() => n.value.toString().length)
// Digits of a 2048-bit modulus: the smallest such number is 2^2047.
const CIFRE_RSA = (1n << 2047n).toString().length

type Stato = 'fermo' | 'in corso' | 'trovato' | 'interrotto'
const stato = ref<Stato>('fermo')
const tentativi = ref(0)
const divisore = ref(0n)
const millisecondi = ref(0)
const fattore = ref(0n)

let prossimo = 0n
let inizio = 0
let frame = 0

function ferma() {
  if (frame) cancelAnimationFrame(frame)
  frame = 0
  if (stato.value === 'in corso') stato.value = 'interrotto'
}

function azzera() {
  ferma()
  stato.value = 'fermo'
  tentativi.value = 0
  divisore.value = 0n
  millisecondi.value = 0
  fattore.value = 0n
}

/** Runs trial division until a divisor is found or the time budget (ms) is spent. */
function prova(budget: number) {
  const N = n.value
  let d = prossimo
  let a = tentativi.value
  const t0 = performance.now()
  while (true) {
    for (let i = 0; i < 4096; i++) {
      if (d * d > N) {
        // No divisor up to √n: n itself is prime (never the case with p·q, kept for safety).
        fattore.value = N
        stato.value = 'trovato'
        break
      }
      a++
      if (N % d === 0n) {
        fattore.value = d
        stato.value = 'trovato'
        break
      }
      d = d === 2n ? 3n : d + 2n
    }
    if (stato.value === 'trovato' || performance.now() - t0 > budget) break
  }
  prossimo = d
  tentativi.value = a
  divisore.value = d
}

function passo() {
  prova(14)
  millisecondi.value = performance.now() - inizio
  frame = stato.value === 'in corso' ? requestAnimationFrame(passo) : 0
}

function fattorizza() {
  azzera()
  prossimo = 2n
  inizio = performance.now()
  stato.value = 'in corso'
  frame = requestAnimationFrame(passo)
}

watch([p, q], azzera)
onSlideLeave(ferma)
onUnmounted(ferma)

if (isPrintMode.value) {
  prossimo = 2n
  stato.value = 'in corso'
  prova(Number.POSITIVE_INFINITY)
}

const tempo = computed(() => {
  const s = millisecondi.value / 1000
  return s < 60 ? `${s.toFixed(2).replace('.', ',')} s` : `${Math.floor(s / 60)} min ${Math.round(s % 60)} s`
})
const alSecondo = computed(() => (millisecondi.value > 50 ? Math.round(tentativi.value / (millisecondi.value / 1000)) : 0))
const velocita = computed(() => alSecondo.value >= 1e6
  ? `${Math.round(alSecondo.value / 1e6).toLocaleString('it-IT')} milioni al secondo`
  : `${it(alSecondo.value)} al secondo`)

// Trial division of a 2048-bit modulus needs about √(2^2047) / 2 = 2^1022.5 attempts: work in log10 to avoid overflow.
const ANNO = 365.25 * 24 * 3600
const esponenteAnni = computed(() =>
  alSecondo.value ? Math.round(1022.5 * Math.log10(2) - Math.log10(alSecondo.value) - Math.log10(ANNO)) : 0)
</script>

<template>
  <div class="demo factoring" :class="{ stretto }">
    <section class="parte">
      <h4>Moltiplicare è facile</h4>
      <div class="moltiplica">
        <div class="scelta">
          <label :for="`${uid}-p`" class="lettera" title="primo p">p</label>
          <select :id="`${uid}-p`" v-model.number="p">
            <option v-for="x in PRIMI" :key="x" :value="x">{{ it(x) }}</option>
          </select>
        </div>
        <span class="segno">×</span>
        <div class="scelta">
          <label :for="`${uid}-q`" class="lettera" title="primo q">q</label>
          <select :id="`${uid}-q`" v-model.number="q">
            <option v-for="x in PRIMI" :key="x" :value="x">{{ it(x) }}</option>
          </select>
        </div>
        <span v-if="!stretto" class="segno">=</span>
        <div class="prodotto">
          <span class="n">n = {{ it(n) }}</span>
          <span class="grigio piccolo">{{ cifre }} cifre, calcolato all'istante</span>
        </div>
      </div>
    </section>

    <section class="parte">
      <h4>Fattorizzare è difficile</h4>
      <p class="spiega">Chi conosce solo n prova a dividerlo per 2, 3, 5, 7, 9, … finché trova un divisore.</p>
      <div class="comandi">
        <button v-if="!isPrintMode" class="btn pieno" :disabled="stato === 'in corso'" @click="fattorizza">Fattorizza n</button>
        <button v-if="!isPrintMode" class="btn" :disabled="stato !== 'in corso'" @click="ferma">Ferma</button>
        <span v-if="stato !== 'fermo'" class="contatori">
          tentativi <strong>{{ it(tentativi) }}</strong>
          <template v-if="!isPrintMode">
            · {{ stretto ? '' : 'tempo ' }}<strong>{{ tempo }}</strong>
            <template v-if="alSecondo"> · {{ velocita }}</template>
          </template>
          <template v-if="stato === 'in corso'"> · provo {{ it(divisore) }}</template>
        </span>
      </div>
      <p v-if="stato === 'trovato'" class="esito esito-ok">
        ✓ n = {{ it(fattore) }} × {{ it(n / fattore) }}, trovato dopo {{ it(tentativi) }} tentativi
      </p>
      <p v-else-if="stato === 'interrotto'" class="esito esito-ko">
        ✗ fermato dopo {{ it(tentativi) }} tentativi: p e q non sono ancora noti
      </p>
    </section>

    <p class="rsa">
      Una chiave RSA-2048 ha un modulo di <strong>{{ CIFRE_RSA }} cifre decimali</strong>; qui n ne ha {{ cifre }}.
      <template v-if="esponenteAnni && !isPrintMode">
        Con questo metodo, a questa velocità, servirebbero circa <strong>10<sup>{{ esponenteAnni }}</sup> anni</strong>
        <template v-if="!stretto"> (l'universo ne ha circa 10<sup>10</sup>)</template>.
      </template>
    </p>
  </div>
</template>

<style scoped>
.factoring {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}
h4 {
  font-family: var(--serif);
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--rubrica);
  margin: 0 0 0.3rem;
}
.moltiplica {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.scelta {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  width: 11.4rem;
}
.demo .lettera {
  margin: 0;
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.2rem;
  color: var(--inchiostro);
}
.scelta select {
  font-variant-numeric: tabular-nums;
}
.segno {
  font-size: 1.4rem;
  line-height: 1.2;
  color: var(--grigio);
}
.prodotto {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}
.factoring.stretto {
  gap: 0.45rem;
}
.stretto .prodotto {
  flex-basis: 100%;
  flex-direction: row;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0 0.6rem;
}
.n {
  font-family: var(--mono);
  font-size: 1.2rem;
  font-weight: 600;
}
.stretto .n {
  font-size: 1.1rem;
}
.spiega {
  margin: 0 0 0.45rem;
  font-size: 0.9rem;
  color: var(--grigio);
}
.comandi {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}
.contatori {
  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
}
.stretto .comandi {
  gap: 0.5rem;
}
.stretto .contatori {
  font-size: 0.9rem;
}
.stretto .esito {
  font-size: 1rem;
}
.stretto .rsa {
  font-size: 0.92rem;
}
.esito {
  margin: 0.4rem 0 0;
  font-size: 1.05rem;
}
.rsa {
  margin: 0;
  padding-top: 0.5rem;
  border-top: 1px solid var(--linea);
  font-size: 1rem;
}
</style>
