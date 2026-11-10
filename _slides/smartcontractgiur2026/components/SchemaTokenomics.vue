<!--
  Diagram (2025 deck, p. 59, the IOTA tokenomics flow): where the IOTA tokens go.
  Users pay computation fees (gas); the base part, up to the reference gas price, is burned; anything above
  it is a tip that goes to the staking rewards. Users also pay a storage deposit into the storage fund and
  get it back in full (100% rebate) when the data is deleted. Each epoch (about 24 hours) the protocol mints
  the validator subsidy, 767,000 IOTA; subsidy + tips are the staking rewards, shared between the
  validators (who first keep a commission) and the delegators, in proportion to stake.
  Every flow checked against docs.iota.org (Nov 2026) and the code:
  - docs.iota.org/about-iota/tokenomics (overview and flow chart: same flows as the 2025 slide);
  - docs.iota.org/about-iota/tokenomics/gas-pricing (gas_price = reference_gas_price + tip; "fees up to this
    level are burned"; tip "transferred to validators as part of their rewards"; "the storage rebate is 100%");
  - docs.iota.org/about-iota/tokenomics/proof-of-stake ("validator subsidy … 767,000 IOTA tokens per epoch,
    plus any tips"; commission first, the rest in proportion to stake);
  - docs.iota.org/about-iota/iota-architecture/staking-rewards ("newly minted IOTA tokens … 767k IOTA per
    epoch") and …/validator-committee (epochs of ~24 hours);
  - iotaledger/iota: iota_system_state_inner.move, advance_epoch (storage charge → storage fund; mint or burn
    so that rewards = validator subsidy + tips); iota-protocol-config (storage_rebate_rate 10000 = 100%,
    validator_target_reward 767,000 IOTA).
  Not drawn: the exact gas numbers (they change through governance).
  4 clicks: users and computation fees; burn of the base fee; storage fund, deposit and rebate; mint, tips,
  staking rewards to validators and delegators.
  <SchemaTokenomics />
-->

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema della tokenomics di IOTA: commissioni bruciate, mance e sussidio coniato come ricompense di staking, depositi e rimborsi del fondo di archiviazione">
    <!-- 1. utenti e commissioni di calcolo -->
    <g v-click>
      <SvRiquadro :x="20" :y="112" :w="150" :h="48" testo="Utenti" variante="vuoto" />
      <line x1="170" y1="136" x2="340" y2="136" class="flusso-rosso" />
      <circle cx="340" cy="136" r="4" class="nodo-rosso" />
      <text x="255" y="127" text-anchor="middle" class="t14">commissioni di calcolo</text>
      <text x="255" y="154" text-anchor="middle" class="nota">(gas, a ogni transazione)</text>
    </g>
    <!-- 2. la quota base viene bruciata -->
    <g v-click>
      <SvFreccia :x1="340" :y1="136" :x2="340" :y2="42" variante="rubrica" />
      <text x="340" y="28" text-anchor="middle" class="t16 b rosso">bruciati (burn)</text>
      <text x="328" y="78" text-anchor="end" class="t14">quota base</text>
      <text x="328" y="95" text-anchor="end" class="nota">(prezzo di riferimento)</text>
    </g>
    <!-- 3. fondo di archiviazione: deposito e rimborso -->
    <g v-click>
      <SvFreccia :x1="60" :y1="160" :x2="60" :y2="235" />
      <SvFreccia :x1="140" :y1="238" :x2="140" :y2="162" />
      <ellipse cx="100" cy="260" rx="86" ry="26" class="cassa" />
      <text x="100" y="259" text-anchor="middle" class="t14">fondo di archiviazione</text>
      <text x="100" y="275" text-anchor="middle" class="nota">(storage fund)</text>
      <text x="152" y="192" class="t14">↓ deposito per i dati salvati</text>
      <text x="152" y="211" class="t14">↑ rimborso del 100% se cancellati</text>
    </g>
    <!-- 4. conio, mance e ricompense di staking -->
    <g v-click>
      <SvFreccia :x1="340" :y1="136" :x2="462" :y2="136" etichetta="mance (tips)" variante="rubrica" lato="sotto" />
      <text x="556" y="28" text-anchor="middle" class="t16 b verde">coniati (mint)</text>
      <SvFreccia :x1="556" :y1="38" :x2="556" :y2="106" variante="ok" />
      <text x="544" y="64" text-anchor="end" class="t14">sussidio ai validatori</text>
      <text x="544" y="81" text-anchor="end" class="nota">767.000 IOTA per epoca</text>
      <text x="544" y="97" text-anchor="end" class="nota">(un'epoca ≈ 1 giorno)</text>
      <ellipse cx="556" cy="136" rx="92" ry="28" class="cassa" />
      <text x="556" y="141" text-anchor="middle" class="t14 b">ricompense di staking</text>
      <SvFreccia :x1="626" :y1="118" :x2="714" :y2="70" variante="ok" />
      <SvFreccia :x1="626" :y1="154" :x2="714" :y2="202" variante="ok" />
      <SvRiquadro :x="716" :y="40" :w="150" :h="46" testo="Delegatori" />
      <text x="791" y="104" text-anchor="middle" class="nota">il resto, in proporzione</text>
      <SvRiquadro :x="716" :y="186" :w="150" :h="46" testo="Validatori" />
      <text x="791" y="250" text-anchor="middle" class="nota">prima una commissione</text>
    </g>
  </svg>
</template>

<style scoped>
.t14 { font-size: 14px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.rosso { fill: var(--rubrica); }
.verde { fill: var(--ok); }
.flusso-rosso { stroke: var(--rubrica); stroke-width: 2; }
.nodo-rosso { fill: var(--rubrica); }
.cassa { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
</style>
