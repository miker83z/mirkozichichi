<!--
  A chain of four blocks linked by hash pointers, like a register of minutes.
  Each block stores "prev", the digest of the previous block, and has its own digest
  H(numero ‖ prev ‖ dati). The last digest is deposited with a notary as a public reference.
  Editing a block changes its digest: the next block's stored prev no longer matches, so that
  block shows "✗ collegamento spezzato" and the following ones "✗ segue un collegamento spezzato"
  (red borders from there on). "L'attaccante ricalcola tutta la catena" updates every prev pointer:
  the links are consistent again, but the last digest no longer matches the deposited one.
  In the PDF block 2 has been changed (broken link).

  <HashChain />
  <HashChain :blocchi="['Atto 1', 'Atto 2', 'Atto 3', 'Atto 4']" stretto />

  Props
  - blocchi: the data of the blocks (default four court minutes, "Verbale 1: apertura dell'udienza", …)
  - stretto: narrower layout for the main column of the `glossa` layout (the per-block state
    lines are left out; borders, arrows and the summary line still tell the state)
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNav } from '@slidev/client'
import { sha256, short } from '../utils/crypto'

const props = withDefaults(defineProps<{ blocchi?: string[], stretto?: boolean }>(), {
  blocchi: () => [
    "Verbale 1: apertura dell'udienza",
    'Verbale 2: deposito memorie',
    'Verbale 3: audizione testi',
    'Verbale 4: rinvio',
  ],
})

const { isPrintMode } = useNav()

const GENESI = '0'.repeat(64)
const impronta = (i: number, prev: string, dati: string) => sha256(`${i + 1}\n${prev}\n${dati}`)

/** The prev pointers of a consistent chain for the given data. */
function collega(dati: string[]) {
  const prev: string[] = []
  let p = GENESI
  dati.forEach((d, i) => {
    prev.push(p)
    p = impronta(i, p, d)
  })
  return { prev, ultima: p }
}

const originale = collega(props.blocchi)
const depositata = originale.ultima

const dati = ref([...props.blocchi])
const prev = ref([...originale.prev])

if (isPrintMode.value && dati.value.length > 1)
  dati.value[1] = 'Verbale 2: nessun deposito di memorie'

const hash = computed(() => dati.value.map((d, i) => impronta(i, prev.value[i], d)))
const spezzato = computed(() => dati.value.map((_, i) => i > 0 && prev.value[i] !== hash.value[i - 1]))
const primoRotto = computed(() => spezzato.value.indexOf(true))
const ultima = computed(() => hash.value[hash.value.length - 1])
const conforme = computed(() => ultima.value === depositata)
const intatta = computed(() =>
  dati.value.every((d, i) => d === props.blocchi[i]) && prev.value.every((p, i) => p === originale.prev[i]))

function stato(i: number) {
  if (primoRotto.value === -1 || i < primoRotto.value) return 'ok'
  return i === primoRotto.value ? 'rotto' : 'dopo'
}

function ripristina() {
  dati.value = [...props.blocchi]
  prev.value = [...originale.prev]
}

function ricalcola() {
  prev.value = collega(dati.value).prev
}

const corto = (h: string) => (props.stretto ? short(h, 5, 3) : short(h, 8, 4))
</script>

<template>
  <div class="demo hash-chain" :class="{ stretto }">
    <ol class="catena">
      <li
        v-for="(d, i) in dati"
        :key="i"
        class="blocco"
        :class="{ 'bordo-ko': stato(i) !== 'ok' || (i === dati.length - 1 && !conforme) }"
      >
        <p class="numero">Blocco {{ i + 1 }}</p>
        <textarea
          v-model="dati[i]"
          :rows="stretto ? 3 : 2"
          spellcheck="false"
          :aria-label="`Dati del blocco ${i + 1}`"
          :readonly="isPrintMode"
        />
        <p class="puntatore">
          <span class="chiave">prev</span>
          <span class="hex" :class="{ ko: spezzato[i] }">{{ corto(prev[i]) }}</span>
        </p>
        <p class="puntatore">
          <span class="chiave">impronta</span>
          <span class="hex forte" :class="{ ko: spezzato[i + 1] || (i === dati.length - 1 && !conforme) }">{{ corto(hash[i]) }}</span>
        </p>
        <!-- In the narrow layout the state of the links is told by the borders, the arrows and the summary below. -->
        <template v-if="!stretto">
          <p v-if="stato(i) === 'rotto'" class="stato esito-ko">✗ collegamento spezzato</p>
          <p v-else-if="stato(i) === 'dopo'" class="stato esito-ko">✗ segue un collegamento spezzato</p>
          <p v-else-if="i === 0" class="stato grigio">primo blocco</p>
          <p v-else class="stato esito-ok">✓ collegato</p>
        </template>
        <span v-if="i < dati.length - 1" class="freccia" :class="{ ko: spezzato[i + 1] }" aria-hidden="true">→</span>
      </li>
    </ol>

    <div class="piede-catena">
      <p v-if="primoRotto !== -1" class="riepilogo esito-ko">
        ✗ Collegamento spezzato: il blocco {{ primoRotto + 1 }} non contiene più l'impronta del blocco {{ primoRotto }}, la modifica si vede.
      </p>
      <p v-else-if="!conforme" class="riepilogo esito-ko">
        ✗ I collegamenti tornano, ma l'ultima impronta non corrisponde all'impronta depositata.
      </p>
      <p v-else class="riepilogo esito-ok">
        ✓ Catena integra: ogni blocco contiene l'impronta del precedente.
      </p>
      <p v-if="!isPrintMode" class="comandi">
        <button class="btn" :disabled="intatta" @click="ripristina">Ripristina</button>
        <button class="btn pieno" :disabled="primoRotto === -1" @click="ricalcola">L'attaccante ricalcola tutta la catena</button>
      </p>
      <p v-else class="grigio piccolo comandi">Impronta di ogni blocco = H(numero ‖ prev ‖ dati); prev è l'impronta del blocco precedente.</p>
      <div class="notaio" :class="conforme ? 'bordo-ok' : 'bordo-ko'">
        <p class="chiave">Impronta depositata dal notaio</p>
        <p class="hex forte">{{ corto(depositata) }}</p>
        <p v-if="conforme" class="esito-ok">✓ corrisponde all'ultimo blocco</p>
        <p v-else class="esito-ko">✗ non corrisponde all'impronta depositata</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catena {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.3rem;
}
.stretto .catena {
  gap: 0.9rem;
}
.catena li::marker {
  content: none;
}
.blocco {
  position: relative;
  margin: 0;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 5px;
  padding: 0.4rem 0.5rem 0.45rem;
}
.numero {
  margin: 0 0 0.25rem;
  font-family: var(--serif);
  font-weight: 600;
  color: var(--rubrica);
}
.blocco textarea {
  font-size: 0.9rem;
  line-height: 1.3;
  padding: 0.2rem 0.35rem;
}
.puntatore {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0 0.4rem;
  margin: 0.2rem 0 0;
  line-height: 1.3;
}
.chiave {
  font-size: 0.8rem;
  color: var(--grigio);
  margin: 0;
}
.puntatore .hex,
.notaio .hex {
  font-size: 0.8rem;
}
.forte {
  font-weight: 700;
}
.hex.ko {
  color: var(--ko);
}
.stato {
  margin: 0.3rem 0 0;
  font-size: 0.85rem;
  line-height: 1.25;
}
.freccia {
  position: absolute;
  top: 50%;
  right: -1.15rem;
  transform: translateY(-50%);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--grigio);
}
.stretto .freccia {
  right: -0.85rem;
  font-size: 0.9rem;
}
.freccia.ko {
  color: var(--ko);
}
.piede-catena {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-areas: 'riepilogo notaio' 'comandi notaio';
  grid-template-rows: auto 1fr;
  gap: 0.5rem 1rem;
  align-items: start;
  margin-top: 0.7rem;
}
.stretto .piede-catena {
  grid-template-areas: 'riepilogo notaio' 'comandi comandi';
  margin-top: 0.6rem;
}
.riepilogo {
  grid-area: riepilogo;
  margin: 0;
  font-size: 1rem;
  line-height: 1.35;
}
.stretto .riepilogo {
  font-size: 0.92rem;
}
.comandi {
  grid-area: comandi;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0;
}
p.grigio.comandi {
  display: block;
}
.notaio {
  grid-area: notaio;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 5px;
  padding: 0.35rem 0.6rem;
  font-size: 0.85rem;
  line-height: 1.35;
  max-width: 15rem;
}
.notaio p {
  margin: 0;
}
</style>
