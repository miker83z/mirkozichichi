<!--
  The Caesar cipher: every letter moves forward by K places in the alphabet (A–Z only; case is kept,
  accents, digits, spaces and punctuation stay as they are).

  modo="cifra"       type a text, move the key K (0–25) and see the alphabet mapping and the result.
  modo="forzabruta"  all 25 possible keys tried on a ciphertext: click the row that reads well.
                     In the PDF the right row (chiaveVera) is highlighted.

  <Caesar />                                          cifra, "Attacco all'alba" with K = 3
  <Caesar testo="Pagate il riscatto" :chiave="5" />
  <Caesar modo="forzabruta" />                        ciphertext of "Attacco all'alba" with K = 3
  <Caesar modo="forzabruta" testo="Wkh hdjoh kdv odqghg" :chiaveVera="3" />
  <Caesar modo="forzabruta" stretto />                narrower grid, next to the glossa margin

  Props: modo?: 'cifra' | 'forzabruta', testo?: string, chiave?: number (default 3),
         chiaveVera?: number (the right key in forzabruta; if missing, it is guessed from Italian
         letter frequencies), stretto?: boolean
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNav } from '@slidev/client'
import { ALFABETO, cesare, chiaveProbabile, indiceLettera, modulo26 } from '../utils/cifrari'

const props = withDefaults(defineProps<{
  modo?: 'cifra' | 'forzabruta'
  testo?: string
  chiave?: number
  chiaveVera?: number
  stretto?: boolean
}>(), {
  modo: 'cifra',
  chiave: 3,
})

const { isPrintMode } = useNav()

const testoIniziale = props.testo ?? (props.modo === 'forzabruta' ? cesare("Attacco all'alba", 3) : "Attacco all'alba")
const testo = ref(testoIniziale)
const k = ref(modulo26(props.chiave))

// Cifra
const cifrato = computed(() => cesare(testo.value, k.value))
const usate = computed(() => {
  const s = new Set<number>()
  for (const ch of testo.value) {
    const i = indiceLettera(ch)
    if (i >= 0) s.add(i)
  }
  return s
})
const spostato = computed(() => [...ALFABETO].map((_, i) => ALFABETO[(i + k.value) % 26]))

// Forza bruta
const tentativi = computed(() =>
  Array.from({ length: 25 }, (_, i) => ({ k: i + 1, testo: cesare(testo.value, -(i + 1)) })),
)
const giusta = computed(() => {
  if (testo.value === testoIniziale && (props.chiaveVera !== undefined || props.testo === undefined))
    return modulo26(props.chiaveVera ?? 3)
  return chiaveProbabile(testo.value)
})
const scelta = ref<number | null>(null)
const segnata = computed(() => (isPrintMode.value ? giusta.value : scelta.value))
function scegli(n: number) {
  scelta.value = scelta.value === n ? null : n
}
</script>

<template>
  <div class="demo caesar" :class="{ stretto }">
    <template v-if="modo === 'cifra'">
      <div class="controlli">
        <div>
          <label for="cs-testo">Testo in chiaro</label>
          <input id="cs-testo" v-model="testo" type="text" maxlength="60" spellcheck="false" :readonly="isPrintMode">
        </div>
        <div>
          <label for="cs-k">Chiave K = <strong class="rosso">{{ k }}</strong>: ogni lettera avanza di {{ k }} {{ k === 1 ? 'posto' : 'posti' }}</label>
          <input id="cs-k" v-model.number="k" type="range" min="0" max="25" :disabled="isPrintMode">
        </div>
      </div>

      <div class="mappa">
        <span class="nome-riga">in chiaro</span>
        <span v-for="(l, i) in ALFABETO" :key="`c${i}`" class="cella" :class="{ usata: usate.has(i) }">{{ l }}</span>
        <span class="nome-riga">cifrato</span>
        <span v-for="(l, i) in spostato" :key="`s${i}`" class="cella cifra" :class="{ usata: usate.has(i) }">{{ l }}</span>
      </div>

      <div class="uscita">
        <span class="grigio">Testo cifrato</span>
        <span class="risultato">{{ cifrato }}</span>
        <span v-if="k === 0" class="grigio piccolo">con K = 0 il testo non cambia</span>
      </div>
    </template>

    <template v-else>
      <div class="controlli uno">
        <div>
          <label for="cs-cifrato">Testo cifrato intercettato (chiave sconosciuta)</label>
          <input id="cs-cifrato" v-model="testo" type="text" maxlength="40" spellcheck="false" :readonly="isPrintMode" @input="scelta = null">
        </div>
      </div>
      <p class="istruzioni grigio">Proviamo tutte le 25 chiavi. Quale riga si legge?</p>
      <div class="griglia">
        <button
          v-for="t in tentativi" :key="t.k" class="prova"
          :class="{ trovata: segnata === t.k && t.k === giusta, sbagliata: segnata === t.k && t.k !== giusta }"
          :title="t.testo" :disabled="isPrintMode" @click="scegli(t.k)"
        >
          <span class="kk">K = {{ t.k }}</span>
          <span class="chiaro">{{ t.testo }}</span>
        </button>
      </div>
      <p class="esito">
        <span v-if="segnata === null" class="grigio">Clicca la riga leggibile.</span>
        <span v-else-if="segnata === giusta" class="esito-ok">✓ Trovata: K = {{ giusta }}, al massimo 25 tentativi.</span>
        <span v-else class="esito-ko">✗ Con K = {{ segnata }} non si legge nulla: prova un'altra riga.</span>
      </p>
    </template>
  </div>
</template>

<style scoped>
.caesar {
  max-width: 880px;
}
.controlli {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.2rem;
  margin-bottom: 0.6rem;
}
.controlli.uno {
  grid-template-columns: minmax(0, 1fr);
  margin-bottom: 0.2rem;
}
.stretto .controlli {
  grid-template-columns: minmax(0, 1fr);
  gap: 0.4rem;
}
input[type='text'] {
  font-family: var(--mono);
}
.mappa {
  display: grid;
  grid-template-columns: auto repeat(26, minmax(0, 1fr));
  gap: 2px;
  font-family: var(--mono);
  font-size: 0.95rem;
  text-align: center;
}
.stretto .mappa {
  font-size: 0.8rem;
  gap: 1px;
}
.nome-riga {
  font-family: var(--sans);
  font-size: 0.8rem;
  color: var(--grigio);
  text-align: right;
  padding-right: 0.4rem;
  align-self: center;
}
.cella {
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 3px;
  line-height: 1.6;
}
.cella.cifra {
  color: var(--rubrica);
  font-weight: 700;
}
.cella.usata {
  border-color: var(--inchiostro);
  box-shadow: inset 0 0 0 1px var(--inchiostro);
}
.uscita {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.2rem 0.8rem;
  margin-top: 0.7rem;
}
.risultato {
  font-family: var(--mono);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--rubrica);
  overflow-wrap: anywhere;
}
.istruzioni {
  font-size: 0.85rem;
  margin: 0.25rem 0 0.35rem;
}
.griglia {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 3px 4px;
}
.stretto .griglia {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}
.prova {
  display: flex;
  align-items: baseline;
  gap: 0.4rem;
  min-width: 0;
  text-align: left;
  background: var(--carta);
  color: var(--inchiostro);
  border: 1px solid var(--linea);
  border-radius: 4px;
  padding: 0.12rem 0.35rem;
  cursor: pointer;
  font-family: var(--mono);
  overflow: hidden;
}
.stretto .prova {
  flex-direction: column;
  gap: 0;
  padding: 0.05rem 0.3rem;
}
.prova:hover:not(:disabled) {
  border-color: var(--rubrica);
}
.prova:disabled {
  cursor: default;
  color: var(--inchiostro);
}
.prova:focus-visible {
  outline: 2px solid var(--rubrica);
  outline-offset: 1px;
}
.kk {
  font-family: var(--sans);
  font-size: 0.8rem;
  color: var(--grigio);
  white-space: nowrap;
}
.chiaro {
  max-width: 100%;
  font-size: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.prova.trovata {
  border-color: var(--ok);
  box-shadow: inset 0 0 0 1px var(--ok);
  background: #eef6f1;
}
.prova.trovata .chiaro {
  font-weight: 700;
  color: var(--ok);
}
.prova.sbagliata {
  border-color: var(--ko);
  box-shadow: inset 0 0 0 1px var(--ko);
}
.esito {
  margin: 0.45rem 0 0;
  font-size: 1rem;
}
</style>
