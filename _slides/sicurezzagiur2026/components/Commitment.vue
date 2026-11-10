<!--
  "Offerta in busta chiusa": a hash commitment. The bidder seals the offer with a random 128-bit
  secret (nonce) and publishes only C = H(nonce ‖ offerta). At the opening the bidder reveals offer
  and nonce, and anyone recomputes the digest. The offer field stays editable after sealing:
  change it and open again, and the digest no longer matches.
  In the PDF the envelope is sealed and opened (✓), with a fixed nonce.

  <Commitment />
  <Commitment offerta="Offerta: 98.500 €" stretto />

  Props
  - offerta: the initial offer text (default "Offerta: 125.000 €")
  - stretto: single-column layout for the main column of the `glossa` layout
-->
<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { useNav } from '@slidev/client'
import { randomHex, sha256, short } from '../utils/crypto'

const props = withDefaults(defineProps<{ offerta?: string, stretto?: boolean }>(), {
  offerta: 'Offerta: 125.000 €',
})

const { isPrintMode } = useNav()
const uid = useId()
const NONCE_STAMPA = '7c1e9a4b3f0d58e2a6c4b19f0e7d3a52'

const testo = ref(props.offerta)
const nonce = ref(isPrintMode.value ? NONCE_STAMPA : randomHex(16))
const sigillo = ref<string | null>(null)
const aperta = ref(false)

const impronta = (n: string, t: string) => sha256(n + t)

function sigilla() {
  sigillo.value = impronta(nonce.value, testo.value)
  aperta.value = false
}
function nuovaBusta() {
  nonce.value = randomHex(16)
  sigillo.value = null
  aperta.value = false
}

// Changing the offer after the opening closes the envelope again: open it once more to check.
watch(testo, () => (aperta.value = false))

const ricalcolata = computed(() => impronta(nonce.value, testo.value))
const corrisponde = computed(() => ricalcolata.value === sigillo.value)

if (isPrintMode.value) {
  sigilla()
  aperta.value = true
}
</script>

<template>
  <div class="demo commitment" :class="{ stretto }">
    <section class="privato">
      <p class="titolo">Chi offre, in privato</p>
      <label :for="`${uid}-offerta`" class="etichetta-offerta">Offerta</label>
      <div class="riga">
        <input :id="`${uid}-offerta`" v-model="testo" type="text" spellcheck="false">
        <button v-if="!isPrintMode" class="btn pieno" :disabled="!!sigillo" @click="sigilla">Sigilla la busta</button>
      </div>
      <p class="nonce">
        Segreto casuale (nonce, 128 bit): <span class="hex corto">{{ short(nonce, 10, 6) }}</span>
        <span class="grigio">: lo conosce solo chi offre</span>
      </p>
      <p v-if="sigillo && !aperta && !isPrintMode && !stretto" class="suggerimento">
        Prova a cambiare l'offerta prima di aprire la busta.
      </p>
      <button v-if="sigillo && !isPrintMode && !stretto" class="btn ricomincia" @click="nuovaBusta">Nuova busta</button>
    </section>

    <section class="pubblico">
      <p v-if="!stretto" class="titolo">Tutti gli altri</p>
      <div class="busta" :class="{ vuota: !sigillo }">
        <p class="etichetta">Busta chiusa: si pubblica solo l'impronta H(nonce ‖ offerta)</p>
        <p v-if="sigillo" class="hex sigillo">{{ sigillo }}</p>
        <p v-else class="grigio attesa">Ancora nessuna busta sigillata.</p>
      </div>

      <div class="apertura">
        <p v-if="!isPrintMode" class="bottoni">
          <button class="btn" :disabled="!sigillo" @click="aperta = true">Apri la busta</button>
          <button v-if="sigillo && stretto" class="btn ricomincia" @click="nuovaBusta">Nuova busta</button>
        </p>
        <template v-if="aperta && sigillo">
          <p class="rivelato">
            Si rivelano l'offerta <strong>«{{ testo }}»</strong> e il nonce <span class="hex corto">{{ short(nonce, 10, 6) }}</span>
          </p>
          <p class="ricalcolo">
            <span class="etichetta">Impronta ricalcolata</span>
            <span class="hex">
              <span v-for="(c, i) in ricalcolata" :key="i" :class="{ cambiato: c !== sigillo[i] }">{{ c }}</span>
            </span>
          </p>
          <p v-if="corrisponde" class="esito esito-ok">✓ L'impronta corrisponde: è proprio l'offerta sigillata.</p>
          <p v-else class="esito esito-ko">✗ L'impronta non corrisponde: l'offerta è stata cambiata.</p>
        </template>
      </div>
    </section>
  </div>
</template>

<style scoped>
.commitment {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 0.6rem 1.2rem;
}
.stretto.commitment {
  grid-template-columns: minmax(0, 1fr);
}
.titolo {
  font-family: var(--serif);
  font-weight: 600;
  color: var(--rubrica);
  margin: 0 0 0.3rem;
}
.riga {
  display: flex;
  gap: 0.6rem;
}
.riga input {
  flex: 1;
  min-width: 0;
}
.riga .btn {
  flex: none;
}
.nonce {
  margin: 0.4rem 0 0;
  font-size: 0.9rem;
  line-height: 1.35;
}
.hex {
  font-size: 0.85rem;
}
.hex.corto {
  white-space: nowrap;
}
/* In the narrow layout the section title already says what the field is: keep the label for screen readers only. */
.stretto .etichetta-offerta {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
}
.stretto .titolo {
  margin-bottom: 0.25rem;
}
.suggerimento {
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: var(--glossa);
}
.ricomincia {
  margin-top: 0.5rem;
  font-size: 0.85rem;
}
.bottoni {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
}
.bottoni .ricomincia {
  margin: 0 0 0 auto;
}
.pubblico {
  min-width: 0;
}
.stretto .pubblico {
  border-top: 1px solid var(--linea);
  padding-top: 0.5rem;
}
.busta {
  background: var(--carta);
  border: 1px solid var(--inchiostro);
  border-radius: 4px;
  padding: 0.4rem 0.6rem;
}
.busta.vuota {
  border-style: dashed;
  border-color: var(--linea);
}
.etichetta {
  display: block;
  margin: 0;
  font-size: 0.85rem;
  color: var(--grigio);
}
.sigillo {
  margin: 0.15rem 0 0;
  font-weight: 700;
}
.attesa {
  margin: 0.15rem 0 0;
  font-size: 0.9rem;
}
.apertura {
  margin-top: 0.55rem;
}
.rivelato {
  margin: 0.4rem 0 0;
  font-size: 0.95rem;
  line-height: 1.35;
}
.ricalcolo {
  margin: 0.3rem 0 0;
}
.cambiato {
  color: var(--ko);
  font-weight: 700;
}
.esito {
  margin: 0.3rem 0 0;
  font-size: 1rem;
}
</style>
