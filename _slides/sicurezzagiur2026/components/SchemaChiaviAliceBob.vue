<!--
  Diagram (2024 deck, p. 37): every person has a key pair. Alice has Pub_A (green) and Priv_A (red), Bob has
  Pub_B and Priv_B. The public keys are copied into a shared area that everybody can read; the private keys
  stay with their owners.
  4 clicks: Alice and her keys, Bob and his keys, the public keys copied into the shared area,
  the private keys that stay secret.
  <SchemaChiaviAliceBob />
-->
<template>
  <svg viewBox="0 0 880 180" class="schema" role="img" aria-label="Schema: Alice e Bob con chiave pubblica e chiave privata; le chiavi pubbliche le conoscono tutti, le private restano segrete">
    <g v-click>
      <SvPersona :x="70" :y="38" nome="Alice" :scala="1.4" />
      <SvChiave :x="140" :y="64" tipo="pubblica" etichetta="Pub_A" :scala="1.4" />
      <SvChiave :x="140" :y="128" tipo="privata" etichetta="Priv_A" :scala="1.4" />
    </g>
    <g v-click>
      <SvPersona :x="810" :y="38" nome="Bob" :scala="1.4" />
      <SvChiave :x="684" :y="64" tipo="pubblica" etichetta="Pub_B" :scala="1.4" />
      <SvChiave :x="684" :y="128" tipo="privata" etichetta="Priv_B" :scala="1.4" />
    </g>
    <g v-click>
      <rect x="270" y="6" width="340" height="96" rx="10" class="bacheca" />
      <text x="440" y="30" text-anchor="middle" class="pubbliche">chiavi pubbliche: le conoscono tutti</text>
      <SvChiave :x="336" :y="74" tipo="pubblica" etichetta="Pub_A" :scala="1.4" />
      <SvChiave :x="480" :y="74" tipo="pubblica" etichetta="Pub_B" :scala="1.4" />
      <SvFreccia :x1="226" :y1="64" :x2="316" :y2="72" variante="ok" tratteggiata />
      <SvFreccia :x1="664" :y1="64" :x2="566" :y2="72" variante="ok" tratteggiata />
    </g>
    <g v-click>
      <text x="440" y="140" text-anchor="middle" class="private">chiavi private: segrete</text>
      <text x="440" y="162" text-anchor="middle" class="nota">restano a chi le possiede</text>
      <SvFreccia :x1="342" :y1="134" :x2="228" :y2="128" variante="rubrica" />
      <SvFreccia :x1="538" :y1="134" :x2="662" :y2="128" variante="rubrica" />
    </g>
  </svg>
</template>

<style scoped>
.bacheca {
  fill: #e8f3ed;
  stroke: var(--ok);
  stroke-width: 1.5;
  stroke-dasharray: 6 5;
}
.pubbliche {
  font-weight: 700;
  font-size: 17px;
  fill: var(--ok);
}
.private {
  font-weight: 700;
  font-size: 17px;
  fill: var(--rubrica);
}
</style>
