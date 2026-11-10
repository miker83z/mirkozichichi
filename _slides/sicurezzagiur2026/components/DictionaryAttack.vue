<!--
  A simulated dictionary attack, entirely local. The attacker has stolen the SHA-256 hash of the
  password of an account; he hashes each very common password (data/password-comuni.ts) and compares
  it with the stolen hash, one try every ~60 ms, until one matches. In the PDF the finished run is shown.

  <DictionaryAttack />                          target password 'sunshine' (found at try 20)
  <DictionaryAttack password="juventus" />      must be in data/password-comuni.ts to be found
  <DictionaryAttack account="dott.rossi" :intervallo="120" />

  Props: password?: string, account?: string, intervallo?: number (ms between tries)
-->
<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import { onSlideLeave, useNav } from '@slidev/client'
import { sha256, short } from '../utils/crypto'
import { passwordComuni } from '../data/password-comuni'

const props = withDefaults(defineProps<{ password?: string, account?: string, intervallo?: number }>(), {
  password: 'sunshine',
  account: 'avv.bianchi',
  intervallo: 60,
})

const { isPrintMode } = useNav()

const rubato = computed(() => sha256(props.password))
const dizionario = passwordComuni.map(parola => ({ parola, hash: sha256(parola) }))
const posizione = computed(() => dizionario.findIndex(d => d.hash === rubato.value))

const provati = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

// In print: the finished attack.
const fatti = computed(() => {
  if (!isPrintMode.value) return provati.value
  return posizione.value >= 0 ? posizione.value + 1 : dizionario.length
})
const trovata = computed(() => posizione.value >= 0 && fatti.value > posizione.value)
const finito = computed(() => trovata.value || fatti.value >= dizionario.length)
const inCorso = ref(false)

const righe = computed(() =>
  dizionario.slice(Math.max(0, fatti.value - 8), fatti.value).map((d, i, arr) => ({
    n: fatti.value - arr.length + i + 1,
    parola: d.parola,
    hash: `${d.hash.slice(0, 6)}…`,
    ok: d.hash === rubato.value,
  })),
)

function ferma() {
  if (timer) clearInterval(timer)
  timer = undefined
  inCorso.value = false
}
function passo() {
  provati.value++
  if (finito.value) ferma()
}
function avvia() {
  if (finito.value) provati.value = 0
  ferma()
  inCorso.value = true
  timer = setInterval(passo, props.intervallo)
}
function ricomincia() {
  ferma()
  provati.value = 0
}

onSlideLeave(ferma)
onUnmounted(ferma)
</script>

<template>
  <div class="demo dictionary-attack">
    <div class="bersaglio">
      <span>Account <strong class="mono">{{ account }}</strong></span>
      <span>hash della password rubato dal database: <span class="hex">{{ short(rubato, 10, 6) }}</span></span>
    </div>
    <p class="spiega">L'attaccante calcola l'hash di ogni parola del dizionario e lo confronta con l'hash rubato.</p>

    <div class="comandi">
      <template v-if="!isPrintMode">
        <button class="btn pieno" :disabled="inCorso" @click="avvia">Avvia l'attacco</button>
        <button class="btn" :disabled="fatti === 0" @click="ricomincia">Ricomincia</button>
      </template>
      <span class="contatore">Tentativi: <strong>{{ fatti }}</strong> su {{ dizionario.length }} parole del dizionario</span>
    </div>

    <div class="log" role="log" aria-live="polite">
      <p v-if="fatti === 0" class="vuoto">In attesa: premi «Avvia l'attacco».</p>
      <p v-for="r in righe" :key="r.n" :class="{ colpo: r.ok }">
        tentativo {{ r.n }}: {{ r.parola }} → {{ r.hash }} <span :class="r.ok ? 'esito-ok' : 'no'">{{ r.ok ? '✓' : '✗' }}</span>
      </p>
      <p v-if="trovata" class="esito-ok finale">✓ trovata: {{ dizionario[posizione].parola }} (tentativo {{ posizione + 1 }})</p>
      <p v-else-if="finito" class="esito-ko finale">✗ nessuna corrispondenza: la password non è nel dizionario</p>
    </div>
  </div>
</template>

<style scoped>
.bersaglio {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.2rem 1rem;
  font-size: 0.95rem;
}
.mono {
  font-family: var(--mono);
  font-size: 0.95em;
}
.bersaglio .hex {
  font-size: 0.9rem;
}
.spiega {
  font-size: 0.9rem;
  color: var(--grigio);
  margin: 0.2rem 0 0.45rem;
}
.comandi {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.45rem;
}
.contatore {
  margin-left: auto;
  font-size: 0.9rem;
}
.log {
  font-family: var(--mono);
  font-size: 0.85rem;
  line-height: 1.42;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-left: 3px solid var(--inchiostro);
  border-radius: 4px;
  padding: 0.35rem 0.7rem;
  height: calc(9 * 1.42 * 0.85rem + 0.7rem + 2px);
  overflow: hidden;
}
.log p {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.log .no {
  color: var(--grigio);
}
.log .colpo {
  font-weight: 700;
}
.vuoto {
  color: var(--grigio);
}
</style>
