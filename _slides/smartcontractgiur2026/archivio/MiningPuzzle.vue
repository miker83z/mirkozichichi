<!--
  "Puzzle di ricerca" (proof of work): find a number x such that SHA-256(k + x) starts with d
  zeros (hex). The only way is to try x = 0, 1, 2, …; on average it takes 16^d attempts.
  The search runs a few thousand hashes per frame, so the slide stays responsive; "Ferma" stops it.
  In the PDF the solution is computed synchronously (difficulty capped at 4 there).

  <MiningPuzzle />
  <MiningPuzzle dati="Blocco 7: Carla paga Dario 3" :difficolta="3" stretto />

  Props
  - dati: the block data k (default "Blocco 1: Alice paga Bob 10")
  - difficolta: number of leading hex zeros, 1–6 (default 4)
  - stretto: narrower layout for the main column of the `glossa` layout
-->
<script setup lang="ts">
import { computed, onUnmounted, ref, useId, watch } from 'vue'
import { onSlideLeave, useNav } from '@slidev/client'
import { sha256 } from '../utils/crypto'

const props = withDefaults(defineProps<{ dati?: string, difficolta?: number, stretto?: boolean }>(), {
  dati: 'Blocco 1: Alice paga Bob 10',
  difficolta: 4,
})

const { isPrintMode } = useNav()
const uid = useId()
const it = (x: number) => x.toLocaleString('it-IT')

const k = ref(props.dati)
const iniziale = Math.min(6, Math.max(1, Math.round(props.difficolta)))
const d = ref(isPrintMode.value ? Math.min(iniziale, 4) : iniziale)

type Stato = 'fermo' | 'in corso' | 'trovato' | 'interrotto'
const stato = ref<Stato>('fermo')
const tentativi = ref(0)
const ultimo = ref('')
const soluzione = ref<{ x: number, hash: string } | null>(null)
const millisecondi = ref(0)

let x = 0
let inizio = 0
let frame = 0

const attesi = computed(() => 16 ** d.value)
const zeri = computed(() => '0'.repeat(d.value))

function ferma() {
  if (frame) cancelAnimationFrame(frame)
  frame = 0
  if (stato.value === 'in corso') stato.value = 'interrotto'
}

function azzera() {
  ferma()
  stato.value = 'fermo'
  tentativi.value = 0
  ultimo.value = ''
  soluzione.value = null
  millisecondi.value = 0
}

/** Tries x, x+1, … until a solution is found or the time budget (ms) is spent. */
function cerca(budget: number) {
  const dati = k.value
  const obiettivo = zeri.value
  const t0 = performance.now()
  let h = ''
  do {
    for (let i = 0; i < 256; i++) {
      h = sha256(dati + x)
      if (h.startsWith(obiettivo)) {
        soluzione.value = { x, hash: h }
        stato.value = 'trovato'
        break
      }
      x++
    }
  } while (stato.value === 'in corso' && performance.now() - t0 < budget)
  ultimo.value = h
  tentativi.value = soluzione.value ? soluzione.value.x + 1 : x
}

function passo() {
  cerca(14)
  millisecondi.value = performance.now() - inizio
  frame = stato.value === 'in corso' ? requestAnimationFrame(passo) : 0
}

function avvia() {
  azzera()
  x = 0
  inizio = performance.now()
  stato.value = 'in corso'
  frame = requestAnimationFrame(passo)
}

watch([k, d], azzera)
onSlideLeave(ferma)
onUnmounted(ferma)

if (isPrintMode.value) {
  x = 0
  stato.value = 'in corso'
  cerca(Number.POSITIVE_INFINITY)
}

const alSecondo = computed(() => (millisecondi.value > 100 ? Math.round(tentativi.value / (millisecondi.value / 1000)) : 0))
const tempo = computed(() => `${(millisecondi.value / 1000).toFixed(1).replace('.', ',')} s`)
const mostrato = computed(() => soluzione.value?.hash ?? ultimo.value)
</script>

<template>
  <div class="demo mining-puzzle" :class="{ stretto }">
    <div class="parametri">
      <div class="dati">
        <label :for="`${uid}-k`">Dati del blocco k</label>
        <input :id="`${uid}-k`" v-model="k" type="text" spellcheck="false" :readonly="stato === 'in corso'">
      </div>
      <div class="difficolta">
        <label :for="`${uid}-d`">Difficoltà d</label>
        <select :id="`${uid}-d`" v-model.number="d" :disabled="stato === 'in corso'">
          <option v-for="n in 6" :key="n" :value="n">{{ n }} {{ n === 1 ? 'zero' : 'zeri' }}</option>
        </select>
      </div>
    </div>

    <p class="obiettivo">
      Trova un numero x tale che l'impronta H(k + x) inizi con <strong class="mono">{{ zeri }}</strong>.
      Si può solo tirare a indovinare: in media servono 16<sup>{{ d }}</sup> = <strong>{{ it(attesi) }}</strong> tentativi.
    </p>

    <div class="comandi">
      <button v-if="!isPrintMode" class="btn pieno" :disabled="stato === 'in corso'" @click="avvia">Cerca</button>
      <button v-if="!isPrintMode" class="btn" :disabled="stato !== 'in corso'" @click="ferma">Ferma</button>
      <span v-if="stato !== 'fermo'" class="contatori">
        tentativi <strong>{{ it(tentativi) }}</strong>
        <template v-if="!isPrintMode">
          · {{ alSecondo ? `${it(alSecondo)} impronte al secondo` : 'in corso' }} · {{ tempo }}
        </template>
      </span>
    </div>

    <p class="impronta" :class="{ trovata: soluzione, vuota: !mostrato }">
      <span class="etichetta">{{ soluzione ? `H(k + ${soluzione.x})` : stato === 'fermo' ? 'Ultima impronta provata' : `H(k + ${Math.max(0, tentativi - 1)})` }}</span>
      <span v-if="mostrato" class="hex"><span v-if="soluzione" class="zeri">{{ mostrato.slice(0, d) }}</span>{{ soluzione ? mostrato.slice(d) : mostrato }}</span>
      <span v-else class="hex grigio">—</span>
    </p>

    <p v-if="soluzione" class="esito esito-ok">
      ✓ Trovato: x = {{ soluzione.x }}, dopo {{ it(tentativi) }} tentativi.
      <span class="nota">Verificarlo invece richiede un solo calcolo.</span>
    </p>
    <p v-else-if="stato === 'interrotto'" class="esito esito-ko">
      ✗ Fermato dopo {{ it(tentativi) }} tentativi, senza soluzione.
    </p>
  </div>
</template>

<style scoped>
.mining-puzzle {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.parametri {
  display: flex;
  gap: 1rem;
}
.dati {
  flex: 1;
  min-width: 0;
}
.difficolta {
  flex: none;
  width: 8.5rem;
}
.obiettivo {
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
}
.mono {
  font-family: var(--mono);
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
.impronta {
  margin: 0;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 4px;
  padding: 0.35rem 0.6rem;
}
.impronta.trovata {
  border-color: var(--ok);
}
.etichetta {
  display: block;
  font-size: 0.85rem;
  color: var(--grigio);
}
.impronta .hex {
  font-size: 0.9rem;
}
.stretto .impronta .hex {
  font-size: 0.82rem;
}
.zeri {
  color: var(--ok);
  font-weight: 700;
  background: color-mix(in srgb, var(--ok) 14%, var(--carta));
}
.esito {
  margin: 0;
  font-size: 1.05rem;
}
.nota {
  font-weight: 400;
  color: var(--inchiostro);
  font-size: 0.95rem;
}
</style>
