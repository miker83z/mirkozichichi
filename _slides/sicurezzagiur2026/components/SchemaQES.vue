<!--
  Diagram (2024 deck, p. 102, corrected): the qualified electronic signature. Alice signs as usual
  (document → SHA-256 → fingerprint → Firma), but her private key S_Alice is kept inside a qualified
  signature creation device (QSCD): a smart card or, for remote signing, the HSM at the provider
  (not the smartphone, which only authorises). A qualified trust service provider (QTSP) issued her
  qualified certificate (Nome: Alice, P_Alice); whoever verifies uses the public key in the certificate.
  Conclusion: same legal effect as a handwritten signature (art. 25, par. 2, eIDAS).
  5 clicks: the fingerprint; the signature with the key in the QSCD; the QTSP and the qualified
  certificate; the verification; "= firma autografa".
  <SchemaQES />
-->
<script setup lang="ts">
import { sha256, short } from '../utils/crypto'

const impronta = short(sha256('Contratto'), 6, 6)
</script>

<template>
  <svg viewBox="0 0 880 284" class="schema" role="img" aria-label="Schema: firma elettronica qualificata con chiave in un dispositivo qualificato e certificato qualificato di un prestatore">
    <!-- 1. Alice calcola l'impronta -->
    <g v-click>
      <SvPersona :x="58" :y="6" nome="Alice" :scala="0.9" />
      <SvDocumento :x="168" :y="2" :w="44" :h="58" />
      <text x="220" y="36" class="etichetta">Contratto</text>
      <SvFreccia :x1="190" :y1="62" :x2="190" :y2="80" />
      <SvRiquadro :x="125" :y="80" :w="130" :h="32" testo="SHA-256" />
      <SvFreccia :x1="190" :y1="112" :x2="190" :y2="128" />
      <SvRiquadro :x="110" :y="128" :w="160" :h="34" :testo="impronta" variante="vuoto" mono />
      <text x="102" y="150" text-anchor="end" class="nota">impronta</text>
    </g>
    <!-- 2. Firma con la chiave custodita nel QSCD -->
    <g v-click>
      <SvFreccia :x1="190" :y1="162" :x2="190" :y2="180" />
      <SvRiquadro :x="125" :y="180" :w="130" :h="34" testo="Firma" variante="rubrica" />
      <rect x="6" y="176" width="92" height="44" rx="7" class="carta-qscd" />
      <rect x="14" y="190" width="14" height="12" rx="2" class="chip" />
      <SvChiave :x="46" :y="198" tipo="privata" :scala="0.8" />
      <text x="52" y="170" text-anchor="middle" class="qscd">QSCD</text>
      <SvFreccia :x1="100" :y1="198" :x2="123" :y2="198" variante="grigio" />
      <text x="6" y="240" class="nota">chiave privata in una smart card</text>
      <text x="6" y="257" class="nota">o nell'HSM del prestatore (firma remota)</text>
    </g>
    <!-- 3. Il prestatore qualificato ha rilasciato il certificato qualificato -->
    <g v-click>
      <SvLucchetto :x="350" :y="26" :scala="1.2" />
      <text x="396" y="34" class="qtsp">Prestatore di servizi</text>
      <text x="396" y="52" class="qtsp">fiduciari qualificato (QTSP)</text>
      <SvFreccia :x1="606" :y1="44" :x2="652" :y2="44" etichetta="rilascia" variante="grigio" />
      <rect x="654" y="4" width="216" height="140" rx="6" class="certificato" />
      <text x="762" y="26" text-anchor="middle" class="titolo-cert">Certificato qualificato</text>
      <text x="670" y="54" class="campo">Nome</text>
      <text x="726" y="54" class="valore">Alice</text>
      <SvChiave :x="684" :y="84" tipo="pubblica" etichetta="P_Alice" />
      <rect x="666" y="106" width="192" height="26" rx="3" class="striscia" />
      <text x="762" y="124" text-anchor="middle" class="firma-qtsp">firma del QTSP</text>
    </g>
    <!-- 4. Chi riceve verifica con il certificato -->
    <g v-click>
      <SvFreccia :x1="255" :y1="197" :x2="318" :y2="197" variante="rubrica" />
      <SvRiquadro :x="320" :y="181" :w="100" :h="32" testo="firma" variante="rubrica" />
      <SvFreccia :x1="420" :y1="197" :x2="652" :y2="197" variante="rubrica" etichetta="documento + firma" />
      <SvRiquadro :x="654" :y="180" :w="120" :h="34" testo="Verifica" />
      <SvFreccia :x1="714" :y1="146" :x2="714" :y2="178" variante="grigio" />
      <text x="784" y="202" class="esito">✓ valida</text>
      <text x="714" y="234" text-anchor="middle" class="nota">chi riceve usa la chiave</text>
      <text x="714" y="250" text-anchor="middle" class="nota">pubblica del certificato</text>
    </g>
    <!-- 5. Valore giuridico -->
    <g v-click>
      <text x="470" y="276" text-anchor="middle" class="conclusione">= firma autografa (art. 25, par. 2, eIDAS)</text>
    </g>
  </svg>
</template>

<style scoped>
.etichetta { font-size: 14px; }
.carta-qscd { fill: #f6f1e4; stroke: var(--inchiostro); stroke-width: 1.5; }
.chip { fill: #c9a94a; stroke: #6b4e16; stroke-width: 1; }
.qscd { font-size: 15px; font-weight: 700; }
.qtsp { font-size: 15px; font-weight: 700; }
.certificato { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 1.5; }
.titolo-cert { font-family: var(--serif); font-size: 15px; font-weight: 600; fill: var(--rubrica); }
.campo { font-size: 14px; fill: var(--grigio); }
.valore { font-size: 15px; }
.striscia { fill: #fbeeee; stroke: var(--rubrica); stroke-width: 1; }
.firma-qtsp { font-size: 13px; fill: var(--rubrica); }
.esito { font-size: 16px; font-weight: 700; fill: var(--ok); }
.conclusione { font-size: 19px; font-weight: 700; fill: var(--rubrica); }
</style>
