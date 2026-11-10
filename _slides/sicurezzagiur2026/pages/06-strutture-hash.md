---
layout: capo
capo: VI
sezione: Puntatori hash e strutture dati
---

# Puntatori hash e strutture dati

Come incatenare i dati in modo che ogni manomissione si veda

---

# Puntatore hash (*hash pointer*)

<p class="lead">Un riferimento che dice dove si trova un dato e, insieme, qual era la sua impronta.</p>

<div class="grid grid-cols-2 gap-8 mt-4">
<div class="demo">

**1. Puntatore** a dove è conservata l'informazione

serve per **trovarla**

</div>
<div class="demo">

**2. Impronta** (hash) di quell'informazione

serve per **verificare** che non sia cambiata

</div>
</div>

<p class="mt-6">Analogia: una nota a piè di pagina che cita un documento <em>e</em> ne riporta l'impronta. Se qualcuno sostituisce il documento citato, la citazione non torna più.</p>

---

# L'idea chiave: strutture dati fatte di puntatori hash

<p class="lead">Ogni blocco contiene i propri dati e il puntatore hash al blocco precedente. Basta conservare l'impronta dell'ultimo blocco.</p>

<div class="catena">
  <div class="testa">H( )<br><span class="piccolo grigio">impronta dell'ultimo blocco</span></div>
  <div class="freccia">→</div>
  <div class="blocco"><span class="prev">prev: H( )</span><span>dati</span></div>
  <div class="freccia">→</div>
  <div class="blocco"><span class="prev">prev: H( )</span><span>dati</span></div>
  <div class="freccia">→</div>
  <div class="blocco"><span class="prev">prev: H( )</span><span>dati</span></div>
</div>

<p class="mt-6">È la struttura che, nel 2008, Bitcoin ha reso famosa con il nome di <strong>blockchain</strong>: una catena di blocchi.</p>

<style>
.catena { display: flex; align-items: center; justify-content: center; gap: 0.6rem; margin-top: 1.2rem; flex-direction: row-reverse; }
.catena .blocco { display: flex; flex-direction: column; border: 1.5px solid var(--inchiostro); border-radius: 4px; min-width: 9rem; }
.catena .blocco span { padding: 0.35rem 0.7rem; text-align: center; }
.catena .prev { border-bottom: 1px solid var(--linea); font-family: var(--mono); font-size: 0.85rem; color: var(--rubrica); }
.catena .testa { border: 1.5px solid var(--rubrica); border-radius: 4px; padding: 0.4rem 0.8rem; text-align: center; font-family: var(--mono); color: var(--rubrica); }
.catena .freccia { color: var(--rubrica); font-size: 1.4rem; transform: scaleX(-1); }
</style>

---
layout: glossa
---

# Rilevare la manomissione (<em>tamper-evident log</em>)

<HashChain />

::glossa::

Come un registro con le pagine numerate e collegate: si può ancora strappare o riscrivere una pagina, ma non senza che si veda.

Il registro di protocollo informatico della PA conserva, per i documenti trasmessi per via telematica, proprio l'impronta del documento.

- art. 53 d.P.R. 445/2000

<!--
"A prova di manomissione" va inteso come "la manomissione si nota" (tamper-evident), non come "la manomissione è impossibile" (tamper-proof).
Nella demo: modificando il blocco 2 si spezza il collegamento 2→3 (lo segnala il blocco 3), ma l'impronta depositata dal notaio corrisponde ancora. Se l'attaccante ricalcola tutta la catena, i collegamenti tornano ma l'ultima impronta non corrisponde più a quella depositata: per questo l'impronta finale va conservata altrove.
-->

---

# Dimostrare che un elemento è nella catena

<p class="lead">Dati n elementi in una catena di puntatori hash, quanto costa dimostrare che un elemento ne fa parte?</p>

<div class="catena2">
  <div class="testa">H( )</div><div class="f">→</div>
  <div class="b">dati 5</div><div class="f">→</div><div class="b">dati 4</div><div class="f">→</div><div class="b evid">dati 3</div><div class="f">→</div><div class="b">dati 2</div><div class="f">→</div><div class="b">dati 1</div>
</div>

<v-click>

<p class="formula">Bisogna ripercorrere la catena: costo proporzionale a n, cioè O(n)</p>

<p class="grigio">Con un milione di elementi, nel caso peggiore, un milione di passaggi. Si può fare di meglio?</p>

</v-click>

<style>
.catena2 { display: flex; align-items: center; gap: 0.5rem; justify-content: center; margin: 1.2rem 0; }
.catena2 .b { border: 1.5px solid var(--inchiostro); border-radius: 4px; padding: 0.5rem 0.8rem; font-size: 1rem; }
.catena2 .b.evid { border-color: var(--rubrica); background: #fbeeee; }
.catena2 .testa { border: 1.5px solid var(--rubrica); border-radius: 4px; padding: 0.5rem 0.8rem; font-family: var(--mono); color: var(--rubrica); }
.catena2 .f { color: var(--rubrica); }
</style>

---

# Albero binario di puntatori hash: l'albero di Merkle

<p class="lead">Si fa l'impronta dei dati a coppie, poi delle coppie di impronte, e così via fino a una sola impronta: la radice (<em>root</em>).</p>

- In fondo (foglie): l'impronta di ogni dato, per esempio di ogni transazione
- A ogni livello: l'impronta delle due impronte sottostanti
- In cima: la **radice**, che "riassume" tutti i dati

<v-click>

**Quanti livelli servono per n dati?** Circa log<sub>2</sub> n: 8 dati → 3 livelli; un milione di dati → 20 livelli.

</v-click>

<p class="fonte mt-4">Ralph Merkle, brevetto USA 4.309.569 (domanda del 1979, concesso nel 1982).</p>

---

# Dimostrare l'appartenenza in un albero di Merkle

<p class="lead">Bastano le impronte "sorelle" lungo il percorso fino alla radice: O(log n) elementi invece di n.</p>

<MerkleTree />

<!--
Cliccare su "Doc C": servono 3 impronte (quelle evidenziate) per ricalcolare la radice.
Poi modificare il documento: la radice cambia.
Uso pratico: un portafoglio "leggero" verifica che la sua transazione sia in un blocco senza scaricare tutto il blocco.
-->

---
layout: glossa
---

# Hash camaleontico (*chameleon hashing*)

<p class="lead">Una funzione hash con una "botola": chi possiede una chiave segreta può trovare collisioni, tutti gli altri no.</p>

- Usa una coppia di chiavi: **pubblica** e **privata**
- Con la **chiave pubblica** chiunque calcola e verifica l'impronta; senza la chiave privata trovare collisioni è computazionalmente impraticabile
- Con la **chiave privata** (la "botola", *trapdoor*) si può trovare un nuovo input che dà **la stessa impronta**
- Così si può sostituire un contenuto senza rompere i puntatori hash che lo citano

<p class="fonte">H. Krawczyk, T. Rabin, <em>Chameleon Signatures</em>, NDSS 2000. Applicato alle blockchain "modificabili" (<em>redactable blockchain</em>) da G. Ateniese et al., IEEE EuroS&amp;P 2017.</p>

::glossa::

Un registro immutabile si scontra con il diritto alla cancellazione (art. 17 GDPR).

L'hash camaleontico è una delle risposte tecniche, ma chi ha la "botola" diventa un punto di fiducia.

Per l'EDPB la cancellazione sulla catena può essere "tecnicamente impraticabile": non è consigliabile registrarvi dati personali, né in chiaro, né cifrati, né come hash.

- EDPB, Linee guida 02/2025 sulla blockchain, v2.0 del 7 luglio 2026, §§ 103–104

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<Quiz
  domanda="In una catena di puntatori hash qualcuno modifica il blocco 2 di 4. Cosa succede?"
  :opzioni="['Nulla di visibile', 'Il collegamento del blocco 3 non torna più', 'Si cancellano tutti i blocchi']"
  :corretta="1"
  spiegazione="Il blocco 3 conserva l’impronta del blocco 2 originale: non corrisponde più. Per nascondere la modifica bisognerebbe ricalcolare tutta la catena fino all’impronta conservata altrove."
/>
<Quiz
  domanda="Un albero di Merkle contiene 1.024 documenti. Quante impronte servono per dimostrare che un documento è incluso?"
  :opzioni="['1.024', '512', '10']"
  :corretta="2"
  spiegazione="log₂ 1.024 = 10: una impronta sorella per ogni livello dell’albero."
/>
</div>
