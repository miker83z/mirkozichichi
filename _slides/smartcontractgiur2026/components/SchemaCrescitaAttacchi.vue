<!--
  Diagram (new, for the opening), two panels.
  Left: serious incidents in Italy counted by Clusit (known from open sources), as two bars with their
  values: 2024 = 357, 2025 = 507 (+42%). Then the 2025 bar is split into hacktivism (196) and the other
  incidents (311): without hacktivism the growth is +12% (both years without hacktivism, per the Clusit
  presentation; see ../sicurezzagiur2026/verifica/C-firme-notizie.md).
  Right: events and incidents handled by CSIRT Italia (ACN), all of 2025 against the first nine months of
  2026. 2025 (annual report): 2,729 events, 615 incidents. Jan–Sep 2026 (Operational Summary): events
  2,171 (first half) + 305 (July) + 309 (August) + 485 (September) = 3,270; incidents about 1,072 + 188 +
  185 + 235 ≈ 1,680. Clusit and ACN count different things, so they stay in separate panels; since 2026
  the NIS2 obliges more entities to report.
  3 clicks: the two Clusit bars with +42%; the split with the +12% note; the ACN panel.
  <SchemaCrescitaAttacchi />
-->
<script setup lang="ts">
const BASE = 196

// Left panel: Clusit
const K = 130 / 507 // px per incident
const L = 78
const X24 = 40
const X25 = 180
const h = (n: number) => n * K

/** Bar (or top segment) of width w with 4 px rounded top corners, from y = basso up by `alto` px. */
function barra(x: number, basso: number, alto: number, w = L): string {
  const t = basso - alto
  return `M${x},${basso} V${t + 4} Q${x},${t} ${x + 4},${t} H${x + w - 4} Q${x + w},${t} ${x + w},${t + 4} V${basso} Z`
}
const top24 = BASE - h(357)
const top25 = BASE - h(507)
const taglio = BASE - h(311) // boundary between "altri" (below) and hacktivism (above)

// Right panel: ACN, all of 2025 against January–September 2026
const KA = 120 / 3270
const W = 56
const gruppi = [
  { nome: 'eventi', x: 480, prima: 2729, dopo: 3270, etichetta: ['2.729', '3.270'] },
  { nome: 'incidenti', x: 664, prima: 615, dopo: 1680, etichetta: ['615', '≈ 1.680'] },
]
</script>

<template>
  <svg viewBox="0 0 880 246" class="schema" role="img" aria-label="Grafico: incidenti gravi in Italia secondo Clusit, 357 nel 2024 e 507 nel 2025, di cui 196 di hacktivism; eventi e incidenti gestiti dall'ACN, 2.729 e 615 in tutto il 2025, 3.270 e circa 1.680 nei primi nove mesi del 2026">
    <g v-click>
      <text x="20" y="30" class="titoletto">Incidenti gravi in Italia</text>
      <text x="20" y="48" class="nota">fonte: Clusit (incidenti noti)</text>
      <path :d="barra(X24, BASE, h(357))" class="b24" />
      <path :d="barra(X25, BASE, h(507))" class="b25" />
      <line x1="20" :y1="BASE" x2="262" :y2="BASE" class="asse" />
      <text :x="X24 + L / 2" :y="top24 - 10" text-anchor="middle" class="valore">357</text>
      <text :x="X25 + L / 2" :y="top25 - 10" text-anchor="middle" class="valore">507</text>
      <text :x="X24 + L / 2" :y="BASE + 24" text-anchor="middle" class="anno">2024</text>
      <text :x="X25 + L / 2" :y="BASE + 24" text-anchor="middle" class="anno">2025</text>
      <line :x1="X24 + L" :y1="top24" :x2="X25" :y2="top24" class="livello" />
      <SvFreccia :x1="X25 - 14" :y1="top24 - 2" :x2="X25 - 14" :y2="top25 + 2" variante="rubrica" />
      <text :x="X25 - 24" :y="(top24 + top25) / 2 + 7" text-anchor="end" class="crescita">+42%</text>
    </g>
    <g v-click>
      <path :d="barra(X25, taglio - 1, h(196) - 1)" class="hack" />
      <line :x1="X25" :y1="taglio" :x2="X25 + L" :y2="taglio" class="spazio" />
      <text :x="X25 + L / 2" :y="(top25 + taglio) / 2 + 6" text-anchor="middle" class="dentro scuro">196</text>
      <text :x="X25 + L / 2" :y="(taglio + BASE) / 2 + 6" text-anchor="middle" class="dentro chiaro">311</text>
      <text :x="X25 + L + 12" :y="(top25 + taglio) / 2 + 5" class="parte">hacktivism</text>
      <text :x="X25 + L + 12" :y="(taglio + BASE) / 2 + 5" class="parte">altri incidenti</text>
      <rect x="300" y="12" width="132" height="62" rx="8" class="riquadro" />
      <text x="366" y="34" text-anchor="middle" class="parte">senza hacktivism</text>
      <text x="366" y="64" text-anchor="middle" class="crescita grande">+12%</text>
    </g>
    <g v-click>
      <line x1="452" y1="14" x2="452" y2="240" class="divisore" />
      <text x="470" y="30" class="titoletto">Eventi e incidenti segnalati all'ACN</text>
      <text x="470" y="48" class="nota">dal 2026 la NIS2 obbliga più soggetti a segnalare</text>
      <template v-for="g in gruppi" :key="g.nome">
        <path :d="barra(g.x, BASE, g.prima * KA, W)" class="b24" />
        <path :d="barra(g.x + W + 10, BASE, g.dopo * KA, W)" class="b25" />
        <text :x="g.x + W / 2" :y="BASE - g.prima * KA - 8" text-anchor="middle" class="valore piccolo">{{ g.etichetta[0] }}</text>
        <text :x="g.x + W * 1.5 + 10" :y="BASE - g.dopo * KA - 8" text-anchor="middle" class="valore piccolo">{{ g.etichetta[1] }}</text>
        <text :x="g.x + W / 2" :y="BASE + 18" text-anchor="middle" class="nota">2025</text>
        <text :x="g.x + W * 1.5 + 10" :y="BASE + 18" text-anchor="middle" class="nota">gen–set 2026</text>
        <text :x="g.x + W + 5" :y="BASE + 40" text-anchor="middle" class="anno">{{ g.nome }}</text>
      </template>
      <line x1="470" :y1="BASE" x2="806" :y2="BASE" class="asse" />
    </g>
  </svg>
</template>

<style scoped>
.b24 { fill: color-mix(in srgb, var(--grigio) 70%, var(--carta)); }
.b25 { fill: var(--rubrica); }
.hack { fill: color-mix(in srgb, var(--rubrica) 32%, var(--carta)); }
.spazio { stroke: var(--carta); stroke-width: 2; }
.asse { stroke: var(--inchiostro); stroke-width: 1.5; }
.livello { stroke: var(--grigio); stroke-width: 1.2; stroke-dasharray: 4 4; }
.divisore { stroke: var(--linea); stroke-width: 1.2; stroke-dasharray: 3 5; }
.valore { font-size: 18px; font-weight: 700; }
.valore.piccolo { font-size: 16px; }
.anno { font-size: 16px; font-weight: 600; }
.crescita { font-size: 20px; font-weight: 700; fill: var(--rubrica); }
.crescita.grande { font-size: 26px; }
.dentro { font-size: 17px; font-weight: 700; }
.schema .chiaro { fill: var(--carta); }
.scuro { fill: var(--rubrica); }
.parte { font-size: 15px; }
.riquadro { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
</style>
