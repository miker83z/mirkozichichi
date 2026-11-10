# Fact-check D — Esempi tecnici "da sviluppatore di protocollo" (GENIUS Act, MiCA, codice delle stablecoin, euro digitale, aggiornamenti di IOTA, halving di Bitcoin, Ethereum)

Verifica eseguita il **10 novembre 2026**, tra le 17:45 e le 18:00 UTC. Lo stato HTTP è stato misurato con `curl` lo stesso giorno, con uno User-Agent generico da browser e senza dati personali nelle intestazioni. "202 (anti-bot)" o "403 (anti-bot)" vuol dire che il sito blocca i client automatici; in quei casi ho letto il testo da una copia ufficiale equivalente, che indico. Le chiamate RPC e GraphQL a IOTA ed Ethereum sono `POST` pubblici, senza chiavi. Quando un numero l'ho calcolato io dai dati della fonte, lo segnalo con "(calcolo mio)". Esiti possibili: **Confermato**, **Confermato (fonte secondaria)**, **Non verificabile**.

Per il codice cito i *permalink* al commit che ho letto, perché i rami `master`/`develop` cambiano.

---

## Le cose che solo uno sviluppatore di protocollo può mostrare

1. **Il GENIUS Act impone per legge una capacità tecnica.** Un emittente USA può emettere solo se ha "the technological capability to comply" con ordini che chiedono di "seize, freeze, burn, or prevent the transfer" di stablecoin (Sec. 2(16) e Sec. 4(a)(6)(B)). Nel codice di USDC questa capacità si chiama `blacklist()`, in quello di USDT `addBlackList()` e `destroyBlackFunds()`.
2. **USDT può azzerare il saldo di un indirizzo bloccato; USDC no.** Nel contratto USDT (2017) c'è una funzione che pone a zero il saldo e riduce l'offerta totale. Nel codice di Circle che ho letto non c'è nessuna funzione per distruggere fondi altrui: si può solo congelare (`blacklist`) o mettere in pausa tutto (`pause`). Però il contratto di Circle sta dietro un *proxy* aggiornabile dall'amministratore.
3. **Un dettaglio che fa capire che "il codice è la regola"**: USDT controlla solo se è bloccato **chi invia** (`require(!isBlackListed[msg.sender])`). USDC controlla **sia chi invia sia chi riceve** (`notBlacklisted(msg.sender)`, `notBlacklisted(to)`).
4. **L'euro digitale "non è moneta programmabile" per legge.** L'art. 24, par. 2, della proposta COM(2023) 369 lo dice in sei parole. I pagamenti **condizionati** invece sono ammessi (art. 24, par. 1), e la BCE fa l'esempio del pagamento alla consegna.
5. **Il limite di detenzione è all'art. 16 della proposta, non all'art. 15.** La proposta non fissa una cifra. I 3.000 € sono solo il massimo di una forbice **ipotetica** (500–3.000 €) che la BCE ha simulato su richiesta del Parlamento: "The figures are illustrative and do not represent a decision" (Cipollone, 6/10/2026).
6. **Euro digitale: 36 PSP selezionati per il pilota, di cui 7 con domanda presentata dall'Italia** (MPS, Banca Sella, Isybank, Nexi, Numia, Poste Italiane, UniCredit; conteggio mio dall'allegato «List of 36 … PSPs selected by the ECB», aggiunto il 15/9/2026 al comunicato del 14/7/2026). Il pilota parte nel secondo semestre 2027 e dura 12 mesi.
7. **Su IOTA un aggiornamento di protocollo richiede l'83,34% del potere di voto, non solo i 2/3.** Nel codice la soglia è "2f+1 + buffer". Il buffer è 5000 punti base, quindi 6.667 + 1.667 = **8.334 su 10.000** (calcolo mio dal codice). Il valore 5000 è confermato dal nodo mainnet. Se la soglia non si raggiunge, la rete resta sulla versione vecchia.
8. **Esempio reale di attivazione**: la versione di protocollo 39 è entrata in vigore su IOTA mainnet **il 5/11/2026 alle 07:42:40 UTC, all'inizio dell'epoca 549**, cioè il primo istante consentito dalle note di rilascio. Oggi (epoca 554) la mainnet è alla **versione 39**; il codice di sviluppo arriva già a 40.
9. **Il "tetto" dei 21 milioni di bitcoin non è scritto in nessuna riga come limite all'emissione.** Nasce da `nSubsidy >>= halvings`, cioè una divisione per due in binario. La costante `MAX_MONEY` è dichiarata nel codice "*not* the total money supply ... but rather a sanity check".
10. **Primo blocco EIP-1559 (12.965.000)**: on-chain la `baseFeePerGas` vale `0x3b9aca00`, cioè **1 gwei esatto**. Il blocco precedente non ha il campo. **ETH bruciati da allora: circa 4,64 milioni** (ultrasound.money e Etherscan concordano entro lo 0,01%). Nelle ultime 24 ore se ne sono bruciati solo 48,6.

---

## 1. GENIUS Act (Public Law 119-27, 18/7/2025)

**Fonte unica per tutti i punti**: testo ufficiale GPO, https://www.govinfo.gov/content/pkg/PLAW-119publ27/html/PLAW-119publ27.htm (200). Copie equivalenti: PDF https://www.govinfo.gov/content/pkg/PLAW-119publ27/pdf/PLAW-119publ27.pdf (200) e scheda https://www.govinfo.gov/app/details/PLAW-119publ27 (200). congress.gov https://www.congress.gov/bill/119th-congress/senate-bill/1582/text risponde 403 (anti-bot).

Intestazione: "Public Law 119-27 ... <<NOTE: July 18, 2025 - [S. 1582]>>" e "This Act may be cited as the ``Guiding and Establishing National Innovation for U.S. Stablecoins Act'' or the ``GENIUS Act''."

### 1.1 Sì: l'emittente deve essere tecnicamente capace di sequestrare, congelare, bruciare o bloccare i token, e di eseguire gli ordini legittimi

**Definizione di "lawful order"**: Sec. 2(16), 12 U.S.C. 5901, 139 Stat. 421.
> "(16) Lawful order.--The term ``lawful order'' means any final and valid writ, process, order, rule, decree, command, or other requirement issued or promulgated under Federal law, issued by a court of competent jurisdiction or by an authorized Federal agency pursuant to its statutory authority, that--
> (A) requires a person to seize, freeze, burn, or prevent the transfer of payment stablecoins issued by the person;
> (B) specifies the payment stablecoins or accounts subject to blocking with reasonable particularity; and
> (C) is subject to judicial or administrative review or appeal as provided by law."

**Obbligo di capacità tecnica come condizione per emettere**: Sec. 4(a)(6)(B), 12 U.S.C. 5903, 139 Stat. 430.
> "(B) Compliance with lawful orders.--A permitted payment stablecoin issuer may issue payment stablecoins only if the issuer has the technological capability to comply, and will comply, with the terms of any lawful order."

La rubrica del par. (6) è "Coordination with permitted payment stablecoin issuers with respect to blocking of property and technological capabilities to comply with lawful orders". Il par. (6)(A) chiede al Tesoro di coordinarsi con l'emittente "to ensure that the permitted payment stablecoin issuer is able to effectively block a payment stablecoin of the foreign person".

**Antiriciclaggio e sanzioni, capacità di blocco**: Sec. 4(a)(5)(A)(iv), 139 Stat. 429. L'emittente è "financial institution" ai fini del Bank Secrecy Act e deve avere:
> "(iv) technical capabilities, policies, and procedures to block, freeze, and reject specific or impermissible transactions that violate Federal or State laws, rules, or regulations;"

**Emittenti esteri**: Sec. 8(a)(1), 12 U.S.C. 5907, 139 Stat. 450.
> "A payment stablecoin that is issued by a foreign payment stablecoin issuer may not be publicly offered, sold, or otherwise made available for trading in the United States by a digital asset service provider unless the foreign payment stablecoin issuer has the technological capability to comply and complies with the terms of any lawful order."

Se l'emittente estero non si adegua entro 30 giorni dalla notifica, il Tesoro pubblica la designazione e vieta il trading secondario negli USA (Sec. 8(b)(1)).

- **Data**: 18/7/2025, approvazione.
- **Esito**: **Confermato**.
- **In parole semplici**: negli USA la "congelabilità" non è una scelta tecnica dell'emittente ma un **requisito di legge** per poter emettere.

### 1.2 Riserve almeno 1:1

Sec. 4(a)(1)(A), 139 Stat. 425:
> "(1) In general.--A permitted payment stablecoin issuer shall-- (A) maintain identifiable reserves backing the outstanding payment stablecoins of the permitted payment stablecoin issuer on an at least 1 to 1 basis, with reserves comprising--"

Seguono le attività ammesse:
- (i) contante e banconote USA, o conto presso la Fed;
- (ii) depositi a vista;
- (iii) "Treasury bills, notes, or bonds" con scadenza residua o originaria di "93 days or less";
- (iv)–(v) pronti contro termine *overnight*;
- (vi) fondi monetari pubblici registrati;
- (vii) altre attività governative liquide approvate;
- (viii) le stesse riserve "in tokenized form".

Collegati:
- Sec. 4(a)(1)(B): politica di rimborso pubblica, con "procedures for timely redemption".
- Sec. 4(a)(1)(C): composizione delle riserve pubblicata **ogni mese**.
- Sec. 4(a)(2): divieto di "pledged, rehypothecated, or reused" le riserve.

- **Esito**: **Confermato**.

### 1.3 Divieto di interessi

Sec. 4(a)(11), 139 Stat. 432:
> "(11) Prohibition on interest.--No permitted payment stablecoin issuer or foreign payment stablecoin issuer shall pay the holder of any payment stablecoin any form of interest or yield (whether in cash, tokens, or other consideration) solely in connection with the holding, use, or retention of such payment stablecoin."

- **Esito**: **Confermato**.
- **Nota**: il divieto riguarda **l'emittente**, che non deve pagare interessi "solely in connection with the holding". MiCA (art. 50, par. 2) lo estende invece **anche ai CASP**, vedi 2.2.

### 1.4 Entrata in vigore

Sec. 20:
> "This Act ... shall take effect on the earlier of (1) the date that is 18 months after the date of enactment of this Act; or (2) the date that is 120 days after the date on which the primary Federal payment stablecoin regulators issue any final regulations implementing this Act."

La data effettiva, **18/1/2027**, è già verificata nel fact-check C (1.10, comunicato OCC del 21/10/2026); qui non l'ho ricontrollata.

- **Esito**: **Confermato** (testo).

---

## 2. MiCA: regole tecniche sui token di moneta elettronica (EMT)

**Fonte**: Reg. (UE) 2023/1114, testo **italiano** ufficiale della GUUE L 150 del 9/6/2023, http://publications.europa.eu/resource/celex/32023R1114 (200, servito da `cellar/01d55833-0660-11ee-b12e-01aa75ed71a1.0013.03/DOC_1`, file `L_2023150IT.01004001.xml`). EUR-Lex https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:32023R1114 risponde **202 (anti-bot, corpo vuoto)**; il contenuto è lo stesso atto.

### 2.1 Art. 49: emissione e rimborso al valore nominale, in qualsiasi momento, senza commissioni

> "2. I possessori di token di moneta elettronica sono titolari di un credito nei confronti degli emittenti di tali token di moneta elettronica.
> 3. Gli emittenti di token di moneta elettronica emettono token di moneta elettronica al valore nominale e dietro ricevimento di fondi.
> 4. Su richiesta di un possessore di un token di moneta elettronica, l'emittente di tale token di moneta elettronica lo rimborsa, in qualsiasi momento e al valore nominale, pagando in fondi diversi dalla moneta elettronica il valore monetario del token di moneta elettronica detenuto al possessore del token di moneta elettronica.
> [...]
> 6. Fatto salvo l'articolo 46, il rimborso dei token di moneta elettronica non è soggetto a commissioni."

Inoltre l'art. 48, par. 2: "I token di moneta elettronica sono considerati moneta elettronica."

- **Esito**: **Confermato**.

### 2.2 Art. 50: divieto di interessi

> "1. In deroga all'articolo 12 della direttiva 2009/110/CE, gli emittenti di token di moneta elettronica non concedono interessi in relazione ai token di moneta elettronica.
> 2. I prestatori di servizi per le cripto-attività non concedono interessi quando prestano servizi per le cripto-attività relativi a token di moneta elettronica.
> 3. Ai fini dei paragrafi 1 e 2, qualsiasi remunerazione o altro beneficio legati alla durata del periodo di detenzione di un token di moneta elettronica da parte del suo possessore sono considerati interessi. [...]"

- **Esito**: **Confermato**.

### 2.3 Art. 54: investimento dei fondi ricevuti

> "I fondi ricevuti dagli emittenti di token di moneta elettronica in cambio di token di moneta elettronica e tutelati conformemente all'articolo 7, paragrafo 1, della direttiva 2009/110/CE sono conformi ai requisiti seguenti:
> a) almeno il 30 % dei fondi ricevuti è sempre depositato in conti separati presso enti creditizi;
> b) i fondi ricevuti rimanenti sono investiti in attività sicure e a basso rischio che sono qualificabili come strumenti finanziari altamente liquidi con un rischio di mercato, di credito e di concentrazione minimi conformemente all'articolo 38, paragrafo 1, del presente regolamento, e sono denominate nella valuta ufficiale di riferimento del token di moneta elettronica."

- **Esito**: **Confermato**.
- **Nota**: la **custodia** della riserva non è all'art. 54. È all'**art. 37**, scritto per gli ART, che si applica agli EMT **significativi** emessi da IMEL tramite l'art. 58, par. 1, lett. a). Vedi 2.4.

### 2.4 Token significativi: artt. 43, 45, 56 e 58

**Soglie, art. 43, par. 1** (richiamate per gli EMT dall'art. 56, par. 1: "almeno tre dei criteri"):
- a) "il numero di possessori ... è superiore a 10 milioni";
- b) valore emesso, capitalizzazione o riserva "superiore a 5 000 000 000 EUR";
- c) operazioni giornaliere medie "superiori a 2,5 milioni di operazioni e a 500 000 000 EUR";
- d) emittente *gatekeeper* ai sensi del DMA;
- e)–g) criteri qualitativi.

**Art. 56, par. 1**: "L'ABE classifica i token di moneta elettronica quali token di moneta elettronica significativi, se almeno tre dei criteri stabiliti all'articolo 43, paragrafo 1, sono soddisfatti". Il par. 6 trasferisce la vigilanza all'ABE.

**Art. 45** (obblighi aggiuntivi per gli ART significativi), i passaggi tecnici:
- par. 2: custodia presso "diversi prestatori di servizi per le cripto-attività ... su base equa, ragionevole e non discriminatoria";
- par. 3: "politica e procedure per la gestione della liquidità";
- par. 4: "prove di stress di liquidità";
- par. 5: fondi propri al "3 % dell'importo medio delle attività di riserva";
- par. 7, lett. b): l'importo minimo dei depositi "non può essere inferiore al 60 % dell'importo di riferimento in ciascuna valuta ufficiale".

**Art. 58, par. 1**:
> "Gli istituti di moneta elettronica che emettono token di moneta elettronica significativi sono soggetti: a) ai requisiti di cui agli articoli 36, 37 e 38 e all'articolo 45, paragrafi da 1 a 4, del presente regolamento, anziché all'articolo 7 della direttiva 2009/110/CE; b) ai requisiti di cui all'articolo 35, paragrafi 2, 3 e 5, e all'articolo 45, paragrafo 5 [...]"

Sempre all'art. 58, par. 1: "l'audit indipendente è prescritto ogni sei mesi".

- **Esito**: **Confermato**.

### 2.5 Circle: USDC ed EURC sono emessi come EMT autorizzati in UE (licenza IMEL francese, 1/7/2024)

**Comunicato Circle del 1/7/2024**, https://www.circle.com/pressroom/circle-is-first-global-stablecoin-issuer-to-comply-with-mica-eus-landmark-crypto-law (200):
> "PARIS – July 1, 2024 – Circle [...] has today announced that it has become the first global stablecoin issuer to achieve compliance with the European Union's landmark Markets in Crypto-Assets (MiCA) regulatory framework. This achievement was enabled by the company's attainment of an Electronic Money Institution (EMI) license [...] from the Autorité de Contrôle Prudentiel et de Résolution (ACPR), the French banking regulatory authority. With this license, both USDC and EURC are now being issued in the EU in compliance with MiCA's regulatory obligations for stablecoins or e-money tokens [...]"

**Riscontro sul registro ufficiale.** ESMA, *Interim MiCA Register*, file EMT https://www.esma.europa.eu/sites/default/files/2024-12/EMTWP.csv (200). Pagina indice: https://www.esma.europa.eu/esmas-activities/digital-finance-and-innovation/markets-crypto-assets-regulation-mica (200, "Last update: 5 November 2026"). Nel CSV ci sono due righe per **Circle Internet Financial Europe SAS** (LEI 969500OYUDADGZKCR583, 4 Rue de Marivaux 75002 Paris):
- autorità: "Autorité de Contrôle Prudentiel et de Resolution (ACPR)";
- tipo: "Electronic money institution";
- data di autorizzazione: **01/07/2024**;
- white paper EURC: https://www.circle.com/fr/legal/mica-eurc-whitepaper (notificato il 01/07/2024, ultimo aggiornamento 24/12/2025);
- white paper USDC: https://www.circle.com/fr/legal/mica-usdc-whitepaper (notificato il 01/07/2024, ultimo aggiornamento 15/09/2026).

- **Esito**: **Confermato** (fonte primaria Circle più registro ESMA).
- **Non verificato**: se l'ABE abbia classificato USDC o EURC come EMT **significativi**. Vedi "Da ricontrollare".

---

## 3. Il codice delle stablecoin: come si "congela" un token

### 3.1 USDC/EURC (Circle): `Blacklistable.sol`

- **Fonte**: https://raw.githubusercontent.com/circlefin/stablecoin-evm/master/contracts/v1/Blacklistable.sol (200).
- **Permalink**: https://github.com/circlefin/stablecoin-evm/blob/574b947dfcfcb5fa05b46d8961ece29e06b14129/contracts/v1/Blacklistable.sol#L71-L74. È l'ultimo commit che ha toccato il file, del 28/10/2024, letto via API GitHub (200).
- **Licenza (righe 2–4)**: "Copyright 2023 Circle Internet Group, Inc. All rights reserved." e "SPDX-License-Identifier: Apache-2.0". Il codice è open source (Apache 2.0) e si può citare.
- **Esito**: **Confermato** per tutti i blocchi di codice di questa sezione.

Righe 67–74:
```solidity
    /**
     * @notice Adds account to blacklist.
     * @param _account The address to blacklist.
     */
    function blacklist(address _account) external onlyBlacklister {
        _blacklist(_account);
        emit Blacklisted(_account);
    }
```

Chi può chiamarla (righe 38–44):
```solidity
    modifier onlyBlacklister() {
        require(
            msg.sender == blacklister,
            "Blacklistable: caller is not the blacklister"
        );
        _;
    }
```

**Dove agisce il blocco.** In `contracts/v1/FiatTokenV1.sol`, righe 287–298 (permalink al commit `46e61d0`, 2/4/2026: https://github.com/circlefin/stablecoin-evm/blob/46e61d0050520f4227cc02ae0d55e8aee3d43fb6/contracts/v1/FiatTokenV1.sol#L287-L298):
```solidity
    function transfer(address to, uint256 value)
        external
        virtual
        override
        whenNotPaused
        notBlacklisted(msg.sender)
        notBlacklisted(to)
        returns (bool)
```

**Come viene salvato il blocco** (dettaglio da sviluppatore). Nella versione attuale `FiatTokenV2_2.sol` il "congelato sì/no" è **il bit più alto del saldo stesso**:
```solidity
        balanceAndBlacklistStates[_account] = _shouldBlacklist
            ? balanceAndBlacklistStates[_account] | (1 << 255)
            : _balanceOf(_account);
```
Il commento nel codice dice: "This flips the high bit for the account to 1, indicating that the account is blacklisted."

**Cosa non c'è.** Ho scaricato tutti i 44 file `.sol` di `contracts/` (esclusi i test) e cercato `wipe`, `destroy`, `seize`, `confiscat`: **nessun risultato**. Circle quindi può congelare (`blacklist`), mettere in pausa l'intero token (`pause()`, `Pausable.sol` riga 70) e sostituire il codice tramite il proxy (`upgradeTo`, `AdminUpgradeabilityProxy.sol` riga 107). Non ha una funzione dedicata per azzerare il saldo di un terzo.

### 3.2 USDT (Tether) su Ethereum: `destroyBlackFunds`

- **Fonte**: Etherscan, codice verificato del contratto `0xdAC17F958D2ee523a2206206994597C13D831ec7`, https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7#code (200).
- **Metadati letti dalla pagina**: Contract Name "TetherToken", Compiler "v0.4.18+commit.9cf6e910", Optimization "No", **License "-NA-"**. Il sorgente non ha intestazione di licenza e comincia con `pragma solidity ^0.4.17;`. Creatore: "Bitfinex: Deployer 5", creato "8 yrs 347 days ago", cioè fine novembre 2017 (calcolo mio).
- **Numerazione righe**: è mia, sul sorgente estratto dalla pagina.
- **Esito**: **Confermato** per tutti i blocchi di codice di questa sezione.

Righe 277–293, contratto `BlackList`:
```solidity
    function addBlackList (address _evilUser) public onlyOwner {
        isBlackListed[_evilUser] = true;
        AddedBlackList(_evilUser);
    }

    function removeBlackList (address _clearedUser) public onlyOwner {
        isBlackListed[_clearedUser] = false;
        RemovedBlackList(_clearedUser);
    }

    function destroyBlackFunds (address _blackListedUser) public onlyOwner {
        require(isBlackListed[_blackListedUser]);
        uint dirtyFunds = balanceOf(_blackListedUser);
        balances[_blackListedUser] = 0;
        _totalSupply -= dirtyFunds;
        DestroyedBlackFunds(_blackListedUser, dirtyFunds);
    }
```

Il blocco sui trasferimenti, righe 336–337 (contratto `TetherToken`), controlla **solo il mittente**:
```solidity
    function transfer(address _to, uint _value) public whenNotPaused {
        require(!isBlackListed[msg.sender]);
```
`transferFrom` (riga 347) controlla `require(!isBlackListed[_from]);`.

Altri poteri dell'`owner`:
- `issue(uint amount)` (riga 402): conia nuovi token sul conto dell'owner;
- `redeem(uint amount)` (riga 416): li distrugge;
- `deprecate(address _upgradedAddress)` (riga 383): commento "deprecate current contract in favour of a new one"; reindirizza tutte le chiamate a un nuovo contratto.

**Lettura giuridica.** Il GENIUS Act parla di "seize, freeze, burn". Nel codice:
- *freeze* = `addBlackList` / `blacklist`;
- *burn* del saldo di un terzo = `destroyBlackFunds` (solo USDT);
- *seize*: in pratica, nei casi pubblici di "sequestro", si combinano congelamento, distruzione e riemissione all'avente diritto tramite `issue`. Questo però è un **uso** delle funzioni: il contratto non ha una funzione "seize".

---

## 4. Euro digitale: scelte tecniche

**Fonti**:
- Proposta di regolamento **COM(2023) 369 final del 28/6/2023**, testo **italiano** su EUR-Lex: https://eur-lex.europa.eu/legal-content/IT/TXT/?uri=CELEX:52023PC0369 (**200**).
- Pagine BCE (tutte 200): FAQ https://www.ecb.europa.eu/euro/digital_euro/faqs/html/ecb.faq_digital_euro.en.html; privacy https://www.ecb.europa.eu/euro/digital_euro/features/privacy/html/index.en.html; caratteristiche https://www.ecb.europa.eu/euro/digital_euro/features/html/index.en.html; pilota https://www.ecb.europa.eu/euro/digital_euro/pilot/html/index.en.html.
- Discorso Cipollone del **6/10/2026**: https://www.ecb.europa.eu/press/key/date/2026/html/ecb.sp261006~0da978f159.en.html (200).
- Comunicato del **14/7/2026**: https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.pr260714~8cd07d9d45.en.html (200), con l'allegato PDF https://www.ecb.europa.eu/press/pr/date/2026/html/ecb.pr260714_annex~c288e08e03.en.pdf (200).

**Numerazione degli articoli verificata sulla proposta**:
- art. 13, par. 4 = collegamento al conto ("waterfall" e "reverse waterfall");
- art. 15 = principi;
- **art. 16 = limiti di detenzione** (non art. 15);
- **art. 23 = online e offline**;
- **art. 24 = pagamenti condizionati e "non è moneta programmabile"**;
- artt. 34–35 = privacy;
- art. 37 = antiriciclaggio offline.

I testi negoziali di Consiglio (dicembre 2025) e Parlamento (luglio 2026) possono avere una numerazione diversa.

### 4.1 Offline, da dispositivo a dispositivo, con privacy come il contante

**Proposta, art. 2, punto 15**:
> "'operazione di pagamento in euro digitale effettuata offline': un'operazione di pagamento in euro digitale, effettuata in prossimità fisica, in cui l'autorizzazione e il regolamento avvengono nei dispositivi di conservazione locale sia del pagatore che del beneficiario"

**Art. 23, par. 1**: "L'euro digitale è disponibile per le operazioni di pagamento in euro digitale effettuate online e offline a partire dalla sua prima emissione."

**Art. 37, par. 2**: "I dati sulle operazioni non sono conservati dai prestatori di servizi di pagamento né dalla Banca centrale europea e dalle banche centrali nazionali." Il par. 3 aggiunge che i PSP conservano solo i dati di **carico e scarico** del dispositivo (importo, identificativo del dispositivo, data e ora, conti).

**BCE, FAQ Q9**:
> "The digital euro would function offline in a way that would offer users a cash-like level of privacy [...]. When paying offline, only the payer and the payee would know the personal transaction details of the payments made. Anti-money laundering checks would be carried out by the distributing payment service provider (PSP) during the funding and defunding process, just as it is the case with cash withdrawals and deposits today."

**BCE, FAQ Q7**: "users would need to fund the offline digital euro account first, and then tap their phones to the phones of another friend or the terminal at the shop".

- **Esito**: **Confermato**.

### 4.2 Limite di detenzione: c'è, ma nessuna cifra è decisa (i 3.000 € sono un'ipotesi di lavoro)

**Proposta, art. 16, par. 1**:
> "Ai fini dell'articolo 15, paragrafo 1, la Banca centrale europea sviluppa strumenti per limitare l'uso dell'euro digitale come riserva di valore e ne decide i parametri e l'utilizzo [...]"

Il par. 4 applica il limite "sia alle disponibilità offline che a quelle online". Il par. 8 dice: "Nel quadro del presente regolamento, l'euro digitale non produce interessi." **La proposta non contiene alcuna cifra.**

**BCE, Cipollone, 6/10/2026**:
> "At the request of the European Parliament, the ECB examined the possible effects of hypothetical holding limits from €500 to €3,000 on the balance sheets of 2,025 banks [...]"
> "These findings must be interpreted within the scope and assumptions of the analysis. The figures are illustrative and do not represent a decision on the eventual holding limit."

Dati dello stesso discorso: con un limite di 3.000 € l'LCR aggregato scenderebbe "from 166% to 163%". Nello scenario estremo l'LCR va al 100% "for only 13 banks, representing 0.3% of total banking sector assets".

**BCE, FAQ Q24**: "given the different hypothetical holding limits of up to €3,000 per person that the co-legislators asked to be tested".

- **Esito**: **Confermato**. 3.000 € è il **massimo della forbice simulata**, non un limite proposto né deciso.

### 4.3 Collegamento al conto bancario: "waterfall" e "reverse waterfall"

**Proposta, art. 13, par. 4**: i PSP consentono di
> "a) disporre il prelievo automatico dei fondi in euro digitale che superano le eventuali limitazioni [...] per spostarli su un conto di pagamento in euro non digitale, in caso di ricezione di un'operazione di pagamento in euro digitale effettuata online;
> b) effettuare un'operazione di pagamento in euro digitale online se l'importo dell'operazione supera le loro disponibilità di euro digitale."

E prosegue: "i prestatori di servizi di pagamento collegano ciascun conto di pagamento in euro digitale a un unico conto di pagamento in euro non digitale designato dagli utenti".

**BCE, Cipollone, 6/10/2026**:
> "A waterfall mechanism would allow users to make payments exceeding their digital euro balance by drawing the difference from that account. A reverse-waterfall mechanism could be used to automatically transfer to the linked bank account incoming amounts above the holding limit – or an even lower threshold if the customer so wishes."

- **Esito**: **Confermato**. I termini "waterfall" non compaiono nella proposta; la funzione invece sì.

### 4.4 Pagamenti condizionati sì, moneta programmabile no

**Proposta, art. 2**:
> "17. 'operazione di pagamento in euro digitale condizionata': un'operazione di pagamento in euro digitale che è disposta automaticamente una volta soddisfatte le condizioni predefinite concordate dal pagatore e dal beneficiario;
> 18. 'moneta programmabile': unità di moneta digitale con una logica intrinseca che limita la piena fungibilità di ciascuna unità;"

**Art. 24, par. 1, lett. b)**: la BCE può "fornire le funzionalità dell'infrastruttura di regolamento dell'euro digitale necessarie per l'esecuzione di operazioni di pagamento in euro digitale condizionate, compreso l'accantonamento di fondi."

**Art. 24, par. 2**: "**L'euro digitale non è moneta programmabile.**"

**Considerando 55**: la moneta programmabile sono "unità che, a causa di condizioni di spesa intrinsecamente definite, possono essere utilizzate solo per acquistare determinati tipi di beni o servizi o sono soggette a limiti temporali oltre i quali non sono più utilizzabili". Esempi di pagamenti condizionati: ordini permanenti e pagamenti "tra macchine".

**BCE, FAQ Q20**:
> "Programmable money is a digital form of money used for a predefined purpose, like a voucher, with limitations on where, when or with whom it can be used. As also envisaged in the European Commission's proposed digital euro Regulation, the digital euro would never be programmable money, but it could facilitate conditional payments (for example, if a customer buys something online and chooses the option to pay on delivery)."

- **Esito**: **Confermato**.
- **Collegamento con gli smart contract**: la logica condizionale sta **nel pagamento** (lato PSP o infrastruttura), non **nella moneta**. È l'opposto di un token che "si porta dietro" le proprie regole.

### 4.5 Privacy: la BCE non vede chi paga chi

**Proposta, art. 35, par. 4**: "la chiara separazione dei dati personali per garantire che la Banca centrale europea e le banche centrali nazionali non possano identificare direttamente i singoli utenti dell'euro digitale". L'art. 34, par. 4 prevede lo stesso obbligo per i dati che i PSP comunicano alla BCE.

**BCE, pagina privacy**: "The data available to the ECB would be pseudonymised, meaning that we would not see any personal data that could identify you. Your bank would have access to the minimum information needed to comply with EU law."

**BCE, pagina caratteristiche**: "The ECB and the Eurosystem would not be able to identify who you are or what you are buying from the payment data we get."

**BCE, FAQ Q9**: "In the case of online transactions, the Eurosystem would not be able to identify users making or receiving payments [...] but PSPs would be able to identify users for the purpose of compliance with anti-money laundering rules [...]. Thus, whether online or offline, the Eurosystem would not be able to directly link digital euro transactions to specific individuals."

- **Esito**: **Confermato**.
- **Precisazione**: online la privacy è **pseudonimizzazione** verso la BCE, non anonimato; la banca dell'utente lo identifica.

### 4.6 Pilota: 36 PSP, secondo semestre 2027, 12 mesi

**Comunicato BCE del 14/7/2026**:
> "The European Central Bank (ECB) has selected 36 payment service providers (PSP) from across the euro area to participate in the digital euro pilot. [...] is due to start during the second half of 2027 for a period of 12 months."

Altri passaggi:
- "more than 50 applications";
- "The pilot will use a beta version of the digital euro. It will be functionally and technically close to the digital euro as foreseen in the draft legislation but will not have legal tender status";
- si svolge presso la BCE e 19 banche centrali nazionali, **compresa l'Italia**.

**Allegato**, "PSP application country" = Italy (conteggio mio): Banca Monte dei Paschi di Siena S.p.A., Banca Sella S.p.A., Isybank S.p.A., Nexi Payments S.p.A., Numia S.p.A., Poste Italiane S.p.A., UniCredit S.p.A. Sono **7 su 36**. "Satispay Europe S.A." figura con Paese Luxembourg.

**Pagina pilota**: "we expect to run a 12‑month pilot starting in the second half of 2027"; "potential first issuance of the digital euro during 2029, assuming the digital euro Regulation is adopted in 2026". Il bando per i commercianti è chiuso e l'esito è previsto "by early 2027".

- **Esito**: **Confermato**.

---

## 5. IOTA: come si attiva una nuova versione del protocollo

### 5.1 Il processo, dalla documentazione ufficiale

**Fonte**: https://docs.iota.org/about-iota/iota-architecture/protocol-upgrades (200). Footer: "Copyright © 2026 IOTA Stiftung, licensed under CC BY 4.0. The documentation on this website is adapted from the SUI Documentation".

> "Software Release: A new iota-node binary is released, and validators update their software. After restarting, validators continue to run the previous protocol version until the upgrade is activated.
> Upgrade Signaling: Upgraded validators signal their readiness to switch to the new protocol version. This is done through consensus among the validator committee.
> Consensus and Activation: If enough validators agree to switch, the new protocol version is recorded on-chain at the end of the current epoch. The next epoch then executes using the upgraded protocol version."

E anche: "Validators that do not support the current protocol version cannot participate in consensus."

- **Esito**: **Confermato**.
- **Nota**: la documentazione dice "enough validators" e non dà la soglia. La soglia è nel codice (5.2).

### 5.2 La soglia esatta, dal codice (iotaledger/iota, ramo `develop`, commit `4940178`, 10/11/2026)

Permalink base: `https://github.com/iotaledger/iota/blob/49401789c5eed2aaa0ea3b1efd76ca6af571619a/`. Tutti i file sono stati letti da raw.githubusercontent.com (200). Licenza del repository: Apache-2.0.

**(a) Segnalazione.** Ogni validatore annuncia al comitato le versioni che supporta, tramite consenso. `crates/iota-node/src/lib.rs`, riga 2026, commento `// Advertise capabilities to committee, if we are a validator.`, poi `ConsensusTransaction::new_capability_notification_v1(...)`. Il messaggio è `AuthorityCapabilitiesV1` (`crates/iota-types/src/messages_consensus.rs`, riga 148) e contiene:
```rust
    /// ProtocolVersions that the authority supports, including the hash of the
    /// serialized ProtocolConfig of that authority per version.
    pub supported_protocol_versions: SupportedProtocolVersionsWithHashes,
```

**(b) Decisione al cambio d'epoca.** In `crates/iota-core/src/authority.rs`, la funzione `create_and_execute_advance_epoch_tx` (riga 5984) chiama `choose_protocol_version_and_system_packages_v1` (riga 5873):
```rust
    /// Selects the highest supported protocol version and system packages that
    /// the network has voted to upgrade to. If no upgrade is supported,
    /// returns the current protocol version and system packages.
```
Il test di voto è in `is_protocol_version_supported_v1` (riga 5793):
```rust
                let effective_threshold = committee.effective_threshold(buffer_stake_bps);
                ...
                let has_support = total_votes >= effective_threshold;
```
Il voto conta **solo se i validatori concordano sullo stesso hash della configurazione** (`get_version_digest`) **e sugli stessi pacchetti di sistema**. Commento nel codice: "There can only be one set of votes that have a majority".

**(c) La formula.** `crates/iota-types/src/committee.rs`, righe 52, 56 e 261–269:
```rust
pub const TOTAL_VOTING_POWER: StakeUnit = 10_000;
pub const QUORUM_THRESHOLD: StakeUnit = 6_667;
...
    pub fn effective_threshold(&self, mut buffer_stake_bps: u64) -> StakeUnit {
        ...
        let quorum_threshold = self.quorum_threshold();
        let f = self.total_votes() - quorum_threshold;
        let buffer_stake = (f * buffer_stake_bps).div_ceil(10000);
        quorum_threshold + buffer_stake
    }
```

**(d) Il parametro.** `crates/iota-protocol-config/src/lib.rs`, righe 1332–1337:
```rust
    /// A protocol upgrade always requires 2f+1 stake to agree. We support a
    /// buffer of additional stake (as a fraction of f, expressed in basis
    /// points) that is required before an upgrade can happen automatically.
    /// 10000bps would indicate that complete unanimity is required (all
    /// 3f+1 must vote), while 0bps would indicate that 2f+1 is sufficient.
    buffer_stake_for_protocol_upgrade_bps: Option<u64>,
```
Riga 2761: `buffer_stake_for_protocol_upgrade_bps: Some(5000),`. Il commento subito sopra dice ancora "For now, perform upgrades with a bare quorum of validators.": è un residuo, perché con 5000 il quorum non è "bare".

**(e) Il calcolo** (mio): f = 10.000 − 6.667 = 3.333; buffer = ⌈3.333 × 5000 / 10.000⌉ = 1.667; soglia = **8.334 su 10.000, cioè l'83,34% del potere di voto**. Non è 2/3.

**(f) Il potere di voto per validatore è limitato al 10%.** `crates/iota-framework/packages/iota-system/sources/voting_power.move`, righe 26–28:
```move
// Cap voting power of an individual validator at 10%.
// TODO: determine what this should be
const MAX_VOTING_POWER: u64 = 1_000;
```

- **Esito**: **Confermato** (codice) per tutti i punti da (a) a (f).

### 5.3 Valori live su mainnet (10/11/2026, ~17:53 UTC)

**RPC** https://api.mainnet.iota.cafe, `POST`, tutte 200.
- `iota_getProtocolConfig`: `"protocolVersion": "39"`, `"minSupportedProtocolVersion": "1"`, `"maxSupportedProtocolVersion": "39"`, attributo `buffer_stake_for_protocol_upgrade_bps` = `{"u64": "5000"}`.
- `iotax_getLatestIotaSystemStateV2`:
  - `epoch` 554, iniziata il 10/11/2026 alle 07:42:43 UTC;
  - `protocolVersion` 39;
  - `epochDurationMs` 86400000, cioè **un'epoca al giorno**;
  - 61 validatori attivi, di cui 60 nel comitato con potere di voto (somma 10.000);
  - il potere di voto massimo è 1.000 (il tetto del 10%).
- `iota_getChainIdentifier`: `6364aad5`.

**Calcolo mio** sulla distribuzione dell'epoca 554:
- per l'83,34% servono **almeno i 29 validatori più grandi**;
- per i 2/3 ne bastano 18;
- stake totale 2.388.125.151 IOTA su un'offerta di 5.024.811.561 IOTA (47,5%).

**GraphQL** https://graphql.mainnet.iota.cafe (200), `epoch(id){ startTimestamp protocolConfigs{protocolVersion} }`:

| Epoca | Inizio (UTC) | Versione di protocollo |
|---|---|---|
| 0 | 5/5/2025 07:39:04 | 6 |
| 547 | 3/11/2026 07:42 | 38 |
| 548 | 4/11/2026 07:42 | 38 |
| **549** | **5/11/2026 07:42:40** | **39** |
| 550 | 6/11/2026 07:42 | 39 |

**Note di rilascio v1.35.2 del 4/11/2026**, https://github.com/iotaledger/iota/releases/tag/v1.35.2 (via API GitHub, 200):
> "This release introduces protocol version `39`. On `mainnet`, this protocol version can be enabled no earlier than `2026-11-05 07:42 UTC` (start of epoch 549). Please ensure that you update your validators before this epoch change. Otherwise, if the upgrade threshold is reached, the protocol will remove you from the committee, and both you and your delegators will lose rewards."

Tra le modifiche della v39 c'è "Raise the minimum validator joining stake to 6M IOTA" (#13300).

- **Esito**: **Confermato**.
- **Insight**: la v39 si è attivata **al primo cambio d'epoca consentito**. Dalla genesi (v6, 5/5/2025) a oggi la mainnet è salita di 33 versioni in circa 18 mesi (calcolo mio, 39 − 6). Non ho verificato una per una come si sono attivate le versioni intermedie.

### 5.4 IOTA Foundation: forma giuridica e sede

**Fonte**: https://www.iota.org/impressum (200), "Information according to § 5 Digital Service Act (Digitale Dienste Gesetz, DDG)":
> "IOTA Stiftung (IOTA Foundation) — Registered address: IOTA Foundation, Berlin 10437, Pappelallee 78/79, Germany"
> "Board of Directors: Dominik Schiener, Jan Misselwitz, Luca Moser"
> "The IOTA Stiftung is a foundation registered with the foundation supervisory authority at the Berlin Senate Department for Justice, Consumer Protection and Anti-Discrimination, Salzburger Straße 21-25, 10825 Berlin, Germany."
> "ID/Company Number: 3416/1234/2"; "EU public ID number in the EU Transparency Register: 500027331119-04"; "VAT ID: DE329624902"

- **Esito**: **Confermato** (fonte primaria: dichiarazione dell'ente).
- **In parole semplici**: è una **fondazione di diritto tedesco** (*Stiftung*, cioè un patrimonio vincolato a uno scopo, senza soci), con sede a Berlino e vigilata dall'autorità berlinese sulle fondazioni.
- **Non verificato**: non ho consultato direttamente lo *Stiftungsverzeichnis* di Berlino.

---

## 6. Bitcoin Core: il codice dell'halving

- **Fonte**: https://raw.githubusercontent.com/bitcoin/bitcoin/master/src/validation.cpp (200).
- **Permalink**: https://github.com/bitcoin/bitcoin/blob/05187ec24963d19954db056ee5f64c1a1c0cd8a5/src/validation.cpp#L1827-L1838. È l'ultimo commit sul file, del 29/10/2026, letto via API GitHub (200).
- **Licenza (intestazione)**: "Copyright (c) 2009-2010 Satoshi Nakamoto / Copyright (c) 2009-present The Bitcoin Core developers / Distributed under the MIT software license".
- **Esito**: **Confermato** per i blocchi di codice e le citazioni di questa sezione.

Righe 1827–1838:
```cpp
CAmount GetBlockSubsidy(int nHeight, const Consensus::Params& consensusParams)
{
    int halvings = nHeight / consensusParams.nSubsidyHalvingInterval;
    // Force block reward to zero when right shift is undefined.
    if (halvings >= 64)
        return 0;

    CAmount nSubsidy = 50 * COIN;
    // Subsidy is cut in half every 210,000 blocks which will occur approximately every 4 years.
    nSubsidy >>= halvings;
    return nSubsidy;
}
```

**Dove viene fatto rispettare.** Stesso file, nella validazione del blocco:
```cpp
    CAmount blockReward = nFees + GetBlockSubsidy(pindex->nHeight, params.GetConsensus());
    if (block.vtx[0]->GetValueOut() > blockReward && state.IsValid()) {
        state.Invalid(BlockValidationResult::BLOCK_CONSENSUS, "bad-cb-amount",
                      strprintf("coinbase pays too much (actual=%d vs limit=%d)", block.vtx[0]->GetValueOut(), blockReward));
    }
```

**Costanti**:
- `src/kernel/chainparams.cpp`, riga 114, classe `CMainParams`: `consensus.nSubsidyHalvingInterval = 210000;`.
- `src/consensus/amount.h`, riga 15: `inline constexpr CAmount COIN{100'000'000};`.
- `amount.h`, riga 26: `inline constexpr CAmount MAX_MONEY{21'000'000 * COIN};`. Il commento (righe 19–21) dice: "Note that this constant is *not* the total money supply, which in Bitcoin currently happens to be less than 21,000,000 BTC for various reasons, but rather a sanity check."

**Dato live**: altezza attuale **975.328** (https://mempool.space/api/blocks/tip/height, 200, 10/11/2026 17:56 UTC).

**Calcoli miei**:
- 975.328 / 210.000 = 4 halving, quindi la ricompensa attuale è 50 >> 4 = **3,125 BTC**;
- prossimo halving al blocco 1.050.000, tra 74.672 blocchi, circa 518 giorni a 10 minuti per blocco: **primavera 2028**;
- 50 BTC = 5.000.000.000 satoshi, che è minore di 2^33: dopo 33 halving lo *shift* dà 0. L'emissione finisce quindi al blocco 6.930.000, molto prima del controllo `halvings >= 64`.

- **Esito**: **Confermato** (codice e dato live).

---

## 7. Ethereum

### 7.1 EIP-1559 (London): 5/8/2021, blocco 12.965.000

**ethereum.org**, https://ethereum.org/en/ethereum-forks/ (200, reindirizzato a `/ethereum-forks/`):
> "London — Aug 5, 2021, 12:33:42 PM UTC — Block number: 12,965,000"
> "The London upgrade introduced EIP-1559, which reformed the transaction fee market [...]"

**Verifica on-chain** (RPC pubblico https://ethereum-rpc.publicnode.com, `eth_getBlockByNumber`, 200):
- blocco **12.964.999**: 5/8/2021 12:33:32 UTC, **nessun campo `baseFeePerGas`**;
- blocco **12.965.000**: 5/8/2021 12:33:42 UTC, `baseFeePerGas` = `0x3b9aca00` = **1.000.000.000 wei = 1 gwei**, gas usato 30.025.257, cioè circa il doppio del target di 15 milioni (calcolo mio).

- **Esito**: **Confermato**.

### 7.2 The Merge (Paris): 15/9/2022, primo blocco PoS 15.537.394

**ethereum.org**:
> "Paris (The Merge) — Sep 15, 2022, 6:42:42 AM UTC — Block number: 15,537,394"
> "The Paris upgrade was triggered by the proof-of-work blockchain passing a [terminal total difficulty] of 58750000000000000000000. This happened at block 15537393 on 15th September 2022, triggering the Paris upgrade the next block."

**On-chain**:
- blocco 15.537.393: 06:42:42 UTC, `difficulty` 11.055.787.484.078.698, l'**ultimo blocco minato**;
- blocco **15.537.394**: 06:42:59 UTC, **`difficulty` 0**, il primo blocco proof-of-stake.

L'orario "6:42:42" indicato da ethereum.org è quello del blocco 15.537.393.

- **Esito**: **Confermato**.

### 7.3 ETH bruciati da EIP-1559

**ultrasound.money**, API https://ultrasound.money/api/v2/fees/burn-sums (200):
- `since_burn` = **4.643.600,55 ETH** al blocco 26.386.133, 10/11/2026 17:53:35 UTC (circa 13,12 miliardi di $ ai prezzi storici);
- `since_merge` = 2.020.291,21 ETH;
- ultime 24 h (`d1`) = 48,61 ETH.

**Etherscan**, https://etherscan.io/stat/supply (200, letto alle ~17:54 UTC):
- "Burnt Fees 4,643,314.24 Ether";
- "Current Total Supply 122,206,816.21 Ether".

Le due fonti differiscono di circa 286 ETH (0,006%, calcolo mio), quasi certamente per l'istante di aggiornamento.

- **Esito**: **Confermato** con due fonti indipendenti concordanti. Non esiste una fonte "ufficiale": è un aggregato che gli analisti ricavano dalle commissioni base bruciate blocco per blocco.
- **Insight**: in tutto oltre 4,6 milioni di ETH distrutti, ma oggi il ritmo è di circa 49 ETH al giorno.

---

## Esempi tecnici pronti per le slide

- **GENIUS Act, Sec. 4(a)(6)(B)**: "può emettere solo se ha la capacità tecnologica di eseguire" ordini di "seize, freeze, burn" (Sec. 2(16)). La legge chiede una funzione nel codice.
- **USDC, `Blacklistable.sol`**: `function blacklist(address _account) external onlyBlacklister`. Una riga e un indirizzo congelato.
- **USDT, `destroyBlackFunds`**: `balances[_blackListedUser] = 0; _totalSupply -= dirtyFunds;`. Il saldo di un terzo azzerato dall'owner.
- **USDT blocca solo chi invia, USDC anche chi riceve**: due scelte di design, due regimi diversi.
- **Il congelamento di USDC è un bit**: `| (1 << 255)` sul saldo.
- **MiCA, art. 49, par. 4**: rimborso "in qualsiasi momento e al valore nominale". Art. 50: niente interessi, nemmeno dai CASP.
- **MiCA, art. 54**: almeno il 30% dei fondi su conti separati in banca; per i token significativi i depositi salgono ad almeno il 60% (art. 45, par. 7, lett. b), richiamato dall'art. 58).
- **Circle**: IMEL autorizzato da ACPR il 1/7/2024; USDC ed EURC sono nel registro ESMA.
- **Euro digitale, art. 24, par. 2 della proposta**: "L'euro digitale non è moneta programmabile". Il pagamento condizionato invece sì, per esempio il pagamento alla consegna.
- **Euro digitale offline**: "only the payer and the payee would know", privacy come il contante; l'antiriciclaggio avviene al carico e allo scarico.
- **Limite di detenzione (art. 16)**: nessuna cifra; la BCE ha simulato da 500 a 3.000 €, "illustrative", "not a decision".
- **Waterfall e reverse waterfall (art. 13, par. 4)**: pago oltre il saldo attingendo al conto; l'eccedenza torna in banca da sola.
- **Pilota dell'euro digitale**: 36 PSP, 7 italiani, dal secondo semestre 2027 per 12 mesi.
- **IOTA**: un aggiornamento passa solo con l'83,34% del potere di voto, cioè 2/3 più metà del terzo restante. Altrimenti la rete resta com'è.
- **IOTA v39**: attivata il 5/11/2026 alle 07:42 UTC all'inizio dell'epoca 549. Chi non aggiorna esce dal comitato e perde le ricompense.
- **IOTA**: nessun validatore può superare il 10% del voto (`MAX_VOTING_POWER = 1_000`).
- **IOTA Stiftung**: fondazione di diritto tedesco con sede a Berlino, Pappelallee 78/79.
- **Bitcoin**: `nSubsidy >>= halvings`. L'halving è uno *shift* binario e i 21 milioni ne sono la conseguenza, non una regola scritta.
- **Bitcoin**: un blocco che si paga troppo viene rifiutato con `"bad-cb-amount"`. È la "politica monetaria" fatta rispettare da ogni nodo.
- **Ethereum, blocco 12.965.000**: prima `baseFee` = 1 gwei esatto; il blocco precedente non aveva il campo.
- **Ethereum, blocco 15.537.394**: `difficulty` = 0, fine del mining.
- **ETH bruciati**: circa 4,64 milioni al 10/11/2026, oggi circa 49 al giorno.

---

## Da ricontrollare

- **Numerazione degli articoli dell'euro digitale**: quella citata (13, 16, 23, 24, 34, 35, 37) è della **proposta COM(2023) 369**. Gli orientamenti del Consiglio (dicembre 2025) e il mandato del PE (luglio 2026) possono rinumerare. Se in aula si cita "il testo in trilogo", ricontrollare.
- **MiCA**: ho usato il testo GUUE originale (L 150 del 9/6/2023). Non ho verificato eventuali rettifiche o modifiche successive agli artt. 43–58; EUR-Lex risponde 202 (anti-bot) ai client automatici.
- **Classificazione di USDC o EURC come EMT "significativi" da parte dell'ABE**: **non verificabile** in questa sessione. Il registro ESMA non lo indica.
- **Codice di Circle**: ho citato da `master` e dai permalink indicati. Il contratto **effettivamente in esecuzione** su Ethereum (dietro il proxy USDC) non l'ho confrontato con il repository.
- **Righe del contratto USDT**: la numerazione è mia, sul sorgente estratto da Etherscan. Etherscan indica licenza "-NA-".
- **"Seize" nel codice**: nessun contratto letto ha una funzione chiamata così. L'equivalenza "sequestro = congela, brucia, riemetti" è una mia lettura, non una citazione.
- **IOTA**:
  - la soglia dell'83,34% vale finché `buffer_stake_for_protocol_upgrade_bps` resta 5000; il parametro può cambiare con una nuova versione di protocollo. Esiste anche un override operativo per epoca (`set_override_protocol_upgrade_buffer_stake`, che deve essere applicato da almeno 2f+1 validatori);
  - il conteggio "29 validatori" è una fotografia dell'epoca 554;
  - il commento "bare quorum" nel codice è superato dal valore 5000;
  - lo *Stiftungsverzeichnis* di Berlino non l'ho consultato direttamente.
- **ETH bruciati**: il valore cambia ogni 12 secondi. Le due fonti non sono "ufficiali" e differiscono di circa 286 ETH.
- **Data di entrata in vigore del GENIUS Act (18/1/2027)**: presa dal fact-check C, qui non ricontrollata.
- **Prossimo halving "primavera 2028"**: stima mia a 10 minuti per blocco; la data reale dipende dai tempi effettivi di mining.
