---
layout: capo
capo: VI
sezione: Tokenomics e monete digitali
---

# Tokenomics e monete digitali

Chi crea la moneta, chi la garantisce, chi la può bloccare

---
piattaforma: 7
---

# Bitcoin: una moneta a offerta fissa

<SchemaHalving />

<!--
Il premio per blocco si dimezza ogni 210.000 blocchi: 50, 25, 12,5, 6,25 e, dal 20 aprile 2024 (blocco 840.000), 3,125 BTC. Il totale tende a 21 milioni, in realtà 20.999.999,9769 BTC per l'arrotondamento ai satoshi. Prossimo dimezzamento stimato: aprile 2028. Il 10/11/2026 i bitcoin già emessi sono circa 20,11 milioni.
-->

---
piattaforma: 7
---

# Chi fa rispettare la politica monetaria di Bitcoin?

<div v-click>

<PremioMiner />

</div>

<p class="lead" v-click>Nessuna banca centrale: ogni nodo rifà il conto, e un miner che si paga troppo vede il suo blocco rifiutato.</p>

<!--
Bitcoin Core, src/validation.cpp (licenza MIT), funzione GetBlockSubsidy. Al blocco 975.328 (10/11/2026) halvings = 4, premio 3,125 BTC. Nella validazione: "coinbase pays too much" se il miner incassa più di commissioni + premio.
Curiosità da sviluppatore: MAX_MONEY (21 milioni) nel codice "is *not* the total money supply", è solo un controllo di plausibilità.
Per il giurista: la "politica monetaria" di Bitcoin non la decide nessuno; per cambiarla servirebbe che nodi e utenti adottassero un software diverso: chi non aggiorna rifiuterebbe i nuovi blocchi e la catena si dividerebbe (hard fork).
-->

---
piattaforma: 7
---

# Proviamo: il dimezzamento

<div v-click>

<Halving />

</div>

---
piattaforma: 7
---

# Bitcoin oggi

<v-clicks>

- **73.150 dollari** il 10 novembre 2026: −42% dal massimo di 126.080 (6 ottobre 2025)
- Dal gennaio 2024 negli USA si compra anche in Borsa, con un ETF: quello di BlackRock ne detiene per 59,5 miliardi di dollari
- In Italia: Intesa Sanpaolo ha comprato 11 bitcoin nel gennaio 2025, «un test»
- **El Salvador** ha fatto marcia indietro: dal 2025 accettarli è facoltativo

</v-clicks>

<div class="sigle">
  <p v-click="2"><strong>ETF</strong>: Exchange-Traded Fund, fondo quotato in Borsa (quello di BlackRock si chiama IBIT)</p>
</div>

<!--
Fonti: CoinGecko 10/11/2026 16:07 UTC; SEC 10/1/2024 (approvazione degli ETF spot); iShares IBIT al 9/11/2026; Intesa Sanpaolo 14/1/2025; El Salvador, riforma del 29/1/2025 e FMI (Country Report 25/58).
-->

---
piattaforma: 7
---

# Ethereum: si crea e si brucia

<SchemaTokenomicsEthereum />

<div class="sigle">
  <p v-click="3"><strong>ETH</strong>: ether, la moneta di Ethereum</p>
</div>

<!--
EIP-1559 (aggiornamento London, 5 agosto 2021, blocco 12.965.000): la base fee viene bruciata, al miner (dal Merge, al validatore) va solo la mancia. Il primo blocco con base fee aveva esattamente 1 gwei (un miliardesimo di ETH).
The Merge (15 settembre 2022): il blocco 15.537.394 è il primo con difficulty = 0, la fine del mining su Ethereum.
ETH bruciati dal 2021: circa 4,64 milioni al 10/11/2026 (ultrasound.money ed Etherscan, fonti non ufficiali ma concordi). Offerta: circa 122,2 milioni di ETH (CoinGecko), contro circa 120,5 milioni al Merge: oggi se ne crea più di quanti se ne brucino.
-->

---
piattaforma: 7
---

# IOTA: le commissioni si bruciano, i validatori sono pagati a ogni epoca

<SchemaTokenomics />

<!--
Ogni epoca (circa un giorno) il protocollo conia 767.000 IOTA per le ricompense di staking: ai validatori (prima la loro commissione) e a chi ha delegato loro i propri IOTA. Le commissioni di calcolo fino al prezzo di riferimento sono bruciate; il deposito per lo spazio va nel fondo di archiviazione ed è rimborsato al 100% quando i dati si cancellano (lo abbiamo visto nella transazione della classe).
IOTA non ha un'offerta massima fissa: 4,6 miliardi alla nascita della rete attuale (5 maggio 2025), circa 5,02 miliardi il 10/11/2026. Nessun validatore può superare il 10% del potere di voto.
Fonte: docs.iota.org, pagine Tokenomics e Gas Pricing; dati on-chain.
-->

---
piattaforma: 7
---

# Stablecoin: un dollaro sulla blockchain

<SchemaStablecoin />

<p class="lead" v-click>In circolazione: <strong>294 miliardi di dollari</strong>. USDT (Tether) il 60%, USDC (Circle) il 24%; in euro appena lo 0,3%.</p>

<div class="sigle">
  <p v-click="3"><strong>MiCA</strong>: Markets in Crypto-Assets, il regolamento UE sulle cripto-attività (Reg. (UE) 2023/1114)</p>
</div>

<!--
Fonte: DefiLlama 10/11/2026 (293,79 miliardi; USDT 176,27; USDC 70,23). USDC: Circle dichiara rimborso 1:1 in dollari, riserve nel Circle Reserve Fund (fondo monetario registrato presso la SEC, gestito da BlackRock) e in conti bancari. Tether: attestazione BDO al 30/9/2026, riserve in eccesso per 7,95 miliardi.
-->

---
piattaforma: 7
---

# Proviamo: chi può bloccare una stablecoin?

<div v-click>

<CongelaStablecoin />

</div>

<p class="lead" v-click>La sera del furto a Binance: Tether ha bloccato più di 1,5 miliardi, Circle più di 800 milioni. I bitcoin rubati, nessuno ha potuto fermarli.</p>

<!--
Fonti: circlefin/stablecoin-evm, contracts/v1/Blacklistable.sol (licenza Apache-2.0); codice verificato su Etherscan del contratto USDT 0xdAC17F958D2ee523a2206206994597C13D831ec7. CNBC 29–30/10/2026 per i blocchi; circa 2,85 miliardi congelati in tutto secondo Binance (3/11).
Dettagli da sviluppatore: USDT blocca solo chi invia, USDC anche chi riceve; in USDC il blocco è un solo bit nel saldo (| 1 << 255). Il contratto di Circle non ha una funzione per azzerare i saldi altrui, ma è aggiornabile (proxy): l'emittente può sostituirne il codice.
In IOTA lo stesso potere si chiama DenyCap: chi la possiede può impedire a un indirizzo di usare la moneta.
-->

---
piattaforma: 7
---

# MiCA e GENIUS Act: la legge entra nel codice

<v-clicks>

- **UE, MiCA**: rimborso «in qualsiasi momento e al valore nominale» (art. 49), niente interessi (art. 50), almeno il 30% dei fondi su conti bancari separati (art. 54)
- Circle è istituto di moneta elettronica autorizzato in Francia dal 1° luglio 2024: USDC ed EURC sono conformi; USDT no: per l'ESMA gli intermediari UE non dovrebbero più prestare servizi sui token non conformi
- **USA, GENIUS Act** (dal 18 gennaio 2027): può emettere solo chi ha «the technological capability to comply… with the terms of any lawful order» (Sec. 4(a)(6)(B))
- Cioè ordini di «seize, freeze, burn, or prevent the transfer» (Sec. 2(16)): la funzione di blocco diventa un obbligo di legge

</v-clicks>

<div class="sigle">
  <p><strong>GENIUS Act</strong>: la legge USA sulle stablecoin (Guiding and Establishing National Innovation for U.S. Stablecoins, Public Law 119-27, 18 luglio 2025)</p>
  <p v-click="2"><strong>ESMA</strong>: Autorità europea degli strumenti finanziari e dei mercati</p>
</div>

<!--
MiCA: Reg. (UE) 2023/1114, testo italiano della GUUE. Token di moneta elettronica (EMT, ancorati a una valuta) e token collegati ad attività (ART). Per i token significativi i depositi salgono ad almeno il 60% (art. 45, par. 7, lett. b: norme tecniche dell'ABE sulla liquidità del par. 3, che l'art. 58, par. 1, lett. a, estende agli EMT significativi). Regole per le stablecoin dal 30/6/2024, per il resto dal 30/12/2024.
Parere ESMA75-113276571-1742 dell'8/10/2026: niente servizi su token non conformi, nemmeno custodia e trasferimento; tre mesi per adeguarsi.
GENIUS Act: riserve "on an at least 1 to 1 basis" (Sec. 4(a)(1)(A)), divieto di interessi (Sec. 4(a)(11)), capacità di "block, freeze, and reject" (Sec. 4(a)(5)(A)(iv)); si applica dal 18 gennaio 2027.
Per il giurista: in Italia le plusvalenze in cripto-attività sono tassate al 33% dal 2026; al 26% i token di moneta elettronica in euro (L. 199/2025, art. 1, c. 28). Vigilano Consob e Banca d'Italia (d.lgs. 129/2024).
-->

---
piattaforma: 7
---

# Tre monete digitali, tre garanti

<SchemaMoneteDigitali />

<div class="sigle">
  <p v-click="3"><strong>CBDC</strong>: Central Bank Digital Currency, moneta digitale di banca centrale</p>
</div>

---
piattaforma: 7
---

# L'euro digitale: come funzionerebbe

<v-clicks>

- **Offline**, da telefono a telefono, come il contante: «only the payer and the payee would know» (BCE)
- **Limite di detenzione** (art. 16 della proposta): la cifra non c'è; la BCE ha simulato da 500 a 3.000 €, «illustrative»
- **Waterfall** (art. 13): se il saldo non basta si attinge al conto in banca; l'eccedenza torna in banca da sola
- «L'euro digitale **non è moneta programmabile**» (art. 24): ammessi però i pagamenti condizionati, come il pagamento alla consegna

</v-clicks>

<p class="lead mt-4" v-click>La legge è ancora in negoziato; se arriva, pilota dal 2027 con 36 prestatori (7 italiani) e prima emissione possibile nel 2029.</p>

<!--
Fonti: proposta COM(2023) 369 (artt. 13, par. 4; 16; 23; 24; 34–35); BCE, pagine sull'euro digitale e intervento di Cipollone del 6/10/2026 ("The figures are illustrative and do not represent a decision"). Consiglio 19/12/2025, Parlamento 9/7/2026, triloghi dal 13/7/2026. Pilota: 36 prestatori di servizi di pagamento, tra cui MPS, Sella, Isybank, Nexi, Numia, Poste e UniCredit; dal secondo semestre 2027 per 12 mesi.
Differenza con una stablecoin: l'euro digitale è moneta di banca centrale (come il contante), non il debito di un'impresa privata; e per la BCE non sarà programmabile.
-->

---
layout: chiusura
---

# Grazie!

::pillola::

**Mirko Zichichi** · [mirko.zichichi@iota.org](mailto:mirko.zichichi@iota.org) · [mirkozichichi.me](https://mirkozichichi.me)

<div class="qr-chiusura">
  <img src="/img/qr-slide.svg" alt="Codice QR che apre le slide interattive" />
  <p>Le slide interattive: <strong>mirkozichichi.me/slides/smartcontractgiur2026</strong></p>
</div>

<style>
.qr-chiusura { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 0.6rem; }
.qr-chiusura img { width: 6rem; height: 6rem; }
.qr-chiusura p { font-size: 0.85rem; margin: 0; text-align: left; }
</style>
