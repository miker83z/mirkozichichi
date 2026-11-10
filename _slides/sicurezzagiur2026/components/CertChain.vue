<!--
  The chain of certificates behind the padlock of a website: site certificate → intermediate
  authority → root authority (already in the browser / operating system).
  The keys and signatures are real ECDSA P-256 ones, generated on mount; names and dates are
  illustrative. "Verifica la catena" walks from the site up to the root, one ✓ line per check.
  Two switches break the chain: "certificato scaduto" (the site certificate ended in the
  previous year, 2025 for a 2026 lecture) and "firmato da un'autorità sconosciuta" (the site
  certificate comes from an authority the computer does not know).
  Validity is checked against today's date (in the PDF, 2026-11-15); the dates of the normal
  site certificate are computed around today so the demo keeps working in later years.
  In the PDF the chain is shown verified ✓.

  <CertChain />
  <CertChain sito="www.esempio.it" />

  sito: the site name (default "www.studio-legale-esempio.it").
-->
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'
import { useNav } from '@slidev/client'
import { short } from '../utils/crypto'
import { firma, nuoveChiavi, pubblicaHex, verifica } from '../utils/firme'
import { ISTANTE_STAMPA } from '../utils/tempo'

const props = withDefaults(defineProps<{ sito?: string }>(), {
  sito: 'www.studio-legale-esempio.it',
})

const { isPrintMode } = useNav()
const GIORNO = 86400000
const oggi = isPrintMode.value ? ISTANTE_STAMPA : Date.now()
const anno = new Date(oggi).getUTCFullYear()

const RADICE = 'Radice Esempio CA'
const INTERMEDIA = 'Intermedia Esempio CA'
const IGNOTA = 'Fai-da-te CA'

interface Cert {
  soggetto: string
  emittente: string
  dal: number
  al: number
  pub: string
  firma: string
}

const scaduto = ref(false)
const ignota = ref(false)
const certs = shallowRef<Record<string, Cert> | null>(null)
const chiaviPubbliche: Record<string, CryptoKey> = {}

function giornoUtc(ms: number): number {
  return Math.floor(ms / GIORNO) * GIORNO
}
function data(ms: number): string {
  return new Date(ms).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' })
}
function daFirmare(c: Omit<Cert, 'firma'>): string {
  return [c.soggetto, c.emittente, data(c.dal), data(c.al), c.pub].join('|')
}

onMounted(async () => {
  const [kR, kI, kS, kX] = await Promise.all([nuoveChiavi(), nuoveChiavi(), nuoveChiavi(), nuoveChiavi()])
  chiaviPubbliche[RADICE] = kR.publicKey
  chiaviPubbliche[INTERMEDIA] = kI.publicKey
  const [pR, pI, pS] = await Promise.all([pubblicaHex(kR.publicKey), pubblicaHex(kI.publicKey), pubblicaHex(kS.publicKey)])
  const g = giornoUtc(oggi)
  const base = {
    radice: { soggetto: RADICE, emittente: RADICE, dal: Date.UTC(anno - 11, 5, 4), al: Date.UTC(anno + 9, 5, 4), pub: pR },
    intermedia: { soggetto: INTERMEDIA, emittente: RADICE, dal: Date.UTC(anno - 2, 2, 13), al: Date.UTC(anno + 1, 2, 12), pub: pI },
    sito: { soggetto: props.sito, emittente: INTERMEDIA, dal: g - 45 * GIORNO, al: g + 154 * GIORNO, pub: pS },
    scaduto: { soggetto: props.sito, emittente: INTERMEDIA, dal: Date.UTC(anno - 2, 9, 1), al: Date.UTC(anno - 1, 3, 18), pub: pS },
    ignota: { soggetto: props.sito, emittente: IGNOTA, dal: g - 45 * GIORNO, al: g + 154 * GIORNO, pub: pS },
  }
  const firmatario = { radice: kR, intermedia: kR, sito: kI, scaduto: kI, ignota: kX }
  const out: Record<string, Cert> = {}
  for (const [nome, c] of Object.entries(base))
    out[nome] = { ...c, firma: await firma(firmatario[nome as keyof typeof firmatario].privateKey, daFirmare(c)) }
  certs.value = out
  if (isPrintMode.value) await verificaCatena()
})

const sito = computed(() => certs.value?.[ignota.value ? 'ignota' : scaduto.value ? 'scaduto' : 'sito'])
const schede = computed(() => {
  if (!certs.value || !sito.value) return []
  return [
    { chiave: 'sito', titolo: 'Certificato del sito', nota: 'Lo invia il sito quando ti colleghi', c: sito.value },
    { chiave: 'intermedia', titolo: 'Autorità intermedia', nota: 'Firmata dall\'autorità radice', c: certs.value.intermedia },
    { chiave: 'radice', titolo: 'Autorità radice', nota: 'Già presente nel tuo browser/sistema operativo', c: certs.value.radice },
  ]
})

interface Riga { ok: boolean, testo: string }
const righe = ref<Riga[]>([])
const visibili = ref(0)
const esito = ref<boolean | null>(null)
let timer: ReturnType<typeof setInterval> | undefined

async function verificaCatena() {
  if (!certs.value || !sito.value) return
  const out: Riga[] = []
  const s = sito.value
  const chi = `«${s.soggetto}»`
  if (oggi > s.al + GIORNO - 1) {
    out.push({ ok: false, testo: `il certificato di ${chi} è scaduto il ${data(s.al)}` })
  }
  else {
    out.push({ ok: true, testo: `il certificato di ${chi} è valido oggi (fino al ${data(s.al)})` })
    const chiave = chiaviPubbliche[s.emittente]
    if (!chiave) {
      out.push({ ok: false, testo: `l'emittente «${s.emittente}» non è un'autorità che il tuo computer conosce: nessuno garantisce per lei` })
    }
    else {
      const { firma: f1, ...resto1 } = s
      const ok1 = await verifica(chiave, daFirmare(resto1), f1)
      out.push({ ok: ok1, testo: `la firma di ${chi} ${ok1 ? 'è verificata' : 'non torna'} con la chiave pubblica di «${s.emittente}»` })
      if (ok1) {
        const { firma: f2, ...resto2 } = certs.value.intermedia
        const ok2 = await verifica(chiaviPubbliche[RADICE], daFirmare(resto2), f2)
        out.push({ ok: ok2, testo: `la firma di «${INTERMEDIA}» ${ok2 ? 'è verificata' : 'non torna'} con la chiave pubblica di «${RADICE}»` })
        if (ok2) out.push({ ok: true, testo: 'la radice è fidata perché è già nel tuo computer' })
      }
    }
  }
  righe.value = out
  esito.value = out.every(r => r.ok)
  clearInterval(timer)
  if (isPrintMode.value) {
    visibili.value = out.length
    return
  }
  visibili.value = 1
  timer = setInterval(() => {
    if (++visibili.value >= righe.value.length) clearInterval(timer)
  }, 450)
}

watch([scaduto, ignota], () => {
  clearInterval(timer)
  righe.value = []
  visibili.value = 0
  esito.value = null
})
onUnmounted(() => clearInterval(timer))

const finito = computed(() => esito.value !== null && visibili.value >= righe.value.length)
const anelloRotto = computed(() => finito.value && !esito.value)
</script>

<template>
  <div class="demo catena">
    <div class="schede">
      <template v-for="(s, i) in schede" :key="s.chiave">
        <div v-if="i > 0" class="anello" aria-hidden="true">
          <span>←</span>
          <small>firma</small>
        </div>
        <article
          class="scheda"
          :class="{
            'bordo-ok': finito && esito,
            'spenta': ignota && s.chiave !== 'sito',
          }"
        >
          <header>
            <strong>{{ s.titolo }}</strong>
            <span class="nota">{{ s.nota }}</span>
          </header>
          <dl>
            <div class="campo intero">
              <dt>Soggetto</dt>
              <dd class="nome">{{ s.c.soggetto }}</dd>
            </div>
            <div class="campo intero">
              <dt>Emittente</dt>
              <dd :class="{ 'esito-ko': s.c.emittente === IGNOTA }">{{ s.c.emittente }}</dd>
            </div>
            <div class="campo intero">
              <dt>Valido dal / al</dt>
              <dd :class="{ 'esito-ko': oggi > s.c.al + GIORNO - 1 }">{{ data(s.c.dal) }} – {{ data(s.c.al) }}</dd>
            </div>
            <div class="campo">
              <dt>Chiave pubblica</dt>
              <dd class="hex">{{ short(s.c.pub, 6, 4) }}</dd>
            </div>
            <div class="campo">
              <dt>Firma dell'emittente</dt>
              <dd class="hex">{{ short(s.c.firma, 6, 4) }}</dd>
            </div>
          </dl>
        </article>
      </template>
      <p v-if="!certs" class="grigio">Preparo i certificati…</p>
    </div>

    <div class="comandi">
      <button v-if="!isPrintMode" class="btn pieno" :disabled="!certs" @click="verificaCatena">Verifica la catena</button>
      <label v-if="!isPrintMode" class="interruttore"><input v-model="scaduto" type="checkbox"> certificato scaduto</label>
      <label v-if="!isPrintMode" class="interruttore"><input v-model="ignota" type="checkbox"> firmato da un'autorità sconosciuta</label>
      <span v-if="finito" class="verdetto" :class="esito ? 'esito-ok' : 'esito-ko'">
        {{ esito ? '✓ catena valida: il browser mostra il lucchetto' : '✗ catena non valida: il browser mostra un avviso' }}
      </span>
    </div>
    <ol class="passi" :class="{ rotto: anelloRotto }">
      <li v-for="(r, i) in righe.slice(0, visibili)" :key="i" :class="r.ok ? 'esito-ok' : 'esito-ko'">
        {{ r.ok ? '✓' : '✗' }} <span>{{ r.testo }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.catena {
  padding: 0.6rem 0.8rem;
  container-type: inline-size;
}
.schede {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: stretch;
}
.anello {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--grigio);
  padding: 0 0.25rem;
  line-height: 1;
}
.anello span {
  font-size: 1.3rem;
}
.anello small {
  font-size: 0.8rem;
}
.scheda {
  background: var(--carta);
  border: 1px solid var(--linea);
  border-radius: 5px;
  padding: 0.35rem 0.55rem 0.4rem;
  min-width: 0;
  transition: opacity 0.2s;
}
.scheda.spenta {
  opacity: 0.45;
}
header {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.2rem;
  line-height: 1.2;
}
header strong {
  font-family: var(--serif);
  color: var(--rubrica);
  font-size: 0.95rem;
}
.nota {
  font-size: 0.8rem;
  color: var(--glossa);
  font-style: italic;
}
dl {
  margin: 0;
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
  gap: 0.15rem 0.5rem;
  font-size: 0.8rem;
  line-height: 1.25;
}
.campo {
  min-width: 0;
}
.campo.intero {
  grid-column: 1 / -1;
}
dt {
  color: var(--grigio);
  white-space: nowrap;
}
dd {
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}
dd.hex {
  font-size: 0.8rem;
}
dd.nome {
  font-weight: 700;
  font-size: 0.85rem;
}
.comandi {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem 1rem;
  margin-top: 0.5rem;
}
.interruttore {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin: 0;
  font-size: 0.9rem;
  color: var(--inchiostro);
  cursor: pointer;
}
.verdetto {
  font-size: 1rem;
}
.passi {
  list-style: none;
  margin: 0.35rem 0 0;
  padding: 0;
  font-size: 0.9rem;
  line-height: 1.35;
}
.passi li {
  margin: 0.05rem 0;
}
.passi li::marker {
  content: none;
}
.passi li span {
  color: var(--inchiostro);
  font-weight: 400;
}
/* Meant for a full-width slide; narrower, the fields stack instead of overlapping. */
@container (max-width: 760px) {
  .campo {
    grid-column: 1 / -1;
  }
  .anello small {
    display: none;
  }
}
</style>
