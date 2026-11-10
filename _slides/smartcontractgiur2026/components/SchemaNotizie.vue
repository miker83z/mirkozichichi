<!--
  Diagram (new, for the opening): a calm map of the five security properties (riservatezza, integrità,
  disponibilità, autenticità, non ripudio) with the news of the opening pinned to the properties they
  violated; a property turns red when a confirmed news item hits it (a claim only pins it, dashed).
  Frigoriferi dei supermercati → integrità + disponibilità; Farnesina e Milano-Cortina (DDoS) →
  disponibilità; spyware Paragon → riservatezza + integrità; voce clonata di Crosetto → autenticità;
  furto a Binance → riservatezza (credentials) + integrità (unauthorised transfers).
  A news item with rivendicata: true is drawn dashed and marked "solo rivendicato" (a claim is not proof).
  6 clicks: the five properties, then one news item per click in this order.
  <SchemaNotizie />
-->
<script setup lang="ts">
const Y = 110 // top of the property boxes
const H = 48
const L = 148
const proprieta = ['riservatezza', 'integrità', 'disponibilità', 'autenticità', 'non ripudio']
const cx = [92, 266, 440, 614, 788]

interface Puntina { x: number, da: number } // a pin on the box edge, with its leader starting at x = da
interface Notizia { titolo: string, sotto: string, x: number, sopra: boolean, colpite: number[], puntine: Puntina[], rivendicata?: boolean }

const notizie: Notizia[] = [
  { titolo: 'Frigoriferi dei supermercati', sotto: '2 nov 2026', x: 353, sopra: true, colpite: [1, 2], puntine: [{ x: 300, da: 326 }, { x: 406, da: 380 }] },
  { titolo: 'Farnesina e Milano-Cortina', sotto: 'attacchi DDoS, feb e ott 2026', x: 440, sopra: false, colpite: [2], puntine: [{ x: 440, da: 440 }] },
  { titolo: 'Spyware Paragon', sotto: 'mar 2026', x: 179, sopra: true, colpite: [0, 1], puntine: [{ x: 130, da: 160 }, { x: 228, da: 198 }] },
  { titolo: 'Voce clonata di Crosetto', sotto: 'feb 2025', x: 614, sopra: true, colpite: [3], puntine: [{ x: 614, da: 614 }] },
  { titolo: 'Furto a Binance', sotto: 'ott 2026', x: 179, sopra: false, colpite: [0, 1], puntine: [{ x: 130, da: 160 }, { x: 228, da: 198 }] },
]

// Text block above the boxes (title at y 34, date at y 52, leader from y 60) or below (leader to y 206, title at y 226).
const yTitolo = (n: Notizia) => (n.sopra ? 34 : 226)
const ySotto = (n: Notizia) => (n.sopra ? 52 : 244)
const yPuntina = (n: Notizia) => (n.sopra ? Y : Y + H)
const yCapo = (n: Notizia) => (n.sopra ? 60 : 206)
</script>

<template>
  <svg viewBox="0 0 880 252" class="schema" role="img" aria-label="Schema: le notizie recenti sulle cinque proprietà della sicurezza">
    <g v-click>
      <g v-for="(p, i) in proprieta" :key="p">
        <rect :x="cx[i] - L / 2" :y="Y" :width="L" :height="H" rx="8" class="proprieta" />
        <text :x="cx[i]" :y="Y + 30" text-anchor="middle" class="nome">{{ p }}</text>
      </g>
    </g>
    <g v-for="n in notizie" :key="n.titolo" v-click>
      <rect v-for="c in n.colpite" :key="c" :x="cx[c] - L / 2" :y="Y" :width="L" :height="H" rx="8" class="colpita" :class="{ dubbia: n.rivendicata }" />
      <template v-for="p in n.puntine" :key="p.x">
        <line :x1="p.da" :y1="yCapo(n)" :x2="p.x" :y2="yPuntina(n)" class="capo" :class="{ dubbia: n.rivendicata }" />
        <circle :cx="p.x" :cy="yPuntina(n)" r="5.5" class="puntina" :class="{ dubbia: n.rivendicata }" />
      </template>
      <text :x="n.x" :y="yTitolo(n)" text-anchor="middle" class="titolo">{{ n.titolo }}</text>
      <text :x="n.x" :y="ySotto(n)" text-anchor="middle" :class="n.rivendicata ? 'avviso' : 'nota'">{{ n.sotto }}</text>
    </g>
  </svg>
</template>

<style scoped>
.proprieta { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.nome { font-size: 16px; font-weight: 700; }
.colpita { fill: none; stroke: var(--rubrica); stroke-width: 2.5; }
.colpita.dubbia { stroke: var(--ko); stroke-dasharray: 6 4; }
.capo { stroke: var(--rubrica); stroke-width: 1.5; }
.capo.dubbia { stroke: var(--ko); stroke-dasharray: 5 4; }
.puntina { fill: var(--rubrica); stroke: var(--carta); stroke-width: 1.5; }
.puntina.dubbia { fill: var(--carta); stroke: var(--ko); stroke-width: 2.5; }
.titolo { font-size: 15px; font-weight: 700; }
.avviso { font-size: 13px; font-weight: 700; fill: var(--ko); }
</style>
