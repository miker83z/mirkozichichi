<!--
  Diagram (new): the seed phrase (BIP-39) without bits, a simpler companion of <SchemaSeed />.
  (a) A die with 2048 faces thrown 12 times: 12 words from the official Italian list. The phrase below is a real,
  valid BIP-39 phrase made once for this slide from 16 random bytes (entropy 19a983d85458a11cfb7c9f28ef21ded1;
  SHA-256 = 8511f54f…, so the checksum is the first 4 bits, 1000; the 12 groups of 11 bits are the word numbers
  205 608 1968 1349 1104 1139 1903 1183 327 968 957 1304). It is a DEMO PHRASE, public: never use it for a wallet.
  The same code gives the official English test vectors (00…00 → abandon ×11 about; 7f7f… → legal winner … yellow;
  8080… → letter advice … above), and data/bip39-italiano.ts is identical to the official italian.txt.
  (b) The last word holds 7 random bits + the 4 checksum bits, like the check character at the end of the codice
  fiscale: a wrong word is caught 15 times out of 16 ("quasi sempre"). Example checked: writing "orzo" instead of
  "orzata" (word 8) gives an invalid phrase.
  (c) From the 12 words every wallet recomputes the same keys and addresses (BIP-32/BIP-44: a tree of keys from one
  seed). (d) Whoever has the words has the funds; 2048^12 = 2^132 ≈ 5.4 × 10^39 sequences of 12 words (of which
  2^128 ≈ 3.4 × 10^38 pass the checksum): guessing them is out of reach.
  Sources: BIP-39 (github.com/bitcoin/bips/blob/master/bip-0039.mediawiki: 128-bit entropy, checksum = first
  ENT/32 bits of SHA-256, groups of 11 bits as indexes into a 2048-word list, 12 words for 128 bits); Italian list
  bip-0039/italian.txt (sha256 d392c49f…); test vectors github.com/trezor/python-mnemonic/blob/master/vectors.json;
  BIP-32 ("deriving a tree of keypairs from a single seed"); codice fiscale: the 16th character is a check
  character (DM 23 dicembre 1976). Arithmetic recomputed with Python (2048**12 == 2**132 = 5.4445…e39).
  4 clicks: die and 12 words; the check in the last word; keys and addresses on any wallet; who has the words has
  the funds.
  <SchemaSeedSemplice />
-->
<script setup lang="ts">
const PAROLE = ['barlume', 'etto', 'vedova', 'prima', 'nobile', 'odorare', 'tuffato', 'orzata', 'cedrata', 'mannaro', 'malafede', 'plasma']
const CW = 98 // chip width
const CH = 30 // chip height
const X0 = 130
const Y0 = 34
const cella = (i: number) => ({ x: X0 + (i % 4) * (CW + 8), y: Y0 + Math.floor(i / 4) * (CH + 8) })
const ULTIMA = cella(11)
const RAMI = [44, 92, 140] // rows of the key tree
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: un dado da 2048 facce lanciato 12 volte dà 12 parole; l'ultima contiene un controllo; dalle 12 parole qualsiasi wallet compatibile ricalcola chiavi e indirizzi; chi ha le parole ha i fondi, ma indovinarle è impossibile">
    <!-- 1. Un dado da 2048 facce, 12 lanci, 12 parole -->
    <g v-click>
      <text x="10" y="18" class="titoletto">un dado con 2048 facce, lanciato 12 volte</text>
      <rect x="18" y="42" width="64" height="64" rx="12" class="dado" />
      <circle cx="34" cy="58" r="5" class="punto" />
      <circle cx="50" cy="74" r="5" class="punto" />
      <circle cx="66" cy="90" r="5" class="punto" />
      <text x="50" y="132" text-anchor="middle" class="t16 b">× 12</text>
      <SvFreccia :x1="90" :y1="74" :x2="124" :y2="74" />
      <g v-for="(p, i) in PAROLE" :key="p">
        <rect :x="cella(i).x" :y="cella(i).y" :width="CW" :height="CH" rx="5" class="tessera" />
        <text :x="cella(i).x + 8" :y="cella(i).y + 20" class="numero">{{ i + 1 }}</text>
        <text :x="cella(i).x + 28" :y="cella(i).y + 20" class="t15">{{ p }}</text>
      </g>
      <text :x="X0" y="164" class="nota">lista ufficiale italiana (2048 parole) · frase d'esempio: mai usarla</text>
    </g>

    <!-- 2. L'ultima parola contiene un controllo -->
    <g v-click>
      <rect :x="ULTIMA.x - 3" :y="ULTIMA.y - 3" :width="CW + 6" :height="CH + 6" rx="7" class="evidenza" />
      <text x="10" y="196" class="t15 b rosso">l'ultima parola contiene anche un controllo,</text>
      <text x="10" y="215" class="t15">come l'ultima lettera del codice fiscale</text>
      <text x="10" y="242" class="t14">una parola sbagliata (quasi sempre) si scopre subito:</text>
      <text x="10" y="264" class="t14">«orzata» scritta «orzo» → <tspan class="b arancio">✗ frase non valida</tspan></text>
    </g>

    <!-- 3. Dalle parole, su qualsiasi wallet, tutte le chiavi e gli indirizzi -->
    <g v-click>
      <path d="M550,34 H556 V140 H550 M556,87 H570" class="ramo" />
      <path :d="`M570,${RAMI[0]} V${RAMI[2]}`" class="ramo" />
      <g v-for="(y, i) in RAMI" :key="y">
        <path :d="`M570,${y} H587`" class="ramo" />
        <SvChiave :x="598" :y="y" tipo="privata" :etichetta="`chiave ${i + 1}`" />
        <SvFreccia :x1="648" :y1="y" :x2="684" :y2="y" />
        <SvRiquadro :x="686" :y="y - 14" :w="110" :h="28" :testo="`indirizzo ${i + 1}`" variante="vuoto" piccolo />
      </g>
      <text x="741" y="172" text-anchor="middle" class="t15 b">…</text>
      <text x="580" y="196" class="t14">su qualsiasi wallet compatibile, le 12 parole</text>
      <text x="580" y="214" class="t14">ridanno tutte le chiavi e gli indirizzi</text>
    </g>

    <!-- 4. Chi ha le parole ha i fondi; indovinarle è impossibile -->
    <g v-click>
      <text x="580" y="240" class="t16 b rosso">chi ha le 12 parole ha i fondi</text>
      <text x="580" y="260" class="t14">2¹²⁸ ≈ 3,4 × 10³⁸ frasi valide:</text>
      <text x="580" y="278" class="t14">indovinarle è impossibile in pratica</text>
    </g>
  </svg>
</template>

<style scoped>
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.t16 { font-size: 16px; }
.b { font-weight: 700; }
.rosso { fill: var(--rubrica); }
.arancio { fill: var(--ko); }
.dado { fill: var(--inchiostro); stroke: var(--inchiostro); stroke-width: 1.5; }
.punto { fill: var(--carta); }
.tessera { fill: var(--campo); stroke: var(--linea); stroke-width: 1.3; }
.numero { font-size: 13px; fill: var(--grigio); }
.evidenza { fill: none; stroke: var(--rubrica); stroke-width: 2.5; }
.ramo { fill: none; stroke: var(--inchiostro); stroke-width: 1.4; }
</style>
