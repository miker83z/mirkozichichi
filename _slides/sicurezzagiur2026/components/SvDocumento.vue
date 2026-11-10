<!--
  SVG building block: a document with a folded corner and text lines. (x, y) is the top-left corner.
  <SvDocumento :x="20" :y="30" etichetta="Contratto" />
  variante: campo (default) | ok | ko (e.g. ko for an altered document). alterato: draws a red mark.
-->
<script setup lang="ts">
withDefaults(defineProps<{ x: number, y: number, w?: number, h?: number, etichetta?: string, variante?: string, alterato?: boolean }>(),
  { w: 54, h: 68, etichetta: '', variante: 'campo', alterato: false })
</script>

<template>
  <g :class="['sv-documento', `sv-${variante}`]">
    <path :d="`M${x},${y} h${w - 14} l14,14 v${h - 14} h${-w} Z`" class="foglio" />
    <path :d="`M${x + w - 14},${y} v14 h14`" class="piega" fill="none" />
    <line v-for="i in 4" :key="i" :x1="x + 9" :x2="x + w - (i === 1 ? 20 : 9)" :y1="y + 12 + i * 10" :y2="y + 12 + i * 10" class="riga" />
    <path v-if="alterato" :d="`M${x + 10},${y + 28} l12,10 l10,-8 l12,12`" class="segno-alterato" fill="none" />
    <text v-if="etichetta" :x="x + w / 2" :y="y + h + 18" text-anchor="middle" style="font-size: 14px">{{ etichetta }}</text>
  </g>
</template>
