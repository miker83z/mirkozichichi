# Verifica delle affermazioni

Controllo eseguito il 10 novembre 2026 su fonti primarie (whitepaper di Bitcoin, BIP, EIP, ethereum.org, docs.iota.org e dati on-chain, EUR-Lex, Normattiva, BCE, ESMA, Consob, Banca d'Italia) e, per i dati di mercato, su fonti di dati aperti con la data di rilevazione. I rapporti completi, con citazioni testuali, link e stato HTTP, sono in `verifica/`:

- `verifica/A-basi-consenso.md`: pagine 2–31 del 2025 (hash, firma, sistemi distribuiti, blockchain, transazioni, chiavi) e la teoria aggiunta (generali bizantini, consenso di Nakamoto, PoW/PoS, BIP-39, Taproot, dimezzamento)
- `verifica/B-smart-contract-iota.md`: pagine 32–61 (smart contract, IOTA, gas, tokenomics) e i casi Binance, Bybit, The DAO, MEV, oracoli, blocchi degli stablecoin
- `verifica/C-cripto-mondo-reale.md`: stablecoin, euro digitale, Italia (MiCA, tasse, tokenizzazione), Bitcoin, DeFi, RWA, NFT e DAO, IOTA nel mondo reale, Polymarket, furti
- `verifica/D-esempi-tecnici.md`: GENIUS Act, MiCA (artt. 49, 50, 54), codice di USDC e USDT, euro digitale (proposta COM(2023) 369), aggiornamenti del protocollo IOTA, codice del dimezzamento di Bitcoin, Ethereum (EIP-1559, The Merge, ETH bruciati)
- Le slide di apertura e il Capo I vengono da `../sicurezzagiur2026` e sono verificate nel suo `VERIFICA.md`.
- **Dati reali copiati nelle slide** (10/11/2026): blocchi e transazioni di Bitcoin da mempool.space (blocco 0, blocchi 840.000–840.001, transazioni di Hal Finney e della pizza, indirizzo di genesi); valore depositato nella DeFi da DefiLlama (api.llama.fi); transazione ETgu2fNA… del contratto della classe dalla devnet IOTA (RPC pubblico); offerta di ETH da CoinGecko.

## Correzioni rispetto alla versione 2025

| Pag. 2025 | Affermazione | Nella nuova versione | Fonte |
|---|---|---|---|
| 3 | SHA256(moat) = 98E2…16F3; SHA256(maot) = E671…A9C9 | Valori ricalcolati: edf1eb93…dc737f4 e b075b425…e90b8f0b, mostrati dal vivo | calcolo (rapporto A) |
| 16 | "La transazione è firmata dall'account a cui fa riferimento la precedente" | Vale per Bitcoin (chi spende un'uscita); in Ethereum firma il titolare del conto | whitepaper §2; ethereum.org |
| 26 | Chiave pubblica "two 32-bit integers"; indirizzo = "first 40 bytes" | Due interi da 256 bit; ultimi 20 byte di Keccak-256 | Yellow Paper App. F |
| 29 | SHA256(TX); certificato di Alice e TSP | Ethereum firma Keccak-256 della transazione codificata; nessun certificato (giusto barrarlo) | Yellow Paper |
| 31 | iotaplay.app | Il dominio non esiste più: sostituito dall'app della classe e dal contratto `aula` sulla devnet IOTA | DNS, registro .app |
| 34 | Szabo 1994: "più intelligente dei suoi antenati su carta"; "smart ← intelligere" | Definizione 1994 esatta; "più funzionali" è del 1996 ("No use of artificial intelligence is implied"); etimologia tolta | testi di Szabo; Treccani; Wiktionary |
| 34 | Distributore automatico nel testo del 1994 | Esempio del 1996–1997 | Szabo 1996, 1997 |
| 36 | "la maggioranza (⅔ + 1)" | Più di ⅔ (n ≥ 3f + 1) nel consenso a votazione; maggioranza della potenza di calcolo in Bitcoin | Lamport, Shostak, Pease 1982 |
| 36–37 | Gli smart contract non si possono cambiare | Con la UpgradeCap un pacchetto IOTA si aggiorna; i contratti possono conservare poteri unilaterali (blocchi) | docs.iota.org |
| 43, 48–49 | EOA/CA, messaggi, `msg.sender` (Ethereum/Solidity) | Detto come termini di Ethereum; in IOTA oggetti, pacchetti Move, transazioni programmabili; esempio di voto in Move | docs.iota.org |
| 50 | "La EVM permette…"; il gas "trasferito ai validatori come tassa" | MoveVM; la commissione base è bruciata, solo la mancia va ai validatori; deposito di archiviazione rimborsato al 100%; i validatori sono pagati con 767.000 IOTA per epoca | docs.iota.org Gas Pricing, Tokenomics; dati on-chain epoca 553 |
| 52–57 | Introduzione alla programmazione | Tolta su richiesta del docente | — |
| — | (nuovo) "Una nuova versione del protocollo si attiva con abbastanza quota" | Soglia esatta: 83,34% del potere di voto (quorum 6.667 + metà del resto), v39 attivata il 5/11/2026 | codice iotaledger/iota; RPC mainnet |
| — | (nuovo) Limite di detenzione dell'euro digitale "3.000 €" | La proposta non fissa cifre (art. 16); 500–3.000 € è una simulazione BCE "illustrative" | COM(2023) 369; BCE, 6/10/2026 |

## Seconda revisione (10/11/2026)

Una rilettura completa delle slide, dei componenti, dell'app e dei documenti contro le fonti ha portato a queste correzioni (oltre a quelle dell'apertura, comuni con `../sicurezzagiur2026`):

- **Proof of Stake in IOTA**: niente slashing; chi si comporta male perde le ricompense (docs.iota.org, *tallying rule*). In Ethereum perde parte dello stake.
- **Soglie**: «più di ⅔ del potere di voto», non dei validatori; aggiornamenti del protocollo con almeno l'83,34% (anche in `verifica/B`).
- **Conferme**: nel whitepaper z conta i blocchi dopo quello del pagamento (z = 5 è 6 conferme); le 6 conferme sono una raccomandazione di bitcoin.org, non del whitepaper.
- **Transazione della classe**: costo esatto 0,006358 IOTA (la somma arrotondata non tornava).
- **Seed phrase**: 2¹²⁸ frasi valide (come nella demo), «wallet compatibile»; la frase italiana di prova non è un vettore ufficiale.
- **GDPR**: un indirizzo è un dato personale se la persona è identificabile con mezzi ragionevoli (art. 4, n. 5, cons. 26; EDPB, linee guida 02/2025), non solo dopo il collegamento.
- **Bitcoin**: la transazione della pizza non ha resto (0,99 BTC di commissione); la chiave pubblica nasce da una moltiplicazione sulla curva secp256k1, ECDSA è la firma; il registro è l'elenco delle transazioni, lo stato è il risultato.
- **DeFi e stablecoin**: Aave, 11,8 miliardi prestati e 16,1 ancora nei contratti; il divieto di interessi di MiCA precede Terra (proposta del 2020); GENIUS Act in vigore dal 18/1/2027; il parere ESMA non è vincolante; Ethereum: l'emissione non dipende dal traffico, cambia quanto si brucia.
- **Date**: «oggi» sostituito dalla data (10/11/2026) dove resta nella dispensa.
- **App**: il voto è pubblico (avviso nella scheda), i soprannomi contano i byte (accenti = 2), messaggio corretto con 0 AULA, «explorer».
- **`privacy.md`**: la lavagna è su due slide e legge soltanto; voti e invii sono pubblici e legati al soprannome.
- **Clic**: «Blocchi veri» e il codice del voto avevano clic a vuoto (Vue registra prima i clic interni); ora ogni clic mostra qualcosa.

## Aggiunte del 12/11/2026 (durante la lezione)

- **Slide 3, dati ACN 2026**: eventi gennaio–settembre 2026 = 2.171 (primo semestre) + 305 + 309 + 485 = 3.270; incidenti circa 1.072 + 188 + 185 + 235 ≈ 1.680 (Operational Summary ACN); 2025: 2.729 eventi e 615 incidenti (Relazione annuale ACN 2025). Evento e incidente secondo l'ACN; incidente, quasi-incidente e incidente significativo secondo la NIS2 (art. 6) e il d.lgs. 138/2024 (art. 2).
- **«Tracciare merci e prodotti con IOTA»** (nuova slide dopo la tokenizzazione):
  - la demo dpp.demo.iota.org («DPP with IOTA Trust Framework»): batteria di e-bike, dalla produzione al riciclo; catena di accreditamenti autorità pubblica → produttore → riparatore (Hierarchies), Identity, Notarization, Gas Station, premio in token (github.com/iotaledger/dpp-demonstrator). Nell'esempio di docs.iota.org (*Digital Product Passport*): manutenzione annuale con salute della batteria al 76% e premio di 1 LCC (Lifecycle Credit). La IOTA Foundation la presenta come riferimento concettuale, non come prodotto pronto per la conformità;
  - TWIN e ADAPT: righe 8.1–8.4 di `verifica/C` (ADAPT lanciato il 17/11/2025; primi Paesi Kenya, Marocco, Nigeria dal 19/5/2026; blog.iota.org/first-adapt-implementations);
  - ESPR: regolamento (UE) 2024/1781, in vigore dal 18/7/2024, prodotti e dati fissati dagli atti delegati; passaporto delle batterie: regolamento (UE) 2023/1542, art. 77, dal 18/2/2027 per le batterie dei mezzi di trasporto leggeri, quelle industriali oltre 2 kWh e quelle dei veicoli elettrici (testo dell'art. 77: gesetze.legal/eu/vo_eu_2023_1542/77; da riaprire su EUR-Lex).
- **Sondaggio della classe**: chiuso il 12/11/2026 con `node scripts/aula-sondaggio.mjs --chiudi` (0x41b24a3c…b16d; voti 2, 2, 0, 0).

## Da ricontrollare poco prima della lezione

- **Contratto della classe sulla devnet**: la devnet può essere azzerata; verificare che il pacchetto in `aula/config.json` esista; il sondaggio del 2026 è chiuso (12/11/2026): per una nuova lezione crearne uno nuovo (README). Se la rete è stata azzerata, ripubblicare il pacchetto prima.
- **Riserve di Tether** (7,95 miliardi, attestazione BDO): solo fonte secondaria (verifica/C 1.5); aprire il PDF dell'attestazione.
- **Faucet**: oggi chiede un captcha (Cloudflare Turnstile); provarlo da un telefono sulla rete dell'università.
- **Validatori IOTA** (61 il 10/11/2026) e dati di mercato (Bitcoin, stablecoin, DeFi, RWA): aggiornarli il giorno della lezione.
- **Euro digitale**: i triloghi erano in corso al 10/11/2026; il Consiglio europeo chiede un accordo entro fine 2026.
- **ESMA e USDT**: il termine di tre mesi del parere dell'8/10/2026 scade a inizio gennaio 2027.
- **Binance**: nessun rapporto tecnico ufficiale pubblicato al 10/11/2026; le cifre congelate variano tra 2,7 e 3 miliardi a seconda della fonte e della data.
- **Docs IOTA**: la pagina *Epochs* dice ancora che le commissioni vanno ai validatori, in contrasto con *Gas Pricing* e con i dati on-chain; la slide segue questi ultimi.
- **Energia di Ethereum dopo The Merge**: ethereum.org riporta sia "~99,95%" sia ">99,988%"; la slide (nelle note) usa il primo.
- **Link non leggibili dai client automatici**: coindesk.com (429), fbi.gov e sec.gov (403): aprirli a mano.
