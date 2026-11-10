<!--
  Diagram (2025 deck, pp. 26–27): from the private key to the address, with real values for the textbook
  private key 0x00…01 (never use it: everybody knows it).
  Ethereum: private key (256 random bits) → ECDSA on secp256k1 → public key, the point (x, y), two 256-bit
  numbers = 64 bytes (for the key 1 it is the generator G of the curve) → Keccak-256 → the address is the
  LAST 20 bytes of the digest (the 2025 slide said "first 40 bytes": wrong), written with the EIP-55
  upper/lower-case checksum.
  IOTA: private key (32-byte Ed25519 seed) → Ed25519 → public key (32 bytes) → BLAKE2b-256 → the whole
  32-byte digest is the address. For Ed25519, the default scheme, IOTA hashes the bare public key; the
  other schemes (secp256k1 0x01, secp256r1 0x02, multisig 0x03) prepend their flag byte.
  Sources: Ethereum Yellow Paper, Appendix F (address = rightmost 160 bits of KEC of the public key);
  SEC 2 §2.4.1 (secp256k1 G); EIP-55; docs.iota.org/developer/cryptography/transaction-auth/keys-addresses
  (BLAKE2b-256, flags, "Ed25519 … does not have a flag prepended"); iotaledger/iota
  crates/iota-types/src/base_types.rs (update_hasher_with_flag skips Ed25519).
  Values computed offline (Keccak-256 checked on "" → c5d24601…5d85a470; the IOTA derivation checked
  against the address test vectors of crates/iota/src/unit_tests/keytool_tests.rs):
  key 1 → Keccak c0a6c424…29395bdf → 0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf;
  Ed25519 seed 1 → public key 4cb5abf6…f0a5ba29 → 0x7f26c5a0…2486c9ea.
  6 clicks: Ethereum private key; public key; Keccak digest; address; the IOTA column; the caption.
  <SchemaIndirizzo />
-->
<script setup lang="ts">
const ETH = {
  pubX: '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
  pubY: '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
  hash: 'c0a6c424ac7157ae408398df7e5f4552091a69125d5dfcb7b8c2659029395bdf',
  indirizzo: '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
}
const IOTA = {
  pub: '4cb5abf6ad79fbf5abbccafcc269d85cd2651ed4b885b5869f241aedf0a5ba29',
  indirizzo: '0x7f26c5a0c2219f58abcbc2ebd2da349acb10773ffbc37b6af91fa8df2486c9ea',
}
const corto = (h: string, n = 8) => `${h.slice(0, n)}…${h.slice(-n)}`
const testaHash = `${ETH.hash.slice(0, 4)}…${ETH.hash.slice(20, 24)} ` // the first 12 bytes, dropped
const codaHash = ETH.hash.slice(24) // the last 20 bytes = the address
const IOTA_ADDR = `0x${corto(IOTA.indirizzo.slice(2))}`
</script>

<template>
  <svg viewBox="0 0 880 292" class="schema" role="img" :aria-label="`Schema: dalla chiave privata alla chiave pubblica e all'indirizzo. Ethereum: ${ETH.indirizzo}; IOTA: ${IOTA.indirizzo}`">
    <!-- 1. Ethereum: chiave privata -->
    <g v-click>
      <text x="330" y="15" text-anchor="middle" class="titoletto">Ethereum</text>
      <text x="8" y="47" class="t14">chiave privata</text>
      <rect x="120" y="24" width="420" height="36" rx="6" class="campo" />
      <SvChiave :x="142" :y="42" tipo="privata" />
      <text x="198" y="47" class="mono t15">0x000…001</text>
      <text x="290" y="47" class="nota">(esempio)</text>
      <text x="530" y="47" text-anchor="end" class="nota">256 bit casuali</text>
    </g>
    <!-- 2. chiave pubblica -->
    <g v-click>
      <SvFreccia :x1="330" :y1="60" :x2="330" :y2="87" />
      <text x="342" y="78" class="t14">ECDSA su secp256k1</text>
      <text x="8" y="119" class="t14">chiave pubblica</text>
      <rect x="120" y="88" width="420" height="52" rx="6" class="campo" />
      <SvChiave :x="142" :y="114" tipo="pubblica" />
      <text x="198" y="109" class="mono t14">x = {{ corto(ETH.pubX) }}</text>
      <text x="198" y="130" class="mono t14">y = {{ corto(ETH.pubY) }}</text>
      <text x="530" y="109" text-anchor="end" class="nota">2 × 256 bit</text>
      <text x="530" y="130" text-anchor="end" class="nota">= 64 byte</text>
    </g>
    <!-- 3. impronta Keccak-256 -->
    <g v-click>
      <SvFreccia :x1="330" :y1="140" :x2="330" :y2="167" />
      <text x="342" y="158" class="t14">Keccak-256</text>
      <text x="8" y="186" class="t14">impronta</text>
      <text x="8" y="202" class="nota">(32 byte)</text>
      <rect x="120" y="168" width="420" height="36" rx="6" class="campo" />
      <text x="330" y="191" text-anchor="middle" class="mono t13"><tspan class="spento">{{ testaHash }}</tspan><tspan class="rosso">{{ codaHash }}</tspan></text>
    </g>
    <!-- 4. indirizzo: gli ultimi 20 byte -->
    <g v-click>
      <SvFreccia :x1="365" :y1="204" :x2="365" :y2="231" variante="rubrica" />
      <text x="377" y="222" class="t14 rosso">ultimi 20 byte</text>
      <text x="8" y="255" class="t14 b">indirizzo</text>
      <rect x="120" y="232" width="420" height="36" rx="6" class="indirizzo" />
      <text x="330" y="255" text-anchor="middle" class="mono t15 b">{{ ETH.indirizzo }}</text>
    </g>
    <!-- 5. IOTA -->
    <g v-click>
      <line x1="570" y1="4" x2="570" y2="268" class="divisorio" />
      <text x="736" y="15" text-anchor="middle" class="titoletto">IOTA</text>
      <rect x="600" y="24" width="272" height="36" rx="6" class="campo" />
      <SvChiave :x="620" :y="42" tipo="privata" />
      <text x="676" y="47" class="mono t15">0x000…001</text>
      <text x="864" y="47" text-anchor="end" class="nota">32 byte</text>
      <SvFreccia :x1="736" :y1="60" :x2="736" :y2="87" />
      <text x="748" y="78" class="t14">Ed25519</text>
      <rect x="600" y="88" width="272" height="52" rx="6" class="campo" />
      <SvChiave :x="620" :y="114" tipo="pubblica" />
      <text x="676" y="109" class="mono t14">{{ corto(IOTA.pub) }}</text>
      <text x="676" y="130" class="nota">32 byte</text>
      <SvFreccia :x1="736" :y1="140" :x2="736" :y2="231" variante="rubrica" />
      <text x="748" y="182" class="t14">BLAKE2b-256</text>
      <text x="748" y="199" class="nota">tutta l'impronta:</text>
      <text x="748" y="214" class="nota">32 byte</text>
      <rect x="600" y="232" width="272" height="36" rx="6" class="indirizzo" />
      <text x="736" y="255" text-anchor="middle" class="mono t15 b">{{ IOTA_ADDR }}</text>
    </g>
    <!-- 6. senso unico -->
    <g v-click>
      <text x="440" y="288" text-anchor="middle" class="didascalia">dalla privata si calcola la pubblica e l'indirizzo, mai il contrario</text>
    </g>
  </svg>
</template>

<style scoped>
.t13 { font-size: 13px; }
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.b { font-weight: 700; }
.campo { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.indirizzo { fill: color-mix(in srgb, var(--rubrica) 14%, var(--carta)); stroke: var(--rubrica); stroke-width: 1.5; }
.spento { fill: var(--grigio); }
.rosso { fill: var(--rubrica); font-weight: 700; }
.divisorio { stroke: var(--linea); stroke-width: 1.5; stroke-dasharray: 4 4; }
.didascalia { font-size: 16px; font-weight: 700; fill: var(--rubrica); }
</style>
