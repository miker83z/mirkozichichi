<!--
  Integrity check with a hash: Bob sends a document together with its SHA-256 digest; Alice
  recomputes the digest of what she receives and compares. The switch lets an intruder change
  the document in transit (800 → 900, or the last digit); the received copy is editable too.
  In the PDF two compact rows are shown: the intact copy (✓ integro) and the altered one (✗ alterato).

  <IntegrityCheck />
  <IntegrityCheck documento="Il prezzo pattuito è di 800 €" stretto />

  Props
  - documento: the text Bob sends (default "Contratto di locazione: canone mensile 800 €")
  - stretto: narrower layout for the main column of the `glossa` layout
-->
<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { useNav } from '@slidev/client'
import { sha256 } from '../utils/crypto'

const props = withDefaults(defineProps<{ documento?: string, stretto?: boolean }>(), {
  documento: 'Contratto di locazione: canone mensile 800 €',
})

const { isPrintMode } = useNav()
const uid = useId()

/** What the intruder does: 800 becomes 900, otherwise the last digit changes, otherwise a word is appended. */
function altera(t: string) {
  if (t.includes('800')) return t.replace('800', '900')
  const m = t.match(/\d(?=\D*$)/)
  if (m?.index !== undefined) return t.slice(0, m.index) + ((Number(m[0]) + 1) % 10) + t.slice(m.index + 1)
  return `${t} (modificato)`
}

const inviato = ref(props.documento)
const intruso = ref(false)
const ricevuto = ref(props.documento)
watch([inviato, intruso], () => {
  ricevuto.value = intruso.value ? altera(inviato.value) : inviato.value
})

const hInviato = computed(() => sha256(inviato.value))

/** The digest as characters to show, each marked if it differs from the sent one (shortened in the narrow layout). */
function cifre(h: string) {
  const tutte = [...h].map((c, i) => ({ c, diversa: c !== hInviato.value[i] }))
  return props.stretto ? [...tutte.slice(0, 24), { c: '…', diversa: false }, ...tutte.slice(-14)] : tutte
}

interface Riga { etichetta: string, testo: string, hash: string, integro: boolean }
function riga(etichetta: string, testo: string): Riga {
  const hash = sha256(testo)
  return { etichetta, testo, hash, integro: hash === hInviato.value }
}
const righe = computed<Riga[]>(() => isPrintMode.value
  ? [riga('Alice riceve la copia intatta', inviato.value), riga("Alice riceve la copia modificata dall'intruso", altera(inviato.value))]
  : [riga('Alice riceve il documento e ricalcola l\'impronta', ricevuto.value)])
</script>

<template>
  <div class="demo integrity-check" :class="{ stretto }">
    <section class="parte">
      <label :for="`${uid}-inviato`"><strong>Bob</strong> invia il documento e la sua impronta</label>
      <textarea v-if="!isPrintMode" :id="`${uid}-inviato`" v-model="inviato" rows="1" spellcheck="false" />
      <p v-else class="testo-statico">{{ inviato }}</p>
      <p class="digest">
        <span class="etichetta">Impronta inviata</span>
        <span class="hex"><span v-for="(x, i) in cifre(hInviato)" :key="i">{{ x.c }}</span></span>
      </p>
    </section>

    <label v-if="!isPrintMode" class="interruttore">
      <input v-model="intruso" type="checkbox">
      Un intruso modifica il documento in transito
    </label>

    <section v-for="r in righe" :key="r.etichetta" class="parte ricevuta" :class="r.integro ? 'bordo-ok' : 'bordo-ko'">
      <div class="intestazione">
        <label :for="isPrintMode ? undefined : `${uid}-ricevuto`"><strong>{{ r.etichetta }}</strong></label>
        <span :class="r.integro ? 'esito-ok' : 'esito-ko'" class="esito">
          {{ r.integro ? '✓ integro' : '✗ alterato' }}<template v-if="!stretto">{{ r.integro ? ': le impronte coincidono' : ': le impronte sono diverse' }}</template>
        </span>
      </div>
      <textarea v-if="!isPrintMode" :id="`${uid}-ricevuto`" v-model="ricevuto" rows="1" spellcheck="false" />
      <p v-else class="testo-statico">{{ r.testo }}</p>
      <p class="digest">
        <span class="etichetta">Impronta ricalcolata</span>
        <span class="hex"><span v-for="(x, i) in cifre(r.hash)" :key="i" :class="{ cambiato: x.diversa }">{{ x.c }}</span></span>
      </p>
    </section>

    <p class="nota">
      Se l'intruso può cambiare anche l'impronta, il solo hash non basta: serve la firma digitale (Capo VII).
    </p>
  </div>
</template>

<style scoped>
.integrity-check {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.parte {
  min-width: 0;
}
.ricevuta {
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 5px;
  padding: 0.3rem 0.7rem 0.35rem;
}
.intestazione {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  flex-wrap: wrap;
}
.intestazione label {
  margin: 0;
}
.esito {
  font-size: 1rem;
}
.testo-statico {
  margin: 0;
  font-size: 1rem;
  background: var(--carta);
  border: 1px solid #b9b7c0;
  border-radius: 4px;
  padding: 0.1rem 0.5rem;
  line-height: 1.35;
}
.ricevuta .testo-statico {
  border-color: var(--linea);
}
.digest {
  margin: 0.2rem 0 0;
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}
.etichetta {
  flex: none;
  font-size: 0.85rem;
  color: var(--grigio);
  width: 9.5rem;
}
.stretto .etichetta {
  width: 8.6rem;
}
.digest .hex {
  font-size: 0.85rem;
  min-width: 0;
}
.cambiato {
  color: var(--ko);
  font-weight: 700;
}
.demo .interruttore {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  color: var(--inchiostro);
  margin: 0;
  cursor: pointer;
  align-self: flex-start;
}
.interruttore input {
  accent-color: var(--rubrica);
  width: 1.05rem;
  height: 1.05rem;
}
.nota {
  margin: 0.1rem 0 0;
  font-size: 0.9rem;
  color: var(--glossa);
}
</style>
