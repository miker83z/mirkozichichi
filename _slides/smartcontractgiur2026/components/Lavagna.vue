<!--
  The live board of the class activity: it reads the class smart contract (aula/move, IDs in
  aula/config.json) on the IOTA test network and shows the latest poll with its votes, how many students
  joined, the AULA in circulation and the latest operations (joins, votes, transfers), every 3 seconds.
  It connects only when the presenter presses "Collega": until then the deck makes no request to other
  websites (privacy). In the PDF it shows what the students will do, without live data.

  <Lavagna />                 poll, counters and latest operations
  <Lavagna solo="voto" />     only the poll, larger
  <Lavagna solo="monete" />   only joins and AULA transfers (the first exercise, before the vote)

  Props: solo?: 'voto' | 'monete'
-->
<script setup lang="ts">
import { computed, onUnmounted, ref, shallowRef } from 'vue'
import { onSlideLeave, useNav } from '@slidev/client'
import config from '../aula/config.json'

const props = defineProps<{ solo?: 'voto' | 'monete' }>()
const { isPrintMode } = useNav()

interface Sondaggio { domanda: string, opzioni: string[], voti: number[], aperto: boolean }
interface Evento { tipo: 'iscritto' | 'votato' | 'inviato', testo: string, quando: number }

const collegata = ref(false)
const errore = ref('')
const sondaggio = shallowRef<Sondaggio | null>(null)
const iscritti = ref(0)
const circolazione = ref(0)
const eventi = shallowRef<Evento[]>([])
let timer: ReturnType<typeof setInterval> | undefined
// eslint-disable-next-line ts/no-explicit-any
let client: any = null

const PKG = config.pacchetto
const totale = computed(() => sondaggio.value?.voti.reduce((a, b) => a + b, 0) ?? 0)

async function leggi() {
  try {
    const [rub, ultimo, ev1, ev2, ev3] = await Promise.all([
      client.getObject({ id: config.rubinetto, options: { showContent: true } }),
      client.queryEvents({ query: { MoveEventType: `${PKG}::voto::SondaggioCreato` }, order: 'descending', limit: 1 }),
      client.queryEvents({ query: { MoveEventType: `${PKG}::aula::Iscritto` }, order: 'descending', limit: 6 }),
      client.queryEvents({ query: { MoveEventType: `${PKG}::voto::Votato` }, order: 'descending', limit: 6 }),
      client.queryEvents({ query: { MoveEventType: `${PKG}::aula::Inviato` }, order: 'descending', limit: 6 }),
    ])
    const f = rub.data?.content?.fields
    iscritti.value = Number(f?.iscritti?.fields?.size ?? 0)
    circolazione.value = Number(f?.tesoro?.fields?.total_supply?.fields?.value ?? 0)
    const id = ultimo.data[0]?.parsedJson?.sondaggio
    if (id) {
      const o = await client.getObject({ id, options: { showContent: true } })
      const s = o.data?.content?.fields
      if (s) sondaggio.value = { domanda: String(s.domanda), opzioni: s.opzioni.map(String), voti: s.voti.map(Number), aperto: Boolean(s.aperto) }
    }
    const opz = sondaggio.value?.opzioni ?? []
    const conVoti = props.solo !== 'monete'
    eventi.value = [
      ...ev1.data.map((e: any) => ({ tipo: 'iscritto' as const, testo: `«${e.parsedJson.nome}» si è iscritto: +10 AULA`, quando: Number(e.timestampMs) })),
      ...(conVoti ? ev2.data : []).map((e: any) => ({ tipo: 'votato' as const, testo: `un voto per «${opz[Number(e.parsedJson.scelta)] ?? e.parsedJson.scelta}»`, quando: Number(e.timestampMs) })),
      ...ev3.data.map((e: any) => ({ tipo: 'inviato' as const, testo: `${e.parsedJson.importo} AULA a «${e.parsedJson.a}»`, quando: Number(e.timestampMs) })),
    ].sort((a, b) => b.quando - a.quando).slice(0, 6)
    errore.value = ''
  }
  catch (e) {
    errore.value = `Rete non raggiungibile (${e instanceof Error ? e.message.slice(0, 80) : e})`
  }
}

async function collega() {
  if (collegata.value) return
  const { IotaClient } = await import('@iota/iota-sdk/client')
  client = new IotaClient({ url: config.rpc })
  collegata.value = true
  await leggi()
  timer = setInterval(leggi, 3000)
}
function scollega() {
  if (timer) clearInterval(timer)
  timer = undefined
  collegata.value = false
}
onSlideLeave(scollega)
onUnmounted(scollega)

const ora = (ms: number) => new Date(ms).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
</script>

<template>
  <div class="demo lavagna" :class="{ grande: props.solo === 'voto', monete: props.solo === 'monete' }">
    <template v-if="isPrintMode">
      <p class="grigio">In aula questa lavagna si collega allo smart contract sulla rete di prova {{ config.rete }} di IOTA e mostra, in tempo reale, {{ props.solo === 'monete' ? 'gli iscritti, gli AULA in circolazione e gli ultimi invii' : props.solo === 'voto' ? 'i voti' : 'i voti, gli iscritti, gli AULA in circolazione e le ultime operazioni' }}.</p>
    </template>
    <template v-else-if="!collegata">
      <button class="btn pieno" @click="collega">Collega la lavagna alla blockchain</button>
      <span class="grigio piccolo">Legge lo smart contract sulla rete {{ config.rete }} (server pubblici di IOTA).</span>
    </template>
    <template v-else>
      <div class="griglia">
        <section v-if="props.solo !== 'monete'" class="voto">
          <p class="domanda">{{ sondaggio?.domanda ?? 'Nessun sondaggio, per ora' }}<span v-if="sondaggio && !sondaggio.aperto" class="grigio"> (chiuso)</span></p>
          <div v-for="(o, i) in sondaggio?.opzioni ?? []" :key="o" class="barra">
            <span class="riempi" :style="{ width: totale ? `${(sondaggio!.voti[i] / totale) * 100}%` : '0%' }" />
            <span class="etichetta">{{ o }}</span>
            <span class="conta">{{ sondaggio!.voti[i] }}</span>
          </div>
          <p class="grigio piccolo">{{ totale }} {{ totale === 1 ? 'voto' : 'voti' }}, uno per indirizzo</p>
        </section>
        <section v-if="props.solo !== 'voto'" class="dati">
          <div class="numero"><span>{{ iscritti }}</span> iscritti</div>
          <div class="numero"><span>{{ circolazione }}</span> AULA in circolazione</div>
          <ol class="eventi">
            <li v-for="e in eventi" :key="`${e.tipo}${e.quando}${e.testo}`" :class="e.tipo"><span class="ora">{{ ora(e.quando) }}</span> {{ e.testo }}</li>
          </ol>
        </section>
      </div>
      <p v-if="errore" class="esito-ko piccolo">{{ errore }}</p>
    </template>
  </div>
</template>

<style scoped>
.lavagna {
  padding: 0.7rem 1rem;
}
.griglia {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 1.2rem;
}
.grande .griglia,
.monete .griglia {
  grid-template-columns: 1fr;
}
.domanda {
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0 0 0.5rem !important;
}
.grande .domanda {
  font-size: 1.4rem;
}
.barra {
  position: relative;
  display: flex;
  justify-content: space-between;
  border: 1px solid var(--linea);
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  margin: 0.3rem 0;
  overflow: hidden;
}
.grande .barra {
  padding: 0.5rem 0.8rem;
  font-size: 1.2rem;
}
.riempi {
  position: absolute;
  inset: 0 auto 0 0;
  background: var(--pannello, var(--campo));
  transition: width 0.5s;
}
.etichetta,
.conta {
  position: relative;
}
.conta {
  font-weight: 700;
}
.numero {
  font-size: 0.95rem;
  margin-bottom: 0.3rem;
}
.numero span {
  font-family: var(--titoli);
  font-weight: 700;
  font-size: 1.6rem;
  margin-right: 0.3rem;
}
.eventi {
  list-style: none;
  margin: 0.4rem 0 0 !important;
  padding: 0;
  font-size: 0.82rem;
}
.eventi li {
  margin: 0.15rem 0 !important;
}
.eventi .ora {
  font-family: var(--mono);
  color: var(--grigio);
  font-size: 0.75rem;
}
.eventi .iscritto::marker,
.eventi .votato::marker,
.eventi .inviato::marker {
  content: none;
}
@media (prefers-reduced-motion: reduce) {
  .riempi {
    transition: none;
  }
}
</style>
