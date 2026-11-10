<!--
  Diagram (new, for 2024 p. 99, corrected: any file, several signers): CAdES as an envelope.
  A file of any type (PDF, DOCX, JPG) and Alice's signature go into a "busta" .p7m; a second signer
  (Bob) adds a parallel signature on the same document; to read the content you need software that
  opens the envelope and checks the signatures.
  3 clicks: file + signature into the .p7m envelope; Bob's parallel signature; the software that opens it.
  <SchemaCades />
-->
<template>
  <svg viewBox="0 0 880 270" class="schema" role="img" aria-label="Schema: busta CAdES .p7m con documento e firme parallele, aperta da un software">
    <!-- 1. Un file qualsiasi e la firma entrano nella busta -->
    <g v-click>
      <text x="120" y="18" text-anchor="middle" class="titolo">qualsiasi file</text>
      <SvDocumento :x="22" :y="32" :w="44" :h="56" etichetta="PDF" />
      <SvDocumento :x="98" :y="32" :w="44" :h="56" etichetta="DOCX" />
      <SvDocumento :x="174" :y="32" :w="44" :h="56" etichetta="JPG" />
      <text x="120" y="146" text-anchor="middle" class="piu">+</text>
      <SvRiquadro :x="50" :y="160" :w="140" :h="34" testo="firma di Alice" variante="rubrica" />
      <SvFreccia :x1="226" :y1="130" :x2="284" :y2="130" />
      <text x="440" y="18" text-anchor="middle" class="titolo">la busta (CMS)</text>
      <rect x="290" y="30" width="300" height="208" rx="6" class="busta" />
      <path d="M290,34 L440,98 L590,34" class="lembo" />
      <SvDocumento :x="312" :y="112" :w="50" :h="64" etichetta="contratto.pdf" />
      <SvRiquadro :x="400" :y="112" :w="160" :h="34" testo="firma di Alice" variante="rubrica" />
      <text x="440" y="262" text-anchor="middle" class="nome-file">contratto.pdf.p7m</text>
    </g>
    <!-- 2. Bob aggiunge una firma parallela -->
    <g v-click>
      <SvRiquadro :x="400" :y="156" :w="160" :h="34" testo="firma di Bob" variante="rubrica" />
      <text x="480" y="212" text-anchor="middle" class="nota">firme parallele,</text>
      <text x="480" y="228" text-anchor="middle" class="nota">sullo stesso documento</text>
    </g>
    <!-- 3. Per leggerlo serve un software -->
    <g v-click>
      <SvFreccia :x1="594" :y1="130" :x2="644" :y2="130" />
      <text x="756" y="88" text-anchor="middle" class="titolo">per leggerlo serve</text>
      <SvRiquadro :x="646" :y="102" :w="220" :h="56" :testo="'un software che\napre la busta'" variante="vuoto" />
      <text x="756" y="192" text-anchor="middle" class="esito">✓ contratto.pdf</text>
      <text x="756" y="214" text-anchor="middle" class="esito">✓ firme di Alice e Bob</text>
    </g>
  </svg>
</template>

<style scoped>
.titolo { font-size: 16px; font-weight: 700; }
.piu { font-size: 26px; font-weight: 700; fill: var(--grigio); }
.busta { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.8; }
.lembo { fill: none; stroke: var(--inchiostro); stroke-width: 1.5; }
.nome-file { font-family: var(--mono); font-size: 15px; font-weight: 700; }
.esito { font-size: 16px; font-weight: 700; fill: var(--ok); }
</style>
