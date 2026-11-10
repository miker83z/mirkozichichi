<!--
  Diagram (2024 deck, p. 23): plaintext M → encryption E(K_enc, M) → ciphertext M' on an insecure channel
  (Eve sees only M') → decryption D(K_dec, M') → M. 5 clicks: M, encryption with its key,
  the insecure channel with Eve, decryption with its key, the recovered M.
  <SchemaPrincipioBase />
-->
<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: cifratura, canale non sicuro, decifratura">
    <g v-click>
      <SvDocumento :x="14" :y="120" etichetta="M in chiaro" />
    </g>
    <g v-click>
      <SvFreccia :x1="76" :y1="154" :x2="150" :y2="154" />
      <SvRiquadro :x="150" :y="124" :w="150" :h="60" testo="E(K_enc, M)" variante="rubrica" />
      <text x="225" y="208" text-anchor="middle" class="nota">cifratura</text>
      <SvChiave :x="196" :y="40" etichetta="K_enc" />
      <SvFreccia :x1="225" :y1="56" :x2="225" :y2="122" variante="grigio" />
    </g>
    <g v-click>
      <SvFreccia :x1="300" :y1="154" :x2="590" :y2="154" etichetta="M'  (cifrato)" />
      <rect x="350" y="118" width="190" height="72" rx="8" fill="none" stroke="var(--ko)" stroke-dasharray="6 5" />
      <text x="445" y="214" text-anchor="middle" class="nota">canale di comunicazione non sicuro</text>
      <SvPersona :x="445" :y="14" nome="Eve" variante="ko" :scala="0.8" />
      <text x="500" y="44" class="nota">vede solo M'</text>
    </g>
    <g v-click>
      <SvRiquadro :x="590" :y="124" :w="150" :h="60" testo="D(K_dec, M')" variante="rubrica" />
      <text x="665" y="208" text-anchor="middle" class="nota">decifratura</text>
      <SvChiave :x="636" :y="40" etichetta="K_dec" />
      <SvFreccia :x1="665" :y1="56" :x2="665" :y2="122" variante="grigio" />
    </g>
    <g v-click>
      <SvFreccia :x1="740" :y1="154" :x2="800" :y2="154" variante="ok" />
      <SvDocumento :x="810" :y="120" etichetta="M" variante="ok" />
    </g>
  </svg>
</template>
