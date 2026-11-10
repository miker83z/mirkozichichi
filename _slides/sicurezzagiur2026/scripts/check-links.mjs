// Checks every external link in the slide sources and data files.
// Usage: npm run check-links   (exit code 1 if a link fails)

import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = new URL('..', import.meta.url).pathname
const files = [
  ...readdirSync(join(root, 'pages')).map(f => join(root, 'pages', f)),
  ...readdirSync(join(root, 'data')).map(f => join(root, 'data', f)),
  ...readdirSync(join(root, 'components')).map(f => join(root, 'components', f)),
]

const urls = new Map()
for (const file of files) {
  const text = readFileSync(file, 'utf8')
  for (const m of text.matchAll(/https?:\/\/[^\s"'<>)\]`]+/g)) {
    const url = m[0].replace(/[.,;:]+$/, '')
    if (!urls.has(url)) urls.set(url, file.replace(root, ''))
  }
}

// Sites that refuse automated requests but work in a browser: reported, not failed.
const browserOnly = [/^https:\/\/(www\.)?(x|twitter|linkedin|coindesk)\.com\//]
// Not real links: invented example domains, and this deck's own address (online only after publishing).
const skip = [/^https?:\/\/[^/]*(esempio|example)\./, /^https:\/\/mirkozichichi\.me\/slides\/sicurezzagiur2026\/?$/]

async function check(url) {
  const headers = { 'user-agent': 'Mozilla/5.0 (link check for lecture slides)', 'accept-language': 'it,en' }
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, { method, headers, redirect: 'follow', signal: AbortSignal.timeout(20000) })
      if (res.ok) return { ok: true, status: res.status }
      if (method === 'GET') return { ok: false, status: res.status }
    }
    catch (e) {
      if (method === 'GET') return { ok: false, status: e.name === 'TimeoutError' ? 'timeout' : e.message }
    }
  }
}

let failed = 0
const list = [...urls.entries()].filter(([url]) => !skip.some(re => re.test(url)))
const results = await Promise.all(list.map(async ([url, file]) => ({ url, file, ...(await check(url)) })))
for (const r of results.sort((a, b) => a.file.localeCompare(b.file))) {
  const soft = browserOnly.some(re => re.test(r.url))
  if (r.ok) continue
  if (soft) console.log(`?  ${r.status}  ${r.url}  (${r.file}, check in a browser)`)
  else { failed++; console.log(`✗  ${r.status}  ${r.url}  (${r.file})`) }
}
console.log(`\n${list.length} links checked, ${failed} failed.`)
process.exit(failed ? 1 : 0)
