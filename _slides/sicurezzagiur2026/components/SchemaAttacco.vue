<!--
  Diagram (new, for the opening news): the anatomy of an attack, the same five boxes for every case.
  Who attacks → how (the attack vector) → what it hits (the target) → which security property is
  violated → the defence. Read like a legal case: author, conduct, object, event; plus the remedy.
  Texts use "\n" for line breaks (at most 3 lines of about 19 characters).
  5 clicks: one box per click, left to right.
  <SchemaAttacco chi="ignoti" come="DDoS" cosa="il sito\ndel ministero" proprieta="disponibilità" difesa="filtri e\ncapacità di riserva" />
-->
<script setup lang="ts">
const props = defineProps<{ chi: string, come: string, cosa: string, proprieta: string, difesa: string }>()

const W = 156 // box width
const P = 181 // step between boxes
const passi = [
  { etichetta: 'chi attacca', testo: props.chi, variante: 'vuoto' },
  { etichetta: 'come (il vettore)', testo: props.come, variante: 'campo' },
  { etichetta: 'che cosa colpisce', testo: props.cosa, variante: 'campo' },
  { etichetta: 'proprietà violata', testo: props.proprieta, variante: 'rubrica' },
  { etichetta: 'difesa', testo: props.difesa, variante: 'ok' },
]
</script>

<template>
  <svg viewBox="0 0 880 112" class="schema" role="img" :aria-label="`Anatomia dell'attacco: ${passi.map(p => `${p.etichetta}: ${p.testo.replaceAll('\\n', ' ')}`).join('; ')}`">
    <g v-for="(p, i) in passi" :key="p.etichetta" v-click>
      <SvFreccia v-if="i > 0" :x1="i * P - (P - W) + 2" :y1="70" :x2="i * P - 2" :y2="70" :variante="i === 4 ? 'ok' : 'inchiostro'" />
      <text :x="i * P + W / 2" :y="18" text-anchor="middle" class="etichetta">{{ p.etichetta }}</text>
      <SvRiquadro :x="i * P" :y="28" :w="W" :h="84" :testo="p.testo" :variante="p.variante" />
    </g>
  </svg>
</template>

<style scoped>
.etichetta { font-size: 13px; fill: var(--grigio); }
</style>
