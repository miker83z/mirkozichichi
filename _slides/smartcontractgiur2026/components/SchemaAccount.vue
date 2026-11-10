<!--
  Diagram (2025 deck, p. 43, which was text plus the picture of Alice's keys): the two kinds of Ethereum
  account. Inside the portafoglio (wallet) there is an EOA (Externally Owned Account): controlled by a
  private key, it signs and sends the transactions. A contract account (CA) is code + state, has no private
  key and acts only when called; a transaction from an EOA can make it send messages (message calls) to
  other contracts. Third panel: EIP-7702 (Pectra upgrade, mainnet 7 May 2025) lets an EOA set a delegation
  to the code of a contract and then run that code as if it were a contract: whoever can authorise the
  delegation decides what the account does. On 29 October 2026 attackers obtained execution permissions over
  a Binance hot wallet in this way (described only generally).
  Sources: ethereum.org/developers/docs/accounts ("controlled by anyone with the private keys"; "Contract
  accounts don't have private keys"; they "can only send messages in response to receiving a transaction");
  eips.ethereum.org/EIPS/eip-7702 (status Final; delegation indicator 0xef0100 || address, authorisation
  signed with the EOA's key, the delegated code runs in the EOA's context; "a poorly implemented delegate can
  allow a malicious actor to take near complete control over a signer's EOA");
  blog.ethereum.org/2025/04/23/pectra-mainnet and ethereum.org/roadmap/pectra (activated 7 May 2025,
  epoch 364032); for Binance: press reports of 29–30 Oct 2026 (Binance hot wallet, EIP-7702 authorisations).
  4 clicks: the EOA in the portafoglio; the CA; transaction (EOA → CA) and message (CA → CA); the EIP-7702 panel.
  <SchemaAccount />
-->

<template>
  <svg viewBox="0 0 880 290" class="schema" role="img" aria-label="Schema: conto esterno (EOA) con chiave privata e conto contratto (CA) con codice e stato; con EIP-7702 un EOA può delegare a codice di un contratto">
    <!-- 1. EOA nel portafoglio -->
    <g v-click>
      <text x="16" y="16" class="nota">wallet</text>
      <rect x="10" y="24" width="222" height="178" rx="10" class="portafoglio" />
      <SvPersona :x="58" :y="34" nome="Alice" :scala="0.85" />
      <SvChiave :x="118" :y="54" tipo="pubblica" etichetta="P_Alice" />
      <SvChiave :x="118" :y="88" tipo="privata" etichetta="S_Alice" />
      <text x="121" y="134" text-anchor="middle" class="t15 b">conto esterno (EOA)</text>
      <text x="121" y="152" text-anchor="middle" class="nota">Externally Owned Account</text>
      <text x="121" y="172" text-anchor="middle" class="t14">lo controlla la chiave privata</text>
      <text x="121" y="190" text-anchor="middle" class="t14">firma le transazioni</text>
    </g>
    <!-- 2. conto contratto -->
    <g v-click>
      <rect x="330" y="24" width="222" height="178" rx="10" class="contratto" />
      <rect x="346" y="38" width="88" height="62" rx="4" class="vuoto" />
      <text x="390" y="74" text-anchor="middle" class="mono t15">{ … }</text>
      <text x="390" y="94" text-anchor="middle" class="nota">codice</text>
      <rect x="448" y="38" width="88" height="62" rx="4" class="vuoto" />
      <line v-for="i in 3" :key="i" x1="460" :x2="i === 2 ? 508 : 524" :y1="46 + i * 10" :y2="46 + i * 10" class="riga" />
      <text x="492" y="94" text-anchor="middle" class="nota">stato</text>
      <text x="441" y="134" text-anchor="middle" class="t15 b">conto contratto (CA)</text>
      <text x="441" y="152" text-anchor="middle" class="nota">Contract Account</text>
      <text x="441" y="172" text-anchor="middle" class="t14">nessuna chiave privata</text>
      <text x="441" y="190" text-anchor="middle" class="t14">agisce solo se chiamato</text>
    </g>
    <!-- 3. transazioni e messaggi -->
    <g v-click>
      <SvFreccia :x1="234" :y1="113" :x2="328" :y2="113" variante="rubrica" />
      <text x="281" y="104" text-anchor="middle" class="t14 rosso">transazione</text>
      <text x="281" y="132" text-anchor="middle" class="nota">firmata</text>
      <SvFreccia :x1="441" :y1="204" :x2="441" :y2="238" />
      <text x="453" y="226" class="t14">messaggio</text>
      <SvRiquadro :x="376" :y="240" :w="130" :h="36" testo="altro contratto" piccolo />
      <text x="121" y="232" text-anchor="middle" class="nota">solo un EOA avvia</text>
      <text x="121" y="248" text-anchor="middle" class="nota">una transazione</text>
    </g>
    <!-- 4. EIP-7702 -->
    <g v-click>
      <line x1="578" y1="6" x2="578" y2="284" class="divisorio" />
      <text x="733" y="16" text-anchor="middle" class="titoletto">EIP-7702</text>
      <text x="733" y="34" text-anchor="middle" class="nota">Ethereum, aggiornamento Pectra, 7 maggio 2025</text>
      <rect x="596" y="50" width="88" height="50" rx="6" class="campo" />
      <SvChiave :x="614" :y="66" tipo="privata" :scala="0.8" />
      <text x="640" y="92" text-anchor="middle" class="t15 b">EOA</text>
      <SvFreccia :x1="686" :y1="75" :x2="770" :y2="75" etichetta="delega" variante="rubrica" tratteggiata />
      <rect x="772" y="50" width="100" height="50" rx="6" class="vuoto" />
      <text x="822" y="72" text-anchor="middle" class="mono t14">{ … }</text>
      <text x="822" y="90" text-anchor="middle" class="nota">codice altrui</text>
      <text x="733" y="128" text-anchor="middle" class="t14">l'EOA esegue quel codice</text>
      <text x="733" y="146" text-anchor="middle" class="t14">come se fosse un contratto</text>
      <text x="733" y="178" text-anchor="middle" class="t15 b arancio">chi può autorizzare la delega</text>
      <text x="733" y="197" text-anchor="middle" class="t15 b arancio">decide che cosa fa il conto</text>
      <text x="733" y="234" text-anchor="middle" class="nota">29 ottobre 2026, Binance: gli attaccanti</text>
      <text x="733" y="250" text-anchor="middle" class="nota">ottengono permessi di esecuzione</text>
      <text x="733" y="266" text-anchor="middle" class="nota">su un hot wallet tramite EIP-7702</text>
    </g>
  </svg>
</template>

<style scoped>
.t14 { font-size: 14px; }
.t15 { font-size: 15px; }
.b { font-weight: 700; }
.portafoglio { fill: none; stroke: var(--inchiostro); stroke-width: 1.5; stroke-dasharray: 6 4; }
.contratto { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.campo { fill: var(--campo); stroke: var(--linea); stroke-width: 1.5; }
.vuoto { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.2; }
.riga { stroke: var(--grigio); stroke-width: 2; }
.rosso { fill: var(--rubrica); font-weight: 700; }
.arancio { fill: var(--ko); }
.divisorio { stroke: var(--linea); stroke-width: 1.5; stroke-dasharray: 4 4; }
</style>
