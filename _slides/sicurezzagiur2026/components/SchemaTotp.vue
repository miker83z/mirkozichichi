<!--
  Diagram (new, next to the Totp demo): how a TOTP code (RFC 6238) is born. The phone and the bank's
  server hold the same secret K (brass key, shared once with the QR code); both read the current time,
  counted in 30-second steps; both compute HMAC(K, step) and get the same 6-digit code; the code typed
  on the phone reaches the server, which compares it with its own → ✓. The code of a minute ago is
  rejected. Codes are computed for real (Web Crypto) at a fixed instant, 15/11/2026 11:00:00 Italian
  time, with the same fixed secret the Totp demo uses in the PDF.
  5 clicks: the shared secret; the current time; HMAC → the same code; sent and compared ✓; the code
  of a minute ago no longer works.
  <SchemaTotp />
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { daBase32, ISTANTE_STAMPA, isoRoma, totp } from '../utils/tempo'

const SEGRETO = daBase32('KRSXG5CTMVRXEZLUKRSXG5CTMVRXEZLU')
const secondi = ISTANTE_STAMPA / 1000
const ora = isoRoma(ISTANTE_STAMPA).slice(11, 19)
const oraVecchia = isoRoma(ISTANTE_STAMPA - 60000).slice(11, 16)
const codice = ref('––– –––')
const vecchio = ref('––– –––')
const spazio = (c: string) => `${c.slice(0, 3)} ${c.slice(3)}`

onMounted(async () => {
  // Web Crypto exists only in a secure context (https or localhost); otherwise the dashes stay
  try {
    codice.value = spazio(await totp(SEGRETO, secondi))
    vecchio.value = spazio(await totp(SEGRETO, secondi - 60))
  }
  catch {}
})
</script>

<template>
  <svg viewBox="0 0 880 280" class="schema" role="img" aria-label="Schema: telefono e server calcolano lo stesso codice TOTP dal segreto condiviso e dall'ora">
    <!-- 1. Lo stesso segreto sul telefono e sul server -->
    <g v-click>
      <rect x="46" y="22" width="34" height="60" rx="6" class="telefono" />
      <rect x="50" y="30" width="26" height="42" rx="2" class="schermo" />
      <text x="63" y="102" text-anchor="middle" class="etichetta">telefono</text>
      <rect x="34" y="186" width="58" height="56" rx="4" class="server" />
      <line x1="42" y1="200" x2="72" y2="200" class="fessura" />
      <line x1="42" y1="214" x2="72" y2="214" class="fessura" />
      <line x1="42" y1="228" x2="72" y2="228" class="fessura" />
      <circle cx="82" cy="200" r="2.5" class="led" />
      <circle cx="82" cy="214" r="2.5" class="led" />
      <circle cx="82" cy="228" r="2.5" class="led" />
      <text x="63" y="262" text-anchor="middle" class="etichetta">server della banca</text>
      <SvChiave :x="140" :y="48" tipo="segreta" etichetta="K" />
      <SvChiave :x="140" :y="228" tipo="segreta" etichetta="K" />
      <text x="128" y="132" class="nota">stesso segreto K,</text>
      <text x="128" y="148" class="nota">condiviso una volta (QR code)</text>
    </g>
    <!-- 2. Entrambi leggono l'ora attuale -->
    <g v-click>
      <circle cx="336" cy="136" r="17" class="orologio" />
      <path d="M336,136 v-11 M336,136 h8" class="lancette" />
      <text x="362" y="128" class="ora-titolo">ora attuale</text>
      <text x="362" y="147" class="ora">{{ ora }}</text>
      <text x="362" y="164" class="nota">(passo di 30 s)</text>
      <SvFreccia :x1="336" :y1="117" :x2="438" :y2="68" angolo="vh" variante="grigio" />
      <SvFreccia :x1="336" :y1="155" :x2="438" :y2="206" angolo="vh" variante="grigio" />
    </g>
    <!-- 3. Entrambi calcolano HMAC e ottengono lo stesso codice -->
    <g v-click>
      <SvFreccia :x1="188" :y1="48" :x2="438" :y2="48" variante="grigio" />
      <SvFreccia :x1="188" :y1="228" :x2="438" :y2="228" variante="grigio" />
      <SvRiquadro :x="440" :y="36" :w="110" :h="44" testo="HMAC" variante="rubrica" />
      <SvRiquadro :x="440" :y="196" :w="110" :h="44" testo="HMAC" variante="rubrica" />
      <SvFreccia :x1="550" :y1="58" :x2="586" :y2="58" />
      <SvFreccia :x1="550" :y1="218" :x2="586" :y2="218" />
      <SvRiquadro :x="588" :y="38" :w="112" :h="40" :testo="codice" variante="vuoto" mono />
      <SvRiquadro :x="588" :y="198" :w="112" :h="40" :testo="codice" variante="vuoto" mono />
    </g>
    <!-- 4. Il codice del telefono arriva al server: confronto -->
    <g v-click>
      <SvFreccia :x1="700" :y1="58" :x2="800" :y2="114" angolo="hv" variante="ok" etichetta="Alice lo digita" />
      <SvFreccia :x1="700" :y1="218" :x2="800" :y2="160" angolo="hv" />
      <SvRiquadro :x="740" :y="116" :w="130" :h="42" testo="= ✓ accesso" variante="ok" />
    </g>
    <!-- 5. Il codice di un minuto fa non vale più -->
    <g v-click>
      <text x="740" y="250" text-anchor="middle"><tspan class="nota">alle {{ oraVecchia }}: </tspan><tspan class="vecchio">{{ vecchio }}</tspan><tspan class="vecchio-x"> ✗</tspan></text>
      <text x="740" y="272" text-anchor="middle" class="nota-ko">il codice di un minuto fa non vale più</text>
    </g>
  </svg>
</template>

<style scoped>
.telefono { fill: var(--inchiostro); }
.schermo { fill: var(--carta); }
.server { fill: var(--campo); stroke: var(--inchiostro); stroke-width: 1.5; }
.fessura { stroke: var(--grigio); stroke-width: 2; }
.led { fill: var(--ok); }
.etichetta { font-size: 14px; font-weight: 700; }
.orologio { fill: var(--carta); stroke: var(--inchiostro); stroke-width: 2; }
.lancette { fill: none; stroke: var(--inchiostro); stroke-width: 2; stroke-linecap: round; }
.ora-titolo { font-size: 15px; font-weight: 700; }
.ora { font-family: var(--mono); font-size: 15px; }
.vecchio { font-family: var(--mono); font-size: 16px; fill: var(--ko); text-decoration: line-through; }
.vecchio-x { font-size: 16px; font-weight: 700; fill: var(--ko); }
.nota-ko { font-size: 14px; font-weight: 700; fill: var(--ko); }
</style>
