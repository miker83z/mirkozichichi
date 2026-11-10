<!--
  Sort each case into the right category. Every case is one compact row: the text and one small
  button per category. A click reveals ✓/✗ and the explanation; "Mostra tutte le risposte"
  reveals every row. Fits 6 cases with 2–4 short categories in a full-width slide.
  In the PDF every row is revealed, with the right category marked.

  <Classifica />                              default: confidentiality, integrity, availability
  <Classifica
    :categorie="['Riservatezza', 'Integrità', 'Disponibilità']"
    :casi="[
      { testo: 'Un dipendente legge le cartelle cliniche del vicino', giusta: 'Riservatezza', spiegazione: '…' },
      { testo: 'Un attacco rende irraggiungibile il portale', giusta: 'Disponibilità', spiegazione: '…' },
    ]"
  />

  categorie: the category names (one button each); keep them short.
  casi: { testo, giusta, spiegazione }[]; `giusta` must be one of `categorie`; keep `testo` to
  about 60 characters so that each row stays on one line.
-->
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNav } from '@slidev/client'

interface Caso {
  testo: string
  giusta: string
  spiegazione: string
}

const props = withDefaults(defineProps<{ categorie?: string[], casi?: Caso[] }>(), {
  categorie: () => ['Riservatezza', 'Integrità', 'Disponibilità'],
  casi: () => [
    {
      testo: 'Un dipendente legge le cartelle cliniche del suo vicino di casa',
      giusta: 'Riservatezza',
      spiegazione: 'Nulla è stato modificato o bloccato, ma un dato è finito sotto gli occhi di chi non doveva vederlo.',
    },
    {
      testo: 'Qualcuno cambia l\'IBAN in una fattura inviata per email',
      giusta: 'Integrità',
      spiegazione: 'Il documento arriva, ma non è più quello spedito: è stato alterato in transito.',
    },
    {
      testo: 'Un attacco DDoS rende irraggiungibile il portale del tribunale',
      giusta: 'Disponibilità',
      spiegazione: 'I dati restano intatti e segreti, ma chi ne ha diritto non riesce a usarli.',
    },
    {
      testo: 'Un portatile non cifrato con i dati dei clienti viene rubato',
      giusta: 'Riservatezza',
      spiegazione: 'Senza cifratura chiunque trovi il portatile legge i dati: è una violazione di dati personali.',
    },
    {
      testo: 'Uno studente modifica un voto nel registro elettronico',
      giusta: 'Integrità',
      spiegazione: 'Il dato è stato cambiato da chi non ne aveva il diritto: non è più affidabile.',
    },
    {
      testo: 'Un ransomware cifra tutti i fascicoli dello studio',
      giusta: 'Disponibilità',
      spiegazione: 'I fascicoli ci sono ma non si possono aprire; se vengono anche copiati, è colpita pure la riservatezza.',
    },
  ],
})

const { isPrintMode } = useNav()
const risposte = ref<(string | null)[]>(props.casi.map(() => null))
const tutte = ref(false)
watch(() => props.casi.length, (l) => { risposte.value = Array.from({ length: l }, () => null) })

function rivelato(i: number): boolean {
  return isPrintMode.value || tutte.value || risposte.value[i] !== null
}

function stato(i: number, cat: string): string {
  if (!rivelato(i)) return ''
  if (cat === props.casi[i].giusta) return 'giusta'
  return cat === risposte.value[i] ? 'sbagliata' : 'spenta'
}

function rispondi(i: number, cat: string) {
  if (risposte.value[i] === null) risposte.value[i] = cat
}

const date = computed(() => risposte.value.filter(r => r !== null).length)
const giuste = computed(() => risposte.value.filter((r, i) => r === props.casi[i]?.giusta).length)

function ricomincia() {
  risposte.value = props.casi.map(() => null)
  tutte.value = false
}
</script>

<template>
  <div class="demo classifica">
    <ol class="casi">
      <li v-for="(caso, i) in casi" :key="i" class="caso">
        <span class="testo">{{ caso.testo }}</span>
        <span class="scelte" role="group" :aria-label="`Categoria per: ${caso.testo}`">
          <button
            v-for="cat in categorie"
            :key="cat"
            class="scelta"
            :class="stato(i, cat)"
            :disabled="rivelato(i)"
            @click="rispondi(i, cat)"
          >
            <template v-if="stato(i, cat) === 'giusta'">✓ </template>
            <template v-else-if="stato(i, cat) === 'sbagliata'">✗ </template>{{ cat }}
          </button>
        </span>
        <p v-if="rivelato(i)" class="spiegazione">
          <span v-if="risposte[i] === caso.giusta" class="esito-ok">Giusto. </span>
          <span v-else-if="risposte[i] !== null" class="esito-ko">No: è {{ caso.giusta }}. </span>
          {{ caso.spiegazione }}
        </p>
      </li>
    </ol>
    <div v-if="!isPrintMode" class="piede-demo">
      <button class="btn" :disabled="tutte" @click="tutte = true">Mostra tutte le risposte</button>
      <button v-if="date > 0 || tutte" class="btn" @click="ricomincia">Ricomincia</button>
      <span v-if="date > 0" class="punteggio">Risposte giuste: <strong>{{ giuste }}</strong> su {{ date }}</span>
    </div>
  </div>
</template>

<style scoped>
.classifica {
  padding: 0.45rem 0.8rem 0.55rem;
}
.casi {
  list-style: none;
  margin: 0;
  padding: 0;
}
.caso {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  column-gap: 0.8rem;
  padding: 0.22rem 0;
  border-bottom: 1px solid var(--linea);
  margin: 0;
}
.caso::marker {
  content: none;
}
.testo {
  font-size: 0.95rem;
  line-height: 1.3;
}
.scelte {
  display: flex;
  gap: 0.3rem;
}
.scelta {
  font-family: var(--sans);
  font-size: 0.85rem;
  font-weight: 600;
  background: var(--carta);
  color: var(--inchiostro);
  border: 1px solid #b9b7c0;
  border-radius: 4px;
  padding: 0.08rem 0.5rem;
  cursor: pointer;
  white-space: nowrap;
}
.scelta:hover:not(:disabled) {
  border-color: var(--rubrica);
  color: var(--rubrica);
}
.scelta:focus-visible {
  outline: 2px solid var(--rubrica);
  outline-offset: 2px;
}
.scelta:disabled {
  cursor: default;
}
.scelta.giusta {
  border-color: var(--ok);
  box-shadow: inset 0 0 0 1px var(--ok);
  color: var(--ok);
}
.scelta.sbagliata {
  border-color: var(--ko);
  color: var(--ko);
}
.scelta.spenta {
  opacity: 0.4;
}
.spiegazione {
  grid-column: 1 / -1;
  margin: 0.08rem 0 0;
  font-size: 0.82rem;
  line-height: 1.3;
  color: var(--grigio);
}
.piede-demo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.45rem;
}
.piede-demo .btn {
  font-size: 0.85rem;
  padding: 0.15rem 0.6rem;
}
.punteggio {
  font-size: 0.9rem;
  margin-left: auto;
}
</style>
