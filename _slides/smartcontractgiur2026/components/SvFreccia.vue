<!--
  SVG building block: an arrow from (x1, y1) to (x2, y2), optionally through a corner and with a label.
  <SvFreccia :x1="140" :y1="62" :x2="220" :y2="62" etichetta="cifra" />
  angolo: 'hv' (horizontal then vertical) or 'vh' for an L-shaped arrow. variante: inchiostro | rubrica | ok | ko | grigio.
  tratteggiata: dashed line.
-->
<script setup lang="ts">
import { segmenti } from '../utils/svg'
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  x1: number, y1: number, x2: number, y2: number
  etichetta?: string, variante?: string, tratteggiata?: boolean, angolo?: '' | 'hv' | 'vh'
  lato?: 'sopra' | 'sotto'
}>(), { etichetta: '', variante: 'inchiostro', tratteggiata: false, angolo: '', lato: 'sopra' })

const punti = computed(() => {
  const { x1, y1, x2, y2 } = props
  if (props.angolo === 'hv') return [[x1, y1], [x2, y1], [x2, y2]]
  if (props.angolo === 'vh') return [[x1, y1], [x1, y2], [x2, y2]]
  return [[x1, y1], [x2, y2]]
})
const d = computed(() => punti.value.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' '))
const punta = computed(() => {
  const n = punti.value.length
  const [ax, ay] = punti.value[n - 2]
  const [bx, by] = punti.value[n - 1]
  const a = Math.atan2(by - ay, bx - ax)
  const l = 11, w = 5.5
  const p1 = [bx - l * Math.cos(a) + w * Math.sin(a), by - l * Math.sin(a) - w * Math.cos(a)]
  const p2 = [bx - l * Math.cos(a) - w * Math.sin(a), by - l * Math.sin(a) + w * Math.cos(a)]
  return `${bx},${by} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`
})
const posEtichetta = computed(() => {
  const [ax, ay] = punti.value[0]
  const [bx, by] = punti.value[punti.value.length - 1]
  const mx = props.angolo ? punti.value[1][0] : (ax + bx) / 2
  const my = props.angolo ? punti.value[1][1] : (ay + by) / 2
  return { x: mx, y: my + (props.lato === 'sopra' ? -9 : 20) }
})
</script>

<template>
  <g :class="['sv-freccia', `sv-${variante}`]">
    <path :d="d" fill="none" :stroke-dasharray="tratteggiata ? '6 5' : undefined" />
    <polygon :points="punta" />
    <text v-if="etichetta" :x="posEtichetta.x" :y="posEtichetta.y" text-anchor="middle" style="font-size: 14px"><tspan v-for="(s, j) in segmenti(etichetta)" :key="j" :class="{ pedice: s.pedice }">{{ s.t }}</tspan></text>
  </g>
</template>
