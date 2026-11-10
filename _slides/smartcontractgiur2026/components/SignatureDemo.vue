<!--
  Digital signature, step by step, with a real ECDSA P-256 key pair for Alice (Web Crypto,
  generated on mount; it never leaves the browser).
  1. Alice computes the SHA-256 fingerprint of the document; 2. she signs it with her private key;
  3. Bob verifies the received document with Alice's public key. "Modifica una parola in transito"
  alters Bob's copy, and the check fails.
  Web Crypto ECDSA hashes the message itself (SHA-256) inside sign/verify: the fingerprint is
  computed and shown separately only to explain what gets signed.
  In the PDF: document signed and verified ✓, plus a line showing that after an alteration the
  check gives ✗ (both computed for real).

  <SignatureDemo />
  <SignatureDemo documento="Il sottoscritto … dichiara …" />

  documento: Alice's document (default: an acceptance of a proposal by Mario Rossi).
-->
<script setup lang="ts">
import { onMounted, ref, shallowRef, watch } from 'vue'
import { useNav } from '@slidev/client'
import { sha256, short } from '../utils/crypto'
import { firma, nuoveChiavi, pubblicaHex, verifica } from '../utils/firme'

const props = withDefaults(defineProps<{ documento?: string }>(), {
  documento: 'Il sottoscritto Mario Rossi accetta la proposta del 3 novembre 2026.',
})

const { isPrintMode } = useNav()
const chiavi = shallowRef<CryptoKeyPair | null>(null)
const pubHex = ref('')
const docAlice = ref(props.documento)
const impronta = ref<string | null>(null)
const firmaHex = ref<string | null>(null)
const docBob = ref('')
const esito = ref<boolean | null>(null)
const alterato = ref<{ testo: string, esito: boolean } | null>(null)

/** Changes one word (or one figure) of the text, as an attacker in the middle would. */
function altera(t: string): string {
  if (/\baccetta\b/.test(t)) return t.replace(/\baccetta\b/, 'rifiuta')
  if (/\d/.test(t)) return t.replace(/\d/, d => String((Number(d) + 1) % 10))
  return `${t} non`
}

function calcolaImpronta() {
  impronta.value = sha256(docAlice.value)
}

async function firmaDocumento() {
  if (!chiavi.value) return
  const testo = docAlice.value
  impronta.value = sha256(testo)
  firmaHex.value = await firma(chiavi.value.privateKey, testo)
  docBob.value = testo
  esito.value = null
}

async function verificaFirma() {
  if (!chiavi.value || !firmaHex.value) return
  esito.value = await verifica(chiavi.value.publicKey, docBob.value, firmaHex.value)
}

watch(docAlice, () => {
  impronta.value = null
  firmaHex.value = null
  docBob.value = ''
  esito.value = null
})
watch(docBob, () => { esito.value = null })

onMounted(async () => {
  chiavi.value = await nuoveChiavi()
  pubHex.value = await pubblicaHex(chiavi.value.publicKey)
  if (isPrintMode.value) {
    await firmaDocumento()
    await verificaFirma()
    const testo = altera(docAlice.value)
    alterato.value = { testo, esito: await verifica(chiavi.value.publicKey, testo, firmaHex.value!) }
  }
})

/** The word that differs between the original and the altered text, for the PDF line. */
function differenza(a: string, b: string): [string, string] {
  const pa = a.split(' '), pb = b.split(' ')
  const i = pa.findIndex((p, k) => p !== pb[k])
  return i < 0 ? ['', ''] : [pa[i], pb[i] ?? '']
}
</script>

<template>
  <div class="demo firma-demo">
    <div class="griglia">
      <section class="parte">
        <h4>Alice <span class="ruolo">firma</span></h4>
        <label for="fd-alice">Documento di Alice</label>
        <textarea id="fd-alice" v-model="docAlice" rows="2" spellcheck="false" />
        <div class="passo">
          <button class="btn" :disabled="!chiavi" @click="calcolaImpronta">1. Alice calcola l'impronta (SHA-256)</button>
          <p v-if="impronta" class="valore">
            <span class="grigio">Impronta:</span> <span class="hex piena">{{ impronta }}</span><span class="hex corta">{{ short(impronta, 14, 6) }}</span>
          </p>
        </div>
        <div class="passo">
          <button class="btn" :disabled="!impronta || !chiavi" @click="firmaDocumento">2. Alice firma con la sua chiave privata</button>
          <p v-if="firmaHex" class="valore"><span class="grigio">Firma:</span> <span class="hex">{{ short(firmaHex, 14, 6) }}</span></p>
        </div>
      </section>

      <div class="freccia" aria-hidden="true">→</div>

      <section class="parte">
        <h4>Bob <span class="ruolo">verifica</span></h4>
        <label for="fd-bob">Documento ricevuto da Bob</label>
        <textarea id="fd-bob" v-model="docBob" rows="2" spellcheck="false" :disabled="!firmaHex" placeholder="in attesa del documento firmato" />
        <p class="valore grigio piccola">
          Chiave pubblica di Alice: <span class="hex">{{ pubHex ? short(pubHex, 8, 4) : '…' }}</span>
        </p>
        <div class="azioni">
          <button class="btn" :disabled="!firmaHex" @click="docBob = altera(docBob)">Modifica una parola in transito</button>
          <button class="btn pieno" :disabled="!firmaHex" @click="verificaFirma">3. Bob verifica con la chiave pubblica di Alice</button>
        </div>
        <p v-if="esito === true" class="esito esito-ok">✓ firma valida: documento integro, firmato da Alice</p>
        <p v-else-if="esito === false" class="esito esito-ko">✗ firma non valida: documento alterato o firmatario diverso</p>
      </section>
    </div>

    <p v-if="isPrintMode && alterato" class="nota-stampa">
      Se in transito «{{ differenza(docAlice, alterato.testo)[0] }}» diventa «{{ differenza(docAlice, alterato.testo)[1] }}»:
      <span :class="alterato.esito ? 'esito-ok' : 'esito-ko'">
        {{ alterato.esito ? '✓ firma valida' : '✗ firma non valida: documento alterato o firmatario diverso' }}
      </span>
    </p>
  </div>
</template>

<style scoped>
.firma-demo {
  container-type: inline-size;
}
.griglia {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  column-gap: 0.7rem;
}
.parte {
  min-width: 0;
}
h4 {
  font-family: var(--serif);
  font-size: 1.1rem;
  font-weight: 650;
  color: var(--rubrica);
  margin: 0 0 0.2rem;
}
.ruolo {
  font-family: var(--sans);
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--grigio);
}
.freccia {
  align-self: center;
  font-size: 1.6rem;
  color: var(--grigio);
}
.passo {
  margin-top: 0.4rem;
}
.valore {
  margin: 0.2rem 0 0;
  font-size: 0.9rem;
  line-height: 1.3;
}
.valore .hex {
  font-size: 0.85rem;
}
.piccola {
  font-size: 0.85rem;
}
.azioni {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.4rem;
}
.esito {
  margin: 0.4rem 0 0;
  font-size: 1rem;
  line-height: 1.3;
}
.nota-stampa {
  margin: 0.5rem 0 0;
  padding-top: 0.4rem;
  border-top: 1px solid var(--linea);
  font-size: 0.9rem;
}
textarea:disabled {
  background: var(--campo);
}
.corta {
  display: none;
}
/* Next to the margin column of the glossa layout. */
@container (max-width: 680px) {
  .griglia {
    column-gap: 0.4rem;
  }
  .piena {
    display: none;
  }
  .corta {
    display: inline;
  }
  .btn {
    font-size: 0.85rem;
    padding: 0.2rem 0.5rem;
    text-align: left;
  }
  textarea {
    font-size: 0.9rem;
  }
  .esito {
    font-size: 0.95rem;
  }
}
</style>
