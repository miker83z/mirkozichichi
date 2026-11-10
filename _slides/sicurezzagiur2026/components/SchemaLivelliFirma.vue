<!--
  Diagram (new): the three levels of electronic signature in eIDAS as a staircase, each step adding
  requirements to the one below, with the evidential value growing (dots).
  1 Firma elettronica (semplice): data in electronic form used to sign (art. 3, n. 10);
  2 Avanzata (FEA): + linked to the signatory, under his sole control, later changes detectable (art. 26);
  3 Qualificata (FEQ): + qualified certificate + qualified device = handwritten signature (art. 25, par. 2).
  3 clicks: one step per click.
  <SchemaLivelliFirma />
-->
<script setup lang="ts">
const gradini = [
  {
    n: 1, x: 10, y: 188, titolo: 'Firma elettronica', sigla: '(semplice)',
    righe: ['dati elettronici usati per firmare'], forte: '',
  },
  {
    n: 2, x: 297, y: 106, titolo: 'Avanzata', sigla: '(FEA)',
    righe: ['+ legata al firmatario', '+ sotto il suo controllo', '+ modifiche rilevabili'], forte: '',
  },
  {
    n: 3, x: 584, y: 24, titolo: 'Qualificata', sigla: '(FEQ)',
    righe: ['+ certificato qualificato', '+ dispositivo qualificato'], forte: '= firma autografa',
  },
]
const L = 286
const BASE = 276
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: i tre livelli di firma elettronica come gradini di una scala">
    <g v-for="g in gradini" :key="g.n" v-click>
      <rect :x="g.x" :y="g.y" :width="L" :height="BASE - g.y" rx="4" :class="['gradino', `g${g.n}`]" />
      <text :x="g.x + 16" :y="g.y + 34" class="numero">{{ g.n }}</text>
      <text :x="g.x + 46" :y="g.y + 27" class="titolo">{{ g.titolo }} <tspan class="sigla">{{ g.sigla }}</tspan></text>
      <text v-for="(r, i) in g.righe" :key="r" :x="g.x + 46" :y="g.y + 50 + i * 20" class="riga">{{ r }}</text>
      <text v-if="g.forte" :x="g.x + 46" :y="g.y + 50 + g.righe.length * 20 + 4" class="forte">{{ g.forte }}</text>
      <text :x="g.x + 46" :y="BASE - 12" class="nota">valore probatorio</text>
      <circle v-for="i in 3" :key="i" :cx="g.x + 170 + i * 18" :cy="BASE - 17" r="6" :class="i <= g.n ? 'pieno' : 'vuoto'" />
    </g>
  </svg>
</template>

<style scoped>
.gradino { stroke: var(--rubrica); stroke-width: 1.5; }
.g1 { fill: var(--carta); }
.g2 { fill: #fdf6f6; }
.g3 { fill: #fbeeee; }
.numero { font-family: var(--serif); font-size: 30px; font-weight: 600; fill: var(--rubrica); }
.titolo { font-size: 18px; font-weight: 700; }
.sigla { font-weight: 400; fill: var(--grigio); }
.riga { font-size: 15px; }
.forte { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
.pieno { fill: var(--rubrica); }
.vuoto { fill: none; stroke: var(--rubrica); stroke-width: 1.5; }
</style>
