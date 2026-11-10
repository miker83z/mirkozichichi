<!--
  Section divider, after the 2025 deck: flowing lines on black and the section title in a white
  pill. The numeral (capo) and the one-line description sit above and below the pill.

  ---
  layout: capo
  capo: III
  sezione: Sistemi distribuiti
  ---
  # Introduzione ai sistemi distribuiti
  Optional one-line description
-->
<script setup lang="ts">
defineProps<{ capo?: string, etichetta?: string }>()
</script>

<template>
  <div class="slidev-layout capo-layout">
    <Correnti :seme="capo ? capo.length * 11 + 3 : 5" />
    <div class="blocco">
      <p v-if="capo" class="etichetta">{{ etichetta ?? 'Capo' }} {{ capo }}</p>
      <div class="pillola"><slot /></div>
    </div>
  </div>
</template>

<style>
.capo-layout {
  position: relative;
  background: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 3rem;
}
.capo-layout .blocco {
  position: relative;
  width: 100%;
}
.capo-layout .etichetta {
  font-family: var(--titoli);
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--acqua);
  margin: 0 0 0.5rem 0.4rem;
}
.capo-layout .pillola {
  background: #fff;
  border-radius: 0.9rem;
  padding: 0.85rem 2rem;
  max-width: 44rem;
}
.capo-layout h1 {
  font-family: var(--titoli);
  font-weight: 400;
  font-size: 1.9rem;
  color: var(--notte);
  text-align: center;
  margin: 0;
}
.capo-layout h1::before {
  content: none;
}
.capo-layout .pillola p {
  text-align: center;
  font-size: 1rem;
  color: #5d6680;
  margin: 0.3rem 0 0;
}
</style>
