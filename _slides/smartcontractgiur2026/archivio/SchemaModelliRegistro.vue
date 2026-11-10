<!--
  Diagram (new): three ways to keep the ledger, side by side, with the same payment (Alice gives 6 to Bob);
  before on top, the transaction in the middle, after at the bottom.
  UTXO (Bitcoin): coins are unspent outputs, like banknotes; the transaction consumes Alice's 5 and 3
  whole and creates 6 for Bob and 2 of change for Alice (the fee is left out).
  Accounts (Ethereum): a table of balances; the transaction changes the numbers (Alice 8 → 2, Bob 1 → 7).
  Objects (IOTA, Sui, with Move): every asset is an object with an id, an owner and a version; the
  transaction takes Alice's Coin object as input: the same id comes out with value 2 and a higher version,
  and a new object (new id) of value 6 goes to Bob. The ids are the first hex digits of real SHA-256
  digests of a label (placeholders, not real chain ids).
  Sources: Bitcoin whitepaper §2 and §9 (coins as chains of signatures; "multiple inputs and outputs",
  change); developer.bitcoin.org/devguide/transactions: "Each output then waits as an Unspent Transaction
  Output (UTXO) until a later input spends it", "the full value of the included UTXOs must be spent",
  "most transactions include a change output". ethereum.org/en/developers/docs/accounts: "An Ethereum
  account is an entity with an ether (ETH) balance", fields nonce, balance, codeHash, storageRoot.
  docs.iota.org/developer/iota-101/objects/object-model: objects "addressable on-chain by a unique ID",
  owner field, version that "increases monotonically with every transaction that modifies the object",
  "Transactions in IOTA take objects as input". IOTA framework coin.move: public struct Coin<phantom T>
  has key, store { id: UID, balance: Balance<T> }.
  4 clicks: UTXO; accounts; objects; the caption.
  <SchemaModelliRegistro />
-->
<script setup lang="ts">
import { sha256 } from '../utils/crypto'

const idAlice = `id 0x${sha256('Coin di Alice').slice(0, 4)}…`
const idBob = `id 0x${sha256('Coin per Bob').slice(0, 4)}…`
const TX = 112 // top of the transaction boxes
</script>

<template>
  <svg viewBox="0 0 880 292" class="schema" role="img" aria-label="Schema: lo stesso pagamento nei modelli UTXO di Bitcoin, a conti di Ethereum e a oggetti di IOTA">
    <!-- 1. UTXO -->
    <g v-click>
      <text x="140" y="20" text-anchor="middle" class="titolo">UTXO (Bitcoin)</text>
      <text x="140" y="38" text-anchor="middle" class="nota">monete come banconote</text>
      <SvRiquadro :x="40" :y="48" :w="90" :h="40" testo="5 BTC\nAlice" class="banconota" piccolo />
      <SvRiquadro :x="150" :y="48" :w="90" :h="40" testo="3 BTC\nAlice" class="banconota" piccolo />
      <SvFreccia :x1="85" :y1="88" :x2="85" :y2="TX - 2" />
      <SvFreccia :x1="195" :y1="88" :x2="195" :y2="TX - 2" />
      <SvRiquadro :x="40" :y="TX" :w="200" :h="28" testo="transazione" variante="rubrica" />
      <SvFreccia :x1="85" :y1="TX + 28" :x2="85" :y2="TX + 46" />
      <SvFreccia :x1="195" :y1="TX + 28" :x2="195" :y2="TX + 46" />
      <SvRiquadro :x="40" :y="TX + 48" :w="90" :h="40" testo="6 BTC\nBob" class="banconota" piccolo />
      <SvRiquadro :x="150" :y="TX + 48" :w="90" :h="40" testo="2 BTC\nresto: Alice" class="banconota" piccolo />
      <text x="140" y="236" text-anchor="middle" class="desc">consuma monete intere</text>
      <text x="140" y="254" text-anchor="middle" class="desc">e ne crea di nuove (col resto)</text>
    </g>

    <!-- 2. Conti -->
    <g v-click>
      <line x1="290" y1="8" x2="290" y2="252" class="divisorio" />
      <text x="440" y="20" text-anchor="middle" class="titolo">Conti (Ethereum)</text>
      <text x="440" y="38" text-anchor="middle" class="nota">come un estratto conto</text>
      <text x="372" y="72" text-anchor="end" class="nota">prima</text>
      <g v-for="(r, i) in [['Alice', '8 ETH'], ['Bob', '1 ETH']]" :key="'p' + i">
        <rect x="380" :y="48 + i * 20" width="60" height="20" class="cella" />
        <rect x="440" :y="48 + i * 20" width="60" height="20" class="cella" />
        <text x="410" :y="63 + i * 20" text-anchor="middle" class="voce">{{ r[0] }}</text>
        <text x="470" :y="63 + i * 20" text-anchor="middle" class="voce">{{ r[1] }}</text>
      </g>
      <SvFreccia :x1="440" :y1="88" :x2="440" :y2="TX - 2" />
      <SvRiquadro :x="340" :y="TX" :w="200" :h="28" testo="transazione" variante="rubrica" />
      <SvFreccia :x1="440" :y1="TX + 28" :x2="440" :y2="TX + 46" />
      <text x="372" :y="TX + 72" text-anchor="end" class="nota">dopo</text>
      <g v-for="(r, i) in [['Alice', '2 ETH'], ['Bob', '7 ETH']]" :key="'d' + i">
        <rect x="380" :y="TX + 48 + i * 20" width="60" height="20" class="cella" />
        <rect x="440" :y="TX + 48 + i * 20" width="60" height="20" class="cella" />
        <text x="410" :y="TX + 63 + i * 20" text-anchor="middle" class="voce">{{ r[0] }}</text>
        <text x="470" :y="TX + 63 + i * 20" text-anchor="middle" class="voce nuovo">{{ r[1] }}</text>
      </g>
      <text x="440" y="236" text-anchor="middle" class="desc">una tabella di saldi:</text>
      <text x="440" y="254" text-anchor="middle" class="desc">la transazione cambia i numeri</text>
    </g>

    <!-- 3. Oggetti -->
    <g v-click>
      <line x1="590" y1="8" x2="590" y2="252" class="divisorio" />
      <text x="740" y="20" text-anchor="middle" class="titolo">Oggetti (IOTA, Sui)</text>
      <text x="740" y="38" text-anchor="middle" class="nota">ogni bene è un oggetto (Move)</text>
      <rect x="665" y="46" width="150" height="56" rx="6" class="oggetto" />
      <text x="740" y="62" text-anchor="middle" class="voce forte">Coin · 8 IOTA</text>
      <text x="740" y="78" text-anchor="middle" class="voce mono">{{ idAlice }}</text>
      <text x="740" y="95" text-anchor="middle" class="voce">Alice · versione 7</text>
      <SvFreccia :x1="740" :y1="102" :x2="740" :y2="TX - 2" />
      <SvRiquadro :x="640" :y="TX" :w="200" :h="28" testo="transazione" variante="rubrica" />
      <SvFreccia :x1="700" :y1="TX + 28" :x2="672" :y2="TX + 44" />
      <SvFreccia :x1="780" :y1="TX + 28" :x2="808" :y2="TX + 44" />
      <rect x="605" :y="TX + 46" width="130" height="56" rx="6" class="oggetto" />
      <text x="670" :y="TX + 62" text-anchor="middle" class="voce forte">Coin · 2 IOTA</text>
      <text x="670" :y="TX + 78" text-anchor="middle" class="voce mono">{{ idAlice }}</text>
      <text x="670" :y="TX + 95" text-anchor="middle" class="voce">Alice · versione <tspan class="nuovo">8</tspan></text>
      <rect x="745" :y="TX + 46" width="130" height="56" rx="6" class="oggetto" />
      <text x="810" :y="TX + 62" text-anchor="middle" class="voce forte">Coin · 6 IOTA</text>
      <text x="810" :y="TX + 78" text-anchor="middle" class="voce mono">{{ idBob }}</text>
      <text x="810" :y="TX + 95" text-anchor="middle" class="voce">Bob · <tspan class="nuovo">nuovo</tspan></text>
      <text x="740" y="236" text-anchor="middle" class="desc">ogni bene: id, proprietario, versione</text>
      <text x="740" y="254" text-anchor="middle" class="desc">la transazione prende oggetti</text>
    </g>

    <!-- 4. Didascalia -->
    <g v-click>
      <text x="440" y="284" text-anchor="middle" class="didascalia">lo stesso pagamento (Alice dà 6 a Bob) in tre registri diversi</text>
    </g>
  </svg>
</template>

<style scoped>
.titolo { font-size: 16px; font-weight: 700; }
.desc { font-size: 14px; }
.voce { font-size: 13px; }
.forte { font-weight: 700; }
.nuovo { fill: var(--rubrica); font-weight: 700; }
.cella { fill: var(--campo); stroke: var(--linea); stroke-width: 1.2; }
.oggetto { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.4; }
.divisorio { stroke: var(--linea); stroke-width: 1.2; }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
.banconota :deep(rect) { fill: color-mix(in srgb, var(--glossa) 20%, var(--carta)); stroke: var(--glossa); }
</style>
