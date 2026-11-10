<!--
  Diagram (new, for the opening): serious incidents in Italy counted by Clusit (known from open sources),
  as two bars with their values: 2024 = 357, 2025 = 507 (+42%). Then the 2025 bar is split into
  hacktivism (196) and the other incidents (311): without hacktivism the growth is +12%
  (both years without hacktivism, per the Clusit presentation; see verifica/C-firme-notizie.md).
  2 clicks: the two bars with +42%, the split with the +12% note.
  <SchemaCrescitaAttacchi />
-->
<script setup lang="ts">
const BASE = 214
const K = 170 / 507 // px per incident
const L = 110
const X24 = 180
const X25 = 390
const h = (n: number) => n * K

/** Bar (or top segment) with 4 px rounded top corners, from y = basso up by `alto` px. */
function barra(x: number, basso: number, alto: number): string {
  const t = basso - alto
  return `M${x},${basso} V${t + 4} Q${x},${t} ${x + 4},${t} H${x + L - 4} Q${x + L},${t} ${x + L},${t + 4} V${basso} Z`
}
const top24 = BASE - h(357)
const top25 = BASE - h(507)
const taglio = BASE - h(311) // boundary between "altri" (below) and hacktivism (above)
</script>

<template>
  <svg viewBox="0 0 880 246" class="schema" role="img" aria-label="Grafico: incidenti gravi in Italia, 357 nel 2024 e 507 nel 2025, di cui 196 di hacktivism">
    <g v-click>
      <text x="20" y="30" class="titoletto">Incidenti gravi in Italia</text>
      <text x="20" y="48" class="nota">fonte: Clusit (incidenti noti)</text>
      <path :d="barra(X24, BASE, h(357))" class="b24" />
      <path :d="barra(X25, BASE, h(507))" class="b25" />
      <line x1="150" :y1="BASE" x2="540" :y2="BASE" class="asse" />
      <text :x="X24 + L / 2" :y="top24 - 10" text-anchor="middle" class="valore">357</text>
      <text :x="X25 + L / 2" :y="top25 - 10" text-anchor="middle" class="valore">507</text>
      <text :x="X24 + L / 2" :y="BASE + 24" text-anchor="middle" class="anno">2024</text>
      <text :x="X25 + L / 2" :y="BASE + 24" text-anchor="middle" class="anno">2025</text>
      <line :x1="X24 + L" :y1="top24" :x2="X25" :y2="top24" class="livello" />
      <SvFreccia :x1="X25 - 16" :y1="top24 - 2" :x2="X25 - 16" :y2="top25 + 2" variante="rubrica" />
      <text :x="X25 - 26" :y="(top24 + top25) / 2 + 7" text-anchor="end" class="crescita">+42%</text>
    </g>
    <g v-click>
      <path :d="barra(X25, taglio - 1, h(196) - 1)" class="hack" />
      <line :x1="X25" :y1="taglio" :x2="X25 + L" :y2="taglio" class="spazio" />
      <text :x="X25 + L / 2" :y="(top25 + taglio) / 2 + 6" text-anchor="middle" class="dentro scuro">196</text>
      <text :x="X25 + L / 2" :y="(taglio + BASE) / 2 + 6" text-anchor="middle" class="dentro chiaro">311</text>
      <text :x="X25 + L + 14" :y="(top25 + taglio) / 2 + 5" class="parte">hacktivism</text>
      <text :x="X25 + L + 14" :y="(taglio + BASE) / 2 + 5" class="parte">altri incidenti</text>
      <rect x="650" y="62" width="214" height="104" rx="8" class="riquadro" />
      <text x="757" y="88" text-anchor="middle" class="parte">senza hacktivism</text>
      <text x="757" y="124" text-anchor="middle" class="crescita grande">+12%</text>
      <text x="757" y="150" text-anchor="middle" class="nota">(in entrambi gli anni)</text>
    </g>
  </svg>
</template>

<style scoped>
.b24 { fill: #a9a7b0; }
.b25 { fill: var(--rubrica); }
.hack { fill: #f1d0d0; }
.spazio { stroke: var(--carta); stroke-width: 2; }
.asse { stroke: var(--inchiostro); stroke-width: 1.5; }
.livello { stroke: var(--grigio); stroke-width: 1.2; stroke-dasharray: 4 4; }
.valore { font-size: 18px; font-weight: 700; }
.anno { font-size: 16px; font-weight: 600; }
.crescita { font-size: 20px; font-weight: 700; fill: var(--rubrica); }
.crescita.grande { font-size: 30px; }
.dentro { font-size: 17px; font-weight: 700; }
.schema .chiaro { fill: var(--carta); }
.scuro { fill: var(--rubrica); }
.parte { font-size: 15px; }
.riquadro { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
</style>
