<!--
  Diagram (new): Bitcoin's issuance. A step chart of the block subsidy over 2009-2040: 50 BTC per block,
  halved every 210,000 blocks (about every 4 years): 50, 25, 12.5, 6.25, 3.125 (since 20 April 2024), …;
  then the cumulative supply, which grows ever more slowly towards 21 million; finally the 21 M ceiling
  and the sum 210,000 × 50 × (1 + ½ + ¼ + …) = 21,000,000 (in reality 20,999,999.9769 BTC, because every
  subsidy is rounded down to whole satoshis: 5,000,000,000 >> n).
  Dates of the halvings so far: timestamps of blocks 0, 210,000, 420,000, 630,000, 840,000 (mempool.space
  API): 3 Jan 2009, 28 Nov 2012, 9 Jul 2016, 11 May 2020, 20 Apr 2024. Later ones are estimates (block
  975,320 on 10 Nov 2026 → block 1,050,000 around April 2028, then every ≈ 4 years) and are dashed after
  today; the issuance between two halvings is drawn as linear in time.
  Sources: Bitcoin Core src/validation.cpp GetBlockSubsidy: nSubsidy = 50 * COIN; nSubsidy >>= halvings
  (nHeight / nSubsidyHalvingInterval, 210000; "approximately every 4 years"); Bitcoin whitepaper §6
  (new coins as the incentive). Total recomputed: Σ 210,000 × (5,000,000,000 >> n) = 2,099,999,997,690,000
  satoshi = 20,999,999.9769 BTC (the same figure as <Halving />).
  4 clicks: the first step (50 BTC); the halvings; the cumulative curve; the 21 M asymptote with the formula.
  <SchemaHalving />
-->
<script setup lang="ts">
const X0 = 70, X1 = 590, A0 = 2009, A1 = 2040.5
const BASE = 230
const x = (anno: number) => X0 + ((anno - A0) / (A1 - A0)) * (X1 - X0)
const yPremio = (btc: number) => BASE - btc * 3.2 // 50 BTC → 160 px
const yTotale = (btc: number) => BASE - (btc / 21e6) * 200 // 21 M → 200 px

const decimale = (a: number, m: number, g: number) => {
  const inizio = Date.UTC(a, 0, 1)
  return a + (Date.UTC(a, m - 1, g) - inizio) / (Date.UTC(a + 1, 0, 1) - inizio)
}
// Real halvings (block timestamps), then estimates every ≈ 4 years.
const T = [decimale(2009, 1, 3), decimale(2012, 11, 28), decimale(2016, 7, 9), decimale(2020, 5, 11), decimale(2024, 4, 20)]
for (let k = 5; k <= 8; k++) T.push(T[4] + 4 * (k - 4) - 0.02)
const OGGI = decimale(2026, 11, 10)
const premio = (n: number) => 50 / 2 ** n
const totale = [0]
for (let n = 0; n < T.length; n++) totale.push(totale[n] + 210_000 * premio(n))

// Step chart: era 0 alone (click 1); the rest solid up to today, dashed afterwards (click 2).
const era0 = `M${x(T[0])},${yPremio(50)} H${x(T[1])}`
let pieno = `M${x(T[1])},${yPremio(50)}`
for (let n = 1; n <= 4; n++) pieno += ` V${yPremio(premio(n))} H${x(n < 4 ? T[n + 1] : OGGI)}`
let stimato = `M${x(OGGI)},${yPremio(premio(4))} H${x(T[5])}`
for (let n = 5; n < T.length; n++) stimato += ` V${yPremio(premio(n))} H${x(n + 1 < T.length ? T[n + 1] : A1)}`

// Cumulative supply: linear within each era.
const totaleIn = (anno: number) => {
  let n = 0
  while (n + 1 < T.length && T[n + 1] <= anno) n++
  const fine = n + 1 < T.length ? T[n + 1] : T[n] + 4
  return totale[n] + (totale[n + 1] - totale[n]) * Math.min(1, (anno - T[n]) / (fine - T[n]))
}
const punti = (da: number, a: number) => {
  const p = [[da, totaleIn(da)]]
  for (const t of T) if (t > da && t < a) p.push([t, totaleIn(t)])
  p.push([a, totaleIn(a)])
  return p.map(([t, c], i) => `${i ? 'L' : 'M'}${x(t).toFixed(1)},${yTotale(c).toFixed(1)}`).join(' ')
}
const curvaPiena = punti(T[0], OGGI)
const curvaStimata = punti(OGGI, A1)

const etichette = [
  { t: '25', n: 1 }, { t: '12,5', n: 2 }, { t: '6,25', n: 3 }, { t: '3,125', n: 4 },
].map(e => ({ ...e, x: (x(T[e.n]) + x(T[e.n + 1])) / 2, y: yPremio(premio(e.n)) - 7 }))
const anni = [2009, 2012, 2016, 2020, 2024, 2028, 2032, 2036, 2040]
</script>

<template>
  <svg viewBox="0 0 880 256" class="schema" role="img" aria-label="Grafico: il premio per blocco di Bitcoin si dimezza ogni 210.000 blocchi, da 50 a 3,125 BTC; i bitcoin emessi tendono a 21 milioni">
    <!-- 1. Il primo gradino: 50 BTC per blocco -->
    <g v-click>
      <text x="20" y="18" class="titolo-asse premio-testo">premio per blocco (BTC)</text>
      <line :x1="X0" y1="60" :x2="X0" :y2="BASE" class="asse" />
      <line :x1="X0" :y1="BASE" :x2="X1" :y2="BASE" class="asse" />
      <text :x="X0 - 8" :y="yPremio(50) + 5" text-anchor="end" class="nota">50</text>
      <text :x="X0 - 8" :y="yPremio(25) + 5" text-anchor="end" class="nota">25</text>
      <text :x="X0 - 8" :y="BASE + 5" text-anchor="end" class="nota">0</text>
      <g v-for="a in anni" :key="a">
        <line :x1="x(a)" :x2="x(a)" :y1="BASE" :y2="BASE + 5" class="asse" />
        <text :x="x(a)" :y="BASE + 20" text-anchor="middle" class="nota">{{ a }}</text>
      </g>
      <path :d="era0" class="gradini" />
      <text :x="x(T[0]) + 4" :y="yPremio(50) - 9" class="premio-testo forte">50 BTC per blocco</text>
    </g>

    <!-- 2. I dimezzamenti -->
    <g v-click>
      <path :d="pieno" class="gradini" />
      <path :d="stimato" class="gradini stima" />
      <text v-for="e in etichette" :key="e.t" :x="e.x" :y="e.y" text-anchor="middle" class="premio-testo valore">{{ e.t }}</text>
      <text x="330" y="102" class="forte">ogni 210.000 blocchi (≈ 4 anni)</text>
      <text x="330" y="121" class="forte">il premio si dimezza</text>
      <text x="330" y="139" class="nota">tratteggio: date future stimate</text>
    </g>

    <!-- 3. La curva cumulata -->
    <g v-click>
      <path :d="curvaPiena" class="curva" />
      <path :d="curvaStimata" class="curva stima" />
      <circle :cx="x(T[1])" :cy="yTotale(totale[1])" r="4" class="punto" />
      <text :x="x(T[1]) - 8" :y="yTotale(totale[1]) - 6" text-anchor="end" class="totale-testo">10,5 mln</text>
      <circle :cx="x(T[4])" :cy="yTotale(totale[4])" r="4" class="punto" />
      <text :x="x(T[4])" :y="yTotale(totale[4]) + 22" text-anchor="middle" class="totale-testo">19,7 mln</text>
      <text :x="X1 - 4" y="62" text-anchor="end" class="totale-testo forte">bitcoin in circolazione</text>
    </g>

    <!-- 4. Il tetto di 21 milioni e la formula -->
    <g v-click>
      <line :x1="X0" :y1="yTotale(21e6)" :x2="X1" :y2="yTotale(21e6)" class="tetto" />
      <text :x="X1 - 4" :y="yTotale(21e6) - 8" text-anchor="end" class="forte">21 milioni</text>
      <rect x="618" y="36" width="258" height="166" rx="8" class="riquadro" />
      <text x="634" y="62" class="forte">Perché 21 milioni?</text>
      <text x="634" y="90" class="formula">210.000 × 50 × (1 + ½ + ¼ + …)</text>
      <text x="634" y="113" class="formula">= 210.000 × 50 × 2</text>
      <text x="634" y="144" class="risultato">= 21.000.000</text>
      <text x="634" y="172" class="nota">in realtà 20.999.999,9769:</text>
      <text x="634" y="190" class="nota">premi arrotondati al satoshi</text>
    </g>
  </svg>
</template>

<style scoped>
.asse { stroke: var(--inchiostro); stroke-width: 1.5; }
.gradini { fill: none; stroke: var(--glossa); stroke-width: 3; }
.stima { stroke-dasharray: 6 5; }
.curva { fill: none; stroke: var(--rubrica); stroke-width: 2.5; }
.punto { fill: var(--rubrica); }
.tetto { stroke: var(--inchiostro); stroke-width: 1.5; stroke-dasharray: 3 4; }
.titolo-asse { font-size: 14px; font-weight: 700; }
.schema .premio-testo { fill: var(--glossa); }
.valore { font-size: 13px; font-weight: 700; }
.schema .totale-testo { fill: var(--rubrica); font-size: 14px; }
.forte { font-size: 15px; font-weight: 700; }
.riquadro { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.formula { font-size: 15px; }
.risultato { font-size: 22px; font-weight: 700; fill: var(--rubrica); }
</style>
