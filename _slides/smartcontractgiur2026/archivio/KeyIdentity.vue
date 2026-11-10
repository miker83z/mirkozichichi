<!--
  On a blockchain an identity is just a key pair. "Crea una nuova identità" generates an ECDSA
  P-256 key pair in the browser; the address is "0x" + the first 40 hex digits of the SHA-256 of
  the public key (raw export), i.e. a fingerprint of the public key. (Real chains use other
  curves and hashes, e.g. secp256k1 and Keccak-256 in Ethereum; the idea is the same.)
  Each click adds a row (at most 5): no central register, anyone can create as many as they like.
  Then the selected identity signs a message and anyone can verify it with the public key.
  In the PDF 3 identities are shown, and the first one has signed the message (✓).

  <KeyIdentity />
  <KeyIdentity messaggio="Trasferisci 10 token a 0x…" />

  messaggio: the message to sign (default: a statement of ownership of the address).
-->
<script setup lang="ts">
import { nextTick, onMounted, ref, shallowRef, watch } from 'vue'
import { useNav } from '@slidev/client'
import { fromHex, sha256Bytes, short, toHex } from '../utils/crypto'
import { firma, nuoveChiavi, privataHex, pubblicaHex, verifica } from '../utils/firme'

const props = withDefaults(defineProps<{ messaggio?: string }>(), {
  messaggio: 'Dichiaro di essere il titolare di questo indirizzo.',
})

const { isPrintMode } = useNav()
const MASSIMO = 5

interface Identita {
  chiavi: CryptoKeyPair
  pub: string
  priv: string
  indirizzo: string
}

const identita = shallowRef<Identita[]>([])
const mostra = ref<boolean[]>([])
const scelta = ref(0)
const testo = ref(props.messaggio)
const firmato = ref<{ firma: string, ok: boolean, indirizzo: string } | null>(null)
let occupato = false

async function crea() {
  if (occupato || identita.value.length >= MASSIMO) return
  occupato = true
  try {
    const chiavi = await nuoveChiavi()
    const pub = await pubblicaHex(chiavi.publicKey)
    const priv = await privataHex(chiavi.privateKey)
    const indirizzo = `0x${toHex(sha256Bytes(fromHex(pub))).slice(0, 40)}`
    identita.value = [...identita.value, { chiavi, pub, priv, indirizzo }]
    mostra.value.push(false)
    scelta.value = identita.value.length - 1
  }
  finally {
    occupato = false
  }
}

async function firmaMessaggio() {
  const id = identita.value[scelta.value]
  if (!id) return
  const f = await firma(id.chiavi.privateKey, testo.value)
  firmato.value = { firma: f, ok: await verifica(id.chiavi.publicKey, testo.value, f), indirizzo: id.indirizzo }
}

function ricomincia() {
  identita.value = []
  mostra.value = []
  scelta.value = 0
  firmato.value = null
}

watch([scelta, testo], () => { firmato.value = null })

onMounted(async () => {
  if (isPrintMode.value) {
    for (let i = 0; i < 3; i++) await crea()
    scelta.value = 0
    await nextTick()
    await firmaMessaggio()
  }
})
</script>

<template>
  <div class="demo identita">
    <div class="comandi">
      <button class="btn pieno" :disabled="identita.length >= MASSIMO" @click="crea">Crea una nuova identità</button>
      <span class="nota">Nessun registro centrale: chiunque può crearne quante vuole.</span>
      <span class="grigio conta">{{ identita.length }} create<template v-if="identita.length >= MASSIMO"> (massimo {{ MASSIMO }} in questa demo)</template></span>
      <button v-if="identita.length && !isPrintMode" class="btn ricomincia" @click="ricomincia">Ricomincia</button>
    </div>

    <table v-if="identita.length" class="tabella">
      <thead>
        <tr>
          <th />
          <th>Indirizzo <span class="grigio">(impronta della chiave pubblica)</span></th>
          <th>Chiave pubblica</th>
          <th>Chiave privata</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(id, i) in identita" :key="id.indirizzo" :class="{ scelta: scelta === i }" @click="scelta = i">
          <td><input :id="`ki-${i}`" v-model="scelta" type="radio" name="ki-scelta" :value="i" :aria-label="`Seleziona l'identità ${i + 1}`"></td>
          <td class="hex indirizzo"><span class="piena">{{ id.indirizzo }}</span><span class="corta">{{ short(id.indirizzo, 12, 6) }}</span></td>
          <td class="hex chiave">{{ short(id.pub, 8, 6) }}</td>
          <td>
            <span v-if="mostra[i]" class="hex segreta">{{ short(id.priv, 8, 6) }}</span>
            <button v-else class="mostra" @click.stop="mostra[i] = true">Mostra la chiave privata (nella realtà, mai!)</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="grigio vuoto">Ancora nessuna identità: creane una.</p>

    <div v-if="identita.length" class="firma">
      <label for="ki-msg">Messaggio</label>
      <div class="linea">
        <input id="ki-msg" v-model="testo" type="text" spellcheck="false">
        <button class="btn" @click="firmaMessaggio">Firma un messaggio con l'identità selezionata</button>
      </div>
      <p v-if="firmato" class="esito">
        <span class="grigio">Firma:</span> <span class="hex">{{ short(firmato.firma, 12, 6) }}</span>
        <span :class="firmato.ok ? 'esito-ok' : 'esito-ko'">
          {{ firmato.ok ? `✓ firma valida: il messaggio viene da chi controlla ${short(firmato.indirizzo, 8, 4)}` : '✗ firma non valida' }}
        </span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.identita {
  padding: 0.55rem 0.9rem;
  container-type: inline-size;
}
.comandi {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.3rem 0.9rem;
}
.nota {
  font-size: 0.9rem;
  color: var(--glossa);
  font-style: italic;
}
.conta {
  font-size: 0.85rem;
}
.tabella {
  margin-top: 0.4rem;
  font-size: 0.85rem !important;
  background: var(--carta);
}
.tabella th {
  font-size: 0.82rem;
  padding: 0.15rem 0.4rem;
  border-bottom-width: 1px;
}
.tabella td {
  padding: 0.1rem 0.4rem;
  vertical-align: middle;
}
.tabella tr {
  cursor: pointer;
}
.tabella tr.scelta td {
  background: color-mix(in srgb, var(--rubrica) 14%, var(--carta));
}
.tabella td.hex {
  font-size: 0.85rem;
}
.tabella input[type='radio'] {
  accent-color: var(--rubrica);
  margin: 0;
}
.tabella input[type='radio']:focus-visible {
  outline: 2px solid var(--rubrica);
  outline-offset: 2px;
}
.indirizzo,
.chiave {
  white-space: nowrap;
}
.segreta {
  color: var(--ko);
  font-size: 0.85rem;
}
.mostra {
  font-family: var(--sans);
  font-size: 0.8rem;
  color: var(--ko);
  background: none;
  border: 1px dashed var(--ko);
  border-radius: 3px;
  padding: 0 0.4rem;
  cursor: pointer;
}
.mostra:focus-visible {
  outline: 2px solid var(--rubrica);
  outline-offset: 2px;
}
.vuoto {
  margin: 0.5rem 0 0;
  font-size: 0.95rem;
}
.firma {
  margin-top: 0.5rem;
}
.linea {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem 0.5rem;
}
.linea input {
  flex: 1;
  min-width: 14rem;
}
.linea .btn {
  white-space: nowrap;
}
.esito {
  margin: 0.3rem 0 0;
  font-size: 0.95rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.6rem;
  align-items: baseline;
}
.esito .hex {
  font-size: 0.85rem;
}
.ricomincia {
  margin-left: auto;
  font-size: 0.8rem;
}
.corta {
  display: none;
}
/* Next to the margin column of the glossa layout: shortened addresses. */
@container (max-width: 680px) {
  .piena {
    display: none;
  }
  .corta {
    display: inline;
  }
}
</style>
