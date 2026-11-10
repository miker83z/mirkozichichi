<!--
  SVG building block: a person (head and shoulders) with a name underneath. (x, y) is the top centre.
  <SvPersona :x="60" :y="20" nome="Alice" />
  variante: inchiostro (default) | rubrica | ok | ko (e.g. ko for Eve, the attacker).
-->
<script setup lang="ts">
withDefaults(defineProps<{ x: number, y: number, nome?: string, variante?: string, scala?: number }>(),
  { nome: '', variante: 'inchiostro', scala: 1 })
</script>

<template>
  <g :class="['sv-persona', `sv-${variante}`]" :transform="`translate(${x},${y}) scale(${scala})`">
    <circle cx="0" cy="13" r="12" />
    <path d="M-22,52 C-22,32 -12,28 0,28 C12,28 22,32 22,52 Z" />
    <text v-if="nome" x="0" y="70" text-anchor="middle" style="font-size: 15px" class="nome">{{ nome }}</text>
  </g>
</template>
