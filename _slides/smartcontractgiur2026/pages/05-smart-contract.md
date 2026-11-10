---
layout: capo
capo: V
sezione: Smart contract
---

# Introduzione agli smart contract

Programmi che nessuno può fermare da solo

---

# Smart contract: un programma eseguito da tutti i nodi

<blockquote v-click>"A smart contract is a computerized transaction protocol that executes the terms of a contract." <span class="piccolo">N. Szabo, 1994</span></blockquote>

<v-clicks>

- Il codice e i suoi dati stanno sulla blockchain, visibili a tutti; ogni nodo lo esegue e ottiene lo stesso risultato
- Il contratto della classe: 208 righe di Move, pubblicate oggi sulla devnet con una sola transazione

</v-clicks>

<p class="lead" v-click>Da quel momento il contratto risponde a chiunque, a qualsiasi ora: anche se io spengo il computer.</p>

<!--
Szabo 1994, testo esatto: solo la frase citata. "Smart" perché più funzionali dei contratti su carta: "No use of artificial intelligence is implied" (Szabo, 1996). L'etimologia "smart ← intelligere" della slide del 2025 è sbagliata.
Per il giurista: uno smart contract non è necessariamente un contratto in senso giuridico. In Italia l'art. 8-ter del d.l. 135/2018 lo definisce come programma che "vincola automaticamente due o più parti sulla base di effetti predefiniti dalle stesse".
Dal lato di chi l'ha pubblicato: io possiedo l'UpgradeCap del pacchetto, quindi potrei pubblicarne una nuova versione; per rinunciarvi per sempre basta distruggerla. È il primo punto da controllare quando si legge un contratto: chi può cambiarlo?
-->

---

# Il distributore automatico

<SchemaDistributore />

<!--
L'esempio è di Szabo (1996–1997): "A canonical real-life example, which we might consider to be the primitive ancestor of smart contracts, is the humble vending machine".
-->

---

# Fiducia senza intermediario

<SchemaFiduciaContratto />

<p class="lead" v-click>Codice pubblico, più di due terzi dei validatori onesti, nessuno che possa cambiarlo da solo: allora il contratto non devia dall'accordo.</p>

<!--
Correzione rispetto al 2025: non "la maggioranza (⅔ + 1)", ma più di ⅔ della quota (n ≥ 3f + 1).
Attenzione all'immutabilità: un contratto può conservare poteri unilaterali (aggiornamento con l'UpgradeCap, blocco degli indirizzi negli stablecoin). Leggere il codice serve proprio a scoprirli.
-->

---

# Il problema dell'oracolo

<SchemaOracolo />

<p class="lead" v-click>Il contratto è affidabile quanto i dati che riceve dal mondo esterno.</p>

<!--
ethereum.org: gli smart contract "cannot, by default, access information stored outside the blockchain network". Gli oracoli decentralizzati (per esempio Chainlink) aggregano più fonti. Per un giurista: chi è responsabile se il dato è sbagliato?
-->

---

# Che cos'è una piattaforma per smart contract

<Piattaforma />

<p class="lead" v-click>Da qui in poi, in alto a destra, vedete a quale di queste parti siamo arrivati.</p>

---
piattaforma: 3
voce: 1
---

# I validatori: chi fa girare la rete

<SchemaRuoliPiattaforma />

<v-clicks>

- **IOTA**: rete attiva dal 5 maggio 2025, software open source; a novembre 2026 la fanno girare **61 validatori**
- Una nuova versione del protocollo parte solo quando l'ha installata più dell'83% del potere di voto: la v39 è attiva dal 5 novembre 2026

</v-clicks>

<!--
Dati on-chain del 10/11/2026 (epoca 554): 61 validatori attivi, 60 nel comitato di consenso; versione 39 del protocollo, attivata il 5/11/2026 all'inizio dell'epoca 549. Soglia: 83,34% del potere di voto (verifica/D). Nessun validatore può superare il 10% del voto. Consenso e registro li abbiamo visti nel Capo III: per questo sono già spuntati.
Semplificazione del 2025, utile in aula: in IOTA il wallet parla di solito con un nodo che non vota (full node), che inoltra ai validatori. C'è anche una catena compatibile con Ethereum (IOTA EVM).
-->

---
piattaforma: 4
---

# Wallet e account

<SchemaAccount />

<div class="sigle">
  <p v-click="4"><strong>EIP</strong>: Ethereum Improvement Proposal, una modifica proposta (e poi adottata) al protocollo di Ethereum</p>
</div>

<!--
EOA (Externally Owned Account) e CA (Contract Account) sono termini di Ethereum. In IOTA non ci sono "conti": ci sono oggetti posseduti da indirizzi, pacchetti Move e transazioni programmabili.
EIP-7702 (Ethereum, aggiornamento "Pectra", 7 maggio 2025): un EOA può delegare l'esecuzione a codice di un contratto. ethereum.org avverte: "If a user unknowingly delegates their account to a malicious contract, an attacker could easily gain control and steal funds".
-->

---
piattaforma: 4
---

# Binance, rivisto: dove stanno le chiavi

<SchemaHotCold />

<p class="lead" v-click>Su un exchange le chiavi non sono vostre: «not your keys, not your coins».</p>

<!--
Hot wallet: sempre online, firma i prelievi in automatico; cold wallet: offline, firma raramente e a mano. È il compromesso tra disponibilità e sicurezza (ETTO, Capo I).
MPC (multi-party computation): la chiave è divisa tra più macchine, nessuna la possiede intera.
Per il giurista: nel diritto UE chi custodisce cripto-attività per conto dei clienti risponde della loro perdita per un incidente a lui imputabile, nel limite del valore di mercato (Reg. (UE) 2023/1114, MiCA, art. 75, par. 8).
-->

---
piattaforma: 4
---

# Binance, 29 ottobre 2026: il percorso dell'attacco

<SchemaBinanceAttacco />

<v-clicks>

- Su Ethereum gli aggressori hanno ottenuto, con **EIP-7702**, il diritto di eseguire codice per conto di un hot wallet
- La delega è registrata sulla blockchain: per revocarla serviva la stessa firma collettiva (MPC), e quindi tempo

</v-clicks>

<div class="sigle">
  <p v-click="2"><strong>HR</strong>: risorse umane; <strong>IA</strong>: intelligenza artificiale</p>
</div>

<!--
Fonti: CoinDesk 3/11/2026 (ricostruzione di Binance); FBI 31/10/2026 (attribuzione a TraderTraitor, Corea del Nord); Protos (50 autorizzazioni EIP-7702 sul wallet "Binance 14"). Un rapporto tecnico ufficiale di Binance non è ancora pubblicato.
"Because Binance's hot wallets use multiparty computation, no single key could revoke it" (CoinDesk).
-->

---
piattaforma: 4
---

# Il precedente: Bybit, febbraio 2025

<v-clicks>

- **21 febbraio 2025**: dal cold wallet multifirma di Bybit escono circa **1,5 miliardi di dollari**
- Gli aggressori avevano manomesso l'interfaccia web di Safe{Wallet}, usata per firmare
- I tre firmatari hanno approvato una transazione che **sembrava** legittima e sostituiva il codice del wallet
- L'FBI attribuisce l'attacco alla Corea del Nord (TraderTraitor)

</v-clicks>

<p class="lead mt-4" v-click>Si firma ciò che lo schermo mostra: se lo schermo mente, la firma è valida lo stesso.</p>

<!--
Catena (Sygnia, Safe, Mandiant): 4/2/2025 compromesso il computer di uno sviluppatore di Safe; con le sue credenziali gli aggressori entrano nei server; il 19/2 modificano l'interfaccia app.safe.global con un codice attivo solo per Bybit; il 21/2 i firmatari approvano; la transazione sostituisce l'implementazione del wallet multifirma (delegatecall).
Dal lato di IOTA: il multisig è verificato dal protocollo stesso (fino a 10 chiavi con pesi), non da uno smart contract sostituibile; ma un'interfaccia che mente resta un rischio per chiunque firmi.
Nel 2025 la Corea del Nord ha rubato almeno 2,02 miliardi di dollari in cripto (Chainalysis, dicembre 2025), circa il 59% di tutti i furti.
-->

---
piattaforma: 5
---

# Computazione decentralizzata

<SchemaComputazione />

<div class="sigle">
  <p v-click="1"><strong>ISP</strong>: Internet Service Provider, il fornitore di accesso a Internet</p>
</div>

---
piattaforma: 5
---

# Applicazioni decentralizzate (dApp)

<SchemaStackDapp />

---
piattaforma: 5
---

# La finanza decentralizzata (DeFi)

<DefiTvl />

<v-clicks>

- Scambi senza intermediario: **Uniswap**, dove il prezzo lo fa una formula
- Prestiti senza banca: **Aave**, 11,8 miliardi prestati, sempre con garanzia superiore al prestito

</v-clicks>

<!--
Fonte: DefiLlama, 10/11/2026 (76,7 miliardi; massimo storico 177,5 miliardi il 9/11/2021). Aave: 16,1 miliardi depositati, 11,8 prestati. Se la garanzia scende troppo, chiunque può liquidarla e guadagnarci: lo fa un programma, non un ufficio crediti.
Terra/Luna (maggio 2022): una stablecoin algoritmica perde l'aggancio al dollaro e trascina con sé decine di miliardi; è uno dei motivi per cui MiCA vieta gli interessi sulle stablecoin e chiede riserve.
-->

---
piattaforma: 5
---

# Uno scambio senza banco: x · y = k

<SchemaAmm />

---
piattaforma: 5
---

# Proviamo: comprare da un pool

<div v-click>

<Amm />

</div>

<!--
Uniswap v2 (2020): prodotto costante x · y = k e commissione dello 0,3% a chi ha messo i fondi nel pool. Le versioni successive (v3, v4) aggiungono la liquidità concentrata e gli "hooks", ma l'idea è la stessa.
-->

---
piattaforma: 5
---

# Tokenizzazione: titoli e fondi sulla blockchain

<SchemaTokenizzazione />

<v-clicks>

- **40 miliardi di dollari** di attività reali in token; 14 miliardi sono titoli di Stato USA (10/11/2026)
- **Italia**: CDP, primo *digital bond* (2024); **BCE**: Pontes, per regolarli in euro di banca centrale (2026)

</v-clicks>

<div class="sigle">
  <p v-click="1"><strong>BUIDL</strong>: il fondo tokenizzato di BlackRock; <strong>BNY</strong>: la banca depositaria (BNY Mellon)</p>
  <p v-click="6"><strong>CDP</strong>: Cassa Depositi e Prestiti; <strong>BCE</strong>: Banca centrale europea</p>
</div>

<!--
Fonti: rwa.xyz (40,0 miliardi "distributed", 402,7 miliardi "represented"); CDP 18/7/2024 (sottoscritto da Intesa Sanpaolo, regolato con TIPS Hash-Link della Banca d'Italia, ai sensi del d.l. FinTech 25/2023); BCE 21/9/2026; MES 26/10/2026: bond digitale da 1 miliardo regolato su Pontes. Un NFT (Non-Fungible Token) è un token unico: rappresenta un bene o un diritto, ma vale quanto il contratto che c'è dietro. Vendite di NFT nel 2025: circa 5,6 miliardi di dollari (−37%, CryptoSlam).
-->

---
piattaforma: 5
---

# Che cos'è una DAO

<SchemaDao />

<div class="sigle">
  <p><strong>DAO</strong>: Decentralized Autonomous Organization, organizzazione autonoma decentralizzata; <strong>UNI</strong>: il token di Uniswap</p>
</div>

<!--
DAO: Decentralized Autonomous Organization. Un voto pesato sui token è "una quota, un voto", non "una testa, un voto": chi ha più token decide di più. Esempio: Uniswap; a dicembre 2025 la proposta "UNIfication" è passata con il 99,9%.
Per il giurista: chi risponde delle decisioni di una DAO? Negli USA, nel 2023, la CFTC ha ottenuto una condanna contro Ooki DAO, trattata come un'associazione non riconosciuta responsabile delle violazioni.
-->

---
piattaforma: 5
---

# The DAO, 2016: «il codice è legge»?

<SchemaTheDao />

<!--
17 giugno 2016: una chiamata ricorsiva (oggi "rientranza") svuota più di 3,6 milioni di ETH. Il 20 luglio 2016, al blocco 1.920.000, la comunità cambia le regole (hard fork) per restituire i fondi; chi rifiuta continua la vecchia catena: Ethereum Classic.
Per il giurista: la SEC (rapporto 34-81207, 25/7/2017) ha qualificato i token DAO come strumenti finanziari. Move impedisce la rientranza per costruzione.
-->

---
piattaforma: 6
---

# Esempio: un voto in uno smart contract

<SchemaVoto />

---
piattaforma: 6
---

# Il voto, nel contratto della classe

<div v-click>

```move {2|3|4-6|7-8|all}
public fun vota(sondaggio: &mut Sondaggio, scelta: u64, ctx: &TxContext) {
    assert!(sondaggio.aperto, EChiuso);
    assert!(scelta < sondaggio.opzioni.length(), ESceltaNonValida);
    let chi = ctx.sender();
    assert!(!sondaggio.votanti.contains(chi), EGiaVotato);
    sondaggio.votanti.add(chi, scelta);
    let conteggio = &mut sondaggio.voti[scelta];
    *conteggio = *conteggio + 1;
}
```

</div>

<p class="lead" v-click>Le regole sono nel codice: sondaggio aperto, scelta valida, un voto per indirizzo.</p>

<!--
È la funzione "vota" del pacchetto aula/move, senza l'ultima riga (l'evento Votato). Il chiamante (ctx.sender) è l'indirizzo che ha firmato la transazione: nessuno può votare per un altro.
Move, il linguaggio di IOTA e Sui: una moneta non si può copiare né perdere per errore, lo impedisce il compilatore (Coin ha le abilità key e store, non copy né drop).
-->

---
piattaforma: 6
---

# Il contratto della classe, tutto intero

<SchemaContrattoAula />

---
piattaforma: 6
---

# Votate dal telefono

<Lavagna solo="voto" />

<!--
Il sondaggio è già aperto sulla devnet (creato il 10/11/2026 con node scripts/aula-sondaggio.mjs "Che cosa impedisce di riscrivere un blocco già confermato?" "La firma del miner" "L'impronta del blocco dentro il successivo" "Una legge" "Il server di un'azienda"): nell'app è il passo 5, dopo l'invio di AULA. Per chiuderlo dopo la lezione: node scripts/aula-sondaggio.mjs --chiudi.
Risposta giusta: l'impronta del blocco dentro il successivo (integrità, Capo II e «Blocchi veri»): cambiare un blocco cambia la sua impronta e rompe il legame con tutti i successivi. Per rifarli servirebbe rifare tutto il lavoro (Proof of Work) o avere più di due terzi dei voti (Proof of Stake). La firma del miner: in Bitcoin i blocchi non sono firmati dal miner. Una legge, il server di un'azienda: proprio ciò che una blockchain non usa.
-->
