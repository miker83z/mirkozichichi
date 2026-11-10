// Creates a new class poll, or closes the latest one; the app and the board always show the latest poll,
// and the app shows the vote card only while it is open.
// Usage: node scripts/aula-sondaggio.mjs "Domanda?" "Opzione 1" "Opzione 2" [... fino a 6]
//        node scripts/aula-sondaggio.mjs --chiudi
// Needs the CLI address that published the contract (it owns the AdminCap).
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const { pacchetto, rpc } = JSON.parse(readFileSync(new URL('../aula/config.json', import.meta.url), 'utf8'))
const json = (args) => {
  const out = execFileSync('iota', [...args, '--json'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] })
  return JSON.parse(out.slice(out.search(/[[{]/)))
}
const io = execFileSync('iota', ['client', 'active-address'], { encoding: 'utf8' }).trim()
const cap = json(['client', 'objects', io]).find(o => (o.data?.type ?? '').startsWith(`${pacchetto}::voto::AdminCap`))?.data?.objectId
if (!cap) throw new Error(`L'indirizzo ${io} non possiede l'AdminCap di ${pacchetto}`)

const args = process.argv.slice(2)
if (args[0] === '--chiudi') {
  const r = await fetch(rpc, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'iotax_queryEvents', params: [{ MoveEventType: `${pacchetto}::voto::SondaggioCreato` }, null, 1, true] }),
  }).then(x => x.json())
  const id = r.result?.data?.[0]?.parsedJson?.sondaggio
  if (!id) throw new Error('Nessun sondaggio da chiudere')
  const c = json(['client', 'call', '--package', pacchetto, '--module', 'voto', '--function', 'chiudi', '--args', cap, id])
  console.log('chiuso', id, c.effects.status.status)
}
else {
  const [domanda, ...opzioni] = args
  if (!domanda || opzioni.length < 2 || opzioni.length > 6) {
    console.error('Uso: node scripts/aula-sondaggio.mjs "Domanda?" "Opzione 1" "Opzione 2" [... fino a 6]  |  --chiudi')
    process.exit(1)
  }
  const r = json(['client', 'call', '--package', pacchetto, '--module', 'voto', '--function', 'crea', '--args', cap, domanda, JSON.stringify(opzioni)])
  console.log(r.effects.status.status, r.objectChanges.find(c => c.type === 'created')?.objectId)
}
