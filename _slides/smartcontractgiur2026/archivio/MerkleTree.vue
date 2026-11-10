<!--
  A Merkle tree over a few documents. Each leaf is the SHA-256 of a document; each parent is
  sha256(left hex + right hex), i.e. the SHA-256 of the two child hashes written one after the
  other as hex text. Boxes show the first 6 hex digits of each hash.
  Click a document: the path up to the root is highlighted and, in another colour, the sibling
  hashes that form the membership proof (log₂ n of them). The selected document can be edited:
  the hashes on its path and the root change, and the root is flagged "radice cambiata".
  In the PDF 'Doc C' is selected and its proof is shown.

  <MerkleTree />
  <MerkleTree :foglie="['Atto 1', 'Atto 2', 'Atto 3', 'Atto 4']" />

  foglie: the documents (default 'Doc A' … 'Doc H'); use a power of two: 4, 8 or 16.
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { sha256 } from '../utils/crypto'

const props = withDefaults(defineProps<{ foglie?: string[] }>(), {
  foglie: () => ['Doc A', 'Doc B', 'Doc C', 'Doc D', 'Doc E', 'Doc F', 'Doc G', 'Doc H'],
})

const { isPrintMode } = useNav()
const testi = ref<string[]>([...props.foglie])
const scelta = ref<number | null>(null)
watch(() => props.foglie, (f) => { testi.value = [...f] })

const n = computed(() => props.foglie.length)
const sel = computed(() => (isPrintMode.value ? Math.min(2, n.value - 1) : scelta.value))

/** Levels from the leaves (0) up to the root. */
function costruisci(documenti: string[]): string[][] {
  const livelli = [documenti.map(d => sha256(d))]
  while (livelli[livelli.length - 1].length > 1) {
    const sotto = livelli[livelli.length - 1]
    const sopra: string[] = []
    for (let i = 0; i < sotto.length; i += 2) sopra.push(sha256(sotto[i] + (sotto[i + 1] ?? sotto[i])))
    livelli.push(sopra)
  }
  return livelli
}

const originale = computed(() => costruisci(props.foglie))
const attuale = computed(() => costruisci(testi.value))
const altezza = computed(() => attuale.value.length - 1)
const radiceCambiata = computed(() => attuale.value[altezza.value][0] !== originale.value[altezza.value][0])

/** Rows from the root (top) down to the leaves. */
const righe = computed(() => attuale.value.map((hash, livello) => ({ livello, hash })).reverse())

function ruolo(livello: number, i: number): string {
  if (sel.value === null) return ''
  const mio = sel.value >> livello
  if (i === mio) return 'percorso'
  if (livello < altezza.value && i === (mio ^ 1)) return 'prova'
  return ''
}

function cambiato(livello: number, i: number): boolean {
  return attuale.value[livello][i] !== originale.value[livello][i]
}

/** Horizontal centre of a node, as a percentage of the width. */
function centro(livello: number, i: number): number {
  return ((i + 0.5) * 2 ** livello * 100) / n.value
}

function scegli(i: number) {
  scelta.value = scelta.value === i ? null : i
}

const nomeScelto = computed(() => (sel.value === null ? '' : testi.value[sel.value]))
</script>

<template>
  <div class="demo merkle">
    <div class="albero">
      <template v-for="(riga, r) in righe" :key="riga.livello">
        <svg v-if="r > 0" class="rami" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
          <line
            v-for="(_, i) in riga.hash"
            :key="i"
            :x1="centro(riga.livello, i)"
            y1="10"
            :x2="centro(riga.livello + 1, i >> 1)"
            y2="0"
            :class="ruolo(riga.livello, i)"
            vector-effect="non-scaling-stroke"
          />
        </svg>
        <div class="riga" :style="{ gridTemplateColumns: `repeat(${n}, 1fr)` }">
          <template v-for="(h, i) in riga.hash" :key="i">
            <button
              v-if="riga.livello === 0"
              class="nodo foglia"
              :class="ruolo(0, i)"
              :style="{ gridColumn: `${i + 1} / span 1` }"
              :aria-pressed="sel === i"
              @click="scegli(i)"
            >
              <span class="nome">{{ testi[i] || '(vuoto)' }}</span>
              <span class="hex" :class="{ cambiato: cambiato(0, i) }">{{ h.slice(0, 6) }}</span>
            </button>
            <div
              v-else
              class="nodo"
              :class="[ruolo(riga.livello, i), { radice: riga.livello === altezza, 'bordo-ko': riga.livello === altezza && radiceCambiata }]"
              :style="{ gridColumn: `${i * 2 ** riga.livello + 1} / span ${2 ** riga.livello}` }"
            >
              <span v-if="riga.livello === altezza" class="nome">Radice</span>
              <span class="hex" :class="{ cambiato: cambiato(riga.livello, i) }">{{ h.slice(0, 6) }}</span>
              <span v-if="riga.livello === altezza && radiceCambiata" class="esito-ko flag">
                ✗ radice cambiata <span class="grigio">(era <span class="hex">{{ originale[altezza][0].slice(0, 6) }}</span>)</span>
              </span>
            </div>
          </template>
        </div>
      </template>
    </div>

    <div v-if="sel !== null" class="sotto">
      <p v-if="!radiceCambiata" class="didascalia">
        Per dimostrare che '{{ nomeScelto }}' è incluso bastano <strong>{{ altezza }} hash</strong>
        (log₂ {{ n }}), non tutti gli {{ n }} documenti.
      </p>
      <p v-else class="didascalia esito-ko">
        ✗ Con la radice originale la prova non torna più: il documento modificato non risulta incluso.
      </p>
      <div class="modifica">
        <label :for="`mk-doc-${sel}`">Modifica il documento selezionato</label>
        <input :id="`mk-doc-${sel}`" v-model="testi[sel]" type="text" spellcheck="false">
        <button v-if="testi[sel] !== foglie[sel]" class="btn" @click="testi[sel] = foglie[sel]">Ripristina</button>
      </div>
      <p class="legenda">
        <span class="campione percorso" /> percorso fino alla radice
        <span class="campione prova" /> hash della prova (forniti con il documento)
      </p>
    </div>
    <p v-else class="didascalia grigio">Clicca un documento per vedere la sua prova di inclusione.</p>
  </div>
</template>

<style scoped>
.merkle {
  padding: 0.6rem 0.8rem;
}
.riga {
  display: grid;
  align-items: stretch;
}
.rami {
  display: block;
  width: 100%;
  height: 18px;
}
.rami line {
  stroke: var(--linea);
  stroke-width: 1.2;
}
.rami line.percorso {
  stroke: var(--rubrica);
  stroke-width: 2.5;
}
.nodo {
  margin: 0 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 4px;
  padding: 0.15rem 0.2rem;
  line-height: 1.3;
  min-width: 0;
}
.nodo .hex {
  font-size: 0.95rem;
  color: var(--inchiostro);
}
.radice {
  justify-self: center;
  min-width: 13rem;
  flex-direction: row;
  gap: 0.6rem;
  padding: 0.2rem 0.8rem;
}
.radice .nome,
.foglia .nome {
  font-weight: 700;
  font-size: 0.95rem;
}
.radice .hex {
  font-size: 1.1rem;
}
.flag {
  font-size: 0.85rem;
}
.flag .hex {
  font-size: 0.85rem;
  color: var(--grigio);
}
.foglia {
  font-family: var(--sans);
  color: var(--inchiostro);
  cursor: pointer;
}
.foglia .nome {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.foglia:hover {
  border-color: var(--rubrica);
}
.foglia:focus-visible {
  outline: 2px solid var(--rubrica);
  outline-offset: 2px;
}
.percorso {
  border-color: var(--rubrica);
  box-shadow: inset 0 0 0 1px var(--rubrica);
  background: color-mix(in srgb, var(--rubrica) 14%, var(--carta));
}
.prova {
  border: 1.5px dashed var(--glossa);
  background: color-mix(in srgb, var(--glossa) 14%, var(--carta));
}
.nodo .cambiato {
  color: var(--ko);
  font-weight: 700;
}
.sotto {
  margin-top: 0.45rem;
}
.didascalia {
  margin: 0.45rem 0 0.3rem;
  font-size: 1rem;
}
.modifica {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.modifica label {
  margin: 0;
  white-space: nowrap;
}
.modifica input {
  max-width: 16rem;
}
.legenda {
  margin: 0.35rem 0 0;
  font-size: 0.85rem;
  color: var(--grigio);
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.campione {
  display: inline-block;
  width: 1.4rem;
  height: 0.8rem;
  border-radius: 2px;
  margin-left: 0.6rem;
}
.campione:first-child {
  margin-left: 0;
}
</style>
