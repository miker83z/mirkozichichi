# Verifica A: basi e consenso (deck 2025, pp. 2–31, e nuovi temi di teoria)

Verifica svolta il 10 novembre 2026. Materiale: testo e immagini delle pp. 2–31 del deck 2025 "Blockchain & Smart Contracts" (seminario UniBo "Blockchain e Smart Contract: aspetti giuridici e tecnologici").

Tutti i numeri sono stati ricalcolati in locale, senza fidarsi delle immagini:

- SHA-256 con `shasum -a 256`, `openssl dgst -sha256` e Python `hashlib` (i tre strumenti danno lo stesso risultato);
- secp256k1 e Keccak-256 in Python puro (Keccak controllato sul valore noto `keccak256("") = c5d24601…5d85a470`);
- BIP-39 con `hashlib.pbkdf2_hmac`, sulla lista di parole ufficiale;
- la tabella del §11 del whitepaper, rieseguendo il suo codice C tradotto in Python.

Legenda: **✓** corretta · **✗** errata · **~** imprecisa o da precisare. Lo stato HTTP di ogni URL citato è nell'appendice in fondo (✓ = risposta 200).

---

## In breve: le correzioni che contano

1. **p. 3: i due digest SHA-256 sono sbagliati.** SHA256("moat") = `EDF1…37F4`, non `98E2…16F3`. SHA256("maot") = `B075…8F0B`, non `E671…A9C9`.
2. **p. 26: due etichette sbagliate, numeri giusti.** La chiave pubblica è formata da "due interi a **256 bit**", non "a 32 bit". L'indirizzo sono gli **ultimi 20 byte** di Keccak-256, non i "first 40 bytes". Ho ricalcolato chiave pubblica e indirizzo dalla chiave privata della slide: coincidono.
3. **p. 29: "SHA256(TX)" è errato per Ethereum.** Ethereum firma il Keccak-256 della transazione codificata in RLP, come dice la stessa p. 28. Bitcoin usa invece un doppio SHA-256 (e un SHA-256 "con etichetta" per Taproot).
4. **p. 16: la frase sulla firma va riscritta.** Per Bitcoin (UTXO) è giusta nella sostanza: firma chi ha ricevuto le monete con la transazione precedente. Però in Bitcoin non esistono "account". Per Ethereum (modello ad account) è falsa: la transazione non rimanda a una transazione precedente. La firma il titolare dell'account mittente, e l'ordine lo fissa un contatore (il nonce).
5. **p. 28: l'esempio è corretto ma usa il formato "legacy"** di prima del 2016: `v = 0x1c`, senza chainId. Oggi un wallet produce transazioni di tipo 2 (EIP-1559).
6. **p. 31: `iotaplay.app` non esiste più.** Il nome a dominio non risulta registrato e non si risolve nei DNS. Va sostituito.
7. **p. 36 (fuori dal mio intervallo, ma richiesto):** "la maggioranza (⅔ + 1)" mescola due soglie diverse. I protocolli BFT richiedono **più di due terzi** di nodi (o di stake) onesti. Bitcoin richiede la **maggioranza della potenza di calcolo**. I dettagli sono nella Parte 2, §1.
8. **Lessico (pp. 27 e 29).** Per le firme in blockchain conviene non dire "firma digitale". Nel diritto italiano "firma digitale" è un tipo di firma *qualificata*, che presuppone un certificato qualificato emesso da un prestatore di servizi fiduciari (TSP), e in blockchain il certificato non c'è. Meglio "firma crittografica" o "firma elettronica con chiave privata".

---

## Parte 1: affermazioni delle pp. 2–31

| Pag. | Affermazione 2025 | Esito | Formulazione corretta (breve) | Fonte primaria (URL) |
|---|---|---|---|---|
| 2 | "Concetti di base" (titolo) | — | Nessuna affermazione. | — |
| 3 | "f(string) = digest" | ✓ | "Una funzione di hash crittografica trasforma un dato di lunghezza qualsiasi in un'impronta (digest) di lunghezza fissa." FIPS 180-4: per SHA-256 il messaggio deve essere "less than 2^64 bits". | https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf |
| 3 | "SHA256(moat) = 98E2…16F3" | ✗ | SHA256("moat") = `edf1eb932299d2c1e3c973f57e454fbdf5aceeed86bae113708c69d9adc737f4`, cioè **EDF1…37F4**. Vedi la nota N1. | calcolo locale (shasum, openssl, hashlib); FIPS 180-4 come sopra |
| 3 | "SHA256(maot) = E671…A9C9" | ✗ | SHA256("maot") = `b075b425025fab0e0d45a491b5ddb4d42b6c872f5a2c5f69e32996f9e90b8f0b`, cioè **B075…8F0B**. Il messaggio della slide resta valido: basta scambiare due lettere e il digest cambia del tutto. | come sopra |
| 3 | "la lunghezza del digest è sempre la stessa (256 bit per SHA256)" | ✓ | Invariato. FIPS 180-4, §6.2.2: "the 256-bit message digest". 256 bit = 64 cifre esadecimali. | FIPS 180-4 come sopra |
| 4 | SHA256(Documento) = digest → sign(digest + chiave privata di Alice) = firma → documento + firma + certificato di Alice firmato dal TSP | ✓ | Schema corretto per la firma digitale "giuridica". Il certificato lega l'identità di Alice alla sua chiave pubblica ed è firmato dal TSP (prestatore di servizi fiduciari). **Per il giurista:** il CAD definisce la "firma digitale" come "un particolare tipo di firma qualificata basata su un sistema di chiavi crittografiche, una pubblica e una privata, correlate tra loro". | CAD, art. 1, c. 1, lett. s): https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2005-03-07;82~art1 |
| 6 | "Sistema informatico costituito da un insieme di processi interconnessi tra loro in cui le comunicazioni avvengono solo esclusivamente tramite lo scambio di opportuni messaggi" | ✓ | Togliere il doppione "solo esclusivamente" (la frase viene parola per parola da it.wikipedia). Fonte primaria equivalente, Lamport 1978: "A distributed system consists of a collection of distinct processes which are spatially separated, and which communicate with one another by exchanging messages." | L. Lamport, "Time, Clocks, and the Ordering of Events in a Distributed System", *CACM* 21(7):558–565, 1978: https://lamport.azurewebsites.net/pubs/time-clocks.pdf (DOI https://doi.org/10.1145/359545.359563) |
| 7 | "Nodo: qualsiasi dispositivo hardware del sistema in grado di comunicare… memoria propria, sistema operativo, risorse locali" | ~ | In una blockchain il nodo è soprattutto un **programma** (client, es. Bitcoin Core) che tiene una copia del registro e ne verifica le regole. Una sola macchina può far girare più nodi. Proposta: "Nodo: un computer, o un programma, che partecipa alla rete, conserva una copia del registro e ne controlla le regole." | Bitcoin developer guide, *Operating modes* (full node / SPV): https://developer.bitcoin.org/devguide/operating_modes.html |
| 8 | "Un'architettura di sistema è il modello concettuale che definisce la struttura, il comportamento e più prospettive di un unico sistema"; client → request / server → response | ✓ | È una definizione didattica, presa dalla voce en.wikipedia "Systems architecture" ("structure, behavior, and views"). "Più prospettive" va inteso come "viste". Lo schema richiesta/risposta è corretto. | Nessuna fonte primaria aperta. La norma ISO/IEC/IEEE 42010 è a pagamento. |
| 9 | Alice paga 5 € a Bob tramite il server: pay → update(Alice, −5), update(Bob, +5) → ok | ✓ | Invariato. | — |
| 10–11 | "I nodi Peers sono Client e Server simultaneamente" | ✓ | Invariato. È il concetto di "servent" della definizione classica di P2P (Schollmeier 2001). | R. Schollmeier, "A definition of peer-to-peer networking…", *Proc. P2P 2001*, pp. 101–102: https://doi.org/10.1109/P2P.2001.990434 (verificati solo i dati bibliografici via Crossref: https://api.crossref.org/works/10.1109/P2P.2001.990434) |
| 12 | Centralizzato: "un nodo si occupa di tutto"; De-centralizzato: "il carico totale dei compiti viene decentralizzato e coinvolge i sotto-nodi"; De-centralizzato distribuito (P2P) | ~ | La tripartizione viene da Baran (1964). Due ritocchi. (a) La definizione di "decentralizzato" è circolare. Meglio: "più centri, ognuno dei quali coordina un gruppo di nodi; non c'è un centro unico". (b) Il titolo "Sistema distribuito" sopra il caso centralizzato è contraddittorio. Meglio "Tre modi di organizzare una rete". | P. Baran, *On Distributed Communications: I. Introduction to Distributed Communications Networks*, RAND RM-3420, 1964: https://doi.org/10.7249/RM3420 (dati verificati via https://api.crossref.org/works/10.7249/RM3420) |
| 13 | "Blockchain: sistema distribuito basato su una rete di nodi P2P"; "fa parte delle DLT" | ✓ | Invariato. | — |
| 13 | "Nelle DLT un registro viene distribuito tra i nodi di una rete P2P, che aggiornano la loro copia locale secondo un unico meccanismo di consenso" | ✓ | Invariato. **Per il giurista:** l'art. 8-ter, c. 1, d.l. 135/2018 definisce le "tecnologie basate su registri distribuiti" come tecnologie che usano "un registro condiviso, distribuito, replicabile, accessibile simultaneamente, architetturalmente decentralizzato su basi crittografiche". | https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2018-12-14;135~art8ter |
| 13 | "Una blockchain è una DLT in cui il registro assume la forma di un insieme di blocchi di dati (relativamente) ordinati cronologicamente" | ~ | Manca l'elemento chiave, cioè il collegamento tramite hash. Proposta: "una DLT in cui le transazioni sono raccolte in blocchi, e ogni blocco contiene l'hash del blocco precedente. Si forma così una catena con un ordine preciso, e chi modifica un blocco passato deve rifare tutti quelli successivi." Il "(relativamente)" vale per gli orari: in Bitcoin l'orario di un blocco deve solo essere "strictly greater than the median time of the previous 11 blocks". | Whitepaper §3–4: https://bitcoin.org/bitcoin.pdf ; block header: https://developer.bitcoin.org/reference/block_chain.html ("This ensures no previous block can be changed without also changing this block's header.") |
| 14 | Ogni nodo ha la propria copia della catena, e le copie possono avere lunghezze diverse | ✓ | Invariato. Le copie coincidono solo dopo la sincronizzazione (vedi p. 21). | Whitepaper §5 |
| 15 | "Cosa scrivere sul registro → transazioni; struttura del registro → chain of blocks" | ✓ | Invariato. | — |
| 16 | "Se il registro mantiene lo stato del sistema, una transazione è l'operazione che modifica questo stato" | ✓ | Invariato. Il Yellow Paper descrive Ethereum come "transaction-based state machine". | Ethereum Yellow Paper: https://ethereum.github.io/yellowpaper/paper.pdf |
| 16 | "Lo stato del sistema in un certo momento (snapshot) è un elenco di transazioni" | ~ | "Il **registro** è l'elenco ordinato delle transazioni. Lo **stato** (chi possiede cosa) si ottiene applicandole in ordine: in Bitcoin è l'insieme delle uscite non spese (UTXO), in Ethereum il saldo di ogni account." | https://developer.bitcoin.org/devguide/transactions.html ; https://ethereum.org/developers/docs/accounts/ |
| 16 | "Una nuova transazione si riferisce ad una precedente e aggiorna lo stato" | ~ | Vale per Bitcoin (UTXO): "Each input spends the satoshis paid to a previous output", e ogni ingresso indica la transazione e il numero dell'uscita. Non vale per Ethereum, dove la transazione indica solo mittente, destinatario e nonce. | come sopra |
| 16 | "Una transazione valida viene firmata utilizzando la firma digitale dell'account a cui fa riferimento la transazione precedente" | ~ (UTXO) / ✗ (account) | "Ogni transazione è firmata con la chiave privata di chi possiede ciò che viene speso. In Bitcoin è chi ha ricevuto le monete con la transazione precedente. In Ethereum è il titolare dell'account mittente." Vedi la nota N2. | Whitepaper §2; https://developer.bitcoin.org/devguide/transactions.html ; https://ethereum.org/developers/docs/transactions/ |
| 17 | TX 1: 5 btc → Charlie; TX 2: Charlie → Bob; TX 3: Bob → Alice | ✓ | Corretto come catena di proprietà. Precisazioni facoltative. (a) TX 1 è una "coinbase", la transazione che crea monete nuove. Oggi la ricompensa è 3,125 BTC più le commissioni, e le monete di una coinbase sono spendibili solo dopo 100 blocchi (`COINBASE_MATURITY = 100`). (b) Nella realtà Bob trasferisce un po' meno di 5, perché la differenza tra entrate e uscite è la commissione (whitepaper §6). | Whitepaper §6; https://github.com/bitcoin/bitcoin/blob/master/src/consensus/consensus.h |
| 18 | "Invece di un unico documento, la blockchain divide il registro in blocchi"; blocco = "contenuto di B_i" | ~ | Corretto ma incompleto. Ogni blocco ha anche un'**intestazione** di 80 byte con: hash del blocco precedente, radice di Merkle delle transazioni, orario, difficoltà, nonce. Conviene mostrarla, perché è ciò che "incatena" i blocchi. | https://developer.bitcoin.org/reference/block_chain.html ("Block headers are serialized in the 80-byte format") |
| 19 | Gli utenti inviano le transazioni a nodi diversi, che le inoltrano agli altri | ✓ | Invariato. Whitepaper §5, passo 1: "New transactions are broadcast to all nodes." Nella pratica non serve che arrivino a tutti: "As long as they reach many nodes, they will get into a block before long." | Whitepaper §5 |
| 20 | Un nodo (la lampadina) propaga un nuovo blocco | ✓ | Invariato. Whitepaper §5, passo 4: "When a node finds a proof-of-work, it broadcasts the block to all nodes." In PoW la "lampadina" è il miner che ha risolto il puzzle; in PoS è il validatore scelto per proporre il blocco. | Whitepaper §5; https://ethereum.org/developers/docs/consensus-mechanisms/pos/ |
| 21 | Sincronizzazione: nodi con catene di lunghezza diversa si allineano | ✓ | Invariato. Whitepaper §5: "If a node does not receive a block, it will request it when it receives the next block and realizes it missed one." In caso di biforcazione si segue la catena con più lavoro. | Whitepaper §5; https://developer.bitcoin.org/devguide/block_chain.html |
| 22 | Confronto client/server: Alice paga 5 € a Bob tramite il server e il database | ✓ | Invariato. | — |
| 23 | Blockchain: pay(Bob,5) → broadcastTX(Alice,Bob,5) → newBlock(Alice,Bob,5) → ok | ~ | Due precisazioni. (a) La transazione la **firma il wallet di Alice** prima di mandarla al nodo: il nodo non firma per conto di Alice. (b) "ok" vuol dire "inclusa in un blocco", cioè 1 conferma, e in Bitcoin non è ancora definitiva. Per 5 BTC si aspettano almeno 6 conferme (circa un'ora). | https://bitcoin.org/en/you-need-to-know (tabella delle conferme) |
| 25 | 1° creazione delle chiavi nel wallet → 2° creazione e firma della transazione → 3° invio al nodo → 4° diffusione nella rete; APP = interfaccia dei nodi, dApp = interfaccia degli utenti | ✓ | Invariato. Le chiavi e la firma restano sul dispositivo dell'utente; il nodo riceve solo la transazione già firmata. | Whitepaper §5; https://ethereum.org/developers/docs/transactions/ |
| 26 | "Private Key (256 bits)" | ✓ | Invariato. Precisamente: un intero casuale tra 1 e n−1, dove n ≈ 1,158·10^77 è l'ordine della curva (poco meno di 2^256). | Yellow Paper, Appendix F: "a randomly selected positive integer … in the range [1, secp256k1n−1]" |
| 26 | Freccia "ECDSA secp256k1" dalla chiave privata alla chiave pubblica | ~ | La chiave pubblica si ottiene con una moltiplicazione sulla curva **secp256k1** (chiave pubblica = chiave privata × G). ECDSA è l'algoritmo di *firma* che usa queste chiavi. Etichetta proposta: "curva ellittica secp256k1". | SEC 2 v2: https://www.secg.org/sec2-v2.pdf ; Yellow Paper, App. F (ECDSAPUBKEY) |
| 26 | "Public Key (x,y point – 512 bits – **Two 32-bit integers**)" | ✗ | "Punto (x, y): 512 bit, cioè **due interi da 256 bit** (32 byte ciascuno)." Il Yellow Paper dice: pu è "a byte array of size 64 (formed from the concatenation of two positive integers each < 2^256)". | Yellow Paper, App. F: https://ethereum.github.io/yellowpaper/paper.pdf |
| 26 | "Keccak-256 (**first 40 bytes** – 160 bits)" | ✗ | "Keccak-256 della chiave pubblica: si tengono gli **ultimi 20 byte** (40 cifre esadecimali), cioè 160 bit." Con i primi 20 byte l'indirizzo sarebbe `0x625f51a0…3238`, sbagliato. Vedi la nota N3. | Yellow Paper, App. F, eq. (316): "the rightmost 160-bits of the Keccak-256 hash"; https://ethereum.org/developers/docs/accounts/ ("the last 20 bytes of the Keccak-256 hash of the public key") |
| 26 | Valori dell'esempio: chiave privata `0xdc47…dfbd` → chiave pubblica `b9f5…6330` → indirizzo `0x39532829E35c3238cd0bc1613F7e586Cb10646CC` | ✓ | Ricalcolati: tutti e tre corretti. Maiuscole e minuscole nell'indirizzo sono il checksum EIP-55, anch'esso verificato. | EIP-55: https://eips.ethereum.org/EIPS/eip-55 |
| 26–27 | Fonte "asecuritysite.com/encryption/ethadd" | ~ | Risponde 403 ai client automatici: controllare che si apra nel browser. | https://asecuritysite.com/encryption/ethadd |
| 27 | "Per inserire transazioni nella blockchain bisogna autenticarsi (firma digitale)" | ~ | "Ogni transazione deve essere **firmata** con la chiave privata di chi la invia. Non c'è login né identificazione: la firma dimostra il controllo della chiave, non l'identità di chi la usa." Evitare "firma digitale" (termine del CAD, vedi p. 4). | Whitepaper §10; CAD art. 1, lett. s) (URL a p. 4) |
| 27 | "Serve una coppia di chiavi asimmetriche: chiave pubblica + chiave privata" | ✓ | Invariato. | — |
| 27 | "In Ethereum → Elliptic Curve Digital Signature Algorithm (ECDSA)" | ✓ | Precisare la curva: "ECDSA sulla curva secp256k1, la stessa di Bitcoin". Il Yellow Paper dice: "recoverable ECDSA signatures … the SECP-256k1 curve". | Yellow Paper, App. F |
| 27 | "La chiave privata consiste in un valore segreto generato da un processo di randomizzazione" | ✓ | Invariato. Oggi quasi tutti i wallet generano a caso una sola frase di 12 o 24 parole (BIP-39) e ne *derivano* tutte le chiavi (BIP-32). Vedi la Parte 2, §7. | BIP-39 e BIP-32 (Parte 2) |
| 27 | "La chiave pubblica deriva da quella privata" | ✓ | Aggiungere "e non si può fare il contrario". | SEC 2 v2 |
| 27 | "L'indirizzo di un account si ottiene dalla chiave pubblica" | ✓ | Vale per gli account controllati da una persona (EOA). L'indirizzo di un contratto deriva invece da chi lo crea e dal suo nonce. | Yellow Paper, eq. ADDR; https://ethereum.org/developers/docs/accounts/ |
| 28 | Transazione {nonce 0, gasPrice 20 gwei, gasLimit 100000, to, value 1000, data 0xc0de} → "rlp + hash" → `0x6a74f15f…d656` → firma v = `0x1c`, r, s | ~ | I numeri sono giusti: ho ricalcolato il Keccak-256 della codifica RLP e torna `0x6a74f15f…ded656`. Ma è il **formato legacy di prima di EIP-155** (blocco 2.675.000, novembre 2016): `v = 27/28`, senza chainId. Oggi la transazione standard è di **tipo 2 (EIP-1559)**, con chain_id, max_fee_per_gas, max_priority_fee_per_gas e y_parity. Vedi la nota N4. | EIP-155: https://eips.ethereum.org/EIPS/eip-155 ; EIP-1559: https://eips.ethereum.org/EIPS/eip-1559 ; https://ethereum.org/developers/docs/transactions/ |
| 29 | "SHA256(TX) = digest" | ✗ | Ethereum: "Keccak-256(codifica RLP della TX) = digest" (Yellow Paper: "The message hash, h(T), to be signed is the Keccak-256 hash of the transaction"). Bitcoin: doppio SHA-256 dei dati della transazione da firmare; con Taproot, SHA-256 "con etichetta" (BIP-341). Proposta neutra: "hash(TX) = digest". | Yellow Paper, App. F; BIP-341: https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki |
| 29 | sign(digest + chiave privata di Alice) = firma; TX + firma | ✓ | Invariato. In Ethereum la firma è la terna (v, r, s). | Yellow Paper, App. F (ECDSASIGN) |
| 29 | "Alice's Certificate" e "TSP" barrati: in blockchain non servono certificati né TSP | ✓ | Confermato. Nessuna autorità certifica le chiavi: l'indirizzo, che deriva dalla chiave pubblica, è l'identificativo. In Ethereum la chiave pubblica non viaggia nemmeno nella transazione: si ricava dalla firma (ECDSARECOVER). L'identità della persona resta sconosciuta: il whitepaper §10 parla di "keeping public keys anonymous". **Per il giurista:** senza certificato qualificato non è una "firma digitale" ai sensi del CAD (art. 1, lett. s), firma qualificata). | Yellow Paper, App. F; whitepaper §10; CAD (URL a p. 4) |
| 30 | "3° invio al nodo blockchain; 4° diffusione nella rete P2P" | ✓ | Invariato. Il link della fonte ora rimanda a `chain.link/blog/blockchain-trust-model` (200). | https://blog.chain.link/blockchain-trust-model/ |
| 31 | "Installazione wallet browser (Nightly Wallet) https://nightly.app/download" | ✓ | Il link funziona (200). Nightly dichiara il supporto a IOTA: "Nightly Wallet is available on both iOS and Android with full IOTA support". È però una dichiarazione del produttore: va provato. Alternativa ufficiale: l'estensione IOTA Wallet della IOTA Foundation. Vedi la nota N5. | https://nightly.app/wallet/iota ; https://docs.iota.org/users/iota-wallet/getting-started |
| 31 | "IOTA Smart Contract playground https://iotaplay.app/" | ✗ | **Il sito non esiste più.** Il nome non si risolve nei DNS (`Could not resolve host`) e il registro del dominio .app risponde `"iotaplay.app not found"` (RDAP 404), quindi il dominio non è registrato. Va sostituito con uno strumento funzionante, da provare prima della lezione. | https://rdap.org/domain/iotaplay.app |

### Note di dettaglio

**N1. Il digest della p. 3.** Ho provato anche le varianti più probabili: "moat"/"maot" seguiti da a capo (`\n` o `\r\n`), con uno spazio, con l'iniziale maiuscola o tutto maiuscolo, in UTF-16. Ho provato anche altre funzioni: SHA-1, MD5, SHA-224, SHA-512, SHA3-256, Keccak-256, BLAKE2, doppio SHA-256. Nessuna dà `98E2…16F3` o `E671…A9C9`, quindi nel 2025 i digest erano segnaposto. Per la slide interattiva vanno calcolati sui byte UTF-8 della parola, senza a capo finale (come fa `printf 'moat' | shasum -a 256`):

```
SHA256("moat") = edf1eb932299d2c1e3c973f57e454fbdf5aceeed86bae113708c69d9adc737f4
SHA256("maot") = b075b425025fab0e0d45a491b5ddb4d42b6c872f5a2c5f69e32996f9e90b8f0b
```

**N2. "Firmata con la firma dell'account a cui fa riferimento la transazione precedente" (p. 16).**

- **Bitcoin (UTXO).** La frase riprende il §2 del whitepaper: "Each owner transfers the coin to the next by digitally signing a hash of the previous transaction and the public key of the next owner". Nella sostanza è giusta: per spendere un'uscita bisogna soddisfare la condizione che la transazione precedente le ha posto, di solito una firma con la chiave privata del destinatario. Tre imprecisioni:
  - in Bitcoin non ci sono "account";
  - la firma copre la *nuova* transazione, che contiene il riferimento all'uscita spesa (identificativo della transazione e numero d'ordine dell'uscita): "the entire transaction is signed except for any signature scripts";
  - la condizione può chiedere più firme (multisig) o altro.
- **Ethereum (account).** La frase non vale. La transazione non indica nessuna transazione precedente. Contiene il mittente, cioè "the address of the sender, that will be signing the transaction", ed è firmata con la sua chiave privata. L'ordine e il divieto di ripetere la stessa transazione dipendono dal nonce, "a sequentially incrementing counter which indicates the transaction number from the account".
- **IOTA (oggetti).** La transazione elenca gli oggetti che usa, ognuno con ID e versione. Per gli oggetti con un proprietario la firma il proprietario. Dettagli nella Parte 2, §5.

**N3. Ricalcolo della p. 26.** Dalla chiave privata `0xdc47ca23…47c9dfbd` ho ottenuto, con secp256k1, la chiave pubblica (x‖y, 64 byte = 512 bit). È identica a quella della slide (`b9f5d910…20ed96330`, 128 cifre esadecimali).

- Keccak-256 di quei 64 byte: `625f51a0b0fd1e19c0e9b864`**`39532829e35c3238cd0bc1613f7e586cb10646cc`**.
- Gli ultimi 20 byte, scritti con il checksum EIP-55, danno `0x39532829E35c3238cd0bc1613F7e586Cb10646CC`, esattamente l'indirizzo della slide.

Altri due dettagli:

- la chiave pubblica "non compressa" standard ha 65 byte, con un prefisso `0x04`; Ethereum fa l'hash dei 64 byte senza prefisso;
- Ethereum usa Keccak-256 nella versione originale, **non** lo SHA3-256 standardizzato da FIPS 202, che produce digest diversi (Yellow Paper: "as per version 3 of the winning entry to the SHA-3 contest … rather than the final SHA-3 specification"). Infatti `keccak256("")` = `c5d24601…`, mentre `sha3_256("")` = `a7ffc6f8…`. Il glossario di ethereum.org ("Keccak-256 was standardized as SHA-3") semplifica troppo: meglio non riprenderlo.

**N4. Ricalcolo della p. 28.** Keccak-256 della codifica RLP dei 6 campi (nonce, gasPrice, gasLimit, to, value, data) = `0x6a74f15f29c3227c5d1d2e27894da58d417a484ef53bc7aa57ee323b42ded656`, identico alla slide.

- Con il chainId (EIP-155, mainnet) l'hash sarebbe un altro (`0xc3afca60…`), e v sarebbe 37 o 38, non 28.
- La firma (r, s, v) della slide permette di ricavare il mittente: `0x53ae893e4b22d707943299a8d0c844df0e3d5557`. **Non** è l'indirizzo `0x3953…46CC` della p. 26.

Le due immagini vengono da esempi diversi: non presentarle come la stessa operazione di "Bob".

**N5. Nota per la parte pratica su IOTA.** Le pp. 26–27 descrivono Ethereum, ma gli studenti useranno IOTA, dove chiavi e indirizzi sono diversi.

- Lo schema di firma predefinito è **Ed25519**; IOTA accetta anche ECDSA secp256k1 e secp256r1.
- L'indirizzo è il **BLAKE2b-256** della chiave pubblica: **32 byte**, cioè `0x` seguito da 64 cifre esadecimali. Per Ed25519 non si antepone il byte di schema.
- Le parole di recupero seguono BIP-39; il percorso di derivazione per Ed25519 è `m/44'/4218'/…`.

Fonte: https://docs.iota.org/developer/cryptography/transaction-auth/keys-addresses

---

## Parte 2: nuovi temi di teoria

### 1. Il problema dei generali bizantini

- **Fonte:** L. Lamport, R. Shostak, M. Pease, "The Byzantine Generals Problem", *ACM Transactions on Programming Languages and Systems* 4(3):382–401, luglio 1982. PDF dell'autore: https://lamport.azurewebsites.net/pubs/byz.pdf · DOI https://doi.org/10.1145/357172.357176 · scheda Microsoft Research: https://www.microsoft.com/en-us/research/publication/byzantine-generals-problem/
- **Enunciato citabile (abstract):** "It is shown that, using only oral messages, this problem is solvable if and only if more than two-thirds of the generals are loyal; so a single traitor can confound two loyal generals. With unforgeable written messages, the problem is solvable for any number of generals and possible traitors."
- **Limite n ≥ 3f + 1:** "no solution with fewer than 3m + 1 generals can cope with m traitors". Teorema 1: OM(m) funziona "if there are more than 3m generals and at most m traitors" (m = numero di traditori, cioè f).
- **Precisazione importante (le blockchain usano firme).** Con messaggi firmati, Lamport mostra che basta un numero qualsiasi di generali leali (Teorema 2), ma solo in una rete *sincrona*, dove i messaggi arrivano entro un tempo noto. Le blockchain BFT lavorano su reti senza tempi garantiti, e lì il limite torna a **n ≥ 3f + 1 anche con le firme**. Dwork, Lynch e Stockmeyer: "For Byzantine faults with authentication, we show that t-resilient consensus is possible iff N ≥ 3t + 1." Fonte: "Consensus in the presence of partial synchrony", *JACM* 35(2):288–323, 1988: https://groups.csail.mit.edu/tds/papers/Lynch/jacm88.pdf (DOI https://doi.org/10.1145/42282.42283).
- **Formulazione corretta per la p. 36.** Al posto di "se la maggioranza (⅔ + 1) dei nodi è d'accordo":
  - BFT (IOTA, e Ethereum PoS per la finalità): "se **più di due terzi** dei nodi (nelle blockchain proof-of-stake: più di due terzi dello stake) sono onesti e d'accordo";
  - Bitcoin: "se la **maggioranza della potenza di calcolo** è onesta". Il whitepaper dice: "As long as a majority of CPU power is controlled by nodes that are not cooperating to attack the network".

  "⅔ + 1" è giusto solo se si intende "due terzi arrotondati per difetto, più un nodo". Con n = 3f + 1 nodi il quorum è 2f + 1.
- **Valori per una demo:**

  | nodi n | guasti tollerati f | quorum (2f + 1) |
  |---|---|---|
  | 4 | 1 | 3 |
  | 7 | 2 | 5 |
  | 10 | 3 | 7 |
  | 100 | 33 | 67 |

- **IOTA oggi:** tutte le reti IOTA usano il protocollo BFT **Starfish**, con DAG e comitato di validatori scelti in base allo stake delegato: "Blocks reach finality in only three rounds of communication". Il sito scrive "tolerates up to one-third of validators by stake", ma la soglia corretta è "meno di un terzo". https://docs.iota.org/about-iota/iota-architecture/consensus

### 2. Doppia spesa e consenso di Nakamoto

- **Fonte:** S. Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System", 2008: https://bitcoin.org/bitcoin.pdf. Il file scaricato il 10/11/2026 ha SHA-256 `b1674191…4f553`.
- **§2, il problema.** La moneta è "a chain of digital signatures". "The problem of course is the payee can't verify that one of the owners did not double-spend the coin." La soluzione senza intermediario: "transactions must be publicly announced, and we need a system for participants to agree on a single history of the order in which they were received."
- **§4, la catena più lunga = la catena con più lavoro:** "Proof-of-work is essentially one-CPU-one-vote. The majority decision is represented by the longest chain, which has the greatest proof-of-work effort invested in it." La difficoltà è regolata da "a moving average targeting an average number of blocks per hour".
- **§5, la rete.** Sei passi: (1) le transazioni vengono diffuse; (2) ogni nodo le raccoglie in un blocco; (3) cerca la proof-of-work; (4) diffonde il blocco trovato; (5) i nodi accettano il blocco solo se le transazioni sono valide e non già spese; (6) lavorano sul blocco successivo usandone l'hash. "Nodes always consider the longest chain to be the correct one". Bitcoin Core oggi segue, più precisamente, la catena con più lavoro cumulato: "normal peers always follow the most difficult chain to recreate" (https://developer.bitcoin.org/devguide/block_chain.html).
- **§11, il calcolo.** p = probabilità che un nodo onesto trovi il blocco successivo; q = probabilità che lo trovi l'attaccante; q_z = 1 se p ≤ q, (q/p)^z se p > q. Il progresso dell'attaccante segue una Poisson con λ = z·q/p:

  P = 1 − Σ_{k=0..z} [λ^k e^{−λ} / k!] · (1 − (q/p)^{z−k})

  Attenzione per la demo: la formula semplice (q/p)^z dà valori molto più bassi della tabella. Per q = 0,1 e z = 6 dà 1,9·10⁻⁶, contro 0,0002428. La demo deve usare la formula con la Poisson.
- **Tabelle del §11** (ricalcolate: coincidono cifra per cifra):

  | q = 0,1 | P | | q = 0,3 | P |
  |---|---|---|---|---|
  | z = 0 | 1,0000000 | | z = 0 | 1,0000000 |
  | z = 1 | 0,2045873 | | z = 5 | 0,1773523 |
  | z = 2 | 0,0509779 | | z = 10 | 0,0416605 |
  | z = 3 | 0,0131722 | | z = 15 | 0,0101008 |
  | z = 4 | 0,0034552 | | z = 20 | 0,0024804 |
  | z = 5 | 0,0009137 | | z = 25 | 0,0006132 |
  | z = 6 | 0,0002428 | | z = 30 | 0,0001522 |
  | z = 7 | 0,0000647 | | z = 35 | 0,0000379 |
  | z = 8 | 0,0000173 | | z = 40 | 0,0000095 |
  | z = 9 | 0,0000046 | | z = 45 | 0,0000024 |
  | z = 10 | 0,0000012 | | z = 50 | 0,0000006 |

  **z necessario per P < 0,1%:** q = 0,10 → **z = 5**; 0,15 → 8; 0,20 → 11; 0,25 → 15; q = 0,30 → **z = 24**; 0,35 → 41; 0,40 → 89; 0,45 → 340.
- **Cosa non può fare l'attaccante (§11):** "Nodes are not going to accept an invalid transaction as payment … An attacker can only try to change one of his own transactions to take back money he recently spent."

### 3. PoW e PoS, finalità, 6 conferme

- **PoW (whitepaper §4):** "scanning for a value that when hashed, such as with SHA-256, the hash begins with a number of zero bits". Il lavoro richiesto cresce in modo esponenziale; per verificarlo basta un solo hash.
- **PoS (ethereum.org):** per diventare validatore "a user must deposit 32 ETH into the deposit contract". Il tempo è diviso in "slots (12 seconds) and epochs (32 slots)". https://ethereum.org/developers/docs/consensus-mechanisms/pos/
- **The Merge:** "The Merge was executed on September 15, 2022." Consumo energetico: "The Merge reduced Ethereum's energy consumption by ~99.95%" (https://ethereum.org/roadmap/merge/). Attenzione: la pagina sull'energia dello stesso sito cita un dato diverso, dallo studio CCRI: "more than 99.988%", e un consumo annuo stimato di "2,601 MWh (0.0026 TWh)" (https://ethereum.org/energy-consumption/). In slide: "oltre il 99,9%", indicando quale delle due fonti si usa.
- **Slashing:** "some or all of their staked ETH can be destroyed". Le cause: "proposing multiple blocks in a single slot (equivocating) and submitting contradictory attestations". La penalità va da "less than 0.1% stake for a single validator slashed on their own" fino al "100% of the validator's stake" in caso di slashing di massa. https://ethereum.org/developers/docs/consensus-mechanisms/pos/
- **Finalità probabilistica e finalità deterministica:**
  - **Bitcoin**, probabilistica: il rischio di un ribaltamento cala in modo esponenziale con le conferme (tabella del §11), ma non arriva mai a zero. bitcoin.org: "Transactions do not become irreversible immediately." https://bitcoin.org/en/you-need-to-know
  - **Ethereum PoS**, finalità "economica": un checkpoint è definitivo quando riceve i voti di "at least two-thirds of the total staked ETH". "It takes about 15 minutes for an Ethereum block to finalize", cioè due epoche (https://ethereum.org/roadmap/single-slot-finality/). Glossario: "Finality is the guarantee that a set of transactions cannot be changed without a huge amount of ETH being lost."
  - **Blockchain BFT (IOTA):** una volta confermato il blocco è definitivo, se meno di un terzo dello stake è disonesto (vedi §1).
- **Convenzione delle 6 conferme.** Non è nel whitepaper. La tabella di bitcoin.org indica 6 conferme come "Minimum recommendation for high-value bitcoin transfers", 30 come "Recommendation during emergencies to allow human intervention". Con blocchi da 10 minuti, 6 conferme sono circa un'ora. Per q = 0,1 e z = 6 il §11 dà P ≈ 0,024%.

### 4. Attacco del 51%

- **Definizione corretta:** "chi controlla la maggioranza della potenza di calcolo (PoW) o dello stake (PoS) può riscrivere la storia recente: annullare i propri pagamenti (doppia spesa) e censurare transazioni. Non può spendere monete altrui né creare monete dal nulla" (whitepaper §11, citato sopra). Il glossario di ethereum.org ("gains control of the majority of nodes") è impreciso: non conta il numero di nodi, conta la potenza di calcolo o lo stake.
- **Soglie in Ethereum PoS** (https://ethereum.org/developers/docs/consensus-mechanisms/pos/attack-and-defense/):
  - con un terzo dello stake: "a 2/3 supermajority cannot exist and the chain cannot finalize";
  - con il 34%: "could cause double finality", ma l'attaccante perde lo stake per slashing;
  - con il 51%: "the attacker could dominate the fork choice algorithm";
  - con il 66%: "can finalize their preferred chain".

  In tutti questi casi la difesa ultima è sociale: la comunità può scegliere una catena alternativa.
- **"La maggioranza non basta".** Con il *selfish mining* un gruppo di miner guadagna più della sua quota anche senza avere la maggioranza: "This threshold is lower than the wrongly assumed 1/2 bound". Fonte: I. Eyal, E. G. Sirer, "Majority is not Enough: Bitcoin Mining is Vulnerable", 2013: https://arxiv.org/abs/1311.0243
- **Esempio recente e documentato: Ethereum Classic, agosto 2020.** Tre attacchi in un mese. Il rapporto ufficiale dell'ETC Cooperative per il consiglio di agosto 2020 scrive: "three separate 51% attacks between July 31st and August 29th with millions of dollars double-spent". I tre attacchi:
  - 31 luglio: riorganizzazione di circa 3.600 blocchi (circa 12 ore di mining);
  - 6 agosto: circa 4.200 blocchi (circa 15 ore);
  - 29 agosto: circa 7.000 blocchi (circa 2 giorni).

  Fonte: https://etccooperative.org/ETC-Coop-Board-Package-August-2020.pdf

  Per il primo attacco l'analisi on-chain di Bitquery è precisa. Biforcazione al blocco 10.904.146; sostituiti i blocchi da 10.904.147 a 10.907.761. "The attacker double-spent 807,260 ETC ($5.6 million) and paid about 17.5 BTC ($192K at the time) for the hash power." La vittima era l'exchange OKEx. https://bitquery.io/blog/attacker-stole-807k-etc-in-ethereum-classic-51-attack

  Messaggio per il giurista: l'attacco è costato circa 192 mila dollari e ne ha resi circa 5,6 milioni.

### 5. Modelli UTXO, ad account e a oggetti

| | Bitcoin (UTXO) | Ethereum (account) | IOTA / Sui (oggetti Move) |
|---|---|---|---|
| Che cosa si possiede | Uscite non spese di transazioni precedenti: "Each output then waits as an Unspent Transaction Output (UTXO) until a later input spends it." | Un account con saldo, nonce, e codice e memoria se è un contratto. EOA: "controlled by anyone with the private keys"; contract account: "controlled by code". | Oggetti: "The fundamental unit of storage on IOTA is the object." |
| Come si spende | Gli ingressi indicano le uscite precedenti (transazione e numero d'ordine dell'uscita) e le soddisfano con la firma. | Il mittente firma; il nonce ordina le transazioni. | La transazione usa oggetti precisi (ID e versione); per gli oggetti con proprietario firma il proprietario. |
| Dati di ogni elemento | Importo e condizione di spesa (script). | Saldo, nonce, codeHash, storageRoot. | ID (32 byte, ricavato dalla transazione che lo ha creato), versione ("increases monotonically with every transaction that modifies the object"), proprietario (campo di 33 byte), digest dell'ultima transazione. |
| Fonte | https://developer.bitcoin.org/devguide/transactions.html | https://ethereum.org/developers/docs/accounts/ | https://docs.iota.org/developer/iota-101/objects/object-model ; https://docs.sui.io/concepts/object-model |

Tipi di proprietà degli oggetti IOTA: posseduti da un indirizzo ("tied to a specific 32-byte address"), condivisi ("not restricted to a single owner"), immutabili ("cannot be altered, transferred, or deleted"), avvolti dentro un altro oggetto. Fonte: https://docs.iota.org/developer/iota-101/objects/object-ownership/

### 6. Alberi di Merkle e client leggeri (SPV)

- **Whitepaper §7:** "transactions are hashed in a Merkle Tree, with only the root included in the block's hash." Così i nodi possono cancellare le vecchie transazioni senza rompere l'hash del blocco. Sul peso dei soli header: "A block header with no transactions would be about 80 bytes … 80 bytes * 6 * 24 * 365 = 4.2MB per year."
- **Dettaglio tecnico (developer guide):** gli identificativi delle transazioni si accoppiano e si sottopongono a doppio SHA-256, livello dopo livello. "If there are an odd (non-even) number of TXIDs, the last TXID is concatenated with a copy of itself and hashed." L'header è "serialized in the 80-byte format". https://developer.bitcoin.org/reference/block_chain.html
- **Whitepaper §8 (SPV):** "It is possible to verify payments without running a full network node. A user only needs to keep a copy of the block headers of the longest proof-of-work chain … and obtain the Merkle branch linking the transaction to the block it's timestamped in." Il limite: "the verification is reliable as long as honest nodes control the network". Il client leggero vede che un nodo ha accettato la transazione, ma non la verifica da sé ("He can't check the transaction for himself"). La developer guide aggiunge: "This does not guarantee validity of the transactions that are embedded." https://developer.bitcoin.org/devguide/operating_modes.html

### 7. BIP-39 (parole di recupero) e BIP-32 (wallet HD)

- **BIP-39** (stato: *Deployed*), https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki:
  - entropia: "The allowed size of ENT is 128-256 bits", in multipli di 32 bit;
  - checksum: "taking the first ENT / 32 bits of its SHA256 hash";
  - parole: "split into groups of 11 bits, each encoding a number from 0-2047, serving as an index into a wordlist".

  | ENT (bit) | CS (bit) | parole |
  |---|---|---|
  | 128 | 4 | 12 |
  | 160 | 5 | 15 |
  | 192 | 6 | 18 |
  | 224 | 7 | 21 |
  | 256 | 8 | 24 |

- **Dalla frase al seme:** "we use the PBKDF2 function with a mnemonic sentence (in UTF-8 NFKD) used as the password and the string "mnemonic" + passphrase … used as the salt. The iteration count is set to 2048 and HMAC-SHA512 is used as the pseudo-random function. The length of the derived key is 512 bits (= 64 bytes)."
- **Lista italiana:** esiste, 2048 parole, da "abaco" a "zuppa": https://github.com/bitcoin/bips/blob/master/bip-0039/italian.txt (elenco delle liste: https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md). Il BIP però avverte: "it is **strongly discouraged** to use non-English wordlists". Tra i difetti elencati dal BIP: "translating the mnemonic to a different wordlist necessarily creates a completely different seed". Con entropia tutta a zero la lista italiana dà "abaco ×11 abete", che è un calcolo mio, non un vettore ufficiale, e produce un seme diverso.
- **Vettore di prova ufficiale** (i test ufficiali usano la passphrase "TREZOR"): https://github.com/trezor/python-mnemonic/blob/master/vectors.json

  ```
  entropia 0x00000000000000000000000000000000 (128 bit)
  → "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"
  seme (passphrase "TREZOR") = c55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e53495531f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04
  seme (senza passphrase)    = 5eb00bbddcf069084889a8ab9155568165f5c453ccb85e70811aaed6f6da5fc19a5ac40b389cd370d086206dec8aa6c43daea6690f20ad3d8d48b2d2ce9e38e4
  ```

  Ricalcolati entrambi: la frase e il seme "TREZOR" coincidono con il file ufficiale. "about" è giusto perché i 4 bit di checksum sono `0011`: SHA-256 dell'entropia nulla inizia con `0x37`. Con 256 bit a zero la frase è "abandon ×23 **art**" (anche questa nel file ufficiale).
- **BIP-32 (wallet HD)**, https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki:
  - un unico seme genera un albero di chiavi: "a system for deriving a tree of keypairs from a single seed";
  - seme: "between 128 and 512 bits; 256 bits is advised";
  - chiave master: "I = HMAC-SHA512(Key = "Bitcoin seed", Data = S)";
  - ogni chiave ha 2^31 figli normali e 2^31 figli "hardened". Una chiave pubblica estesa permette di derivare solo i figli normali.

### 8. secp256k1, ECDSA, Schnorr e Taproot

- **secp256k1:** la curva y² = x³ + 7 sul campo con p = 2^256 − 2^32 − 977, definita in SEC 2 (https://www.secg.org/sec2-v2.pdf). Ordine n = 115792089237316195423570985008687907852837564279074904382605163141518161494337 (Yellow Paper, App. F). La usano sia Bitcoin sia Ethereum; questi parametri li ho usati io stesso per ricalcolare la p. 26.
- **ECDSA:** usata da Bitcoin fino a Taproot e ancora oggi da Ethereum. Le firme in formato DER sono "variable size, and up to 72 bytes" (BIP-340).
- **Schnorr (BIP-340):** "a standard for 64-byte Schnorr signatures over the elliptic curve secp256k1", con chiavi pubbliche di 32 byte ("x-only"). Le firme sono lineari e permettono la verifica in blocco ("batch verification"). https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki
- **Taproot (BIP-341, "SegWit version 1 spending rules"):** BIP-341 scrive: "The deployment did activate at height 709632 on Bitcoin mainnet." Il blocco 709.632 ha come orario il **14 novembre 2021, 05:15:27 UTC** (https://mempool.space/block/709632). Prima dell'attivazione serviva il segnale del 90% dei blocchi (1815 su 2016). https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki

### 9. Bitcoin: dati chiave (al 10 novembre 2026)

| Dato | Valore | Fonte |
|---|---|---|
| Tempo obiettivo tra due blocchi | 10 minuti (`nPowTargetSpacing = 10 * 60`). La difficoltà si ricalcola ogni 2016 blocchi, puntando a due settimane (`nPowTargetTimespan`). Media reale dal blocco 840.000: 9,95 minuti (calcolata da me). | https://github.com/bitcoin/bitcoin/blob/master/src/kernel/chainparams.cpp ; https://developer.bitcoin.org/devguide/block_chain.html |
| Dimezzamento (halving) | Ogni 210.000 blocchi: `nSubsidyHalvingInterval = 210000`. Commento nel codice: "Subsidy is cut in half every 210,000 blocks which will occur approximately every 4 years". | https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp (`GetBlockSubsidy`) |
| 3° halving | Blocco 630.000, 11 maggio 2020 (orario del blocco 19:23:43 UTC); la ricompensa passa a 6,25 BTC. | https://mempool.space/block/630000 |
| 4° halving | Blocco **840.000**, **20 aprile 2024** (orario del blocco 00:09:27 UTC); la ricompensa passa a **3,125 BTC**. | https://mempool.space/block/840000 |
| Prossimo halving | Blocco 1.050.000 (1,5625 BTC), stimato intorno ad **aprile 2028**: mancano 74.680 blocchi a circa 10 minuti l'uno. È una stima. | calcolo da https://mempool.space/api/blocks/tip/height (975.320 il 10/11/2026) |
| Limite massimo | Circa 21 milioni; il valore esatto è **20.999.999,9769 BTC** (2.099.999.997.690.000 satoshi). Calcolato sommando le ricompense come fa `GetBlockSubsidy`, che dimezza con arrotondamento per difetto; l'ultima ricompensa sarà al blocco 6.929.999, intorno al 2140. Il codice avverte che `MAX_MONEY = 21'000'000 * COIN` "is *not* the total money supply … but rather a sanity check". | https://github.com/bitcoin/bitcoin/blob/master/src/consensus/amount.h |
| BTC emessi a oggi | Circa **20,11 milioni** (circa il 95,8% del massimo). blockchain.info riporta 20.110.356 BTC; il mio calcolo al blocco 975.320 dà 20.110.378 BTC teorici. Il valore teorico include i 50 BTC non spendibili del blocco iniziale e non toglie le monete perse. | https://blockchain.info/q/totalbc |
| Nodi raggiungibili | Circa **20.800** (fotografia del 10/11/2026, 15:42 UTC: 20.826 nodi raggiungibili, 20.561 verificati). Dei 20.561: circa 9.500 su Tor, circa 10.400 IPv4, circa 650 IPv6. **Attenzione:** l'API di bitnodes.io ora rimanda a btcnodes.io. La home page dice che il servizio "was created and operated by Addy Yeow" e ora "is currently operated and maintained by Rodrigo Martínez" come "independent rebuild": la serie non è confrontabile con quella storica. Contano solo i nodi che accettano connessioni in entrata: quelli totali sono di più. | https://btcnodes.io/api/v1/snapshots/latest/ ; https://bitnodes.io/ |

### 10. Trilemma, Lightning Network, rollup

- **Trilemma della blockchain (Vitalik Buterin):** una blockchain vorrebbe tre proprietà, ma "if you stick to "simple" techniques, you can only get two of those three". Le tre proprietà:
  - **scalabilità**: "the chain can process more transactions than a single regular node (think: a consumer laptop) can verify";
  - **decentralizzazione**: "the chain can run without any trust dependencies on a small group of large centralized actors";
  - **sicurezza**: "the chain can resist a large percentage of participating nodes trying to attack it".

  Fonte: V. Buterin, "Why sharding is great: demystifying the technical properties", 7 aprile 2021: https://vitalik.eth.limo/general/2021/04/07/sharding.html
- **Lightning Network, in una riga:** una rete di canali di pagamento tra due parti, i cui trasferimenti avvengono fuori dalla blockchain e si regolano sulla blockchain solo all'apertura, alla chiusura o in caso di lite. Nel paper: "transactions are sent over a network of micropayment channels … whose transfer of value occurs off-blockchain", e i contratti sono "enforceable via broadcast over the bitcoin blockchain". Fonte: J. Poon, T. Dryja, "The Bitcoin Lightning Network: Scalable Off-Chain Instant Payments", 14 gennaio 2016: https://lightning.network/lightning-network-paper.pdf
- **Rollup, in una riga:** "Rollups perform transaction execution outside layer 1 and then the data is posted to layer 1 where consensus is reached." Due tipi: gli *optimistic rollup* presumono valide le transazioni e ricalcolano solo se qualcuno le contesta; gli *zk-rollup* inviano una prova crittografica di validità. https://ethereum.org/developers/docs/scaling/

### 11. Prove a conoscenza zero (ZKP)

- **Articolo fondativo:** S. Goldwasser, S. Micali, C. Rackoff, "The Knowledge Complexity of Interactive Proof-Systems", *STOC '85*, pp. 291–304, 1985 (https://doi.org/10.1145/22145.22178); versione su rivista in *SIAM J. Comput.* 18(1):186–208, 1989 (https://doi.org/10.1137/0218012). Copia scansionata sul sito di Micali: https://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf
- **Definizione citabile** (abstract della versione SIAM, letto tramite Crossref: https://api.crossref.org/works/10.1137/0218012): "Zero-knowledge proofs are defined as those proofs that convey no additional knowledge other than the correctness of the proposition in question."
- **La caverna di Ali Babà:** J.-J. Quisquater, L. C. Guillou e le loro famiglie, "How to Explain Zero-Knowledge Protocols to Your Children", in *Advances in Cryptology — CRYPTO '89 Proceedings* (a cura di G. Brassard), LNCS 435, Springer, **1990** (convegno del 1989), pp. 628–631. Ad accesso libero: https://link.springer.com/chapter/10.1007/0-387-34805-0_60. Inizio del testo: "Know, oh my children, that very long ago, in the Eastern city of Baghdad, there lived an old man named Ali Baba … This is a story which is partly about Ali Baba, and partly also about a cave".

---

## Da ricontrollare prima della lezione

1. **Sostituire `iotaplay.app`** (p. 31): il dominio non è più registrato. Scegliere e **provare dal vivo** lo strumento che lo sostituisce. Candidati: la guida https://docs.iota.org/developer/getting-started, la Move CTF https://docs.iota.org/developer/iota-move-ctf/introduction, oppure un playground proprio.
2. **Nightly su IOTA:** il supporto è dichiarato dal produttore (nightly.app/wallet/iota). Provare la connessione alla rete che si userà in aula (mainnet o testnet). In alternativa, l'estensione ufficiale IOTA Wallet.
3. **Coerenza tra teoria e pratica:** gli indirizzi IOTA che gli studenti vedranno hanno 32 byte (64 cifre esadecimali, BLAKE2b, Ed25519), non i 20 byte di Ethereum delle pp. 26–27. Dirlo in aula (vedi N5).
4. **p. 28:** decidere se tenere l'esempio legacy (scrivendo "formato precedente al 2016") o passare a una transazione di tipo 2 (EIP-1559). Non presentarlo come firmato dalla chiave di "Bob" della p. 26: il mittente ricavato dalla firma è un altro (N4).
5. **Dati che cambiano ogni giorno:** BTC emessi, numero di nodi, altezza della catena, data del prossimo halving. Aggiornarli il giorno della lezione. Per i nodi scegliere la fonte (btcnodes.io, la nuova gestione di bitnodes) e citarla con la data.
6. **Risparmio energetico di The Merge:** ethereum.org riporta sia "~99.95%" (pagina The Merge) sia ">99.988%" (CCRI, pagina sull'energia). Usarne uno solo, con la sua fonte, oppure scrivere "oltre il 99,9%".
7. **ETC 2020, secondo attacco:** gli importi non coincidono. Bitquery parla di 1,68 milioni di dollari; secondo il rapporto dell'ETC Cooperative, Coinbase ne indicava 3,2. L'analisi di Coinbase non sono riuscito a leggerla (403). In slide citare solo il primo attacco (807.260 ETC, circa 5,6 milioni di dollari), che è il più documentato.
8. **Link della p. 26–27** (`asecuritysite.com/encryption/ethadd`): risponde 403 agli strumenti automatici. Aprirlo nel browser.
9. **Definizione di P2P di Schollmeier (p. 10–11):** ho verificato solo i dati bibliografici. IEEE Xplore non si apre in modo automatico (202). Se si vuole citare la frase esatta, leggerla dal PDF.
10. **Prima comparsa del termine "trilemma":** ho verificato il post di Buterin del 2021, non le eventuali comparse precedenti. Se in slide si mette una data di origine, va verificata.
11. **Definizioni UE di DLT (MiCA, Reg. 2023/1114, art. 3):** EUR-Lex ha risposto 202 (controllo anti-bot) e non ho potuto leggere il testo. Per una citazione europea accanto all'art. 8-ter d.l. 135/2018, leggerla direttamente.
12. **Link GitHub (BIP e codice di Bitcoin Core):** in un controllo intermedio hanno risposto 503 per un limite temporaneo di GitHub; nel controllo finale rispondono tutti 200. Nessuna azione richiesta.
13. **Slide interattiva dell'hash:** verificare che `utils/crypto.ts` calcoli SHA-256 sui byte UTF-8 senza a capo finale, così da mostrare `EDF1…37F4` e `B075…8F0B`.

---

## Appendice: stato HTTP degli URL citati (controllo del 10/11/2026, `curl -L`)

✓ = 200. Gli altri codici sono spiegati nella nota.

| URL | HTTP | Nota |
|---|---|---|
| https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf | 200 ✓ | |
| https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legislativo:2005-03-07;82~art1 | 200 ✓ | |
| https://www.normattiva.it/uri-res/N2Ls?urn:nir:stato:decreto.legge:2018-12-14;135~art8ter | 200 ✓ | |
| https://lamport.azurewebsites.net/pubs/time-clocks.pdf | 200 ✓ | |
| https://doi.org/10.1145/359545.359563 | 403 | ACM DL blocca i client automatici; dati verificati via Crossref |
| https://doi.org/10.1109/P2P.2001.990434 | 202 | IEEE Xplore (controllo anti-bot) |
| https://api.crossref.org/works/10.1109/P2P.2001.990434 | 200 ✓ | |
| https://doi.org/10.7249/RM3420 | 403 | rand.org blocca i client automatici |
| https://api.crossref.org/works/10.7249/RM3420 | 200 ✓ | |
| https://bitcoin.org/bitcoin.pdf | 200 ✓ | |
| https://bitcoin.org/en/you-need-to-know | 200 ✓ | |
| https://developer.bitcoin.org/devguide/transactions.html | 200 ✓ | |
| https://developer.bitcoin.org/devguide/block_chain.html | 200 ✓ | |
| https://developer.bitcoin.org/devguide/operating_modes.html | 200 ✓ | |
| https://developer.bitcoin.org/reference/block_chain.html | 200 ✓ | |
| https://ethereum.github.io/yellowpaper/paper.pdf | 200 ✓ | versione "Shanghai", 2025-02-04 |
| https://ethereum.org/developers/docs/accounts/ | 200 ✓ | |
| https://ethereum.org/developers/docs/transactions/ | 200 ✓ | |
| https://eips.ethereum.org/EIPS/eip-55 | 200 ✓ | |
| https://eips.ethereum.org/EIPS/eip-155 | 200 ✓ | |
| https://eips.ethereum.org/EIPS/eip-1559 | 200 ✓ | |
| https://www.secg.org/sec2-v2.pdf | 200 ✓ | |
| https://asecuritysite.com/encryption/ethadd | 403 | da aprire nel browser |
| https://miro.medium.com/max/1142/1*4Ta0bUfCEmgH4kOrNl8mKg.png | 200 ✓ | rimanda a /v2/resize:fit:1142/… |
| https://blog.chain.link/blockchain-trust-model/ | 200 ✓ | rimanda a chain.link/blog/blockchain-trust-model |
| https://nightly.app/download | 200 ✓ | |
| https://nightly.app/wallet/iota | 200 ✓ | |
| https://iotaplay.app/ | 000 ✗ | il nome non si risolve nei DNS |
| https://rdap.org/domain/iotaplay.app | 404 | il registro .app risponde "iotaplay.app not found": il dominio non è registrato |
| https://docs.iota.org/users/iota-wallet/getting-started | 200 ✓ | |
| https://docs.iota.org/developer/getting-started | 200 ✓ | |
| https://docs.iota.org/developer/iota-move-ctf/introduction | 200 ✓ | |
| https://docs.iota.org/developer/cryptography/transaction-auth/keys-addresses | 200 ✓ | |
| https://docs.iota.org/developer/iota-101/objects/object-model | 200 ✓ | |
| https://docs.iota.org/developer/iota-101/objects/object-ownership/ | 200 ✓ | |
| https://docs.iota.org/about-iota/iota-architecture/consensus | 200 ✓ | |
| https://docs.sui.io/concepts/object-model | 200 ✓ | rimanda a /develop/sui-architecture/object-model |
| https://lamport.azurewebsites.net/pubs/byz.pdf | 200 ✓ | |
| https://www.microsoft.com/en-us/research/publication/byzantine-generals-problem/ | 200 ✓ | |
| https://doi.org/10.1145/357172.357176 | 403 | ACM DL; dati verificati via https://api.crossref.org/works/10.1145/357172.357176 (200 ✓) |
| https://groups.csail.mit.edu/tds/papers/Lynch/jacm88.pdf | 200 ✓ | |
| https://doi.org/10.1145/42282.42283 | 403 | ACM DL |
| https://ethereum.org/roadmap/merge/ | 200 ✓ | |
| https://ethereum.org/energy-consumption/ | 200 ✓ | |
| https://ethereum.org/developers/docs/consensus-mechanisms/pos/ | 200 ✓ | |
| https://ethereum.org/developers/docs/consensus-mechanisms/pos/attack-and-defense/ | 200 ✓ | |
| https://ethereum.org/roadmap/single-slot-finality/ | 200 ✓ | |
| https://ethereum.org/glossary/ | 200 ✓ | |
| https://etccooperative.org/ETC-Coop-Board-Package-August-2020.pdf | 200 ✓ | |
| https://bitquery.io/blog/attacker-stole-807k-etc-in-ethereum-classic-51-attack | 200 ✓ | |
| https://arxiv.org/abs/1311.0243 | 200 ✓ | |
| https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki | 200 ✓ | un controllo intermedio aveva dato 503 (limite temporaneo di GitHub) |
| https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md | 200 ✓ | come sopra |
| https://github.com/bitcoin/bips/blob/master/bip-0039/italian.txt | 200 ✓ | come sopra |
| https://github.com/trezor/python-mnemonic/blob/master/vectors.json | 200 ✓ | come sopra |
| https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki | 200 ✓ | come sopra |
| https://github.com/bitcoin/bips/blob/master/bip-0340.mediawiki | 200 ✓ | come sopra |
| https://github.com/bitcoin/bips/blob/master/bip-0341.mediawiki | 200 ✓ | come sopra |
| https://github.com/bitcoin/bitcoin/blob/master/src/validation.cpp | 200 ✓ | |
| https://github.com/bitcoin/bitcoin/blob/master/src/kernel/chainparams.cpp | 200 ✓ | |
| https://github.com/bitcoin/bitcoin/blob/master/src/consensus/amount.h | 200 ✓ | |
| https://github.com/bitcoin/bitcoin/blob/master/src/consensus/consensus.h | 200 ✓ | |
| https://mempool.space/block/709632 | 200 ✓ | |
| https://mempool.space/block/630000 | 200 ✓ | |
| https://mempool.space/block/840000 | 200 ✓ | |
| https://mempool.space/api/blocks/tip/height | 200 ✓ | 975320 il 10/11/2026 |
| https://blockchain.info/q/totalbc | 200 ✓ | 2011035600000000 satoshi |
| https://btcnodes.io/api/v1/snapshots/latest/ | 200 ✓ | |
| https://bitnodes.io/ | 200 ✓ | gestore cambiato (vedi §9) |
| https://vitalik.eth.limo/general/2021/04/07/sharding.html | 200 ✓ | |
| https://lightning.network/lightning-network-paper.pdf | 200 ✓ | |
| https://ethereum.org/developers/docs/scaling/ | 200 ✓ | |
| https://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf | 200 ✓ | scansione, senza testo selezionabile |
| https://doi.org/10.1145/22145.22178 | 403 | ACM DL |
| https://doi.org/10.1137/0218012 | 403 | SIAM; abstract letto via https://api.crossref.org/works/10.1137/0218012 (200 ✓) |
| https://link.springer.com/chapter/10.1007/0-387-34805-0_60 | 200 ✓ | accesso libero |
