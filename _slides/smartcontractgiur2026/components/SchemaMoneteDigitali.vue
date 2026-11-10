<!--
  Diagram (new): three kinds of "digital money" side by side. Bitcoin (a crypto-asset: no issuer, new coins only
  through mining, fewer than 21 million by the protocol's rules, free price, nobody can freeze it); stablecoin (a
  private issuer such as Circle or Tether, as many tokens as the reserves, pegged to 1 $ or 1 €, the issuer can
  freeze an address); digital euro (a CBDC: central bank money issued by the Eurosystem, ECB and national central
  banks; worth exactly 1 €; a holding limit per person still to be set; status at 10 Nov 2026: not issued, EU
  legislation in trilogue, first issuance possible in 2029). Last row: who stands behind it?
  Sources: Bitcoin Core, src/consensus/amount.h (MAX_MONEY = 21,000,000 BTC as a sanity limit; the actual supply is
  "less than 21,000,000 BTC"); Circle, Transparency (USDC/EURC 1:1, reserves); Circle FiatToken Blacklistable.sol and
  Tether's USDT contract (addBlackList); ECB, "Digital euro" (ecb.europa.eu/euro/digital_euro): Governing Council
  moved to the next phase in October 2025, pilot in 2027, "potential first issuance ... during 2029" if the EU
  legislation is adopted in 2026; Council mandate 19 Dec 2025, Parliament position 9 Jul 2026, trilogues since
  13 Jul 2026 (Freshfields, 15 Jul 2026); holding limits still open in the negotiation (same source).
  4 clicks: bitcoin; stablecoin; digital euro; the row "chi garantisce?".
  <SchemaMoneteDigitali />
-->
<script setup lang="ts">
type Colonna = { titolo: string, sotto: string, segno: string, righe: [string, string][], note: string[], nota: 'n' | 'ko' }
const COLONNE: Colonna[] = [
  { titolo: 'bitcoin', sotto: 'cripto-attività', segno: '₿', righe: [
    ['chi la emette', 'nessuno: nasce col mining'], ['quanta ce n\'è', 'meno di 21 milioni, per codice'],
    ['valore', 'libero: oscilla'],
  ], note: ['nessuno la può congelare'], nota: 'n' },
  { titolo: 'stablecoin', sotto: 'es. USDC, USDT, EURC', segno: '$', righe: [
    ['chi la emette', 'un\'impresa (es. Circle, Tether)'], ['quanta ce n\'è', 'quanto ha in riserva'],
    ['valore', 'agganciato a 1 $ o 1 €'],
  ], note: ['l\'emittente può congelare', 'un indirizzo'], nota: 'ko' },
  { titolo: 'euro digitale', sotto: 'CBDC · non ancora emesso', segno: '€', righe: [
    ['chi la emette', 'la BCE (Eurosistema)'], ['quanta ce n\'è', 'tetto per persona, da fissare'],
    ['valore', 'è euro: come il contante'],
  ], note: ['legge UE in trattativa; prima', 'emissione possibile nel 2029'], nota: 'n' },
]
const X = [10, 300, 590] // left edge of each column
const W = 280
const GARANTE = ['nessuno: codice e rete', 'l\'emittente, con le riserve', 'la banca centrale']
</script>

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: bitcoin, stablecoin ed euro digitale a confronto: chi le emette, quante ce ne sono, quanto valgono e chi le garantisce">
    <!-- 1-3. Una colonna per click -->
    <g v-for="(c, i) in COLONNE" :key="c.titolo" v-click>
      <rect :x="X[i]" y="4" :width="W" height="226" rx="8" class="colonna" />
      <circle :cx="X[i] + 32" cy="34" r="19" class="moneta" />
      <text :x="X[i] + 32" y="41" text-anchor="middle" class="segno">{{ c.segno }}</text>
      <text :x="X[i] + 62" y="31" class="t16 b">{{ c.titolo }}</text>
      <text :x="X[i] + 62" y="49" class="nota">{{ c.sotto }}</text>
      <g v-for="(r, j) in c.righe" :key="r[0]">
        <text :x="X[i] + 16" :y="80 + j * 42" class="etichetta">{{ r[0] }}</text>
        <text :x="X[i] + 16" :y="98 + j * 42" class="t14">{{ r[1] }}</text>
      </g>
      <text v-for="(t, j) in c.note" :key="t" :x="X[i] + 16" :y="207 + j * 16"
        :class="c.nota === 'ko' ? 't14 b arancio' : 'nota'">{{ t }}</text>
    </g>

    <!-- 4. Chi garantisce? -->
    <g v-click>
      <rect x="10" y="238" width="860" height="50" rx="8" class="garanzia" />
      <text x="24" y="258" class="t14 b rosso">chi garantisce?</text>
      <text v-for="(g, i) in GARANTE" :key="g" :x="X[i] + W / 2" y="279" text-anchor="middle" class="t15 b">{{ g }}</text>
    </g>
  </svg>
</template>

<style scoped>
.colonna { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.moneta { fill: #d9a520; stroke: #8a6a12; stroke-width: 1.5; }
.segno { font-size: 20px; font-weight: 700; fill: #3b2a05; }
.etichetta { font-size: 13px; fill: var(--grigio); }
.garanzia { fill: color-mix(in srgb, var(--rubrica) 12%, var(--carta)); stroke: var(--rubrica); stroke-width: 1.5; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.rosso { fill: var(--rubrica); }
.arancio { fill: var(--ko); }
</style>
