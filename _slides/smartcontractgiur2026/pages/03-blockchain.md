---
layout: capo
capo: III
sezione: Sistemi distribuiti e blockchain
---

# Introduzione ai sistemi distribuiti

Dal server unico al registro condiviso

---

# Sistema distribuito: nodi che si parlano

<p class="lead" v-click>Computer diversi che collaborano scambiandosi <span class="chiave">solo</span> messaggi: nessuna memoria in comune, e ognuno può guastarsi o mentire.</p>

<SchemaNodi />

<!--
Definizione classica: Coulouris et al., Distributed Systems, §1.1. Nodo: qualsiasi dispositivo della rete che comunica con gli altri, con memoria, sistema operativo e risorse propri.
-->

---

# Client/server: Alice paga Bob 5 euro

<SchemaPagamentoServer />

<p class="lead" v-click>Il registro dei saldi è di una sola società: va creduta, e se si ferma, si ferma tutto.</p>

<div class="sigle">
  <p v-click="1"><strong>DB</strong>: database, l'archivio dei dati</p>
</div>

<!--
Il client chiede, il server risponde: è il modello del web, della posta, della banca online.
-->

---

# Peer to peer: nessuno al centro

<SchemaArchitetture />

<p class="lead" v-click>Nel <em>peer to peer</em> ogni nodo è client e server insieme: non c'è un centro da attaccare o da corrompere.</p>

<!--
Le tre figure vengono da Paul Baran (RAND, 1964), che studiava reti capaci di sopravvivere alla distruzione di alcuni nodi.
-->

---

# Blockchain: tante copie dello stesso registro

<SchemaReteDLT />

<p class="lead" v-click>Ogni nodo tiene una copia del registro e la aggiorna con le stesse regole: è una <em>Distributed Ledger Technology</em> (DLT) a blocchi.</p>

---

# Transazioni

<SchemaTransazioni />

<p class="lead" v-click>Il registro conserva lo stato; una transazione è l'operazione firmata che lo cambia.</p>

<div class="sigle">
  <p v-click="1"><strong>TX</strong>: abbreviazione di «transazione»</p>
</div>

<!--
Correzione rispetto al 2025: "la transazione è firmata dall'account a cui fa riferimento la transazione precedente" vale per Bitcoin (chi spende un'uscita precedente firma con la chiave a cui quell'uscita era destinata). In Ethereum firma chi possiede il conto.
-->

---

# Transazioni: un esempio

<SchemaEsempioTx />

---

# Transazioni vere

<div class="tx-vere">
<div v-click class="tx">
  <p class="quando">12 gennaio 2009 · blocco 170</p>
  <p class="cosa">Satoshi Nakamoto manda <strong>10 BTC</strong> a Hal Finney</p>
  <p class="nota">La prima transazione tra due persone. Gli altri 40 BTC della moneta tornano a Satoshi come resto.</p>
</div>
<div v-click class="tx">
  <p class="quando">22 maggio 2010 · blocco 57.043</p>
  <p class="cosa">Laszlo Hanyecz paga <strong>10.000 BTC</strong> per due pizze</p>
  <p class="nota">Per pagare unisce 131 «monete» ricevute prima: in Bitcoin i fondi sono come banconote, si spendono intere e si riceve il resto.</p>
</div>
</div>

<p class="lead" v-click>Sono ancora lì, leggibili da chiunque: il registro non dimentica e non si corregge.</p>

<p class="fonte" v-click>Dati da mempool.space: transazioni f4184fc5… e a1075db5….</p>

<div class="sigle">
  <p v-click="1"><strong>BTC</strong>: bitcoin, l'unità della moneta</p>
</div>

<style>
.tx-vere { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.tx-vere .tx { background: var(--campo); border-left: 4px solid var(--glossa); padding: 0.6rem 0.9rem; }
.tx-vere p { margin: 0.2rem 0 !important; }
.tx-vere .quando { color: var(--grigio); font-size: 0.85rem; }
.tx-vere .cosa { font-size: 1.15rem; }
.tx-vere .nota { font-size: 0.9rem; color: var(--grigio); }
</style>

<!--
Hal Finney ricevette 10 BTC da un'uscita di 50 BTC (premio del blocco 9): 10 a lui, 40 di resto (transazione f4184fc596403b9d638783cf57adfe4c75c605f6356fbc91338530e9831e9e16).
La pizza: transazione a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d, 131 ingressi, un'uscita da 10.000 BTC. Il 22 maggio è il "Bitcoin Pizza Day". Al prezzo del 10/11/2026 (73.150 $) quei 10.000 BTC varrebbero circa 730 milioni di dollari.
È il modello UTXO (Unspent Transaction Output): non esistono "conti", ma uscite non ancora spese, come banconote.
-->

---

# Blocchi veri

<BlocchiVeri />

<div class="sigle">
  <p v-click="3"><strong>UTC</strong>: tempo coordinato universale, l'ora di riferimento mondiale</p>
</div>

<!--
Il blocco 0 (genesi) contiene il titolo del Times del 3 gennaio 2009: una prova che il blocco non è stato creato prima di quella data, e un commento sui salvataggi delle banche.
Le impronte dei blocchi del 2024 iniziano con 19 zeri esadecimali: per trovarne una servono in media dell'ordine di 10^23 tentativi di tutta la rete. La difficoltà si ricalcola ogni 2016 blocchi (circa due settimane) per mantenere un blocco ogni 10 minuti circa.
Semplificazione: Bitcoin calcola un doppio SHA-256 dell'intestazione del blocco, che contiene l'impronta del blocco precedente e la radice di Merkle delle transazioni.
-->

---

# Registro distribuito: inserimento delle transazioni

<SchemaInserimento />

---

# Registro distribuito: propagazione di un blocco

<SchemaPropagazione />

---

# Registro distribuito: sincronizzazione

<SchemaSincronizzazione />

---

# Alice paga Bob 5 bitcoin

<SchemaPagamentoBlockchain />

<p class="lead" v-click>Rispetto al pagamento con PayPal: nessuna società custodisce il registro, e per cambiarlo serve il consenso della rete.</p>

---

# Chi decide qual è il registro giusto?

<SchemaGeneraliBizantini />

<p class="lead" v-click>Senza un capo, i nodi devono mettersi d'accordo anche se alcuni mentono o sono spenti: è il problema del consenso.</p>

<!--
In parole semplici: mille notai sparsi nel mondo tengono lo stesso registro, alcuni sono disonesti o irraggiungibili, nessuno è il capo. Come decidono che cosa scrivere?
L. Lamport, R. Shostak, M. Pease, The Byzantine Generals Problem (1982): l'accordo è possibile se i disonesti sono meno di un terzo (n ≥ 3f + 1). La slide del 2025 diceva "⅔ + 1": la formula giusta è "più di ⅔".
Dal lato di IOTA: il comitato di validatori decide con un voto pesato sulla quota (stake); un blocco è definitivo quando ha i voti di più di due terzi della quota.
-->

---

# Double spending: perché un bitcoin non si copia

<SchemaDoppiaSpesa />

<p class="lead" v-click>Un file si copia; una moneta no. Prima di Bitcoin serviva una banca a tenere i conti: qui è la rete a decidere quale pagamento è venuto prima.</p>

<!--
Con il contante il problema non esiste: la banconota passa di mano. Con il denaro digitale serviva un intermediario (banca, PayPal) che tenesse il registro. Il whitepaper di Bitcoin (2008) nasce per risolvere proprio questo, senza intermediari (§2).
-->

---

# La catena più lunga vince

<v-clicks>

- Se due blocchi arrivano insieme, la rete per un attimo si divide in due rami
- I miner continuano sul ramo che vedono per primo: vince quello che si allunga di più
- Per questo un pagamento si considera sicuro dopo qualche blocco in più (**conferme**)

</v-clicks>

<p class="lead mt-4" v-click>Come aspettare che un assegno sia incassato: gli exchange accreditano i bitcoin solo dopo alcune conferme.</p>

<!--
Bitcoin whitepaper, §4–5 e §11: un attaccante con il 10% della potenza di calcolo ha meno dello 0,1% di probabilità di riscrivere un pagamento con 5 conferme. La convenzione delle 6 conferme (circa un'ora) viene da qui.
Chi controlla più di metà della potenza di calcolo può riscrivere la storia recente (attacco del 51%): è successo a reti piccole, per esempio Ethereum Classic nell'agosto 2020.
-->

---

# Perché serve la Proof of Work?

<v-clicks>

- Senza un capo, chi ha il diritto di scrivere il prossimo blocco?
- Votare per account non funziona: chiunque ne crea un milione, gratis
- Allora si fa una **gara che costa fatica**: una lotteria i cui biglietti si comprano con calcoli, cioè con elettricità
- Chi vuole riscrivere la storia deve rifare tutta quella fatica, più in fretta di tutti gli altri insieme

</v-clicks>

<p class="lead mt-4" v-click>La <em>Proof of Stake</em> cambia il biglietto: non elettricità, ma una cauzione in moneta che si perde se si imbroglia (Ethereum dal 2022, IOTA).</p>

<!--
Whitepaper di Bitcoin, §4: "Proof-of-work is essentially one-CPU-one-vote". Ethereum è passato alla Proof of Stake con "The Merge", il 15 settembre 2022; ethereum.org stima un consumo di energia ridotto di circa il 99,95%. In Proof of Stake chi imbroglia perde una parte della cauzione (slashing).
-->

---

# Il gioco dei miner

<div v-click>

<GiocoMining />

</div>

<!--
Come usarlo: a ogni «Turno» ogni miner prova tanti numeri (nonce) quanta è la sua potenza; vince il primo che trova un'impronta che inizia con 0. Chiedere alla classe: chi vince più spesso? (Dario, la «mining farm»). Che cosa deve fare chi vince? (niente: gli altri controllano con un solo calcolo). Che cosa succede dopo? (si riparte, con l'impronta del nuovo blocco dentro il successivo).
Nella realtà: il premio è di 3,125 BTC dal 20 aprile 2024, più le commissioni; i miner sono capannoni di macchine specializzate, e la difficoltà è tale che servono in media dell'ordine di 10^23 tentativi per blocco.
-->

---

# Il trilemma della blockchain

<SchemaTrilemma />

<!--
Il "trilemma" è una formula di Vitalik Buterin: decentralizzazione, sicurezza e scalabilità sono difficili da avere insieme. Bitcoin elabora poche transazioni al secondo, un circuito di carte di pagamento molte di più.
Dal lato di chi sviluppa un protocollo: con il modello a oggetti, IOTA (come Sui) può eseguire in parallelo le transazioni che toccano oggetti diversi; quelle che toccano lo stesso oggetto condiviso (come il sondaggio della classe) vanno messe in fila.
-->

---

# Layer 2: meno transazioni sulla catena

<SchemaLayer2 />

<!--
Lightning Network (Bitcoin): canali di pagamento tra due parti, chiusi sulla catena una volta sola. Rollup (Ethereum): migliaia di transazioni eseguite fuori e pubblicate sulla catena in un unico pacchetto, con una prova.
-->
