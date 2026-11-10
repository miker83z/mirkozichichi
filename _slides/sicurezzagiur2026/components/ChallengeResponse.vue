<!--
  Challenge-response authentication, step by step ("Avanti"), with real Web Crypto operations.
  Symmetric mode: Alice and the Servizio share a secret key K (AES-GCM); Alice encrypts the
  challenge with K and the Servizio decrypts it and compares. Asymmetric mode: Alice signs the
  challenge with her private key (ECDSA P-256) and the Servizio checks the signature with the
  public key she registered earlier, as passkeys (FIDO2/WebAuthn) do.
  After the 4 steps, "Un attaccante riusa una risposta vecchia" issues a fresh challenge and
  replays the old answer: the check fails.
  In the PDF all 4 steps are shown, ending with ✓.

  <ChallengeResponse />
  <ChallengeResponse modo="asimmetrica" />

  modo: 'simmetrica' (default) or 'asimmetrica'.
-->
<script setup lang="ts">
import { computed, onMounted, ref, shallowRef } from 'vue'
import { useNav } from '@slidev/client'
import { randomHex, short } from '../utils/crypto'
import { cifra, decifra, firma, nuovaChiaveSegreta, nuoveChiavi, verifica } from '../utils/firme'

const props = withDefaults(defineProps<{ modo?: 'simmetrica' | 'asimmetrica' }>(), {
  modo: 'simmetrica',
})

const { isPrintMode } = useNav()
const asimmetrica = computed(() => props.modo === 'asimmetrica')

const segreta = shallowRef<CryptoKey | null>(null)
const coppia = shallowRef<CryptoKeyPair | null>(null)
const pronte = computed(() => (asimmetrica.value ? coppia.value : segreta.value) !== null)

const passo = ref(0)
const sfida = ref('')
const risposta = ref('')
const esito = ref<boolean | null>(null)
const attacco = ref<{ sfida: string, esito: boolean, decifrata: string | null } | null>(null)
let occupato = false

async function rispondi(s: string): Promise<string> {
  return asimmetrica.value ? firma(coppia.value!.privateKey, s) : cifra(segreta.value!, s)
}

/** The Servizio's check; in symmetric mode it also returns what it decrypted. */
async function controlla(s: string, r: string): Promise<{ ok: boolean, decifrata: string | null }> {
  if (asimmetrica.value) return { ok: await verifica(coppia.value!.publicKey, s, r), decifrata: null }
  const d = await decifra(segreta.value!, r)
  return { ok: d === s, decifrata: d }
}

async function avanti() {
  if (occupato || !pronte.value || passo.value >= 4) return
  occupato = true
  try {
    const prossimo = passo.value + 1
    if (prossimo === 2) sfida.value = randomHex(8)
    if (prossimo === 3) risposta.value = await rispondi(sfida.value)
    if (prossimo === 4) esito.value = (await controlla(sfida.value, risposta.value)).ok
    passo.value = prossimo
  }
  finally {
    occupato = false
  }
}

async function riusa() {
  if (passo.value < 4) return
  const nuova = randomHex(8)
  const { ok, decifrata } = await controlla(nuova, risposta.value)
  attacco.value = { sfida: nuova, esito: ok, decifrata }
}

function ricomincia() {
  passo.value = 0
  sfida.value = ''
  risposta.value = ''
  esito.value = null
  attacco.value = null
}

onMounted(async () => {
  if (asimmetrica.value) coppia.value = await nuoveChiavi()
  else segreta.value = await nuovaChiaveSegreta()
  if (isPrintMode.value) {
    for (let i = 0; i < 4; i++) await avanti()
  }
})
</script>

<template>
  <div class="demo sfida-risposta">
    <p class="prima">
      <span class="grigio">Prima:</span>
      <template v-if="asimmetrica">
        Alice ha registrato presso il Servizio la sua <strong>chiave pubblica</strong>; la privata resta sul suo dispositivo.
      </template>
      <template v-else>
        Alice e il Servizio condividono una <strong>chiave segreta K</strong>.
      </template>
    </p>
    <div class="attori" aria-hidden="true">
      <span>Alice</span>
      <span>Servizio</span>
    </div>
    <ol class="messaggi">
      <li class="msg da-alice" :class="{ futuro: passo < 1 }">
        <span class="n">1</span>
        <div class="corpo">
          <span>Alice dichiara di voler accedere</span>
          <span v-if="passo >= 1" class="dato">→ «sono Alice»</span>
        </div>
      </li>
      <li class="msg dal-servizio" :class="{ futuro: passo < 2 }">
        <span class="n">2</span>
        <div class="corpo">
          <span>Il Servizio invia una sfida casuale</span>
          <span v-if="passo >= 2" class="dato">← sfida: <span class="hex">{{ sfida }}</span></span>
        </div>
      </li>
      <li class="msg da-alice" :class="{ futuro: passo < 3 }">
        <span class="n">3</span>
        <div class="corpo">
          <span v-if="asimmetrica">Alice firma la sfida con la sua chiave privata</span>
          <span v-else>Alice cifra la sfida con la chiave segreta condivisa K</span>
          <span v-if="passo >= 3" class="dato">→ {{ asimmetrica ? 'firma' : 'sfida cifrata' }}: <span class="hex">{{ short(risposta, 12, 6) }}</span></span>
        </div>
      </li>
      <li class="msg dal-servizio" :class="{ futuro: passo < 4, 'bordo-ok': passo >= 4 && esito, 'bordo-ko': passo >= 4 && esito === false }">
        <span class="n">4</span>
        <div class="corpo">
          <span v-if="asimmetrica">Il Servizio verifica la firma con la chiave pubblica di Alice</span>
          <span v-else>Il Servizio decifra con K e confronta con la sfida</span>
          <span v-if="passo >= 4" :class="esito ? 'esito-ok' : 'esito-ko'" class="verdetto">
            {{ esito ? '✓ accesso consentito' : '✗ accesso negato' }}
          </span>
        </div>
      </li>
    </ol>

    <div v-if="!isPrintMode" class="comandi">
      <button class="btn pieno" :disabled="!pronte || passo >= 4" @click="avanti">Avanti</button>
      <button class="btn" :disabled="passo < 4" @click="riusa">Un attaccante riusa una risposta vecchia</button>
      <button v-if="passo > 0" class="btn" @click="ricomincia">Ricomincia</button>
    </div>
    <p v-if="attacco" class="attacco">
      Nuova sfida <span class="hex">{{ attacco.sfida }}</span>, ma l'attaccante rimanda la vecchia
      risposta<template v-if="attacco.decifrata"> (decifrata: <span class="hex">{{ attacco.decifrata }}</span>)</template>:
      <span :class="attacco.esito ? 'esito-ok' : 'esito-ko'">
        {{ attacco.esito ? '✓ accesso consentito' : '✗ accesso negato: la risposta valeva solo per la sfida precedente' }}
      </span>
    </p>
    <p v-if="asimmetrica" class="nota">È il principio delle passkey (FIDO2/WebAuthn): niente segreti condivisi da rubare.</p>
    <p v-else class="nota">Il limite: anche il Servizio custodisce K; se gliela rubano, l'attaccante può fingersi Alice.</p>
  </div>
</template>

<style scoped>
.sfida-risposta {
  padding: 0.55rem 0.9rem;
  container-type: inline-size;
}
.prima {
  margin: 0 0 0.3rem;
  font-size: 0.92rem;
}
.attori {
  display: flex;
  justify-content: space-between;
  font-family: var(--serif);
  font-weight: 650;
  color: var(--rubrica);
  font-size: 1rem;
  border-bottom: 1px solid var(--linea);
  padding: 0 0.2rem 0.1rem;
}
.messaggi {
  list-style: none;
  margin: 0.3rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.msg {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  width: 70%;
  margin: 0;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 6px;
  padding: 0.15rem 0.6rem;
  transition: opacity 0.2s;
}
.msg::marker {
  content: none;
}
.dal-servizio {
  align-self: flex-end;
}
.futuro {
  opacity: 0.35;
}
.n {
  font-family: var(--serif);
  font-weight: 700;
  color: var(--rubrica);
}
.corpo {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  column-gap: 0.7rem;
  line-height: 1.3;
  font-size: 0.95rem;
  min-width: 0;
}
.dato {
  font-size: 0.88rem;
  color: var(--grigio);
}
.dato .hex {
  font-size: 0.88rem;
  color: var(--inchiostro);
}
.verdetto {
  font-size: 1rem;
}
.comandi {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.attacco {
  margin: 0.4rem 0 0;
  font-size: 0.9rem;
  line-height: 1.35;
}
.attacco .hex {
  font-size: 0.88rem;
}
.nota {
  margin: 0.35rem 0 0;
  font-size: 0.88rem;
  color: var(--glossa);
  font-style: italic;
}
/* Next to the margin column of the glossa layout. */
@container (max-width: 680px) {
  .msg {
    width: 86%;
  }
}
</style>
