<!--
  SVG building block for the Schema* diagrams: a labelled box.
  <SvRiquadro :x="20" :y="40" :w="120" :h="44" testo="Testo in chiaro" />
  testo: use "\n" for line breaks and "_enc" for a subscript. variante: campo (grey, default) | rubrica | ok | ko | vuoto | scuro.
  mono: monospace text (for hashes, keys). piccolo: smaller text.
-->
<script setup lang="ts">
import { computed } from 'vue'
import { segmenti } from '../utils/svg'

const props = withDefaults(defineProps<{
  x: number, y: number, w: number, h: number
  testo?: string, variante?: string, mono?: boolean, piccolo?: boolean, raggio?: number
}>(), { testo: '', variante: 'campo', mono: false, piccolo: false, raggio: 6 })

// Accepts real line breaks and the two characters "\n" (what a static attribute delivers).
const righe = computed(() => props.testo.replaceAll('\\n', '\n').split('\n'))
const dim = computed(() => (props.piccolo ? 13 : 16))
const y0 = computed(() => props.y + props.h / 2 - ((righe.value.length - 1) * dim.value * 1.2) / 2 + dim.value * 0.35)
</script>

<template>
  <g :class="['sv-riquadro', `sv-${variante}`]">
    <rect :x="x" :y="y" :width="w" :height="h" :rx="raggio" />
    <text :x="x + w / 2" :y="y0" text-anchor="middle" :class="{ mono }" :style="{ fontSize: `${dim}px` }">
      <tspan v-for="(r, i) in righe" :key="i" :x="x + w / 2" :dy="i === 0 ? 0 : dim * 1.2"><tspan v-for="(s, j) in segmenti(r)" :key="j" :class="{ pedice: s.pedice }">{{ s.t }}</tspan></tspan>
    </text>
  </g>
</template>
