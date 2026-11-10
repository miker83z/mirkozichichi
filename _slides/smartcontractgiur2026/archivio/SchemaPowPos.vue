<!--
  Diagram (new): Proof of Work and Proof of Stake in two columns.
  PoW (Bitcoin): miners compete computing hashes; the first to find a valid one proposes the block. Cost:
  electricity and hardware; rewriting history needs more computing power than the honest nodes. Finality
  is probabilistic: each further block (confirmation) lowers the risk that the transaction is undone.
  PoS (e.g. Ethereum): validators lock a stake (a deposit, like a "cauzione"); one is chosen to propose
  the block, the others vote; whoever cheats loses part of the stake (slashing). BFT finality (e.g. IOTA,
  CometBFT): once more than ⅔ of the stake has voted, the block is final. Ethereum finalises with "at
  least" ⅔, and IOTA (Starfish BFT, a DAG where "multiple validators can propose blocks simultaneously")
  does not fit the single-proposer picture: hence "es. Ethereum" for the mechanism, "es. IOTA" for finality.
  Sources: Bitcoin whitepaper (bitcoin.org/bitcoin.pdf) §4 proof-of-work ("scanning for a value that when
  hashed ... begins with a number of zero bits", "incrementing a nonce"), §6 "CPU time and electricity",
  §11 the attacker's probability "drops exponentially" with the number of blocks. ethereum.org, Proof of
  stake (developers/docs/consensus-mechanisms/pos): "One validator is randomly selected to be a block
  proposer", the others attest (vote), the stake "can be destroyed" if they behave dishonestly; Ethereum
  finalises checkpoints with "at least two-thirds of the total staked ETH". CometBFT spec
  (spec/consensus/consensus.md): commit with "+2/3" = "more than 2/3" of the voting power. IOTA docs
  (about-iota/iota-architecture/consensus): Starfish BFT, "an uncertified DAG structure", validators
  selected by delegated stake, tolerates "up to one-third of validators by stake" misbehaving.
  4 clicks: PoW; PoS; the costs; finality.
  <SchemaPowPos />
-->
<template>
  <svg viewBox="0 0 880 296" class="schema" role="img" aria-label="Schema: Proof of Work, gara di calcolo con costo in elettricità e finalità probabilistica; Proof of Stake, cauzione bloccata, slashing e finalità con oltre due terzi dello stake">
    <!-- 1. Proof of Work -->
    <g v-click>
      <text x="20" y="22" class="titolo">Proof of Work (Bitcoin)</text>
      <text x="20" y="41" class="nota">lavoro: una gara di calcolo tra «minatori»</text>
      <SvPersona :x="55" :y="50" :scala="0.75" />
      <SvPersona :x="135" :y="50" :scala="0.75" />
      <SvPersona :x="215" :y="50" :scala="0.75" variante="rubrica" />
      <SvRiquadro :x="20" :y="98" :w="70" :h="28" testo="✗ ✗ ✗ …" piccolo />
      <SvRiquadro :x="100" :y="98" :w="70" :h="28" testo="✗ ✗ ✗ …" piccolo />
      <SvRiquadro :x="180" :y="98" :w="70" :h="28" testo="✓ trovato" variante="ok" piccolo />
      <SvFreccia :x1="235" :y1="74" :x2="370" :y2="96" angolo="hv" etichetta="propone" variante="rubrica" />
      <SvRiquadro :x="312" :y="96" :w="116" :h="32" testo="nuovo blocco" variante="rubrica" />
      <text x="20" y="150" class="testo">chi trova per primo un hash valido propone il blocco</text>
    </g>

    <!-- 2. Proof of Stake -->
    <g v-click>
      <line x1="440" y1="6" x2="440" y2="292" class="divisorio" />
      <text x="465" y="22" class="titolo">Proof of Stake (es. Ethereum)</text>
      <text x="465" y="41" class="nota">posta: una cauzione bloccata (stake)</text>
      <g v-for="vx in [490, 550, 610]" :key="vx">
        <SvPersona :x="vx" :y="50" :scala="0.75" />
        <text :x="vx + 19" y="64" class="voto">✓</text>
        <SvLucchetto :x="vx - 14" :y="110" />
      </g>
      <SvPersona :x="670" :y="50" :scala="0.75" variante="rubrica" />
      <SvLucchetto :x="656" :y="110" />
      <SvFreccia :x1="690" :y1="74" :x2="810" :y2="96" angolo="hv" etichetta="propone" variante="rubrica" />
      <SvRiquadro :x="752" :y="96" :w="116" :h="32" testo="nuovo blocco" variante="rubrica" />
      <text x="465" y="150" class="testo">uno è scelto per proporre, gli altri votano <tspan class="ok">✓</tspan></text>
    </g>

    <!-- 3. I costi -->
    <g v-click>
      <path d="M36,170 L24,190 L33,190 L27,208 L44,184 L35,184 L41,170 Z" class="fulmine" />
      <text x="56" y="186" class="forte">costo: elettricità e hardware</text>
      <text x="56" y="204" class="nota">per riscrivere la storia serve più calcolo degli onesti</text>
      <SvLucchetto :x="466" :y="182" />
      <text x="506" y="186" class="forte">costo: capitale bloccato</text>
      <text x="506" y="204" class="nota">chi imbroglia perde parte della cauzione (slashing)</text>
    </g>

    <!-- 4. La finalità -->
    <g v-click>
      <line x1="20" y1="218" x2="425" y2="218" class="sottile" />
      <line x1="465" y1="218" x2="866" y2="218" class="sottile" />
      <text x="20" y="240" class="forte">Finalità probabilistica</text>
      <g v-for="i in 7" :key="i">
        <rect :x="20 + (i - 1) * 32" y="250" width="24" height="22" rx="3" :class="i === 1 ? 'blocco tx' : 'blocco'" />
        <text :x="32 + (i - 1) * 32" y="266" text-anchor="middle" class="cifra">{{ i === 1 ? 'tx' : i - 1 }}</text>
      </g>
      <text x="20" y="290" class="nota">la transazione, poi 1 … 6 conferme</text>
      <text x="262" y="258" class="testo">più conferme,</text>
      <text x="262" y="277" class="forte rosso">meno rischio</text>

      <text x="465" y="240" class="forte">Finalità BFT (es. IOTA)</text>
      <rect x="465" y="250" width="240" height="20" rx="3" class="barra" />
      <rect x="465" y="250" width="192" height="20" rx="3" class="pieno" />
      <line x1="625" y1="245" x2="625" y2="275" class="soglia" />
      <text x="625" y="290" text-anchor="middle" class="nota">⅔</text>
      <text x="465" y="290" class="nota">stake che ha votato</text>
      <text x="720" y="258" class="testo">con i voti di oltre ⅔</text>
      <text x="720" y="277" class="forte verde">è definitivo</text>
    </g>
  </svg>
</template>

<style scoped>
.titolo { font-size: 16px; font-weight: 700; }
.testo { font-size: 15px; }
.forte { font-size: 15px; font-weight: 700; }
.rosso { fill: var(--rubrica); }
.verde, .ok, .voto { fill: var(--ok); }
.voto { font-size: 16px; font-weight: 700; }
.divisorio { stroke: var(--linea); stroke-width: 1.5; }
.sottile { stroke: var(--linea); stroke-width: 1; }
.fulmine { fill: var(--glossa); stroke: var(--glossa); stroke-width: 1; stroke-linejoin: round; }
.blocco { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.2; }
.blocco.tx { fill: color-mix(in srgb, var(--rubrica) 18%, var(--carta)); stroke: var(--rubrica); }
.cifra { font-size: 13px; }
.barra { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.pieno { fill: color-mix(in srgb, var(--ok) 55%, var(--carta)); }
.soglia { stroke: var(--inchiostro); stroke-width: 2; }
</style>
