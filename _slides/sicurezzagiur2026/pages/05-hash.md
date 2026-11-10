---
layout: capo
capo: V
sezione: Funzioni hash
---

# Funzioni hash

L'impronta digitale di un documento

---

# Funzione hash

<p class="lead" v-click>Trasforma dati di qualsiasi dimensione in un valore di dimensione fissa: l'impronta (<em>digest</em>).</p>

<SchemaFunzioneHash />

---

# Funzioni hash: esempi

<SchemaEsempiHash />

---

# Proviamo: calcolare un'impronta

<div v-click>

<HashPlayground a="La volpe" b="La volpe rossa corre sul ghiaccio" />

</div>

---

# Funzioni hash crittografiche

<p class="lead" v-click>Funzioni hash progettate per resistere a chi cerca di ingannarle. Si usano per:</p>

<v-clicks>

- verificare l'**integrità** di messaggi e file
- la **firma digitale** (si firma l'impronta)
- verificare le **password** (si conserva l'impronta)
- il **proof-of-work** delle blockchain

</v-clicks>

<!--
Da qui in poi "hash" vuol dire sempre "hash crittografico".
Per il giurista: le regole tecniche italiane definiscono la funzione di hash come quella che genera un'impronta "in modo tale che risulti di fatto impossibile, a partire da questa, ricostruire l'evidenza informatica originaria e generare impronte uguali a partire da evidenze informatiche differenti" (art. 1, lett. g e h, d.P.C.M. 22/2/2013).
-->

---

# Le proprietà di una funzione hash crittografica

<v-clicks>

1. **Resistenza alle collisioni**: impossibile in pratica trovare due input con la stessa impronta
2. **Occultamento** (*hiding*): dall'impronta non si risale all'input
3. **Adatta ai puzzle** (*puzzle-friendly*): nessuna scorciatoia, solo tentativi

</v-clicks>

<!--
E naturalmente efficiente: calcolare H(m) è veloce anche per file grandi.
-->

---

# 1) Resistenza alle collisioni

<SchemaCollisioni />

<!--
Formalmente: deve essere computazionalmente impraticabile trovare x ≠ y con H(x) = H(y). Le collisioni esistono (principio dei cassetti: infiniti input, 2^256 impronte), ma nessuno sa trovarle.
2^256 ≈ 1,16 × 10^77: lo stesso ordine di grandezza del numero di atomi stimato nell'universo osservabile.
-->

---

# 1) Come si trova una collisione?

<SchemaTabellaHash />

<v-clicks>

- Con 2<sup>130</sup> input a caso, la probabilità di una collisione supera il 99,8%
- Ma anche a 10<sup>18</sup> impronte al secondo servirebbero migliaia di volte l'età dell'universo

</v-clicks>

<!--
Paradosso del compleanno: in una classe di 23 persone la probabilità che due compiano gli anni lo stesso giorno supera il 50%.
Calcolo: 2^130 / 10^18 al secondo ≈ 1,36 × 10^21 s ≈ 4,3 × 10^13 anni. Fonte: Narayanan et al., Bitcoin and Cryptocurrency Technologies, 2016, cap. 1.
-->

---

# 1) Applicazione: identificare un file

<SchemaIdentificazione />

<p class="lead" v-click>Se H(x) = H(y), possiamo assumere che x = y: per riconoscere un file basta la sua impronta.</p>

<!--
Per il giurista: nel sequestro e nella copia di dati informatici la legge chiede misure tecniche che assicurino la conservazione dei dati originali e ne impediscano l'alterazione (artt. 247, c. 1-bis, 254-bis e 260, c. 2, c.p.p.; L. 48/2008, ratifica della Convenzione di Budapest). L'impronta dell'originale e della copia forense, verbalizzata, dimostra che la copia è identica. La legge non nomina l'hash: indica il risultato da garantire.
-->

---

# 1) Applicazione: integrità dei dati

<SchemaIntegritaInvio />

---

# 1) Integrità dei dati: la verifica

<SchemaIntegritaVerifica />

<p class="lead" v-click>L'hash <strong>rivela</strong> l'alterazione, non la <strong>impedisce</strong>.</p>

<!--
E se l'intruso sostituisce anche l'impronta allegata, il confronto torna: per questo l'impronta va protetta con una firma (Capo VII) o pubblicata altrove (Capo VI).
-->

---

# Proviamo: un intruso modifica il contratto

<div v-click>

<IntegrityCheck />

</div>

---

# 2) Occultamento (*hiding*)

<SchemaOccultamento />

---

# 2) Quando l'occultamento fallisce

<SchemaTestaCroce />

---

# Proviamo: testa o croce

<div v-click>

<CoinFlip />

</div>

---

# 2) L'occultamento funziona solo se…

<v-clicks>

- i valori possibili di x sono **moltissimi**
- nessuno è **più probabile** degli altri
- nessuno è **più interessante** degli altri

</v-clicks>

<p class="lead mt-6" v-click>Rimedio: aggiungere un segreto casuale (<em>nonce</em>) e pubblicare H(nonce ‖ x).</p>

<!--
È lo stesso motivo per cui le password vanno conservate con un "sale" (salt) casuale.
-->

---

# 2) Applicazione: impegno (*commitment*)

<SchemaBusta />

<!--
Vincolarsi oggi a un valore e rivelarlo solo più tardi: "sigillare un valore in una busta" ora, "aprire la busta" dopo.
È la versione digitale dell'offerta in busta chiusa: finché la busta è chiusa nessuno conosce l'offerta (occultamento); pubblicata l'impronta, l'offerente non può più cambiarla (resistenza alle collisioni).
-->

---

# Proviamo: l'offerta in busta chiusa

<div v-click>

<Commitment />

</div>

---

# 3) Adatta ai puzzle (*puzzle-friendly*)

<SchemaPuzzleFriendly />

<!--
Correzione rispetto al 2024: la slide originale descriveva come "puzzle-friendly" una proprietà che è in realtà l'occultamento (data H(r ‖ x), non si risale a x).
Definizione: se una parte dell'input è scelta a caso, non esiste un modo più furbo di "provare a caso" per ottenere un'impronta con una forma data (Narayanan et al., p. 29).
-->

---

# 3) Applicazione: il puzzle di ricerca

<SchemaPuzzleRicerca />

---

# 3) Come lanciare una moneta

<SchemaSpazioUscite />

---

# Proviamo: risolvere un puzzle

<div v-click>

<MiningPuzzle />

</div>

<!--
Partire da difficoltà 3, poi 4, poi 5: ogni zero in più moltiplica per 16 i tentativi attesi. È il cuore del proof-of-work di Bitcoin: lo riprendiamo nel Capo VIII.
-->

---

# Funzioni hash: schemi esistenti

<SchemaImbuto />

<v-clicks>

- **MD5** (128 bit): **rotta**, una collisione costa una frazione di secondo
- **SHA-1** (160 bit): **rotta**, prima collisione reale nel 2017 (SHAttered)
- **SHA-2** (SHA-256/384/512): **raccomandata**
- **SHA-3** (Keccak, 2015): **raccomandata**

</v-clicks>

<p class="fonte" v-click>La slide del 2024 diceva che per SHA-1 c'erano solo "attacchi teorici": non è più vero dal 2017.</p>

<!--
SHA-1: collisioni a prefisso scelto nel 2020; il NIST la ritira entro il 2030. Per l'ACN, MD5 e SHA-1 "sono obsoleti e non vengono consigliati per alcuna applicazione" (Linee guida Funzioni di hash, v1.1, 2026).
Le password non si conservano con un hash veloce ma con funzioni lente e un "sale" casuale di almeno 128 bit per utente: Argon2id, scrypt o PBKDF2 (bcrypt è sconsigliato) (ACN e Garante, Linee guida Conservazione delle password, Garante provv. n. 594 del 7/12/2023).
-->

---

# SHA-256: come è fatta dentro

<SchemaSha256 />

<!--
Se la funzione di compressione c resiste alle collisioni, anche SHA-256 resiste (teorema di Merkle–Damgård). Per SHA-256 la resistenza di c è un'ipotesi, finora mai smentita.
-->

---

# Esempio: SHA-256

<SchemaEsempioSha />

<!--
Le impronte della slide del 2024 non erano riproducibili: qui sono calcolate davvero.
-->

---

# Esempio: SHA-256 dal terminale

<SchemaTerminale />

---

# Proviamo: SHA-256 dal vivo

<div v-click>

<HashPlayground
  a="All work and no play makes Jack a dull boy
All work and no play makes Jack a dull boy
All work and no play makes Jack a dull boy"
  b="All work and no play makes Jack a dull boy
All work and no play makes jack a dull boy
All work and no play makes Jack a dull boy"
  :righe="3"
  eco
/>

</div>

<!--
L'interruttore "a capo finale" spiega perché il comando echo dà impronte diverse: echo aggiunge un carattere di a capo.
-->

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<div v-click>
<Quiz
  domanda="Un perito calcola l'impronta di un hard disk sequestrato e, mesi dopo, quella della copia: coincidono. Cosa può concludere?"
  :opzioni="['Che la copia è identica all’originale', 'Che nessuno ha mai letto i dati', 'Niente: le collisioni esistono']"
  :corretta="0"
  spiegazione="Le collisioni esistono in teoria, ma trovarne una è impraticabile: impronte uguali significano, in pratica, dati identici. L'impronta non dice invece nulla su chi ha letto i dati."
/>
</div>
<div v-click>
<Quiz
  domanda="Perché non basta pubblicare H(«sì») per tenere segreto un voto sì/no?"
  :opzioni="['Perché SHA-256 è lento', 'Perché chiunque può calcolare H(«sì») e H(«no») e confrontare', 'Perché l’impronta è troppo lunga']"
  :corretta="1"
  spiegazione="Con due soli input possibili l'occultamento fallisce: serve un segreto casuale (nonce) da aggiungere al voto."
/>
</div>
</div>
