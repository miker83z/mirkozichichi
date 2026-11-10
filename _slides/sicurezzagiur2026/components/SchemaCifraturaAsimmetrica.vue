<!--
  Diagram (2024 deck, p. 38): asymmetric encryption, Alice writes to Bob.
  Alice encrypts M with Bob's public key, E(Pub_B, M) = M'; M' travels like a locked safe; Eve sees only M'
  and cannot open it without Priv_B; Bob decrypts with his private key, D(Priv_B, M') = M.
  5 clicks: Alice with M (and Bob), encryption with Pub_B, M' sent as a locked safe, Eve sees only M',
  decryption with Priv_B and the recovered M.
  <SchemaCifraturaAsimmetrica />
-->
<template>
  <svg viewBox="0 0 880 200" class="schema" role="img" aria-label="Schema: Alice cifra M con la chiave pubblica di Bob, Eve vede solo M', Bob decifra con la sua chiave privata">
    <g v-click>
      <SvPersona :x="40" :y="106" nome="Alice" />
      <SvDocumento :x="72" :y="104" etichetta="M" />
      <SvPersona :x="840" :y="106" nome="Bob" />
    </g>
    <g v-click>
      <SvFreccia :x1="130" :y1="140" :x2="172" :y2="140" />
      <SvRiquadro :x="174" :y="112" :w="150" :h="56" testo="E(Pub_B, M)" variante="rubrica" />
      <text x="249" y="22" text-anchor="middle" class="nota">chiave pubblica di Bob</text>
      <SvChiave :x="218" :y="56" tipo="pubblica" etichetta="Pub_B" :scala="1.1" />
      <SvFreccia :x1="249" :y1="72" :x2="249" :y2="110" variante="grigio" />
    </g>
    <g v-click>
      <SvFreccia :x1="324" :y1="140" :x2="386" :y2="140" />
      <rect x="390" y="98" width="116" height="86" rx="6" class="cassaforte" />
      <rect x="398" y="106" width="100" height="70" rx="3" class="anta" />
      <SvLucchetto :x="434" :y="122" />
      <text x="448" y="168" text-anchor="middle" class="cifrato">M'</text>
      <SvFreccia :x1="506" :y1="140" :x2="568" :y2="140" etichetta="invia" />
    </g>
    <g v-click>
      <SvPersona :x="448" :y="2" nome="Eve" variante="ko" :scala="0.9" />
      <text x="420" y="26" text-anchor="end" class="eve">vede solo M'</text>
      <text x="420" y="45" text-anchor="end" class="nota">non ha Priv<tspan class="pedice">B</tspan></text>
      <path d="M448,70 V94" class="sguardo" />
    </g>
    <g v-click>
      <SvRiquadro :x="570" :y="112" :w="150" :h="56" testo="D(Priv_B, M')" variante="rubrica" />
      <text x="645" y="22" text-anchor="middle" class="nota">chiave privata di Bob</text>
      <SvChiave :x="612" :y="56" tipo="privata" etichetta="Priv_B" :scala="1.1" />
      <SvFreccia :x1="645" :y1="72" :x2="645" :y2="110" variante="grigio" />
      <SvFreccia :x1="720" :y1="140" :x2="752" :y2="140" variante="ok" />
      <SvDocumento :x="756" :y="104" etichetta="M" variante="ok" />
    </g>
  </svg>
</template>

<style scoped>
.cassaforte {
  fill: var(--campo);
  stroke: var(--inchiostro);
  stroke-width: 2.5;
}
.anta {
  fill: none;
  stroke: var(--inchiostro);
  stroke-width: 1.2;
}
.cifrato {
  font-family: var(--mono);
  font-weight: 700;
  font-size: 20px;
}
.eve {
  font-weight: 700;
  font-size: 15px;
  fill: var(--ko);
}
.sguardo {
  stroke: var(--ko);
  stroke-width: 1.5;
  stroke-dasharray: 4 4;
}
</style>
