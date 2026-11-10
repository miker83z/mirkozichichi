<!--
  How a qualified time stamp works, step by step ("Avanti"):
  1. the law firm computes the SHA-256 fingerprint of its document (live, as you type);
  2. it sends only the fingerprint to the time-stamping authority (TSA);
  3. the TSA adds date and time and signs fingerprint + date/time + serial number with its key
     (a real ECDSA P-256 key, generated on mount);
  4. anyone can check the stamp with the TSA's certificate (public key) → ✓.
  "Modifica il documento" changes the document after the stamp: checked against the new
  fingerprint, the stamp no longer matches → ✗.
  In the PDF all four steps are shown, with the stamp at 2026-11-15T10:00:00Z and ✓.

  <TsaFlow />
  <TsaFlow documento="Bozza della domanda di brevetto, versione 3" />

  documento: the law firm's document (default: a legal opinion, final version).
-->
<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'
import { useNav } from '@slidev/client'
import { sha256, short } from '../utils/crypto'
import { firma, nuoveChiavi, verifica } from '../utils/firme'
import { ISTANTE_STAMPA, isoUtc } from '../utils/tempo'

const props = withDefaults(defineProps<{ documento?: string }>(), {
  documento: 'Parere legale sul contratto di fornitura Rossi–Bianchi, versione definitiva.',
})

const { isPrintMode } = useNav()
const chiaviTsa = shallowRef<CryptoKeyPair | null>(null)
const testo = ref(props.documento)
const impronta = computed(() => sha256(testo.value))
const passo = ref(0)

interface Marca { impronta: string, dataOra: string, serie: string, firma: string }
const marca = ref<Marca | null>(null)
const firmaOk = ref<boolean | null>(null)

function contenuto(m: Omit<Marca, 'firma'>): string {
  return `${m.impronta}|${m.dataOra}|${m.serie}`
}

async function marcaTemporale() {
  const dati = {
    impronta: impronta.value,
    dataOra: isoUtc(isPrintMode.value ? ISTANTE_STAMPA : Date.now()),
    serie: isPrintMode.value ? '2026-004817' : `2026-${String(Math.floor(Math.random() * 1e6)).padStart(6, '0')}`,
  }
  marca.value = { ...dati, firma: await firma(chiaviTsa.value!.privateKey, contenuto(dati)) }
}

async function avanti() {
  if (!chiaviTsa.value || passo.value >= 4) return
  const prossimo = passo.value + 1
  if (prossimo === 3) await marcaTemporale()
  if (prossimo === 4 && marca.value) {
    const { firma: f, ...dati } = marca.value
    firmaOk.value = await verifica(chiaviTsa.value.publicKey, contenuto(dati), f)
  }
  passo.value = prossimo
}

/** The stamp matches the document only if its fingerprint is the document's current one. */
const corrisponde = computed(() => marca.value !== null && marca.value.impronta === impronta.value)
const valida = computed(() => firmaOk.value === true && corrisponde.value)

function modifica() {
  testo.value = testo.value.includes('definitiva')
    ? testo.value.replace('definitiva', 'modificata')
    : `${testo.value} (modificato)`
}

function ricomincia() {
  passo.value = 0
  marca.value = null
  firmaOk.value = null
  testo.value = props.documento
}

onMounted(async () => {
  chiaviTsa.value = await nuoveChiavi()
  if (isPrintMode.value) {
    for (let i = 0; i < 4; i++) await avanti()
  }
})
</script>

<template>
  <div class="demo tsa">
    <div class="scena">
      <section class="parte uno" :class="{ futuro: passo < 1 }">
        <h4><span class="n">1</span> Lo studio calcola l'impronta del documento</h4>
        <label for="tsa-doc" class="sr">Documento dello studio</label>
        <textarea id="tsa-doc" v-model="testo" rows="2" spellcheck="false" />
        <p v-if="passo >= 1" class="valore"><span class="grigio">Impronta SHA-256:</span> <span class="hex">{{ impronta }}</span></p>
      </section>

      <section class="invio" :class="{ futuro: passo < 2 }">
        <h4><span class="n">2</span> Invia alla TSA solo l'impronta: il documento resta nello studio</h4>
        <p v-if="passo >= 2" class="freccia">
          <span class="hex">{{ short(marca?.impronta ?? impronta, 6, 4) }}</span>
          <span aria-hidden="true">⟶</span>
        </p>
      </section>

      <section class="parte tre" :class="{ futuro: passo < 3 }">
        <h4><span class="n">3</span> La TSA aggiunge data e ora e firma impronta + data/ora</h4>
        <dl v-if="marca && passo >= 3" class="marca">
          <dt>Impronta</dt>
          <dd class="hex">{{ short(marca.impronta, 10, 6) }}</dd>
          <dt>Data e ora</dt>
          <dd class="hex">{{ marca.dataOra }}</dd>
          <dt>Numero di serie</dt>
          <dd class="hex">{{ marca.serie }}</dd>
          <dt>Firma della TSA</dt>
          <dd class="hex">{{ short(marca.firma, 10, 6) }}</dd>
        </dl>
      </section>
    </div>

    <section class="verifica" :class="{ futuro: passo < 4 }">
      <h4><span class="n">4</span> Chiunque può verificarla con il certificato della TSA</h4>
      <p v-if="passo >= 4" class="esito" :class="valida ? 'esito-ok' : 'esito-ko'">
        <template v-if="valida">✓ marca temporale valida: questo documento esisteva già il {{ marca?.dataOra }}</template>
        <template v-else-if="!corrisponde">✗ la marca temporale non corrisponde a questo documento</template>
        <template v-else>✗ la firma della TSA non è valida</template>
      </p>
    </section>

    <div v-if="!isPrintMode" class="comandi">
      <button class="btn pieno" :disabled="!chiaviTsa || passo >= 4" @click="avanti">Avanti</button>
      <button class="btn" :disabled="passo < 3" @click="modifica">Modifica il documento</button>
      <button v-if="passo > 0" class="btn" @click="ricomincia">Ricomincia</button>
    </div>
  </div>
</template>

<style scoped>
.tsa {
  padding: 0.55rem 0.9rem;
  container-type: inline-size;
}
.scena {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.6fr) minmax(0, 1fr);
  grid-template-areas: 'uno due tre';
  gap: 0.9rem;
}
.uno {
  grid-area: uno;
}
.invio {
  grid-area: due;
}
.tre {
  grid-area: tre;
}
.futuro {
  opacity: 0.38;
}
h4 {
  font-family: var(--sans);
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 0.3rem;
}
.n {
  display: inline-block;
  font-family: var(--serif);
  color: var(--carta);
  background: var(--rubrica);
  border-radius: 50%;
  width: 1.3em;
  height: 1.3em;
  line-height: 1.3em;
  text-align: center;
  margin-right: 0.2rem;
  font-size: 0.85rem;
}
.sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
}
textarea {
  font-size: 0.95rem !important;
}
.valore {
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  line-height: 1.3;
}
.valore .hex {
  font-size: 0.8rem;
}
.invio {
  display: flex;
  flex-direction: column;
}
.freccia {
  margin: 0.2rem 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.1;
}
.freccia span[aria-hidden] {
  font-size: 2rem;
  color: var(--rubrica);
}
.freccia .hex {
  font-size: 0.85rem;
}
.marca {
  margin: 0;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  column-gap: 0.5rem;
  row-gap: 0.05rem;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-left: 3px solid var(--glossa);
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  font-size: 0.82rem;
  line-height: 1.35;
}
dt {
  color: var(--grigio);
}
dd {
  margin: 0;
}
.marca .hex {
  font-size: 0.82rem;
}
.verifica {
  margin-top: 0.5rem;
  padding-top: 0.4rem;
  border-top: 1px solid var(--linea);
}
.esito {
  margin: 0;
  font-size: 1rem;
}
.comandi {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
/* Next to the margin column of the glossa layout: step 2 goes under step 1. */
@container (max-width: 680px) {
  .scena {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas: 'uno tre' 'due tre';
    gap: 0.4rem 0.8rem;
  }
  .freccia {
    flex-direction: row;
    gap: 0.5rem;
  }
  .freccia span[aria-hidden] {
    font-size: 1.3rem;
  }
}
</style>
