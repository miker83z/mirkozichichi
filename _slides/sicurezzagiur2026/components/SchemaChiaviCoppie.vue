<!--
  Diagram (new, for 2024 deck p. 35): how many keys are needed.
  Left, symmetric: 5 people on a circle, every pair linked by its own secret key → 10 keys = n(n−1)/2.
  Right, asymmetric: each person has one key pair → 5 pairs. Then a small table (5, 10, 100, 1.000 people,
  computed) and the caption: it grows with the square of n (quadratic, not "exponential" as in 2024).
  3 clicks: symmetric, asymmetric, table and caption.
  <SchemaChiaviCoppie />
-->
<script setup lang="ts">
const N = 5
const R = 84
const CY = 136
const rad = (a: number) => (a * Math.PI) / 180
const vertici = (cx: number) =>
  Array.from({ length: N }, (_, k) => {
    const a = -90 + (360 / N) * k
    return { x: cx + R * Math.cos(rad(a)), y: CY + R * Math.sin(rad(a)), a }
  })

const sinistra = vertici(150)
const coppie: { x1: number, y1: number, x2: number, y2: number, mx: number, my: number }[] = []
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    const a = sinistra[i]
    const b = sinistra[j]
    coppie.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 })
  }
}

const destra = vertici(450).map(v => ({
  ...v,
  kx: 450 + 48 * Math.cos(rad(v.a)),
  ky: CY + 48 * Math.sin(rad(v.a)),
}))

// Italian thousands separator also for 4-digit numbers (1.000, 4.950), as in the slide notes.
const it = (v: number) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
const righe = [5, 10, 100, 1000].map(n => ({ n, simm: (n * (n - 1)) / 2, asimm: n }))
</script>

<template>
  <svg viewBox="0 0 880 276" class="schema" role="img" aria-label="Schema: con 5 persone la crittografia simmetrica richiede 10 chiavi segrete, l'asimmetrica 5 coppie di chiavi; il numero di chiavi simmetriche cresce con il quadrato delle persone">
    <g v-click>
      <text x="150" y="22" text-anchor="middle" class="titolo">simmetrica</text>
      <line v-for="(c, i) in coppie" :key="`l${i}`" :x1="c.x1" :y1="c.y1" :x2="c.x2" :y2="c.y2" class="legame" />
      <circle v-for="(c, i) in coppie" :key="`k${i}`" :cx="c.mx" :cy="c.my" r="5" class="chiave" />
      <SvPersona v-for="(v, i) in sinistra" :key="`p${i}`" :x="v.x" :y="v.y - 16" :scala="0.6" />
      <text x="150" y="250" text-anchor="middle" class="conto">{{ coppie.length }} chiavi segrete</text>
      <text x="150" y="269" text-anchor="middle" class="nota">una per ogni coppia di persone</text>
    </g>
    <g v-click>
      <text x="450" y="22" text-anchor="middle" class="titolo">asimmetrica</text>
      <circle cx="450" :cy="CY" :r="R" class="cerchio" />
      <template v-for="(v, i) in destra" :key="`d${i}`">
        <SvPersona :x="v.x" :y="v.y - 16" :scala="0.6" />
        <SvChiave :x="v.kx - 12" :y="v.ky - 7" tipo="pubblica" :scala="0.55" />
        <SvChiave :x="v.kx - 12" :y="v.ky + 8" tipo="privata" :scala="0.55" />
      </template>
      <text x="450" y="250" text-anchor="middle" class="conto">{{ N }} coppie di chiavi</text>
      <text x="450" y="269" text-anchor="middle" class="nota">una coppia per persona</text>
    </g>
    <g v-click>
      <text x="652" y="40" text-anchor="end" class="intestazione">persone</text>
      <text x="760" y="40" text-anchor="end" class="intestazione">simmetrica</text>
      <text x="866" y="40" text-anchor="end" class="intestazione">asimmetrica</text>
      <line x1="590" y1="50" x2="868" y2="50" class="riga" />
      <g v-for="(r, i) in righe" :key="r.n">
        <rect v-if="i === 0" x="590" y="56" width="278" height="24" rx="3" class="evidenza" />
        <text x="652" :y="74 + 26 * i" text-anchor="end" class="cifra">{{ it(r.n) }}</text>
        <text x="760" :y="74 + 26 * i" text-anchor="end" class="cifra rossa">{{ it(r.simm) }}</text>
        <text x="866" :y="74 + 26 * i" text-anchor="end" class="cifra">{{ it(r.asimm) }}</text>
      </g>
      <text x="729" y="196" text-anchor="middle" class="formula">simmetrica: n(n − 1)/2 chiavi</text>
      <text x="729" y="224" text-anchor="middle" class="quadrato">cresce con il quadrato di n</text>
    </g>
  </svg>
</template>

<style scoped>
.titolo {
  font-weight: 700;
  font-size: 17px;
}
.legame {
  stroke: #b08a2e;
  stroke-width: 1.8;
}
.chiave {
  fill: #b08a2e;
  stroke: var(--carta);
  stroke-width: 1.5;
}
.cerchio {
  fill: none;
  stroke: var(--linea);
  stroke-width: 1.5;
  stroke-dasharray: 5 5;
}
.conto {
  font-weight: 700;
  font-size: 16px;
}
.intestazione {
  font-weight: 700;
  font-size: 14px;
  fill: var(--grigio);
}
.riga {
  stroke: var(--inchiostro);
  stroke-width: 1.5;
}
.evidenza {
  fill: var(--campo);
}
.cifra {
  font-family: var(--mono);
  font-size: 15px;
}
.cifra.rossa {
  fill: var(--rubrica);
  font-weight: 700;
}
.formula {
  font-size: 15px;
}
.quadrato {
  font-family: var(--serif);
  font-weight: 650;
  font-size: 19px;
  fill: var(--rubrica);
}
</style>
