// The class app: a throwaway wallet in the phone's browser that talks to the class smart contract
// (aula/move) on an IOTA test network. Steps: wallet → faucet → join (10 AULA) → send AULA → vote (shown only
// while the latest poll is open; the class poll is opened before the lecture, so students may see it early).
import { IotaClient } from '@iota/iota-sdk/client'
import { Ed25519Keypair } from '@iota/iota-sdk/keypairs/ed25519'
import { Transaction } from '@iota/iota-sdk/transactions'
import config from '../../config.json'
import './stile.css'

const parametri = new URLSearchParams(location.search)
const RETE = config.rete
const FAUCET = parametri.get('faucet') ?? config.faucet
const PKG = config.pacchetto
const TIPO_AULA = `${PKG}::aula::AULA`
const NANOS = 1_000_000_000

const client = new IotaClient({ url: config.rpc })
const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T

// ---------- the key, kept in this browser only ----------

const CHIAVE = `aula:chiave:${RETE}`
function leggi(k: string): string | null {
  try { return localStorage.getItem(k) }
  catch { return null }
}
function scrivi(k: string, v: string | null) {
  try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v) }
  catch { /* private mode: the wallet lives until the page is closed */ }
}
function caricaChiave(): Ed25519Keypair {
  const salvata = leggi(CHIAVE)
  if (salvata) {
    try { return Ed25519Keypair.fromSecretKey(salvata) }
    catch { /* corrupted: make a new one */ }
  }
  const nuova = new Ed25519Keypair()
  scrivi(CHIAVE, nuova.getSecretKey())
  return nuova
}
const chiave = caricaChiave()
const io = chiave.toIotaAddress()

// ---------- helpers ----------

const corto = (s: string, a = 6, b = 4) => (s.length > a + b + 1 ? `${s.slice(0, a)}…${s.slice(-b)}` : s)
const linkTx = (digest: string) => `${config.esploratore}/txblock/${digest}?network=${RETE}`
const linkIndirizzo = (a: string) => `${config.esploratore}/address/${a}?network=${RETE}`

function stato(id: string, testo: string, tipo: '' | 'ok' | 'ko' | 'attesa' = '') {
  const el = $(id)
  el.textContent = testo
  el.className = `stato ${tipo}`
}

const ERRORI: Record<string, Record<number, string>> = {
  aula: {
    0: 'Questo indirizzo è già iscritto.',
    1: 'Soprannome già preso: scegline un altro.',
    2: 'Il soprannome deve avere da 2 a 20 caratteri; le lettere accentate valgono 2.',
    3: 'Nessun compagno con questo soprannome.',
  },
  voto: {
    0: 'Il sondaggio è chiuso.',
    1: 'Hai già votato: un voto per indirizzo.',
    2: 'Scelta non valida.',
  },
}
function spiega(e: unknown): string {
  const msg = e instanceof Error ? e.message : String(e)
  const abort = /MoveAbort\(.*?(aula|voto)[^)]*\)?\)?,\s*(\d+)\)/.exec(msg) ?? /(aula|voto).*?(?:abort|code)\D*(\d+)/i.exec(msg)
  if (abort) {
    const testo = ERRORI[abort[1]]?.[Number(abort[2])]
    if (testo) return testo
  }
  if (/gas|balance|No valid gas coins|InsufficientGas/i.test(msg)) return 'Servono token per il gas: passa prima dal faucet (punto 2).'
  if (/fetch|network|Failed to/i.test(msg)) return 'Rete non raggiungibile: riprova tra poco.'
  return `Errore: ${msg.slice(0, 160)}`
}

async function esegui(tx: Transaction, etichetta: string) {
  const r = await client.signAndExecuteTransaction({ transaction: tx, signer: chiave, options: { showEffects: true } })
  await client.waitForTransaction({ digest: r.digest })
  if (r.effects?.status.status !== 'success') throw new Error(r.effects?.status.error ?? 'transazione fallita')
  annota(etichetta, r.digest)
  return r
}

function annota(etichetta: string, digest: string) {
  const lista = $('registro')
  lista.querySelector('.vuoto')?.remove()
  const li = document.createElement('li')
  const a = document.createElement('a')
  a.href = linkTx(digest)
  a.target = '_blank'
  a.rel = 'noopener noreferrer'
  a.textContent = corto(digest, 8, 6)
  li.append(`${etichetta}: `, a)
  lista.prepend(li)
}

// ---------- state read from the chain ----------

interface Stato {
  iota: number
  aula: number
  soprannome: string | null
  tabelle: { iscritti: string, nomi: string } | null
}
const s: Stato = { iota: 0, aula: 0, soprannome: null, tabelle: null }

async function tabelleRubinetto() {
  if (s.tabelle) return s.tabelle
  const o = await client.getObject({ id: config.rubinetto, options: { showContent: true } })
  const f = (o.data?.content as { fields: Record<string, { fields: { id: { id: string } } }> } | undefined)?.fields
  if (!f) throw new Error('rubinetto non trovato')
  s.tabelle = { iscritti: f.iscritti.fields.id.id, nomi: f.nomi.fields.id.id }
  return s.tabelle
}

async function aggiornaSaldi() {
  const [iota, aula] = await Promise.all([
    client.getBalance({ owner: io }),
    client.getBalance({ owner: io, coinType: TIPO_AULA }),
  ])
  s.iota = Number(iota.totalBalance) / NANOS
  s.aula = Number(aula.totalBalance)
  $('saldo-iota').textContent = `${s.iota.toLocaleString('it-IT', { maximumFractionDigits: 3 })} IOTA`
  $('saldo-aula').textContent = `${s.aula} AULA`
  $('passo-gas').classList.toggle('fatto', s.iota > 0)
  if (s.iota > 0 && !$('stato-gas').textContent) stato('stato-gas', '✓ Hai i token per il gas.', 'ok')
  ;($('importo') as HTMLInputElement).max = String(Math.max(1, s.aula))
}

async function aggiornaIscrizione() {
  const { nomi } = await tabelleRubinetto()
  try {
    const campo = await client.getDynamicFieldObject({ parentObjectId: nomi, options: { showContent: true }, name: { type: 'address', value: io } })
    const valore = (campo.data?.content as { fields?: { value?: string } } | undefined)?.fields?.value
    s.soprannome = typeof valore === 'string' ? valore : null
  }
  catch {
    s.soprannome = null
  }
  const form = $<HTMLFormElement>('form-iscrizione')
  form.hidden = !!s.soprannome
  $('passo-iscrizione').classList.toggle('fatto', !!s.soprannome)
  if (s.soprannome) stato('stato-iscrizione', `✓ Sei «${s.soprannome}».`, 'ok')
}

async function compagni(): Promise<string[]> {
  const { iscritti } = await tabelleRubinetto()
  const nomi: string[] = []
  let cursor: string | null | undefined = null
  do {
    const pagina = await client.getDynamicFields({ parentId: iscritti, cursor, limit: 50 })
    for (const c of pagina.data) nomi.push(String(c.name.value))
    cursor = pagina.hasNextPage ? pagina.nextCursor : null
  } while (cursor && nomi.length < 1000)
  return nomi.sort((a, b) => a.localeCompare(b, 'it'))
}

async function aggiornaCompagni() {
  const select = $<HTMLSelectElement>('destinatario')
  const scelto = select.value
  const nomi = (await compagni()).filter(n => n !== s.soprannome)
  select.replaceChildren(...(nomi.length ? nomi : ['']).map((n) => {
    const o = document.createElement('option')
    o.value = n
    o.textContent = n || 'nessun compagno iscritto, per ora'
    return o
  }))
  if (nomi.includes(scelto)) select.value = scelto
}

// ---------- the poll ----------

interface Sondaggio { id: string, domanda: string, opzioni: string[], voti: number[], aperto: boolean, votanti: string }
let sondaggio: Sondaggio | null = null
let mioVoto: number | null = null

async function ultimoSondaggio(): Promise<string | null> {
  const ev = await client.queryEvents({ query: { MoveEventType: `${PKG}::voto::SondaggioCreato` }, order: 'descending', limit: 1 })
  return (ev.data[0]?.parsedJson as { sondaggio?: string } | undefined)?.sondaggio ?? null
}

async function aggiornaVoto() {
  const id = await ultimoSondaggio()
  if (!id) {
    $('passo-voto').hidden = true
    return
  }
  const o = await client.getObject({ id, options: { showContent: true } })
  const f = (o.data?.content as { fields: Record<string, unknown> } | undefined)?.fields
  if (!f) return
  sondaggio = {
    id,
    domanda: String(f.domanda),
    opzioni: (f.opzioni as string[]).map(String),
    voti: (f.voti as string[]).map(Number),
    aperto: Boolean(f.aperto),
    votanti: (f.votanti as { fields: { id: { id: string } } }).fields.id.id,
  }
  if (mioVoto === null) {
    try {
      const c = await client.getDynamicFieldObject({ parentObjectId: sondaggio.votanti, options: { showContent: true }, name: { type: 'address', value: io } })
      const v = (c.data?.content as { fields?: { value?: string } } | undefined)?.fields?.value
      if (v !== undefined) mioVoto = Number(v)
    }
    catch { /* not voted yet */ }
  }
  disegnaVoto()
}

function disegnaVoto() {
  if (!sondaggio) return
  const p = sondaggio
  // The vote card appears only while the poll is open (or after this phone has voted in it).
  $('passo-voto').hidden = !p.aperto && mioVoto === null
  $('domanda').textContent = p.aperto ? p.domanda : `${p.domanda} (chiuso)`
  const totale = p.voti.reduce((a, b) => a + b, 0)
  const box = $('opzioni')
  box.replaceChildren(...p.opzioni.map((testo, i) => {
    const b = document.createElement('button')
    b.type = 'button'
    b.className = `opzione${mioVoto === i ? ' mia' : ''}`
    b.disabled = mioVoto !== null || !p.aperto
    const quota = totale ? Math.round(p.voti[i] / totale * 100) : 0
    b.style.setProperty('--quota', `${quota}%`)
    b.innerHTML = '<span class="testo"></span><span class="conta"></span>'
    b.querySelector('.testo')!.textContent = testo
    b.querySelector('.conta')!.textContent = `${p.voti[i]}`
    b.addEventListener('click', () => vota(i))
    return b
  }))
  $('passo-voto').classList.toggle('fatto', mioVoto !== null)
  if (mioVoto !== null) stato('stato-voto', `✓ Hai votato «${p.opzioni[mioVoto]}». Voti totali: ${totale}.`, 'ok')
}

// ---------- actions ----------

async function iscriviti(ev: SubmitEvent) {
  ev.preventDefault()
  const nome = ($('soprannome') as HTMLInputElement).value.trim()
  if (new TextEncoder().encode(nome).length < 2 || new TextEncoder().encode(nome).length > 20) {
    stato('stato-iscrizione', 'Il soprannome deve avere da 2 a 20 caratteri; le lettere accentate valgono 2.', 'ko')
    return
  }
  stato('stato-iscrizione', 'Firmo la transazione e la invio alla rete…', 'attesa')
  try {
    const tx = new Transaction()
    tx.moveCall({ target: `${PKG}::aula::iscriviti`, arguments: [tx.object(config.rubinetto), tx.pure.string(nome)] })
    await esegui(tx, 'Iscrizione')
    await Promise.all([aggiornaIscrizione(), aggiornaSaldi(), aggiornaCompagni()])
    stato('stato-iscrizione', `✓ Sei «${nome}»: hai ricevuto 10 AULA.`, 'ok')
  }
  catch (e) {
    stato('stato-iscrizione', spiega(e), 'ko')
  }
}

async function vota(scelta: number) {
  if (!sondaggio) return
  stato('stato-voto', 'Firmo il voto e lo invio alla rete…', 'attesa')
  try {
    const tx = new Transaction()
    tx.moveCall({ target: `${PKG}::voto::vota`, arguments: [tx.object(sondaggio.id), tx.pure.u64(scelta)] })
    await esegui(tx, 'Voto')
    mioVoto = scelta
    await aggiornaVoto()
  }
  catch (e) {
    stato('stato-voto', spiega(e), 'ko')
  }
}

async function invia(ev: SubmitEvent) {
  ev.preventDefault()
  const a = ($('destinatario') as HTMLSelectElement).value
  const quanti = Math.floor(Number(($('importo') as HTMLInputElement).value))
  if (!a) return stato('stato-invio', 'Scegli un compagno.', 'ko')
  if (!s.soprannome) return stato('stato-invio', 'Prima iscriviti alla classe (punto 3).', 'ko')
  if (!(quanti >= 1) || quanti > s.aula) return stato('stato-invio', s.aula ? `Puoi inviare da 1 a ${s.aula} AULA.` : 'Non hai AULA da inviare.', 'ko')
  stato('stato-invio', 'Firmo il pagamento e lo invio alla rete…', 'attesa')
  try {
    const monete = await client.getCoins({ owner: io, coinType: TIPO_AULA })
    const [prima, ...altre] = monete.data
    if (!prima) throw new Error('nessun AULA')
    const tx = new Transaction()
    const principale = tx.object(prima.coinObjectId)
    if (altre.length) tx.mergeCoins(principale, altre.map(m => tx.object(m.coinObjectId)))
    const [pezzo] = tx.splitCoins(principale, [quanti])
    tx.moveCall({ target: `${PKG}::aula::invia`, arguments: [tx.object(config.rubinetto), pezzo, tx.pure.string(a)] })
    await esegui(tx, `${quanti} AULA a ${a}`)
    await aggiornaSaldi()
    stato('stato-invio', `✓ Inviati ${quanti} AULA a «${a}».`, 'ok')
  }
  catch (e) {
    stato('stato-invio', spiega(e), 'ko')
  }
}

// ---------- start ----------

$('nome-rete').textContent = RETE
$('indirizzo').textContent = io
$<HTMLAnchorElement>('vedi-indirizzo').href = linkIndirizzo(io)
const faucet = new URL(FAUCET)
faucet.searchParams.set('address', io)
$<HTMLAnchorElement>('apri-faucet').href = faucet.toString()
$('apri-faucet').addEventListener('click', () => stato('stato-gas', 'Nel faucet: risolvi il captcha e richiedi i token. Il saldo qui si aggiorna da solo.', 'attesa'))
$('copia').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(io)
    $('copia').textContent = 'Copiato ✓'
  }
  catch {
    $('copia').textContent = 'Seleziona e copia il testo sopra'
  }
})
$('nuovo').addEventListener('click', () => {
  if (!confirm('Crei un nuovo wallet? Questo indirizzo e i suoi token di prova non saranno più usati.')) return
  scrivi(CHIAVE, null)
  location.reload()
})
$<HTMLFormElement>('form-iscrizione').addEventListener('submit', iscriviti)
$<HTMLFormElement>('form-invio').addEventListener('submit', invia)

async function giro() {
  try {
    await Promise.all([aggiornaSaldi(), aggiornaIscrizione(), aggiornaVoto()])
    await aggiornaCompagni()
  }
  catch (e) {
    stato('stato-gas', spiega(e), 'ko')
  }
}
giro()
setInterval(() => { if (document.visibilityState === 'visible') giro() }, 5000)
