<!--
  "Testa o croce": why a commitment needs a random secret (nonce).
  A hidden choice is published only as its SHA-256 digest. With two possible values anyone can
  hash both and compare: the choice comes out in at most two tries. With the switch on, the
  published value is H(nonce ‖ scelta) with a 128-bit nonce, and hashing "testa" or "croce"
  no longer matches. In the PDF both situations are shown side by side, with both tries done.

  <CoinFlip />
  <CoinFlip stretto />

  Props
  - stretto: narrower layout for the main column of the `glossa` layout (shorter digests)
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { randomHex, sha256, short } from '../utils/crypto'

const props = defineProps<{ stretto?: boolean }>()

type Faccia = 'testa' | 'croce'
const FACCE: Faccia[] = ['testa', 'croce']

const { isPrintMode } = useNav()

const scelta = ref<Faccia>(isPrintMode.value ? 'croce' : FACCE[crypto.getRandomValues(new Uint8Array(1))[0] & 1])
const nonce = ref(isPrintMode.value ? '5be0c1d27a94f3e86c0b4d19a2e7f356' : randomHex(16))
const conNonce = ref(false)
const prove = ref<Faccia[]>([])

watch(conNonce, () => (prove.value = []))

function nuovoLancio() {
  scelta.value = FACCE[crypto.getRandomValues(new Uint8Array(1))[0] & 1]
  nonce.value = randomHex(16)
  prove.value = []
}

function prova(f: Faccia) {
  if (!prove.value.includes(f)) prove.value = [...prove.value, f]
}

interface Situazione {
  nonce: boolean
  pubblicata: string
  prove: { faccia: Faccia, hash: string, uguale: boolean }[]
  trovata?: Faccia
  finite: boolean
}

function situazione(usaNonce: boolean, tentate: Faccia[]): Situazione {
  const pubblicata = sha256((usaNonce ? nonce.value : '') + scelta.value)
  const elenco = tentate.map(faccia => {
    const hash = sha256(faccia)
    return { faccia, hash, uguale: hash === pubblicata }
  })
  return {
    nonce: usaNonce,
    pubblicata,
    prove: elenco,
    trovata: elenco.find(p => p.uguale)?.faccia,
    finite: elenco.length === FACCE.length,
  }
}

const corto = (h: string) => (props.stretto ? short(h, 6, 4) : short(h, 12, 6))

const situazioni = computed(() => isPrintMode.value
  ? [situazione(false, FACCE), situazione(true, FACCE)]
  : [situazione(conNonce.value, prove.value)])
</script>

<template>
  <div class="demo coin-flip" :class="{ stretto, stampa: isPrintMode }">
    <p class="premessa">
      Ho scelto <strong>testa</strong> o <strong>croce</strong> e tengo la scelta nascosta: pubblico solo l'impronta SHA-256.
    </p>

    <div v-if="!isPrintMode" class="comandi">
      <label class="interruttore">
        <input v-model="conNonce" type="checkbox">
        Aggiungi un segreto casuale (nonce)
      </label>
      <button class="btn piccolo-btn" @click="nuovoLancio">Nuovo lancio</button>
    </div>

    <div class="situazioni">
      <section
        v-for="s in situazioni"
        :key="String(s.nonce)"
        class="situazione"
        :class="{ 'bordo-ko': s.trovata, 'bordo-ok': s.nonce && s.finite && !s.trovata }"
      >
        <p v-if="isPrintMode" class="titolo">{{ s.nonce ? 'Con un segreto casuale (nonce)' : 'Senza segreto' }}</p>
        <p class="pubblicata">
          <span class="etichetta">Impronta pubblicata {{ s.nonce ? 'H(nonce ‖ scelta)' : 'H(scelta)' }}</span>
          <span class="hex forte">{{ corto(s.pubblicata) }}</span>
          <span v-if="s.nonce" class="nota">nonce segreto di 128 bit</span>
        </p>

        <div v-if="!isPrintMode" class="bottoni">
          <button v-for="f in FACCE" :key="f" class="btn" :disabled="prove.includes(f)" @click="prova(f)">
            Prova «{{ f }}»
          </button>
        </div>

        <ul class="prove">
          <li v-for="p in s.prove" :key="p.faccia">
            <span class="calcolo">H(«{{ p.faccia }}»)</span>
            <span class="hex">{{ corto(p.hash) }}</span>
            <span :class="{ uguale: p.uguale }">{{ p.uguale ? '= uguale' : '≠ diversa' }}</span>
          </li>
        </ul>

        <p v-if="s.trovata" class="esito esito-ko">
          ✗ Scelta scoperta, era «{{ s.trovata }}»: con solo due possibilità, l'impronta non nasconde nulla.
        </p>
        <p v-else-if="s.finite" class="esito esito-ok">
          ✓ Nessuna corrisponde: senza il nonce l'impronta non rivela la scelta.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
.premessa {
  margin: 0 0 0.5rem;
}
.comandi {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}
.demo .interruttore {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  color: var(--inchiostro);
  margin: 0;
  cursor: pointer;
}
.interruttore input {
  accent-color: var(--rubrica);
  width: 1.05rem;
  height: 1.05rem;
}
.piccolo-btn {
  font-size: 0.85rem;
  margin-left: auto;
}
.situazioni {
  display: grid;
  gap: 0.8rem;
}
.stampa .situazioni {
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
}
.situazione {
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 5px;
  padding: 0.55rem 0.8rem;
}
.titolo {
  font-family: var(--serif);
  font-weight: 600;
  color: var(--rubrica);
  margin: 0 0 0.3rem;
}
.pubblicata {
  margin: 0 0 0.45rem;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 0.6rem;
}
.etichetta {
  font-size: 0.9rem;
  color: var(--grigio);
}
.hex {
  font-size: 0.9rem;
}
.forte {
  font-weight: 700;
}
.nota {
  flex-basis: 100%;
  font-size: 0.85rem;
  color: var(--glossa);
}
.bottoni {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
}
.prove {
  list-style: none;
  margin: 0;
  padding: 0;
}
.prove li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 0.6rem;
  margin: 0.1rem 0;
  font-size: 0.95rem;
}
.prove li::marker {
  content: none;
}
.calcolo {
  min-width: 5.4rem;
}
.uguale {
  font-weight: 700;
}
.esito {
  margin: 0.35rem 0 0;
  font-size: 1rem;
  line-height: 1.35;
}
.stretto .situazione {
  padding: 0.45rem 0.65rem;
}
.stretto .esito {
  font-size: 0.9rem;
}
.stretto .calcolo {
  min-width: 0;
}
</style>
