<!--
  Diagram (new, for 2024 deck p. 12): the three components of a system, stacked from the bottom
  (hardware, software, humanware = people), and security as a continuous cycle
  (aggiornare, formare, verificare): "a process, not a product" (Schneier, 2000).
  4 clicks: hardware, software, humanware, the cycle.
  <SchemaComponenti />
-->
<script setup lang="ts">
const C = { x: 700, y: 120 }
const R = 72
const rad = (a: number) => (a * Math.PI) / 180
const pt = (a: number, r = R) => [C.x + r * Math.cos(rad(a)), C.y + r * Math.sin(rad(a))]
const f = (n: number) => n.toFixed(1)

// Three clockwise arcs (angles in degrees, 0 = right, 90 = down), with an arrowhead at the end of each.
const archi = [[-75, 15], [45, 135], [165, 255]].map(([a0, a1]) => {
  const [x0, y0] = pt(a0)
  const [x1, y1] = pt(a1)
  const t = rad(a1)
  const dx = -Math.sin(t)
  const dy = Math.cos(t)
  const l = 13
  const w = 6.5
  const bx = x1 - l * dx
  const by = y1 - l * dy
  return {
    d: `M${f(x0)},${f(y0)} A${R},${R} 0 0 1 ${f(x1)},${f(y1)}`,
    punta: `${f(x1)},${f(y1)} ${f(bx - w * dy)},${f(by + w * dx)} ${f(bx + w * dy)},${f(by - w * dx)}`,
  }
})
const etichette = [
  { a: -30, testo: 'aggiornare', anchor: 'start' },
  { a: 90, testo: 'formare', anchor: 'middle' },
  { a: 210, testo: 'verificare', anchor: 'end' },
].map(e => {
  const [x, y] = pt(e.a, R + 16)
  return { ...e, x, y: y + (e.a === 90 ? 12 : 5) }
})
</script>

<template>
  <svg viewBox="0 0 880 236" class="schema" role="img" aria-label="Schema: hardware, software e persone; la sicurezza è un ciclo continuo: aggiornare, formare, verificare">
    <g v-click>
      <rect x="20" y="160" width="460" height="64" rx="8" class="strato" />
      <rect x="54" y="176" width="32" height="32" rx="3" class="tratto" />
      <rect x="62" y="184" width="16" height="16" class="pieno" />
      <path d="M60,170 v6 M70,170 v6 M80,170 v6 M60,208 v6 M70,208 v6 M80,208 v6 M48,182 h6 M48,192 h6 M48,202 h6 M86,182 h6 M86,192 h6 M86,202 h6" class="tratto" />
      <text x="116" y="187" class="nome">Hardware</text>
      <text x="116" y="210" class="descr">computer, telefoni, reti, server</text>
    </g>
    <g v-click>
      <rect x="20" y="88" width="460" height="64" rx="8" class="strato" />
      <rect x="47" y="102" width="46" height="36" rx="3" class="tratto" />
      <path d="M47,111 h46" class="tratto" />
      <text x="70" y="132" text-anchor="middle" class="codice">&lt;/&gt;</text>
      <text x="116" y="115" class="nome">Software</text>
      <text x="116" y="138" class="descr">sistemi operativi, programmi, app</text>
    </g>
    <g v-click>
      <rect x="20" y="16" width="460" height="64" rx="8" class="strato umano" />
      <SvPersona :x="60" :y="24" :scala="0.6" />
      <SvPersona :x="82" :y="30" :scala="0.6" variante="rubrica" />
      <text x="116" y="43" class="nome">Humanware</text>
      <text x="116" y="66" class="descr">le persone: utenti, amministratori</text>
      <text x="466" y="55" text-anchor="end" class="avviso">mai sottovalutarle</text>
    </g>
    <g v-click>
      <path d="M492,16 h8 v208 h-8 M500,120 h112" class="graffa" />
      <path v-for="(a, i) in archi" :key="`a${i}`" :d="a.d" class="ciclo" />
      <polygon v-for="(a, i) in archi" :key="`p${i}`" :points="a.punta" class="punta" />
      <text v-for="e in etichette" :key="e.testo" :x="e.x" :y="e.y" :text-anchor="e.anchor" class="fase">{{ e.testo }}</text>
      <text x="700" y="116" text-anchor="middle" class="centro">un processo,</text>
      <text x="700" y="137" text-anchor="middle" class="centro">non un prodotto</text>
    </g>
  </svg>
</template>

<style scoped>
.strato {
  fill: var(--campo);
  stroke: var(--linea);
  stroke-width: 1.5;
}
.strato.umano {
  fill: #fbeeee;
  stroke: var(--rubrica);
}
.tratto {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 1.8;
}
.pieno {
  fill: var(--inchiostro);
}
.codice {
  font-family: var(--mono);
  font-weight: 700;
  font-size: 15px;
}
.nome {
  font-weight: 700;
  font-size: 18px;
}
.descr {
  font-size: 15px;
  fill: var(--grigio);
}
.avviso {
  font-weight: 700;
  font-size: 15px;
  fill: var(--rubrica);
}
.graffa {
  fill: none;
  stroke: var(--grigio);
  stroke-width: 1.5;
}
.ciclo {
  fill: none;
  stroke: var(--rubrica);
  stroke-width: 3;
}
.punta {
  fill: var(--rubrica);
}
.fase {
  font-weight: 700;
  font-size: 17px;
}
.centro {
  font-family: var(--serif);
  font-size: 16px;
}
</style>
