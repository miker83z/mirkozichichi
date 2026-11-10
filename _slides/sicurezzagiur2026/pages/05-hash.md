---
layout: capo
capo: V
sezione: Funzioni hash
---

# Funzioni hash

L'impronta digitale di un documento

---

# Funzione hash

<p class="lead">Una funzione che trasforma dati di qualsiasi dimensione in un valore di dimensione fissa, chiamato digest o impronta.</p>

<div class="flusso-hash">
  <div class="scatola">Messaggio M<br><span class="grigio piccolo">un tweet, un contratto, un film</span></div>
  <div class="freccia">→</div>
  <div class="scatola funzione">H</div>
  <div class="freccia">→</div>
  <div class="scatola">H(M)<br><span class="grigio piccolo">digest: sempre la stessa lunghezza</span></div>
</div>

<HashPlayground a="La volpe" b="La volpe rossa corre sul ghiaccio" class="mt-5" />

<style>
.flusso-hash { display: flex; align-items: center; gap: 0.8rem; justify-content: center; }
.scatola { border: 1px solid var(--linea); border-radius: 6px; padding: 0.5rem 1rem; text-align: center; font-size: 1.05rem; }
.scatola.funzione { font-family: var(--serif); font-size: 1.6rem; color: var(--rubrica); border-color: var(--rubrica); padding: 0.4rem 1.2rem; }
.freccia { font-size: 1.5rem; color: var(--rubrica); }
</style>

<!--
Due testi di lunghezza molto diversa danno impronte della stessa lunghezza (64 cifre esadecimali = 256 bit).
-->

---
layout: glossa
---

# Funzioni hash crittografiche

<p class="lead">Una classe speciale di funzioni hash, progettate per resistere a chi cerca di ingannarle. Da qui in poi "hash" vuol dire sempre "hash crittografico".</p>

Dove si usano:

- **verifica dell'integrità** di messaggi e file
- **firma digitale** (si firma l'impronta, non il documento intero)
- **verifica delle password** (il sistema conserva l'impronta, non la password)
- **proof-of-work** nelle blockchain

::glossa::

Le regole tecniche italiane definiscono la funzione di hash come quella che genera un'**impronta** "in modo tale che risulti di fatto impossibile, a partire da questa, ricostruire l'evidenza informatica originaria e generare impronte uguali a partire da evidenze informatiche differenti".

- art. 1, lett. g) e h), d.P.C.M. 22/2/2013

---

# Le proprietà di una funzione hash crittografica

<div class="formula">m &nbsp;→&nbsp; H &nbsp;→&nbsp; H(m)</div>

- **Efficiente**: calcolare H(m) è veloce, anche per file grandi
- Proprietà di sicurezza:
  1. **Resistenza alle collisioni** (*collision resistance*): è impraticabile trovare due input con la stessa impronta
  2. **Occultamento** (*hiding*): dall'impronta non si risale all'input, se l'input contiene un segreto casuale
  3. **Adatta ai puzzle** (*puzzle-friendly*): non ci sono scorciatoie per trovare un input con un'impronta di forma data

<p class="grigio mt-4">Le vediamo una alla volta, ciascuna con la sua applicazione.</p>

---

# 1) Resistenza alle collisioni

<div class="grid grid-cols-[1fr_17rem] gap-8">
<div>

<p class="lead">Deve essere computazionalmente impraticabile trovare x e y, con x ≠ y, tali che H(x) = H(y).</p>

**Ma le collisioni esistono!** Principio dei cassetti (*pigeonhole*): se metto n oggetti in m cassetti, con n > m, almeno un cassetto contiene più di un oggetto.

Gli input possibili sono infiniti, le impronte da 256 bit "solo" 2<sup>256</sup>: quindi esistono input diversi con la stessa impronta. Il punto è che **nessuno sa trovarli**.

</div>
<div class="demo piccolo">

**Quante sono 2<sup>256</sup> impronte?**

Circa 1,16 × 10<sup>77</sup>: lo stesso ordine di grandezza del numero di atomi stimato nell'universo osservabile (10<sup>78</sup>–10<sup>82</sup>).

</div>
</div>

---

# 1) Come si trova una collisione?

- Con un'impronta da 256 bit ci sono 2<sup>256</sup> valori possibili
- Metodo generico: calcolare l'impronta di tanti input a caso e aspettare che due coincidano
- Con 2<sup>130</sup> input scelti a caso, la probabilità che due collidano supera il **99,8%** (paradosso del compleanno)

<v-click>

- Funziona con qualunque funzione H…
- …ma richiede troppo tempo per avere importanza: anche calcolando 10<sup>18</sup> impronte al secondo servirebbero circa 4 × 10<sup>13</sup> anni, migliaia di volte l'età dell'universo

</v-click>

<p class="fonte mt-6">Fonte: A. Narayanan et al., <em>Bitcoin and Cryptocurrency Technologies</em>, Princeton University Press, 2016, cap. 1.</p>

<!--
Paradosso del compleanno: in una classe di 23 persone la probabilità che due compiano gli anni lo stesso giorno supera il 50%.
Calcolo: 2^130 / 10^18 al secondo ≈ 1,36 × 10^21 s ≈ 4,3 × 10^13 anni.
-->

---
layout: glossa
---

# 1) Applicazione: identificare un file

<p class="lead">Se H(x) = H(y), possiamo assumere che x = y.</p>

- Per riconoscere un file basta ricordare la sua impronta: 256 bit, pochi byte
- Chi riceve un file può controllare che sia proprio quello atteso, confrontando le impronte

::glossa::

Nel sequestro e nella copia di dati informatici la legge chiede misure tecniche che assicurino la conservazione dei dati originali e ne impediscano l'alterazione.

Calcolare l'impronta dell'originale e della copia forense, e verbalizzarla, è il modo in cui si dimostra che la copia è identica.

- artt. 247, c. 1-bis, 254-bis e 260, c. 2, c.p.p. (L. 48/2008, ratifica della Convenzione di Budapest)

La legge non nomina l'hash: indica il risultato da garantire. L'hash è lo strumento tecnico tipico.

---
layout: glossa
---

# 1) Applicazione: integrità dei dati (chi riceve ricalcola l'impronta)

<IntegrityCheck stretto />

::glossa::

Attenzione: l'hash **rivela** l'alterazione, non la **impedisce**.

E se l'intruso sostituisce anche l'impronta allegata, il confronto torna. Per questo l'impronta va protetta con una firma (Capo VII) o pubblicata altrove (Capo VI).

<!--
Mostrare prima il caso integro, poi attivare "un intruso modifica il documento".
-->

---

# 2) Occultamento (*hiding*)

<p class="lead">Data l'impronta H(x), deve essere impraticabile risalire a x (resistenza alla preimmagine). Ma attenzione a quanti sono i possibili x.</p>

<HashPlayground a="moat" b="maot" />

<p class="mt-3">Due parole che differiscono solo per l'ordine di due lettere danno impronte che non hanno nulla in comune. E la lunghezza è sempre la stessa: 256 bit per SHA-256.</p>

<!--
Far proporre agli studenti altre coppie: maiuscola/minuscola, uno spazio in più.
-->

---

# 2) Quando l'occultamento fallisce

<p class="lead">Se gli input possibili sono pochi, basta calcolare l'impronta di tutti e confrontarla.</p>

<CoinFlip />

---

# 2) L'occultamento funziona solo se…

- l'insieme dei possibili valori di x è **molto grande**
- nessun valore di x è **più probabile** degli altri
- nessun valore di x è **più interessante** degli altri

<v-click>

<p class="lead mt-6">Rimedio: aggiungere a x un segreto casuale r (<em>nonce</em>) e pubblicare H(r ‖ x). Senza r, l'impronta non dice nulla, anche se x può assumere solo due valori.</p>

</v-click>

<!--
È lo stesso motivo per cui le password vanno conservate con un "sale" (salt) casuale: lo vediamo tra poco.
-->

---
layout: glossa
---

# 2) Applicazione: impegno (*commitment*)

<p class="lead">Sigillare oggi un valore in una busta, aprirla solo più tardi.</p>

<Commitment stretto />

::glossa::

È la versione digitale dell'offerta in busta chiusa:

- finché la busta è chiusa, nessuno conosce l'offerta (occultamento);
- una volta pubblicata l'impronta, l'offerente non può più cambiarla (resistenza alle collisioni).

---

# 3) Adatta ai puzzle (*puzzle-friendly*)

<p class="lead">Se una parte dell'input è scelta a caso, non esiste un modo più furbo di "provare a caso" per ottenere un'impronta con una forma desiderata.</p>

- Fisso un dato k (scelto in modo imprevedibile) e cerco un x tale che H(k ‖ x) abbia una certa forma (per esempio, che inizi con molti zeri)
- Puzzle-friendly vuol dire: l'unica strategia è provare un x dopo l'altro, e ogni tentativo è come lanciare una moneta

<p class="fonte mt-6">Correzione rispetto al 2024: la slide originale descriveva come "puzzle-friendly" una proprietà che è in realtà l'occultamento (data H(r ‖ x), non si risale a x).</p>

---

# 3) Applicazione: il puzzle di ricerca

<p class="lead">Dato un puzzle k e un insieme bersaglio Y, trova un x tale che H(k ‖ x) ∈ Y. Più Y è piccolo, più il puzzle è difficile.</p>

<MiningPuzzle />

<!--
Partire da difficoltà 3, poi 4, poi 5: ogni zero in più moltiplica per 16 i tentativi attesi.
È il cuore del proof-of-work di Bitcoin: lo riprendiamo nel Capo VIII per la marcatura temporale.
-->

---
layout: glossa
---

# Funzioni hash: schemi esistenti

| Funzione | Impronta | Stato |
|---|---|---|
| **MD5** (1992) | 128 bit | **rotta**: una collisione costa circa 2<sup>18</sup> calcoli, una frazione di secondo su un normale computer (2013) |
| **SHA-1** (1995) | 160 bit | **rotta**: prima collisione reale nel 2017 (SHAttered), collisioni a prefisso scelto nel 2020; il NIST la ritira entro il 2030 |
| **SHA-2** (SHA-256/384/512) | 256–512 bit | **raccomandata** |
| **SHA-3** (Keccak, 2015) | 224–512 bit | **raccomandata** |

<p class="fonte">La slide del 2024 diceva che per SHA-1 c'erano solo "attacchi teorici, non ancora collisioni": non è più vero dal 2017.</p>

::glossa::

Per l'ACN, MD5 e SHA-1 "sono obsoleti e non vengono consigliati per alcuna applicazione".

Le password non si conservano con un hash veloce ma con funzioni lente e un "sale" casuale di almeno 128 bit per utente: Argon2id, scrypt o PBKDF2 (bcrypt è sconsigliato).

- ACN, Linee guida Funzioni di hash, v1.1, 2026
- ACN e Garante, Linee guida Conservazione delle password (Garante, provv. n. 594 del 7/12/2023)

---

# SHA-256: come è fatta dentro

<div class="md-diagramma">
  <div class="blocco">Messaggio<br>blocco 1</div>
  <div class="blocco">Messaggio<br>blocco 2</div>
  <div class="blocco puntini">…</div>
  <div class="blocco">Messaggio<br>blocco n<br><span class="piccolo grigio">+ riempimento e lunghezza</span></div>
</div>
<div class="md-catena">
  <span class="iv">IV</span><span class="f">→ c →</span><span class="f">→ c →</span><span class="f">… →</span><span class="f">→ c →</span><span class="iv">Impronta<br><span class="piccolo">256 bit</span></span>
</div>

- Il messaggio è diviso in blocchi da **512 bit** (l'ultimo completato con un riempimento che include la lunghezza)
- Uno stato di **256 bit** parte da un valore fisso (*IV*, vettore di inizializzazione) e attraversa la **funzione di compressione c** blocco dopo blocco
- Se c resiste alle collisioni, anche SHA-256 resiste (teorema di Merkle–Damgård). Per SHA-256 la resistenza di c è un'ipotesi, finora mai smentita

<style>
.md-diagramma { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.8rem; margin: 0 3.5rem 0.4rem 3.5rem; }
.blocco { border: 1px solid var(--linea); background: var(--campo); border-radius: 4px; text-align: center; padding: 0.3rem; font-size: 0.85rem; line-height: 1.3; }
.puntini { background: none; border: 0; font-size: 1.4rem; }
.md-catena { display: flex; justify-content: space-between; align-items: center; font-family: var(--serif); font-size: 1.1rem; color: var(--rubrica); margin: 0 0 1rem; }
.md-catena .iv { border: 1.5px solid var(--rubrica); border-radius: 4px; padding: 0.2rem 0.6rem; text-align: center; line-height: 1.2; }
</style>

---

# Esempio: SHA-256 dal vivo

<p class="lead">Cambiamo una sola lettera, la J maiuscola di "Jack", nella seconda riga.</p>

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

<!--
Le impronte della slide del 2024 non erano riproducibili: qui sono calcolate dal vivo nel browser.
L'interruttore "a capo finale" spiega perché il comando echo nel terminale dà impronte diverse dallo stesso testo digitato qui: echo aggiunge un carattere di a capo.
-->

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<Quiz
  domanda="Un perito calcola l'impronta SHA-256 di un hard disk sequestrato e, mesi dopo, quella della copia: coincidono. Cosa può concludere?"
  :opzioni="['Che la copia è identica all’originale', 'Che nessuno ha mai letto i dati', 'Niente: le collisioni esistono']"
  :corretta="0"
  spiegazione="Le collisioni esistono in teoria, ma trovarne una è impraticabile: impronte uguali significano, in pratica, dati identici. L'impronta non dice invece nulla su chi ha letto i dati."
/>
<Quiz
  domanda="Perché non basta pubblicare H(«sì») per tenere segreto un voto sì/no?"
  :opzioni="['Perché SHA-256 è lento', 'Perché chiunque può calcolare H(«sì») e H(«no») e confrontare', 'Perché l’impronta è troppo lunga']"
  :corretta="1"
  spiegazione="Con due soli input possibili l'occultamento fallisce: serve un segreto casuale (nonce) da aggiungere al voto."
/>
</div>
