<!--
  A wall of recent security news: at most 6 cards (3 columns × 2 rows). Each card shows date, title,
  summary and whether the attack is confirmed or only claimed by the attackers (a claim is not proof).
  Click a card to reveal the security properties it violated, the legal hook and the source link.
  In the PDF every card is revealed. The news live in data/notizie.ts (replace the placeholders there).

  <NewsWall />                                        the first 6 news of data/notizie.ts
  <NewsWall :ids="['esempio-2', 'esempio-1']" />      only these news, in this order
  <NewsWall rivelate />                               everything revealed from the start

  Props: ids?: string[] (subset and order, by id), rivelate?: boolean
-->
<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useNav } from '@slidev/client'
import { type Notizia, type StatoNotizia, notizie } from '../data/notizie'

const props = defineProps<{ ids?: string[], rivelate?: boolean }>()

const { isPrintMode } = useNav()

const schede = computed<Notizia[]>(() => {
  const scelte = props.ids
    ? props.ids.map(id => notizie.find(n => n.id === id)).filter((n): n is Notizia => n !== undefined)
    : notizie
  return scelte.slice(0, 6)
})
const colonne = computed(() => Math.min(3, Math.max(1, schede.value.length)))

const aperte = reactive(new Set<string>())
const aperta = (id: string) => isPrintMode.value || props.rivelate || aperte.has(id)
function gira(id: string) {
  if (aperte.has(id)) aperte.delete(id)
  else aperte.add(id)
}

const etichetta: Record<StatoNotizia, string> = {
  'confermato': '✓ confermato',
  'rivendicato': 'solo rivendicato',
  'in verifica': 'in verifica',
}
const spiegazione: Record<StatoNotizia, string> = {
  'confermato': "Confermato dalla vittima o dalle autorità",
  'rivendicato': 'Lo affermano gli autori: una rivendicazione non è una prova',
  'in verifica': 'Notizia ancora da verificare',
}
const classeStato = (s: StatoNotizia) => s.replace(' ', '-')
</script>

<template>
  <div class="news-wall" :style="{ gridTemplateColumns: `repeat(${colonne}, minmax(0, 1fr))` }">
    <article v-for="n in schede" :key="n.id" class="scheda" :class="{ aperta: aperta(n.id) }">
      <button class="fronte" :aria-expanded="aperta(n.id)" :disabled="isPrintMode || rivelate" @click="gira(n.id)">
        <span class="testa">
          <span class="data">{{ n.data }}</span>
          <span class="stato" :class="classeStato(n.stato)" :title="spiegazione[n.stato]">{{ etichetta[n.stato] }}</span>
        </span>
        <span class="titolo">{{ n.titolo }}</span>
        <span class="sintesi">{{ n.sintesi }}</span>
      </button>
      <div v-if="aperta(n.id)" class="retro">
        <p class="proprieta">
          <span class="violate">Violate:</span>
          <span v-for="p in n.proprieta" :key="p" class="tag">{{ p }}</span>
        </p>
        <p class="gancio">
          <span>{{ n.gancio }}</span>
          <a :href="n.url" target="_blank" rel="noopener noreferrer">{{ n.fonte }}</a>
        </p>
      </div>
      <p v-else class="invito">Clicca: quali proprietà sono state violate?</p>
    </article>
  </div>
</template>

<style scoped>
.news-wall {
  display: grid;
  gap: 0.6rem;
  max-width: 880px;
}
.scheda {
  display: flex;
  flex-direction: column;
  background: var(--carta);
  border: 1px solid var(--linea);
  border-top: 3px solid var(--linea);
  border-radius: 6px;
  padding: 0.45rem 0.65rem 0.5rem;
  min-width: 0;
}
.scheda.aperta {
  border-top-color: var(--rubrica);
}
.fronte {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
  text-align: left;
  font-family: var(--sans);
  color: var(--inchiostro);
  background: none;
  border: 0;
  padding: 0;
  cursor: pointer;
}
.fronte:disabled {
  cursor: default;
  color: var(--inchiostro);
}
.fronte:focus-visible {
  outline: 2px solid var(--rubrica);
  outline-offset: 3px;
  border-radius: 2px;
}
.testa {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}
.data {
  color: var(--grigio);
}
.stato {
  font-size: 0.8rem;
  line-height: 1.2;
  padding: 0.05rem 0.4rem;
  border-radius: 3px;
  white-space: nowrap;
}
.stato.confermato {
  background: var(--inchiostro);
  color: var(--carta);
  border: 1px solid var(--inchiostro);
  font-weight: 700;
}
.stato.rivendicato {
  color: var(--ko);
  border: 1.5px dashed var(--ko);
  font-style: italic;
}
.stato.in-verifica {
  color: var(--grigio);
  border: 1.5px dotted var(--grigio);
}
.titolo {
  font-family: var(--serif);
  font-weight: 620;
  font-size: 1rem;
  line-height: 1.25;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.sintesi {
  font-size: 0.85rem;
  line-height: 1.3;
  color: var(--inchiostro);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.retro {
  margin-top: auto;
  padding-top: 0.35rem;
  border-top: 1px solid var(--linea);
  margin-bottom: 0;
}
.retro p {
  margin: 0;
}
.proprieta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
  line-height: 1.2;
}
.violate {
  font-size: 0.8rem;
  color: var(--grigio);
}
.tag {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--rubrica);
  border: 1px solid var(--rubrica);
  border-radius: 3px;
  padding: 0 0.3rem;
}
.gancio {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  font-size: 0.8rem;
  margin-top: 0.25rem !important;
  color: var(--glossa);
  font-family: var(--serif);
}
.gancio span,
.gancio a {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}
/* When the line is too long the source gives way first, so the legal hook stays readable. */
.gancio span {
  flex: 0 1 auto;
}
.gancio a {
  flex: 0 1000 auto;
  min-width: 2.5rem;
  font-family: var(--sans);
  color: var(--grigio);
}
.invito {
  margin: auto 0 0;
  min-height: 3.2rem; /* about the height of the revealed part, so the wall does not jump */
  display: flex;
  align-items: flex-end;
  padding-top: 0.35rem;
  font-size: 0.8rem;
  color: var(--grigio);
  font-style: italic;
}
</style>
