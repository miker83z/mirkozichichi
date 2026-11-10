<!--
  How long does it take to try every combination? Two tabs.
  "Password": alphabet, length and attacker speed → combinations and worst-case time, plus a table
  (computed, not typed in) of typical passwords at every speed. In the PDF this tab is shown.
  "Chiavi": key length in bits (40 … 256, DES, AES) and speed → 2^bits keys, worst-case and average time.

  <KeySpace />
  <KeySpace scheda="chiavi" :bit="56" />
  <KeySpace :velocitaChiavi="[{ valore: 1e9, etichetta: 'un portatile' }, { valore: 1e15, etichetta: 'un supercomputer' }]" />

  Props: scheda?: 'password' | 'chiavi', lunghezza?: number (default 8), alfabeto?: 26 | 52 | 62 | 95,
         bit?: number (default 128),
         velocitaPassword?: { valore: number, etichetta: string }[] (default 1e9 un computer,
           1e13 un grande impianto dedicato; the table has one column per speed),
         velocitaChiavi?: { valore: number, etichetta: string }[] (default 1e9, 1e12, 1e18)
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNav } from '@slidev/client'
import { durata, scientific } from '../utils/crypto'
import { ETA_UNIVERSO_ANNI, SECONDI_ANNO, apici, inParole, potenzaDieci } from '../utils/esponenti'

interface Velocita { valore: number, etichetta: string }

const props = withDefaults(defineProps<{
  scheda?: 'password' | 'chiavi'
  lunghezza?: number
  alfabeto?: number
  bit?: number
  velocitaPassword?: Velocita[]
  velocitaChiavi?: Velocita[]
}>(), {
  scheda: 'password',
  lunghezza: 8,
  alfabeto: 26,
  bit: 128,
  velocitaPassword: () => [
    { valore: 1e9, etichetta: 'un computer' },
    { valore: 1e13, etichetta: 'un grande impianto dedicato' },
  ],
  velocitaChiavi: () => [
    { valore: 1e9, etichetta: 'un computer' },
    { valore: 1e12, etichetta: 'mille computer' },
    { valore: 1e18, etichetta: 'un miliardo di computer' },
  ],
})

const ALFABETI = [
  { n: 26, nome: 'solo minuscole', breve: 'minuscole' },
  { n: 52, nome: 'minuscole e maiuscole', breve: 'minuscole e maiuscole' },
  { n: 62, nome: 'lettere e cifre', breve: 'lettere e cifre' },
  { n: 95, nome: 'tutti i caratteri stampabili', breve: 'tutti i caratteri' },
]
const BIT = [
  { n: 40, nome: '40 bit' },
  { n: 56, nome: '56 bit (DES)' },
  { n: 64, nome: '64 bit' },
  { n: 80, nome: '80 bit' },
  { n: 128, nome: '128 bit (AES-128)' },
  { n: 256, nome: '256 bit (AES-256)' },
]
const RIGHE_TABELLA = [
  { n: 26, l: 8 },
  { n: 26, l: 10 },
  { n: 26, l: 12 },
  { n: 62, l: 12 },
  { n: 62, l: 15 },
]

const { isPrintMode } = useNav()
const sceltaScheda = ref(props.scheda)
const scheda = computed(() => (isPrintMode.value ? 'password' : sceltaScheda.value))

// Password
const alfabeto = ref(props.alfabeto)
const lunghezza = ref(props.lunghezza)
const velP = ref(props.velocitaPassword[0].valore)
const combinazioni = computed(() => alfabeto.value ** lunghezza.value)
const secondiP = computed(() => combinazioni.value / velP.value)

// Chiavi
const bit = ref(props.bit)
const velK = ref(props.velocitaChiavi[0].valore)
const chiavi = computed(() => 2 ** bit.value)
const secondiK = computed(() => chiavi.value / velK.value)

const h = apici
const tempo = (s: number) => apici(durata(s))
function confrontoUniverso(secondi: number): string {
  const volte = secondi / SECONDI_ANNO / ETA_UNIVERSO_ANNI
  if (volte < 0.01) return ''
  if (volte < 1) return `circa ${Math.round(volte * 100)}% dell'età dell'universo`
  return `circa ${apici(scientific(volte))} volte l'età dell'universo`
}
const nomeAlfabeto = (n: number) => ALFABETI.find(a => a.n === n)?.breve ?? `${n} simboli`

const tabella = computed(() =>
  RIGHE_TABELLA.map(r => ({
    descr: `${r.l} caratteri, ${nomeAlfabeto(r.n)}`,
    comb: h(`${r.n}^${r.l} ≈ ${scientific(r.n ** r.l)}`),
    tempi: props.velocitaPassword.map(v => tempo((r.n ** r.l) / v.valore)),
  })),
)
</script>

<template>
  <div class="demo key-space">
    <div class="schede" role="tablist">
      <button
        role="tab" class="linguetta" :class="{ attiva: scheda === 'password' }" :aria-selected="scheda === 'password'"
        :disabled="isPrintMode" @click="sceltaScheda = 'password'"
      >Password</button>
      <button
        role="tab" class="linguetta" :class="{ attiva: scheda === 'chiavi' }" :aria-selected="scheda === 'chiavi'"
        :disabled="isPrintMode" @click="sceltaScheda = 'chiavi'"
      >Chiavi</button>
      <span class="eta grigio">età dell'universo ≈ 1,38 × 10<sup>10</sup> anni</span>
    </div>

    <div v-if="scheda === 'password'" role="tabpanel">
      <div class="controlli tre">
        <div>
          <label for="ks-alf">Alfabeto</label>
          <select id="ks-alf" v-model.number="alfabeto" :disabled="isPrintMode">
            <option v-for="a in ALFABETI" :key="a.n" :value="a.n">{{ a.nome }} ({{ a.n }})</option>
          </select>
        </div>
        <div>
          <label for="ks-len">Lunghezza: <strong class="rosso">{{ lunghezza }}</strong> caratteri</label>
          <input id="ks-len" v-model.number="lunghezza" type="range" min="4" max="20" :disabled="isPrintMode">
        </div>
        <div>
          <label for="ks-velp">Chi attacca: tentativi al secondo</label>
          <select id="ks-velp" v-model.number="velP" :disabled="isPrintMode">
            <option v-for="v in velocitaPassword" :key="v.valore" :value="v.valore">{{ v.etichetta }}: {{ inParole(v.valore) }} al secondo</option>
          </select>
        </div>
      </div>
      <p class="risultato">
        <span v-html="h(`${alfabeto}^${lunghezza} ≈ ${scientific(combinazioni)}`)" /> combinazioni →
        nel caso peggiore <strong class="tempo" v-html="tempo(secondiP)" />
        <span v-if="confrontoUniverso(secondiP)" class="grigio piccolo"> (<span v-html="confrontoUniverso(secondiP)" />)</span>
      </p>
      <table class="tabella">
        <thead>
          <tr>
            <th>Password</th>
            <th>Combinazioni</th>
            <th v-for="v in velocitaPassword" :key="v.valore">{{ v.etichetta }} (<span v-html="h(potenzaDieci(v.valore))" />/s)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in tabella" :key="r.descr">
            <td>{{ r.descr }}</td>
            <td v-html="r.comb" />
            <td v-for="(t, i) in r.tempi" :key="i" v-html="t" />
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else role="tabpanel">
      <div class="controlli due">
        <div>
          <label for="ks-bit">Lunghezza della chiave</label>
          <select id="ks-bit" v-model.number="bit">
            <option v-for="b in BIT" :key="b.n" :value="b.n">{{ b.nome }}</option>
          </select>
        </div>
        <div>
          <label for="ks-velk">Chi attacca: tentativi al secondo</label>
          <select id="ks-velk" v-model.number="velK">
            <option v-for="v in velocitaChiavi" :key="v.valore" :value="v.valore">{{ v.etichetta }}: {{ inParole(v.valore) }} al secondo</option>
          </select>
        </div>
      </div>
      <dl class="chiavi">
        <dt>Chiavi possibili</dt>
        <dd><span class="grande" v-html="h(`2^${bit}`)" /> ≈ <span v-html="h(scientific(chiavi))" /></dd>
        <dt>Caso peggiore: provarle tutte</dt>
        <dd>
          <strong class="tempo" v-html="tempo(secondiK)" />
          <span v-if="confrontoUniverso(secondiK)" class="grigio piccolo"> (<span v-html="confrontoUniverso(secondiK)" />)</span>
        </dd>
        <dt>In media: metà delle chiavi</dt>
        <dd>
          <strong class="tempo" v-html="tempo(secondiK / 2)" />
        </dd>
      </dl>
      <p class="nota grigio">Ogni bit in più raddoppia il numero di chiavi: 2<sup>{{ bit }}</sup> = 2 × 2 × … × 2, {{ bit }} volte.</p>
    </div>
  </div>
</template>

<style scoped>
.key-space {
  max-width: 880px;
}
.schede {
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;
  border-bottom: 1px solid var(--linea);
  margin: -0.2rem 0 0.5rem;
}
.linguetta {
  font-family: var(--sans);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--grigio);
  background: none;
  border: 0;
  border-bottom: 3px solid transparent;
  padding: 0.15rem 0.7rem 0.2rem;
  cursor: pointer;
}
.linguetta.attiva {
  color: var(--rubrica);
  border-bottom-color: var(--rubrica);
}
.linguetta:disabled {
  cursor: default;
}
.linguetta:disabled:not(.attiva) {
  opacity: 0.5;
}
.linguetta:focus-visible {
  outline: 2px solid var(--rubrica);
  outline-offset: 1px;
}
.eta {
  margin-left: auto;
  font-size: 0.85rem;
  padding-bottom: 0.25rem;
}
.controlli {
  display: grid;
  gap: 1rem;
}
.controlli.tre {
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 0.65fr) minmax(0, 1.5fr);
}
.controlli.due {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr);
}
.controlli select {
  font-size: 0.85rem;
}
.risultato {
  margin: 0.5rem 0 0.4rem;
  font-size: 1rem;
}
.tempo {
  font-size: 1.1rem;
  color: var(--rubrica);
}
.tabella {
  font-size: 0.85rem;
  width: 100%;
}
.tabella th {
  font-size: 0.8rem;
  padding: 0.15rem 0.5rem;
}
.tabella td {
  padding: 0.12rem 0.5rem;
}
.chiavi {
  display: grid;
  grid-template-columns: 15rem minmax(0, 1fr);
  gap: 0.35rem 1rem;
  margin: 0.7rem 0 0.3rem;
  align-items: baseline;
}
.chiavi dt {
  color: var(--grigio);
  font-size: 0.9rem;
}
.chiavi dd {
  margin: 0;
}
.grande {
  font-family: var(--serif);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--rubrica);
}
.nota {
  font-size: 0.85rem;
  margin: 0.4rem 0 0;
}
.key-space :deep(sup),
.key-space sup {
  font-size: 0.8rem;
  line-height: 0;
}
</style>
