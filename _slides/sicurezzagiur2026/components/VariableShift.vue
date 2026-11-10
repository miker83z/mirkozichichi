<!--
  "La chiave che cambia". Part 1: the same message encrypted several times, each time with a different
  Caesar shift, gives different ciphertexts (Hello → Khoor with 3, → Gdkkn with −1, …).
  Part 2 (switch): Vigenère, where the shift changes at every letter following a key word
  (LEX: L = 11, E = 4, X = 23). In the PDF both parts are shown.

  <VariableShift />
  <VariableShift messaggio="Attacco" :spostamenti="[5, 12, -3]" parola="CODICE" />
  <VariableShift vigenere />                         part 2 already open

  Props: messaggio?: string (default 'Hello'), spostamenti?: number[] (default [3, -1, 2, 6]),
         parola?: string (default 'LEX'), vigenere?: boolean
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNav } from '@slidev/client'
import { cesare, vigenere as passiVigenere } from '../utils/cifrari'

const props = withDefaults(defineProps<{
  messaggio?: string
  spostamenti?: number[]
  parola?: string
  vigenere?: boolean
}>(), {
  messaggio: 'Hello',
  spostamenti: () => [3, -1, 2, 6],
  parola: 'LEX',
})

const MAX_LETTERE = 16

const { isPrintMode } = useNav()
const msg = ref(props.messaggio)
const parolaChiave = ref(props.parola)
const apriVigenere = ref(props.vigenere)
const mostraVigenere = computed(() => isPrintMode.value || apriVigenere.value)

const cifrature = computed(() =>
  props.spostamenti.map((s, i) => ({ n: i + 1, s, testo: cesare(msg.value, s) })),
)
const conSegno = (s: number) => (s > 0 ? `+${s}` : s < 0 ? `−${-s}` : '0')

const passi = computed(() => passiVigenere([...msg.value].slice(0, MAX_LETTERE).join(''), parolaChiave.value))
const risultatoVigenere = computed(() => passiVigenere(msg.value, parolaChiave.value).map(p => p.risultato).join(''))
const lettereChiave = computed(() =>
  [...new Set([...parolaChiave.value.toUpperCase()].filter(c => /[A-Z]/.test(c)))]
    .map(c => `${c} = ${c.charCodeAt(0) - 65}`)
    .join(', '),
)
</script>

<template>
  <div class="demo variable-shift">
    <div class="riga-msg">
      <div class="campo">
        <label for="vs-msg">Messaggio</label>
        <input id="vs-msg" v-model="msg" type="text" maxlength="30" spellcheck="false" :readonly="isPrintMode">
      </div>
      <p class="idea">Stesso messaggio, chiave diversa ogni volta: <strong>testi cifrati diversi</strong>.
        Chi intercetta non capisce nemmeno che il messaggio si ripete.</p>
    </div>

    <ol class="cifrature">
      <li v-for="c in cifrature" :key="c.n">
        <span class="n">Cifratura n. {{ c.n }}</span>
        <span class="sposta">spostamento {{ conSegno(c.s) }}</span>
        <span class="esito"><template v-if="[...msg].length <= 10"><span class="chiaro">{{ msg }}</span> → </template><strong class="cifrato">{{ c.testo }}</strong></span>
      </li>
    </ol>

    <div class="vigenere-testa">
      <button v-if="!isPrintMode" class="btn" :class="{ pieno: apriVigenere }" :aria-pressed="apriVigenere" @click="apriVigenere = !apriVigenere">
        Vigenère: la chiave cambia a ogni lettera
      </button>
      <h3 v-else class="titoletto">Vigenère: la chiave cambia a ogni lettera</h3>
      <template v-if="mostraVigenere">
        <label for="vs-parola" class="inline">Parola chiave</label>
        <input id="vs-parola" v-model="parolaChiave" type="text" maxlength="12" spellcheck="false" class="parola" :readonly="isPrintMode">
        <span class="grigio piccolo">{{ lettereChiave }} (A = 0 … Z = 25)</span>
      </template>
    </div>

    <table v-if="mostraVigenere" class="tavola">
      <tbody>
        <tr>
          <th>Messaggio</th>
          <td v-for="(p, i) in passi" :key="`m${i}`">{{ p.car === ' ' ? '␣' : p.car }}</td>
        </tr>
        <tr>
          <th>Lettera della chiave</th>
          <td v-for="(p, i) in passi" :key="`c${i}`" class="rosso">{{ p.chiave || '·' }}</td>
        </tr>
        <tr>
          <th>Spostamento</th>
          <td v-for="(p, i) in passi" :key="`s${i}`">{{ p.spostamento ?? '·' }}</td>
        </tr>
        <tr class="ris">
          <th>Risultato</th>
          <td v-for="(p, i) in passi" :key="`r${i}`">{{ p.risultato === ' ' ? '␣' : p.risultato }}</td>
        </tr>
      </tbody>
    </table>
    <p v-if="mostraVigenere" class="nota grigio">
      <span v-if="[...msg].length > MAX_LETTERE">Tabella dei primi {{ MAX_LETTERE }} caratteri; risultato completo: <strong class="mono">{{ risultatoVigenere }}</strong>. </span>
      La stessa lettera del messaggio può diventare lettere diverse: le frequenze delle lettere non si riconoscono più.
    </p>
  </div>
</template>

<style scoped>
.variable-shift {
  max-width: 880px;
}
.riga-msg {
  display: grid;
  grid-template-columns: 12rem minmax(0, 1fr);
  gap: 1rem;
  align-items: end;
}
.riga-msg input {
  font-family: var(--mono);
}
.idea {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.35;
}
.cifrature {
  list-style: none;
  margin: 0.55rem 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr));
  gap: 0.45rem;
}
.cifrature li {
  margin: 0;
  display: flex;
  flex-direction: column;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 5px;
  padding: 0.25rem 0.55rem;
}
.cifrature li::marker {
  content: none;
}
.n {
  font-size: 0.8rem;
  color: var(--grigio);
}
.sposta {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--rubrica);
}
.esito {
  font-family: var(--mono);
  font-size: 1rem;
  overflow-wrap: anywhere;
}
.chiaro {
  color: var(--grigio);
}
.cifrato {
  color: var(--inchiostro);
}
.vigenere-testa {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.3rem 0.6rem;
  margin-top: 0.65rem;
}
.titoletto {
  font-family: var(--serif);
  font-size: 1rem;
  color: var(--rubrica);
  margin: 0 0.4rem 0 0;
}
label.inline {
  display: inline;
  margin: 0;
}
.parola {
  width: 6.5rem !important;
  font-family: var(--mono) !important;
  text-transform: uppercase;
  padding: 0.1rem 0.4rem !important;
}
.tavola {
  margin-top: 0.4rem;
  width: auto;
  font-family: var(--mono);
  font-size: 0.95rem;
  border-collapse: collapse;
}
.tavola th {
  font-family: var(--sans);
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--grigio);
  text-align: right;
  border: 0;
  padding: 0.05rem 0.7rem 0.05rem 0;
  white-space: nowrap;
}
.tavola td {
  text-align: center;
  min-width: 1.9rem;
  border: 0;
  border-left: 1px solid var(--linea);
  padding: 0.05rem 0.3rem;
}
.tavola .ris td {
  font-weight: 700;
  border-top: 2px solid var(--inchiostro);
}
.nota {
  margin: 0.3rem 0 0;
  font-size: 0.85rem;
}
.mono {
  font-family: var(--mono);
}
</style>
