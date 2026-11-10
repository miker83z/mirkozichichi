<!--
  Footer on every slide, after the 2025 deck: the section on the left, the IOTA logo and the slide number on
  the right. Hidden on the cover, dividers and closing slide.
  Top right, on the slides about smart contract platforms, a strip with the seven parts of a platform (the
  checklist of the 2025 deck): a slide with `piattaforma: n` in its frontmatter ticks parts 1…n and
  highlights part `voce` (default n). It replaces the repeated checklist slides.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'

const { slides } = useNav()
const { $page } = useSlideContext()

const sezione = computed(() => {
  for (let i = $page.value - 1; i >= 0; i--) {
    const fm = slides.value[i]?.meta?.slide?.frontmatter
    if (fm?.layout === 'capo')
      return fm.sezione ?? ''
  }
  return ''
})
const nascosto = computed(() => ['capo', 'copertina', 'chiusura'].includes(slides.value[$page.value - 1]?.meta?.layout ?? ''))

const PARTI = ['validatori', 'consenso', 'registro', 'indirizzi', 'computer', 'linguaggio', 'token']
const fm = computed(() => slides.value[$page.value - 1]?.meta?.slide?.frontmatter ?? {})
const fatte = computed(() => Number(fm.value.piattaforma ?? 0))
const attuale = computed(() => Number(fm.value.voce ?? fatte.value))
</script>

<template>
  <footer v-if="!nascosto" class="piede">
    <span>{{ sezione }}</span>
    <span class="destra"><img src="/img/iota-logo-bianco.svg" alt="IOTA" class="logo">{{ $page }}</span>
  </footer>
  <ol v-if="!nascosto && fatte" class="parti" aria-label="Le parti di una piattaforma per smart contract">
    <li v-for="(p, i) in PARTI" :key="p" :class="{ fatta: i < fatte, attuale: i + 1 === attuale }">{{ p }}<span v-if="i < fatte && i + 1 !== attuale"> ✓</span></li>
  </ol>
</template>

<style>
.piede {
  position: absolute;
  left: 3rem;
  right: 1.2rem;
  bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--titoli);
  font-size: 0.68rem;
  color: var(--grigio);
}
.piede .destra {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.piede .logo {
  height: 0.85rem;
  opacity: 0.55;
}
.parti {
  position: absolute;
  top: 0.55rem;
  right: 1.2rem;
  display: flex;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--titoli);
  font-size: 0.6rem;
}
.parti li {
  padding: 0.1rem 0.4rem;
  border: 1px solid var(--linea);
  border-radius: 999px;
  color: var(--grigio);
}
.parti li.fatta {
  color: var(--ok);
  border-color: color-mix(in srgb, var(--ok) 50%, transparent);
}
.parti li.attuale {
  color: #fff;
  background: var(--rubrica);
  border-color: var(--rubrica);
}
</style>
