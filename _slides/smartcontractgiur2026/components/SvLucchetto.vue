<!--
  SVG building block: a padlock. (x, y) is the top-left corner of the body (28×22).
  <SvLucchetto :x="100" :y="40" /> ; aperto: draws the shackle open.
-->
<script setup lang="ts">
withDefaults(defineProps<{ x: number, y: number, aperto?: boolean, scala?: number }>(), { aperto: false, scala: 1 })
</script>

<template>
  <g class="sv-lucchetto" :transform="`translate(${x},${y}) scale(${scala})`">
    <path :d="aperto ? 'M6,0 v-8 a8,8 0 0 1 16,0 v-4' : 'M6,0 v-8 a8,8 0 0 1 16,0 v8'" fill="none" class="arco" />
    <rect x="0" y="0" width="28" height="22" rx="3" />
    <circle cx="14" cy="10" r="3" class="foro" />
  </g>
</template>
