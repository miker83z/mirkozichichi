<!--
  How strong is a password? It detects the kinds of characters used (alphabet size), counts the
  combinations an attacker must try (alphabet ^ length) and the worst-case time by brute force, and
  checks a short list of very common passwords (data/password-comuni.ts), also as "word + digits".
  Everything is computed in the browser. In the PDF the default password is shown, already evaluated.

  <PasswordCheck />                                 starts from 'juventus1897'
  <PasswordCheck password="Tr0ub4dor&3" />
  <PasswordCheck :tentativiAlSecondo="1e12" />     attacker speed (default 1e10 tries per second)

  Props: password?: string, tentativiAlSecondo?: number
-->
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useNav } from '@slidev/client'
import { durata, scientific } from '../utils/crypto'
import { apici, potenzaDieci } from '../utils/esponenti'
import { passwordComuni } from '../data/password-comuni'

const props = withDefaults(defineProps<{ password?: string, tentativiAlSecondo?: number }>(), {
  password: 'juventus1897',
  tentativiAlSecondo: 1e10,
})

const { isPrintMode } = useNav()
const scritta = ref(props.password)
const pw = computed(() => (isPrintMode.value ? props.password : scritta.value))

const comuni = new Set(passwordComuni.map(p => p.toLowerCase()))

const classi = computed(() => {
  const s = pw.value
  return [
    { nome: 'minuscole', n: 26, presente: /[a-z]/.test(s) },
    { nome: 'maiuscole', n: 26, presente: /[A-Z]/.test(s) },
    { nome: 'cifre', n: 10, presente: /\d/.test(s) },
    { nome: 'simboli', n: 33, presente: /[^a-z0-9]/i.test(s) },
  ]
})
const alfabeto = computed(() => classi.value.reduce((t, c) => t + (c.presente ? c.n : 0), 0))
const lunghezza = computed(() => [...pw.value].length)
const combinazioni = computed(() => alfabeto.value ** lunghezza.value)
const secondi = computed(() => combinazioni.value / props.tentativiAlSecondo)

const diffusa = computed(() => comuni.has(pw.value.toLowerCase()))
// A common word followed by digits (and maybe a final symbol): "juventus1897", "Amore2024!"
const parolaNumeri = computed(() => {
  const m = /^([a-z]+)\d+[^a-z\d]{0,2}$/i.exec(pw.value)
  return m !== null && comuni.has(m[1].toLowerCase())
})

const combinazioniHtml = computed(() => {
  const segno = combinazioni.value < 1e6 ? '=' : '≈'
  return apici(`${alfabeto.value}^${lunghezza.value} ${segno} ${scientific(combinazioni.value)}`)
})
const velocitaHtml = computed(() => apici(potenzaDieci(props.tentativiAlSecondo)))
const tempoHtml = computed(() => apici(durata(secondi.value)))

const verdetto = computed(() => {
  const giorno = 86400
  const anno = 365.25 * giorno
  if (!pw.value) return { classe: 'neutro', testo: 'Scrivi una password da valutare.' }
  if (diffusa.value)
    return { classe: 'esito-ko', testo: '✗ È tra le password molto diffuse: un attacco a dizionario la trova in un attimo.' }
  if (parolaNumeri.value)
    return { classe: 'esito-ko', testo: '✗ Parola comune + numeri: un attacco a dizionario la prova presto.' }
  if (secondi.value < 30 * giorno)
    return { classe: 'esito-ko', testo: '✗ Debole: provando tutte le combinazioni la si trova in poco tempo.' }
  if (secondi.value < 100 * anno)
    return { classe: 'medio', testo: 'Discreta: resiste alla forza bruta per un po\', una password più lunga resiste molto di più.' }
  return { classe: 'esito-ok', testo: '✓ Robusta contro la forza bruta (purché non sia usata anche altrove).' }
})
</script>

<template>
  <div class="demo password-check">
    <label for="pc-password">Prova una password</label>
    <input
      id="pc-password" v-model="scritta" type="text" maxlength="64" spellcheck="false"
      autocomplete="off" autocapitalize="off" :readonly="isPrintMode"
    >
    <p class="privacy grigio">La password non lascia questo computer: il calcolo avviene nel browser.</p>

    <div class="classi">
      <span class="etichetta">Caratteri usati:</span>
      <span v-for="c in classi" :key="c.nome" class="classe" :class="{ presente: c.presente }">
        {{ c.presente ? '✓' : '–' }} {{ c.nome }}<span class="grigio"> ({{ c.n }})</span>
      </span>
    </div>

    <table class="conti">
      <tbody>
        <tr>
          <th>Alfabeto e lunghezza</th>
          <td v-if="!pw" class="grigio">–</td>
          <td v-else>{{ alfabeto }} simboli possibili, {{ lunghezza }} caratteri</td>
        </tr>
        <tr>
          <th>Combinazioni</th>
          <td v-if="!pw" class="grigio">–</td>
          <td v-else class="numero" v-html="combinazioniHtml" />
        </tr>
        <tr>
          <th>Forza bruta, caso peggiore</th>
          <td v-if="!pw" class="grigio">–</td>
          <td v-else><strong class="numero" v-html="tempoHtml" /> <span class="grigio">a <span v-html="velocitaHtml" /> tentativi al secondo</span></td>
        </tr>
        <tr>
          <th>Password molto diffuse</th>
          <td>
            <span v-if="diffusa" class="esito-ko">✗ è nella lista</span>
            <span v-else-if="parolaNumeri" class="esito-ko">✗ parola della lista + numeri</span>
            <span v-else-if="!pw" class="grigio">–</span>
            <span v-else>non è nella lista ({{ passwordComuni.length }} password di esempio)</span>
          </td>
        </tr>
      </tbody>
    </table>

    <p class="verdetto" :class="verdetto.classe">{{ verdetto.testo }}</p>
  </div>
</template>

<style scoped>
.password-check input[type='text'] {
  font-family: var(--mono);
  font-size: 1.1rem;
}
.privacy {
  font-size: 0.8rem;
  margin: 0.2rem 0 0.45rem;
}
.classi {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.3rem 0.6rem;
  font-size: 0.9rem;
}
.etichetta {
  color: var(--grigio);
}
.classe {
  border: 1px solid var(--linea);
  border-radius: 3px;
  padding: 0 0.35rem;
  background: var(--carta);
  color: var(--grigio);
}
.classe.presente {
  color: var(--inchiostro);
  border-color: var(--inchiostro);
  font-weight: 700;
}
.classe.presente .grigio {
  font-weight: 400;
}
.conti {
  margin: 0.4rem 0 0.2rem;
  font-size: 0.9rem;
  width: 100%;
}
.conti th {
  font-weight: 400;
  color: var(--grigio);
  border: 0;
  padding: 0.12rem 0.8rem 0.12rem 0;
  width: 13.5rem;
  white-space: nowrap;
}
.conti td {
  border: 0;
  padding: 0.12rem 0;
}
.numero {
  font-size: 1rem;
}
.verdetto {
  font-size: 1.05rem;
  margin: 0.35rem 0 0;
  padding-left: 0.6rem;
  border-left: 3px solid var(--linea);
}
.verdetto.esito-ko {
  border-left-color: var(--ko);
}
.verdetto.esito-ok {
  border-left-color: var(--ok);
}
.verdetto.medio {
  color: var(--glossa);
  font-weight: 700;
  border-left-color: var(--glossa);
}
.password-check :deep(sup) {
  font-size: 0.8rem;
  line-height: 0;
}
</style>
