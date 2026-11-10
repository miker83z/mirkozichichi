// Publishes the class contract (aula/move) with the active IOTA CLI address and environment, then
// writes the new package and faucet object IDs into aula/config.json. Run it again if the test network
// is reset. Usage: node scripts/aula-pubblica.mjs   (check first: iota client active-env, iota client gas)
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

const json = (args, cwd) => {
  const out = execFileSync('iota', [...args, '--json'], { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] })
  return JSON.parse(out.slice(out.indexOf('{')))
}
const rete = execFileSync('iota', ['client', 'active-env'], { encoding: 'utf8' }).trim()
const r = json(['client', 'publish'], new URL('../aula/move', import.meta.url).pathname)
if (r.effects.status.status !== 'success') throw new Error(JSON.stringify(r.effects.status))
const pacchetto = r.objectChanges.find(c => c.type === 'published').packageId
const trova = suffisso => r.objectChanges.find(c => c.type === 'created' && c.objectType.endsWith(suffisso))?.objectId
const percorso = new URL('../aula/config.json', import.meta.url)
const config = JSON.parse(readFileSync(percorso, 'utf8'))
Object.assign(config, {
  rete,
  rpc: `https://api.${rete}.iota.cafe`,
  faucet: `https://faucet.${rete}.iota.cafe/`,
  pacchetto,
  rubinetto: trova('::aula::Rubinetto'),
  pubblicato: new Date().toISOString().slice(0, 10),
})
writeFileSync(percorso, `${JSON.stringify(config, null, 2)}\n`)
console.log(`Pubblicato su ${rete}: ${pacchetto}`)
console.log(`AdminCap (per creare i sondaggi): ${trova('::voto::AdminCap')}`)
console.log('Ora: npm run build (slide e app), poi node scripts/aula-sondaggio.mjs "Domanda?" "Sì" "No"')
