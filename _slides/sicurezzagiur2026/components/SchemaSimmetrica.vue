<!--
  Diagram (2024 deck, p. 29): symmetric encryption.
  Plaintext → encryption with the secret key → ciphertext (gibberish) → decryption with the SAME secret key → plaintext.
  One key at the top feeds both boxes, as in the original.
  5 clicks: plaintext, encryption with the secret key, ciphertext, decryption with the same key ("stessa chiave"),
  the recovered plaintext.
  <SchemaSimmetrica />
-->
<template>
  <svg viewBox="0 0 880 236" class="schema" role="img" aria-label="Schema della cifratura simmetrica: la stessa chiave segreta cifra e decifra">
    <g v-click>
      <SvDocumento :x="30" :y="122" etichetta="testo in chiaro" />
    </g>
    <g v-click>
      <SvFreccia :x1="90" :y1="156" :x2="124" :y2="156" />
      <SvRiquadro :x="126" :y="128" :w="140" :h="56" testo="Cifratura" variante="rubrica" />
      <SvChiave :x="418" :y="26" tipo="segreta" :scala="1.3" />
      <text x="404" y="60" text-anchor="end" class="chiave">chiave segreta</text>
      <path d="M418,42 V72 H196" class="filo" />
      <SvFreccia :x1="196" :y1="72" :x2="196" :y2="126" variante="grigio" />
    </g>
    <g v-click>
      <SvFreccia :x1="266" :y1="156" :x2="338" :y2="156" />
      <SvRiquadro :x="340" :y="118" :w="200" :h="76" :testo="'A4$h*L@9.\nT6=#/>B#1'" mono variante="vuoto" />
      <text x="440" y="216" text-anchor="middle" class="etichetta">testo cifrato</text>
    </g>
    <g v-click>
      <SvFreccia :x1="540" :y1="156" :x2="612" :y2="156" />
      <SvRiquadro :x="614" :y="128" :w="140" :h="56" testo="Decifratura" variante="rubrica" />
      <path d="M418,72 H684" class="filo" />
      <SvFreccia :x1="684" :y1="72" :x2="684" :y2="126" variante="grigio" />
      <text x="488" y="34" class="stessa">stessa chiave</text>
    </g>
    <g v-click>
      <SvFreccia :x1="754" :y1="156" :x2="792" :y2="156" variante="ok" />
      <SvDocumento :x="798" :y="122" etichetta="testo in chiaro" variante="ok" />
    </g>
  </svg>
</template>

<style scoped>
.filo {
  fill: none;
  stroke: var(--grigio);
  stroke-width: 2;
}
.chiave {
  font-size: 15px;
  font-weight: 700;
  fill: #6b4e16;
}
.stessa {
  font-size: 18px;
  font-weight: 700;
  fill: var(--rubrica);
}
.etichetta {
  font-size: 14px;
}
</style>
