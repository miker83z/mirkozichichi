<!--
  Diagram (2024 deck, p. 85): Alice and her digital certificate. The card holds her identity
  (Nome, Indirizzo, Email) and her public key P_Alice (green key); the bottom section is still empty:
  nobody has signed the certificate yet (SchemaCertificatoCA continues from here, same layout).
  3 clicks: Alice and the identity fields; the public key; the brace "lega una chiave pubblica a
  un'identità" and, in the empty section, "chi garantisce che dica il vero?".
  <SchemaCertificato />
-->
<template>
  <svg viewBox="0 0 880 268" class="schema" role="img" aria-label="Schema: il certificato digitale lega la chiave pubblica di Alice alla sua identità">
    <!-- 1. Alice e i suoi dati -->
    <g v-click>
      <SvPersona :x="150" :y="70" nome="Alice" />
      <rect x="230" y="4" width="380" height="260" rx="6" class="carta" />
      <line x1="230" y1="38" x2="610" y2="38" class="divisorio" />
      <line x1="230" y1="134" x2="610" y2="134" class="divisorio" />
      <line x1="230" y1="192" x2="610" y2="192" class="divisorio" />
      <text x="420" y="27" text-anchor="middle" class="titolo-cert">Certificato digitale</text>
      <text x="248" y="64" class="campo">Nome</text>
      <text x="340" y="64" class="valore">Alice</text>
      <text x="248" y="92" class="campo">Indirizzo</text>
      <text x="340" y="92" class="valore">via Galliera 3</text>
      <text x="248" y="120" class="campo">Email</text>
      <text x="340" y="120" class="valore">alice@studio-legale-esempio.it</text>
    </g>
    <!-- 2. La chiave pubblica -->
    <g v-click>
      <text x="248" y="168" class="campo">Chiave pubblica</text>
      <SvChiave :x="384" :y="168" tipo="pubblica" etichetta="P_Alice" />
    </g>
    <!-- 3. Il legame -->
    <g v-click>
      <path d="M624,46 q10,0 10,10 v38 q0,10 10,10 q-10,0 -10,10 v58 q0,10 -10,10" class="graffa" />
      <text x="656" y="98" class="legame">lega una chiave pubblica</text>
      <text x="656" y="120" class="legame">a un'identità</text>
      <text x="420" y="234" text-anchor="middle" class="nota">… ma chi garantisce che dica il vero?</text>
    </g>
  </svg>
</template>

<style scoped>
.carta { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.divisorio { stroke: var(--linea); stroke-width: 1.5; }
.titolo-cert { font-family: var(--serif); font-size: 17px; font-weight: 600; fill: var(--rubrica); }
.campo { font-size: 15px; fill: var(--grigio); }
.valore { font-size: 16px; }
.graffa { fill: none; stroke: var(--rubrica); stroke-width: 2; }
.legame { font-size: 17px; font-weight: 700; fill: var(--rubrica); }
</style>
