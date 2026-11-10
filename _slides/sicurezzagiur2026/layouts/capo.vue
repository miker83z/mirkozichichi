<!--
  Section divider, numbered like the parts of a legal code ("Capo I", "Capo II", ...).

  ---
  layout: capo
  capo: V
  ---
  # Funzioni hash
  Optional one-line description
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ capo: string, etichetta?: string }>()

// Long numerals (VIII) get a smaller size so they stay inside their column.
const dimensione = computed(() => ({ 1: '11rem', 2: '10rem', 3: '8.5rem' } as Record<number, string>)[props.capo.length] ?? '6.8rem')
</script>

<template>
  <div class="slidev-layout capo-layout">
    <div class="numero" aria-hidden="true" :style="{ fontSize: dimensione }">{{ capo }}</div>
    <div class="contenuto">
      <p class="etichetta">{{ etichetta ?? 'Capo' }} {{ capo }}</p>
      <slot />
    </div>
  </div>
</template>

<style>
.capo-layout {
  display: grid;
  grid-template-columns: 17rem 1fr;
  align-items: center;
  column-gap: 2.5rem;
  padding: 0 4rem;
}
.capo-layout .numero {
  font-family: var(--serif);
  font-variation-settings: 'opsz' 72;
  font-weight: 300;
  line-height: 1;
  color: var(--rubrica);
  text-align: right;
  border-right: 2px solid var(--rubrica);
  padding-right: 2.2rem;
}
.capo-layout .etichetta {
  font-family: var(--serif);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--grigio);
  margin: 0 0 0.4rem;
}
.capo-layout h1 {
  font-size: 3rem;
  border: 0;
  padding: 0;
  margin: 0 0 0.6rem;
  color: var(--inchiostro);
}
.capo-layout p {
  font-family: var(--serif);
  font-size: 1.3rem;
  color: var(--grigio);
  max-width: 26em;
}
</style>
