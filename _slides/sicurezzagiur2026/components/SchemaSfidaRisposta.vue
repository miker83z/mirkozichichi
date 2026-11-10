<!--
  Diagram (2024 deck, pp. 105–107): challenge-response as a sequence diagram with two lifelines,
  Alice and the Servizio. 1 "voglio accedere" →; 2 ← "sfida: numero casuale"; 3 "risposta" →;
  4 the Servizio checks the answer → "✓ accesso consentito".
  modo changes the keys and the labels:
  - 'generica' (default, p. 105): no keys; the Servizio compares with the expected answer;
  - 'simmetrica' (p. 106): both hold the secret key K; risposta = C(sfida, K); the Servizio decrypts
    with K and compares with the challenge;
  - 'asimmetrica' (p. 107, corrected: the public key is registered, not "shared"): Alice holds her
    private key S_Alice, the Servizio her registered public key P_Alice; risposta = firma(sfida); the
    Servizio verifies the signature with P_Alice ("così funzionano le passkey").
  4 clicks: the request; the challenge; the answer; the check and access.
  <SchemaSfidaRisposta />
  <SchemaSfidaRisposta modo="simmetrica" />
  <SchemaSfidaRisposta modo="asimmetrica" />
-->
<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ modo?: 'generica' | 'simmetrica' | 'asimmetrica' }>(), { modo: 'generica' })

const testi = computed(() => ({
  generica: {
    risposta: 'risposta',
    controllo: 'confronta con la risposta attesa',
    nota: '',
  },
  simmetrica: {
    risposta: 'risposta = C(sfida, K)',
    controllo: 'D(risposta, K) = sfida?',
    nota: 'chiave segreta K condivisa',
  },
  asimmetrica: {
    risposta: 'risposta = firma(sfida) con S_Alice',
    controllo: 'verifica la firma con P_Alice',
    nota: '',
  },
}[props.modo]))

const A = 130
const S = 740
</script>

<template>
  <svg viewBox="0 0 880 282" class="schema" role="img" :aria-label="`Schema: sfida e risposta tra Alice e il Servizio (${modo})`">
    <!-- 1. Alice chiede di accedere -->
    <g v-click>
      <SvPersona :x="A" :y="2" nome="Alice" :scala="0.9" />
      <rect :x="S - 60" y="10" width="120" height="40" rx="6" class="servizio" />
      <text :x="S" y="36" text-anchor="middle" class="servizio-testo">Servizio</text>
      <line :x1="A" y1="72" :x2="A" y2="278" class="vita" />
      <line :x1="S" y1="54" :x2="S" y2="278" class="vita" />
      <template v-if="modo === 'simmetrica'">
        <SvChiave :x="A + 44" :y="26" tipo="segreta" etichetta="K" />
        <SvChiave :x="S + 80" :y="26" tipo="segreta" etichetta="K" />
        <text :x="(A + S) / 2" y="34" text-anchor="middle" class="nota">{{ testi.nota }}</text>
      </template>
      <template v-else-if="modo === 'asimmetrica'">
        <SvChiave :x="A + 44" :y="26" tipo="privata" etichetta="S_Alice" />
        <text :x="A + 36" y="56" class="nota">resta sul suo dispositivo</text>
        <SvChiave :x="S + 80" :y="26" tipo="pubblica" etichetta="P_Alice" />
        <text :x="S + 68" y="66" class="nota">registrata</text>
      </template>
      <SvFreccia :x1="A + 4" :y1="104" :x2="S - 4" :y2="104" etichetta="voglio accedere" />
    </g>
    <!-- 2. Il Servizio invia una sfida -->
    <g v-click>
      <SvFreccia :x1="S - 4" :y1="150" :x2="A + 4" :y2="150" etichetta="sfida: numero casuale" variante="rubrica" />
    </g>
    <!-- 3. Alice risponde -->
    <g v-click>
      <SvFreccia :x1="A + 4" :y1="196" :x2="S - 4" :y2="196" :etichetta="testi.risposta" />
    </g>
    <!-- 4. Il Servizio controlla: accesso consentito -->
    <g v-click>
      <SvRiquadro :x="S - 135" :y="210" :w="270" :h="34" :testo="testi.controllo" variante="vuoto" />
      <SvFreccia :x1="S - 4" :y1="264" :x2="A + 4" :y2="264" etichetta="✓ accesso consentito" variante="ok" />
      <text v-if="modo === 'asimmetrica'" :x="A + 14" y="236" class="passkey">così funzionano le passkey</text>
    </g>
  </svg>
</template>

<style scoped>
.servizio { fill: var(--inchiostro); }
.servizio-testo { font-size: 16px; font-weight: 700; fill: var(--carta); }
.vita { stroke: var(--grigio); stroke-width: 1.5; stroke-dasharray: 5 5; }
.passkey { font-size: 15px; font-weight: 700; fill: var(--rubrica); }
</style>
