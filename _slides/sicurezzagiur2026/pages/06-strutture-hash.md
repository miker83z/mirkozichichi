---
layout: capo
capo: VI
sezione: Puntatori hash e strutture dati
---

# Puntatori hash e strutture dati

Come incatenare i dati in modo che ogni manomissione si veda

---

# Puntatore hash (*hash pointer*)

<SchemaPuntatoreHash />

<p class="lead" v-click>Dice <strong>dove</strong> si trova un dato e <strong>com'era</strong>: se qualcuno lo cambia, l'impronta non torna.</p>

---

# L'idea chiave: catene di puntatori hash

<SchemaCatenaBlocchi />

<p class="lead" v-click>È la struttura che Bitcoin, nel 2008, ha reso famosa: la <strong>blockchain</strong>.</p>

---

# Rilevare la manomissione

<SchemaManomissione />

<!--
Caso d'uso: un registro a prova di manomissione (tamper-evident log). "A prova di manomissione" va inteso come "la manomissione si nota", non "è impossibile".
Come un registro con le pagine numerate e collegate: si può ancora strappare una pagina, ma non senza che si veda.
Per il giurista: il registro di protocollo informatico della PA conserva, per i documenti trasmessi per via telematica, proprio l'impronta del documento (art. 53 d.P.R. 445/2000).
-->

---

# Proviamo: modificare un verbale

<div v-click>

<HashChain />

</div>

<!--
Modificando il blocco 2 si spezza il collegamento 2→3 (lo segnala il blocco 3), ma l'impronta depositata dal notaio corrisponde ancora. Se l'attaccante ricalcola tutta la catena, i collegamenti tornano ma l'ultima impronta non corrisponde più a quella depositata: per questo l'impronta finale va conservata altrove.
-->

---

# Dimostrare che un elemento è nella catena

<SchemaAppartenenzaCatena />

<p class="grigio" v-click>Con un milione di elementi, nel caso peggiore, un milione di passaggi. Si può fare di meglio?</p>

---

# L'albero di Merkle

<SchemaAlberoMerkle />

<p class="fonte" v-click>Ralph Merkle, brevetto USA 4.309.569 (domanda del 1979, concesso nel 1982).</p>

---

# Dimostrare l'appartenenza in un albero di Merkle

<SchemaProvaMerkle />

<!--
Uso pratico: un portafoglio "leggero" verifica che la sua transazione sia in un blocco senza scaricare tutto il blocco.
-->

---

# Proviamo: la prova di Merkle

<div v-click>

<MerkleTree />

</div>

---

# Hash camaleontico (*chameleon hashing*)

<SchemaCamaleonte />

<!--
Una funzione hash con una "botola": chi possiede la chiave privata può trovare collisioni, tutti gli altri no. Così si può sostituire un contenuto senza rompere i puntatori che lo citano.
Fonti: H. Krawczyk, T. Rabin, Chameleon Signatures, NDSS 2000; G. Ateniese et al., redactable blockchain, IEEE EuroS&P 2017.
Per il giurista: un registro immutabile si scontra con il diritto alla cancellazione (art. 17 GDPR). Chi ha la botola diventa però un punto di fiducia. Per l'EDPB la cancellazione sulla catena può essere "tecnicamente impraticabile": non è consigliabile registrarvi dati personali, né in chiaro, né cifrati, né come hash (Linee guida 02/2025, v2.0 del 7 luglio 2026, §§ 103–104).
-->

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<div v-click>
<Quiz
  domanda="In una catena di puntatori hash qualcuno modifica il blocco 2 di 4. Cosa succede?"
  :opzioni="['Nulla di visibile', 'Il collegamento del blocco 3 non torna più', 'Si cancellano tutti i blocchi']"
  :corretta="1"
  spiegazione="Il blocco 3 conserva l’impronta del blocco 2 originale: non corrisponde più. Per nascondere la modifica bisognerebbe ricalcolare tutta la catena fino all’impronta conservata altrove."
/>
</div>
<div v-click>
<Quiz
  domanda="Un albero di Merkle contiene 1.024 documenti. Quante impronte servono per dimostrare che uno è incluso?"
  :opzioni="['1.024', '512', '10']"
  :corretta="2"
  spiegazione="log₂ 1.024 = 10: una impronta sorella per ogni livello dell’albero."
/>
</div>
</div>
