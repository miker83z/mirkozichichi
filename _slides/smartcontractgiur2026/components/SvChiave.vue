<!--
  SVG building block: a key. (x, y) is the centre of the bow (the round end); the key points right.
  <SvChiave :x="40" :y="30" tipo="pubblica" etichetta="Pub B" />
  tipo: segreta (brass, symmetric key) | pubblica (green) | privata (red).
-->
<script setup lang="ts">
import { segmenti } from '../utils/svg'
withDefaults(defineProps<{ x: number, y: number, tipo?: 'segreta' | 'pubblica' | 'privata', etichetta?: string, scala?: number }>(),
  { tipo: 'segreta', etichetta: '', scala: 1 })
</script>

<template>
  <g :class="['sv-chiave', `sv-chiave-${tipo}`]" :transform="`translate(${x},${y}) scale(${scala})`">
    <circle cx="0" cy="0" r="11" />
    <circle cx="0" cy="0" r="4" class="foro" />
    <path d="M11,-3 h34 v6 h-4 v7 h-6 v-7 h-4 v5 h-6 v-5 h-14 Z" />
    <text v-if="etichetta" x="17" y="-10" style="font-size: 13px" class="etichetta"><tspan v-for="(s, j) in segmenti(etichetta)" :key="j" :class="{ pedice: s.pedice }">{{ s.t }}</tspan></text>
  </g>
</template>
