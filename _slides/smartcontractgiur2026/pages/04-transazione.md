---
layout: capo
capo: IV
sezione: Creare una transazione
---

# Parte interattiva: creare una transazione

Chiavi, firma, invio: poi tocca a voi, dal telefono

---

# Come nasce una transazione

<SchemaCreaTransazione />

<!--
dApp: l'interfaccia per gli utenti (il wallet). APP: il programma che fa girare il nodo. Il wallet crea le chiavi, prepara e firma la transazione, la consegna a un nodo; il nodo la diffonde.
-->

---

# 1° Le chiavi nel wallet

<SchemaIndirizzo />

<p class="lead" v-click>Nessuno vi assegna un conto: il wallet se lo calcola da solo, offline, in un millisecondo.</p>

<div class="sigle">
  <p v-click="2"><strong>ECDSA</strong>: Elliptic Curve Digital Signature Algorithm, la firma su curve ellittiche; <strong>Keccak-256</strong> e <strong>BLAKE2b-256</strong> sono funzioni hash</p>
</div>

<!--
Valori reali: chiave privata 0x00…01 (solo un esempio, mai usarla!) → indirizzo Ethereum 0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf. In IOTA l'indirizzo è l'impronta BLAKE2b-256 della chiave pubblica Ed25519: 32 byte.
Correzione rispetto al 2025: la chiave pubblica non è "due interi da 32 bit" ma due interi da 256 bit; l'indirizzo Ethereum è formato dagli ultimi 20 byte dell'impronta Keccak-256, non dai "primi 40 byte".
Bitcoin ed Ethereum usano la curva secp256k1; dal 14 novembre 2021 (Taproot, blocco 709.632) Bitcoin ammette anche le firme di Schnorr.
-->

---

# Un indirizzo vero

<div class="indirizzo-vero">
  <p v-click class="mono">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</p>
  <div>

<v-clicks>

- Il 3 gennaio 2009 riceve i **50 BTC** del primo blocco: per una particolarità del codice, non si potranno mai spendere
- Da allora migliaia di persone gli hanno mandato bitcoin in omaggio: **57,7 BTC**, in 67.479 transazioni, mai toccati
- Chi c'è dietro? Nessuno lo sa: l'indirizzo è uno pseudonimo

</v-clicks>

  </div>
</div>

<p class="fonte" v-click>mempool.space, indirizzo 1A1zP1eP…DivfNa, dati del 10 novembre 2026.</p>

<style>
.indirizzo-vero .mono { font-family: var(--mono); font-size: 1.5rem; color: var(--glossa); margin: 0.2rem 0 0.8rem !important; }
</style>

<!--
L'uscita del blocco di genesi non entra nell'insieme delle monete spendibili del software di riferimento (Bitcoin Core): i 50 BTC sono di fatto bloccati. Le altre somme sull'indirizzo sono "tributi" mandati negli anni.
Per il giurista: un indirizzo è un dato pseudonimo; diventa un dato personale quando lo si collega a una persona (per esempio tramite un exchange che conosce il cliente).
-->

---

# La seed phrase

<SchemaSeedSemplice />

<!--
BIP-39: 128 bit casuali + 4 bit di controllo = 12 parole da una lista di 2048. Dalle parole (e da un'eventuale passphrase) si ricava il seed, e dal seed un albero di chiavi (BIP-32): un'unica frase per tutti i conti, su qualsiasi wallet compatibile.
Esiste una lista ufficiale italiana, ma il BIP-39 sconsiglia le liste non inglesi: alcuni wallet non le accettano.
Per il giurista: chi conosce le parole ha i fondi. In una successione, o in un sequestro, le parole sono il bene.
-->

---

# Proviamo: dodici parole

<div v-click>

<SeedPhrase />

</div>

---

# 2° La transazione: una vera, sul contratto della classe

<div v-click>

```yaml
sender: "0x6677605b…8f734a97b7e3"     # chi firma (un telefono in prova)
transaction:
  MoveCall: aula::iscriviti            # la funzione dello smart contract
  arguments: [Rubinetto, "bruno-p6z4"]
gasData:
  price: 1000                          # NANOS per unità di gas
  budget: 8338400                      # massimo che si accetta di pagare
txSignatures: ["ANGLNreIjnwYIS/kkZ2k…"]  # firma Ed25519 + chiave pubblica
```

</div>

<p v-click><strong>Costo</strong>: calcolo 0,001 IOTA (bruciati) + spazio 0,0085 IOTA − rimborso 0,0032 IOTA = <strong>0,0064 IOTA</strong>.</p>

<p class="lead" v-click>Lo spazio sul registro si paga come una cauzione: chi cancella i dati se la riprende.</p>

<div class="sigle">
  <p v-click="1"><strong>NANOS</strong>: l'unità più piccola, un miliardesimo di IOTA</p>
</div>

<!--
È la transazione ETgu2fNAzeumevDHR4dLeb3fef7BvyvsLjmPPRYnGiBj sulla devnet IOTA (10/11/2026), fatta durante la prova dell'app. Effetti: computationCost 1.000.000 NANOS (tutti bruciati), storageCost 8.534.800, storageRebate 3.176.800 (la vecchia versione del Rubinetto e della moneta del gas), quindi 6.358.000 NANOS = 0,006358 IOTA. 1 IOTA = 10^9 NANOS.
La firma serializzata contiene un byte per lo schema (Ed25519), i 64 byte della firma e i 32 della chiave pubblica: 97 byte. Nessun certificato: dalla chiave pubblica si ricava l'indirizzo del mittente.
Nel 2025 qui c'era una transazione Ethereum "legacy": Ethereum firma l'impronta Keccak-256 della transazione codificata (RLP), non lo SHA-256 come diceva la slide.
-->

---

# 3° Invio al nodo e 4° diffusione nella rete

<SchemaInvioRete />

<!--
"Ok" nel wallet vuol dire che la transazione è entrata in un blocco: in Bitcoin conviene attendere altre conferme; in IOTA, quando il consenso l'ha certificata, è definitiva.
-->

---

# Tocca a voi: prendete il telefono

<div class="aula">
<div v-click class="qr">
  <img src="/img/qr-aula.svg" alt="Codice QR che apre l'app della classe" />
  <p>mirkozichichi.me/slides/<br>smartcontractgiur2026/aula</p>
</div>
<div>

<v-clicks>

1. Il telefono crea il vostro **wallet**: una coppia di chiavi e un indirizzo
2. Chiedete token di prova al **faucet**: servono per il gas
3. **Iscrivetevi** con un soprannome: lo smart contract vi dà 10 AULA
4. **Inviate** qualche AULA a un compagno, scegliendolo per nome

</v-clicks>

<p class="grigio piccolo" v-click>Rete di prova di IOTA (devnet): token senza valore. Il soprannome resta pubblico sulla blockchain.</p>

</div>
</div>

<style>
.aula { display: grid; grid-template-columns: 15rem 1fr; gap: 2rem; align-items: start; }
.aula .qr { background: #fff; border-radius: 0.8rem; padding: 0.8rem; text-align: center; }
.aula .qr img { width: 100%; }
.aula .qr p { color: var(--notte); font-size: 0.75rem; margin: 0.3rem 0 0; line-height: 1.3; }
</style>

<!--
Prima della lezione: controllare che la devnet non sia stata azzerata (il contratto deve esistere) e provare il faucet dal telefono. Il sondaggio è già aperto: nell'app «Vota» è il passo 5, dopo l'invio; lo usiamo nel Capo V. Sulla lavagna di questa slide si vedono solo iscrizioni e invii.
Il faucet pubblico chiede un captcha: è la protezione contro chi lo svuoterebbe con programmi automatici. Se la rete dell'università viene limitata, l'app accetta un altro faucet: aggiungere ?faucet=<indirizzo> al link.
-->

---

# La lavagna: i vostri token in tempo reale

<Lavagna solo="monete" />

<!--
Premere "Collega": la lavagna legge lo smart contract sulla devnet ogni 3 secondi. Ogni riga è una transazione firmata da un telefono in aula.
-->
