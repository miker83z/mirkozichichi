<!--
  One-time codes of an authenticator app (TOTP, RFC 6238: HMAC-SHA1, 30-second steps, 6 digits,
  computed with Web Crypto). The phone and the bank's server share a secret and each computes
  the code from the current time on its own: the two codes match without anything being sent.
  "Invia il codice del telefono" is accepted; "Usa il codice di un minuto fa" is rejected as
  expired (the server accepts the current code and, as a tolerance, the previous one).
  In the PDF the time is fixed at 2026-11-15T10:00:00Z and, unless `segreto` is given, a fixed
  secret is used, so the codes are always the same.

  <Totp />
  <Totp segreto="JBSWY3DPEHPK3PXP" />

  segreto: the shared secret in base32, as in the QR code of the app (default: random).
-->
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useNav } from '@slidev/client'
import { base32, daBase32, ISTANTE_STAMPA, totp } from '../utils/tempo'

const props = defineProps<{ segreto?: string }>()

const { isPrintMode } = useNav()
const PASSO = 30
const casuale = base32(crypto.getRandomValues(new Uint8Array(20)))
const segreto = computed(() => {
  if (props.segreto) return props.segreto.toUpperCase().replace(/[\s=]/g, '')
  if (isPrintMode.value) return 'KRSXG5CTMVRXEZLUKRSXG5CTMVRXEZLU'
  return casuale
})
const chiave = computed(() => daBase32(segreto.value))

const adesso = ref(isPrintMode.value ? ISTANTE_STAMPA : Date.now())
const secondi = computed(() => adesso.value / 1000)
const intervallo = computed(() => Math.floor(secondi.value / PASSO))
const restano = computed(() => PASSO - (secondi.value % PASSO))

const telefono = ref('')
const server = ref('')
const precedente = ref('')
const vecchio = ref('')

async function aggiorna() {
  const t = intervallo.value * PASSO
  const [a, b, c, d] = await Promise.all([
    totp(chiave.value, t),
    totp(chiave.value, t),
    totp(chiave.value, t - PASSO),
    totp(chiave.value, t - 60),
  ])
  telefono.value = a
  server.value = b
  precedente.value = c
  vecchio.value = d
}

interface Invio { codice: string, ok: boolean, vecchio: boolean }
const invio = ref<Invio | null>(null)

function invia(quale: 'attuale' | 'vecchio') {
  const codice = quale === 'attuale' ? telefono.value : vecchio.value
  invio.value = { codice, ok: codice === server.value || codice === precedente.value, vecchio: quale === 'vecchio' }
}

watch([intervallo, chiave], () => {
  invio.value = null
  aggiorna()
})

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  aggiorna()
  if (!isPrintMode.value) timer = setInterval(() => { adesso.value = Date.now() }, 200)
})
onUnmounted(() => clearInterval(timer))

function spazia(c: string): string {
  return c ? `${c.slice(0, 3)} ${c.slice(3)}` : '··· ···'
}
const segretoLeggibile = computed(() => segreto.value.replace(/(.{4})/g, '$1 ').trim())
const stampaVecchio = computed(() => isPrintMode.value && vecchio.value !== '')
</script>

<template>
  <div class="demo totp">
    <p class="segreto">
      <span class="grigio">Segreto condiviso, scambiato una sola volta con il QR code:</span>
      <span class="hex">{{ segretoLeggibile }}</span>
    </p>
    <div class="pannelli">
      <section class="pannello">
        <h4>Il tuo telefono</h4>
        <p class="codice">{{ spazia(telefono) }}</p>
        <div class="barra" role="img" :aria-label="`nuovo codice tra ${Math.ceil(restano)} secondi`">
          <div class="riempimento" :style="{ width: `${(restano / PASSO) * 100}%` }" />
        </div>
        <p class="piccola grigio">nuovo codice tra {{ Math.ceil(restano) }} s</p>
      </section>
      <div class="calcolo">
        <span>codice = HMAC-SHA1(segreto, ora ÷ 30 s)</span>
        <span class="grigio">ridotto a 6 cifre (RFC 6238)</span>
        <span class="grigio">intervallo n. {{ intervallo.toLocaleString('it-IT') }}</span>
      </div>
      <section class="pannello" :class="{ 'bordo-ok': invio?.ok, 'bordo-ko': invio && !invio.ok }">
        <h4>Il server della banca</h4>
        <p class="codice">{{ spazia(server) }}</p>
        <div class="barra" aria-hidden="true">
          <div class="riempimento" :style="{ width: `${(restano / PASSO) * 100}%` }" />
        </div>
        <p v-if="telefono && telefono === server" class="piccola esito-ok">✓ i due codici coincidono, senza che nessuno li trasmetta</p>
      </section>
    </div>
    <div v-if="!isPrintMode" class="comandi">
      <button class="btn pieno" :disabled="!telefono" @click="invia('attuale')">Invia il codice del telefono</button>
      <button class="btn" :disabled="!vecchio" @click="invia('vecchio')">Usa il codice di un minuto fa</button>
      <span v-if="invio" class="esito" :class="invio.ok ? 'esito-ok' : 'esito-ko'">
        {{ spazia(invio.codice) }}:
        {{ invio.ok ? '✓ codice accettato, accesso consentito' : '✗ codice scaduto, accesso negato' }}
      </span>
    </div>
    <div v-else class="comandi stampa">
      <span>Il telefono invia {{ spazia(telefono) }}: <span class="esito-ok">✓ codice accettato</span></span>
      <span v-if="stampaVecchio">Codice di un minuto fa, {{ spazia(vecchio) }}: <span class="esito-ko">✗ codice scaduto</span></span>
    </div>
  </div>
</template>

<style scoped>
.totp {
  padding: 0.6rem 0.9rem;
  container-type: inline-size;
}
.segreto {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.5rem;
  align-items: baseline;
}
.segreto .hex {
  font-size: 0.9rem;
}
.pannelli {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 0.8rem;
  align-items: stretch;
}
.pannello {
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 6px;
  padding: 0.45rem 0.8rem 0.4rem;
  text-align: center;
}
h4 {
  font-family: var(--serif);
  font-size: 1.05rem;
  font-weight: 650;
  color: var(--rubrica);
  margin: 0;
}
.codice {
  font-family: var(--mono);
  font-size: 2.3rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  margin: 0.1rem 0 0.25rem;
  line-height: 1.15;
  font-variant-numeric: tabular-nums;
}
.barra {
  height: 6px;
  background: var(--campo);
  border-radius: 3px;
  overflow: hidden;
}
.riempimento {
  height: 100%;
  background: var(--rubrica);
}
.piccola {
  font-size: 0.85rem;
  margin: 0.25rem 0 0;
  line-height: 1.3;
}
.calcolo {
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 0.82rem;
  line-height: 1.35;
  max-width: 19rem;
}
.calcolo span:first-child {
  font-family: var(--mono);
  font-size: 0.82rem;
  white-space: nowrap;
}
.comandi {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 0.7rem;
  margin-top: 0.6rem;
}
.comandi.stampa {
  gap: 0.2rem 2rem;
  font-size: 0.95rem;
}
.esito {
  font-size: 1rem;
}
/* Next to the margin column of the glossa layout: the formula goes under the two panels. */
@container (max-width: 680px) {
  .pannelli {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    row-gap: 0.3rem;
  }
  .calcolo {
    grid-row: 2;
    grid-column: 1 / -1;
    max-width: none;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0 0.6rem;
  }
  .codice {
    font-size: 2rem;
  }
}
</style>
