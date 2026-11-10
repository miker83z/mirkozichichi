<!--
  A multiple-choice question. Click an answer to reveal whether it is right and why.
  In the PDF the correct answer and the explanation are shown.

  <Quiz domanda="…" :opzioni="['…', '…']" :corretta="1" spiegazione="…" />
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNav } from '@slidev/client'

const props = defineProps<{
  domanda: string
  opzioni: string[]
  corretta: number
  spiegazione?: string
}>()

const { isPrintMode } = useNav()
const scelta = ref<number | null>(null)
const risolta = computed(() => isPrintMode.value || scelta.value !== null)

function stato(i: number) {
  if (!risolta.value) return ''
  if (i === props.corretta) return 'giusta'
  return i === scelta.value ? 'sbagliata' : 'spenta'
}
</script>

<template>
  <div class="quiz">
    <p class="domanda">{{ domanda }}</p>
    <ol class="opzioni">
      <li v-for="(o, i) in opzioni" :key="i">
        <button class="opzione" :class="stato(i)" :disabled="risolta" @click="scelta = i">
          <span class="lettera">{{ String.fromCharCode(65 + i) }}</span>
          <span>{{ o }}</span>
          <span v-if="stato(i) === 'giusta'" class="segno">✓ giusta</span>
          <span v-else-if="stato(i) === 'sbagliata'" class="segno">✗ no</span>
        </button>
      </li>
    </ol>
    <p v-if="risolta && spiegazione" class="spiegazione">{{ spiegazione }}</p>
    <button v-if="scelta !== null && !isPrintMode" class="btn rifai" @click="scelta = null">Riprova</button>
  </div>
</template>

<style scoped>
.quiz {
  margin: 0.4rem 0;
}
.domanda {
  font-family: var(--serif);
  font-size: 1.3rem;
  margin: 0 0 0.5rem;
}
.opzioni {
  list-style: none;
  margin: 0;
  padding: 0;
}
.opzioni li {
  margin: 0.3rem 0;
}
.opzioni li::marker {
  content: none;
}
.opzione {
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  width: 100%;
  text-align: left;
  font-family: var(--sans);
  font-size: 1.05rem;
  background: var(--carta);
  color: var(--inchiostro);
  border: 1px solid var(--linea);
  border-radius: 5px;
  padding: 0.35rem 0.7rem;
  cursor: pointer;
}
.opzione:hover:not(:disabled) {
  border-color: var(--rubrica);
}
.opzione:disabled {
  color: var(--inchiostro);
  cursor: default;
}
.lettera {
  font-family: var(--serif);
  font-weight: 700;
  color: var(--rubrica);
}
.segno {
  margin-left: auto;
  font-weight: 700;
  white-space: nowrap;
}
.giusta {
  border-color: var(--ok);
  box-shadow: inset 0 0 0 1px var(--ok);
}
.giusta .segno {
  color: var(--ok);
}
.sbagliata {
  border-color: var(--ko);
}
.sbagliata .segno {
  color: var(--ko);
}
.spenta {
  opacity: 0.55;
}
.spiegazione {
  font-size: 0.98rem;
  border-left: 3px solid var(--ok);
  padding-left: 0.7rem;
  margin: 0.6rem 0 0;
}
.rifai {
  margin-top: 0.5rem;
  font-size: 0.8rem;
}
</style>
