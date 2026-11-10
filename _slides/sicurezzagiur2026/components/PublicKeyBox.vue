<!--
  Public-key encryption with three people. When the slide loads, Bob and Eve each get a real
  RSA-OAEP 2048 key pair (SHA-256), generated in the browser with Web Crypto.
  Alice encrypts with Bob's public key: Bob's private key decrypts, Eve's private key does not.
  In the PDF all three steps are shown (the exporter waits for the keys through `data-waitfor`).

  <PublicKeyBox />
  <PublicKeyBox messaggio="Il testamento è nella cassaforte" stretto />

  Props
  - messaggio: the text Alice writes (default "Il cliente accetta la transazione a 50.000 €");
    RSA-OAEP 2048 encrypts at most 190 byte, so keep it short
  - stretto: narrower layout for the main column of the `glossa` layout
-->
<script setup lang="ts">
import { onMounted, ref, useId, watch } from 'vue'
import { useNav } from '@slidev/client'
import { bufToHex, sha256Bytes, short, toHex, utf8 } from '../utils/crypto'

const props = withDefaults(defineProps<{ messaggio?: string, stretto?: boolean }>(), {
  messaggio: 'Il cliente accetta la transazione a 50.000 €',
})

const { isPrintMode } = useNav()
const uid = useId()

const ALG: RsaHashedKeyGenParams = {
  name: 'RSA-OAEP',
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: 'SHA-256',
}
const MAX_BYTE = 190

const testo = ref(props.messaggio)
const pronte = ref(false)
const impronta = ref('')
const cifrato = ref<ArrayBuffer | null>(null)
const cifratoHex = ref('')
const erroreCifra = ref('')
const esitoBob = ref<{ ok: boolean, testo: string } | null>(null)
const esitoEve = ref<{ ok: boolean, testo: string } | null>(null)
const completo = ref(false)
let bob: CryptoKeyPair | undefined
let eve: CryptoKeyPair | undefined

function azzera() {
  cifrato.value = null
  cifratoHex.value = ''
  erroreCifra.value = ''
  esitoBob.value = null
  esitoEve.value = null
}
watch(testo, azzera)

async function cifra() {
  azzera()
  if (!bob) return
  const dati = utf8(testo.value)
  if (dati.length > MAX_BYTE) {
    erroreCifra.value = `Messaggio troppo lungo: con RSA-2048 si cifrano al massimo ${MAX_BYTE} byte alla volta.`
    return
  }
  const buf = await crypto.subtle.encrypt({ name: 'RSA-OAEP' }, bob.publicKey, dati)
  cifrato.value = buf
  cifratoHex.value = bufToHex(buf)
}

async function decifra(chiave: CryptoKey | undefined) {
  if (!chiave || !cifrato.value) return null
  try {
    const buf = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, chiave, cifrato.value)
    return { ok: true, testo: new TextDecoder().decode(buf) }
  }
  catch {
    return { ok: false, testo: '' }
  }
}

async function decifraBob() {
  esitoBob.value = await decifra(bob?.privateKey)
}
async function decifraEve() {
  esitoEve.value = await decifra(eve?.privateKey)
}

function aGruppi(hex: string) {
  return hex.match(/.{1,4}/g)?.join(' ') ?? hex
}

onMounted(async () => {
  try {
    ;[bob, eve] = await Promise.all([
      crypto.subtle.generateKey(ALG, false, ['encrypt', 'decrypt']) as Promise<CryptoKeyPair>,
      crypto.subtle.generateKey(ALG, false, ['encrypt', 'decrypt']) as Promise<CryptoKeyPair>,
    ])
    const spki = await crypto.subtle.exportKey('spki', bob.publicKey)
    impronta.value = aGruppi(toHex(sha256Bytes(new Uint8Array(spki))).slice(0, 16))
    pronte.value = true
    if (isPrintMode.value) {
      await cifra()
      await decifraBob()
      await decifraEve()
    }
  }
  catch {
    erroreCifra.value = 'Il browser non riesce a generare le chiavi RSA.'
  }
  finally {
    completo.value = true
  }
})
</script>

<template>
  <div
    class="demo public-key-box"
    :class="{ stretto }"
    :data-waitfor="isPrintMode ? '.pkb-pronto' : undefined"
  >
    <section class="alice">
      <div class="campo">
        <label :for="`${uid}-testo`"><strong>Alice</strong> scrive a Bob</label>
        <input :id="`${uid}-testo`" v-model="testo" type="text" spellcheck="false" maxlength="150">
      </div>
      <div class="invio">
        <button class="btn pieno" :disabled="!pronte" @click="cifra">
          Alice cifra con la chiave pubblica di Bob
        </button>
        <p v-if="!pronte && !completo" class="grigio attesa">Generazione delle chiavi RSA da 2048 bit…</p>
        <p v-else-if="erroreCifra" class="esito-ko attesa">✗ {{ erroreCifra }}</p>
        <p v-else-if="cifratoHex" class="cifrato">
          <span class="etichetta">{{ stretto ? 'Messaggio cifrato' : 'Messaggio cifrato, lo vede chiunque sulla rete' }} ({{ cifratoHex.length / 2 }} byte):</span>
          <span class="hex">{{ short(cifratoHex, stretto ? 18 : 40, stretto ? 6 : 8) }}</span>
        </p>
        <p v-else class="grigio attesa">Il messaggio cifrato comparirà qui.</p>
      </div>
    </section>

    <div class="destinatari">
      <section class="persona" :class="{ 'bordo-ok': esitoBob?.ok }">
        <p class="nome"><strong>Bob</strong>, il destinatario</p>
        <ul class="chiavi">
          <li class="chiave">
            <span class="tipo">pubblica</span>
            <span class="hex">{{ impronta || '…' }}</span>
            <span class="nota">può conoscerla chiunque</span>
          </li>
          <li class="chiave">
            <span class="tipo">privata</span>
            <span class="nota">la conosce solo Bob</span>
          </li>
        </ul>
        <button class="btn" :disabled="!cifrato" @click="decifraBob">Bob decifra con la sua chiave privata</button>
        <p v-if="esitoBob?.ok" class="esito esito-ok">✓ «{{ esitoBob.testo }}»</p>
        <p v-else-if="esitoBob" class="esito esito-ko">✗ impossibile decifrare</p>
      </section>

      <section class="persona" :class="{ 'bordo-ko': esitoEve && !esitoEve.ok }">
        <p class="nome"><strong>Eve</strong> intercetta il messaggio</p>
        <ul class="chiavi">
          <li class="chiave">
            <span class="tipo">privata di Eve</span>
            <span class="nota">è un'altra chiave, non quella di Bob</span>
          </li>
        </ul>
        <button class="btn" :disabled="!cifrato" @click="decifraEve">Eve prova con la sua chiave privata</button>
        <p v-if="esitoEve?.ok" class="esito esito-ok">✓ «{{ esitoEve.testo }}»</p>
        <p v-else-if="esitoEve" class="esito esito-ko">✗ impossibile decifrare</p>
      </section>
    </div>
    <span v-if="completo" class="pkb-pronto" aria-hidden="true" />
  </div>
</template>

<style scoped>
.public-key-box {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}
.alice {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr);
  gap: 0.5rem 1rem;
  align-items: end;
}
.stretto .alice {
  grid-template-columns: minmax(0, 1fr);
  gap: 0.4rem;
}
.stretto .campo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}
.stretto .campo label {
  flex: none;
  margin: 0;
}
.invio {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}
.invio .btn {
  flex: none;
  max-width: 13.5rem;
  text-align: left;
}
.stretto .invio .btn {
  max-width: none;
}
.stretto .nome {
  margin-bottom: 0.25rem;
}
.stretto .chiavi {
  margin-bottom: 0.4rem;
}
.stretto .destinatari {
  gap: 0.6rem;
}
.stretto .persona {
  padding: 0.4rem 0.6rem 0.45rem;
}
.stretto .esito {
  margin-top: 0.3rem;
  font-size: 0.95rem;
}
.attesa,
.cifrato {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.3;
  min-width: 0;
}
.cifrato .etichetta {
  display: block;
  color: var(--grigio);
}
.cifrato .hex {
  font-size: 0.85rem;
}
.destinatari {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 0.8rem;
}
.persona {
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 5px;
  padding: 0.5rem 0.7rem 0.55rem;
}
.nome {
  margin: 0 0 0.35rem;
}
.chiavi {
  list-style: none;
  margin: 0 0 0.5rem;
  padding: 0;
}
.chiavi li::marker {
  content: none;
}
.chiave {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 0.45rem;
  margin: 0 0 0.2rem;
  font-size: 0.85rem;
  line-height: 1.35;
}
.tipo {
  font-weight: 700;
  color: var(--glossa);
  border: 1px solid var(--glossa);
  border-radius: 3px;
  padding: 0 0.35rem;
}
.chiave .hex {
  font-size: 0.85rem;
}
.nota {
  color: var(--grigio);
}
.esito {
  margin: 0.4rem 0 0;
  font-size: 1rem;
  line-height: 1.3;
}
/* Marker for the PDF exporter (data-waitfor): present once the keys exist and the steps ran. */
.pkb-pronto {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1px;
  height: 1px;
}
</style>
