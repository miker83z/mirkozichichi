---
layout: capo
capo: IX
sezione: Identità decentralizzate
---

# Identità decentralizzate

Quando la chiave pubblica diventa un nome

---

# Le chiavi come identità

<SchemaChiaviIdentita />

<p class="lead" v-click>Su una blockchain non ci si registra con nome e cognome: si è un indirizzo.</p>

---

# Come si crea una nuova identità

<SchemaNuovaIdentita />

<div class="sigle">
  <p v-click="1"><strong>sk</strong>, <strong>pk</strong>: chiave privata (secret key) e chiave pubblica (public key)</p>
</div>

<!--
La chiave pubblica pk è il "nome" dell'identità: uno pseudonimo. In pratica si usa spesso l'impronta di pk come indirizzo: in Ethereum (formato 0x…) gli ultimi 20 byte dell'impronta Keccak-256 di pk; in Bitcoin, nel formato classico, RIPEMD-160(SHA-256(pk)). La chiave privata sk permette di "parlare a nome" dell'identità: di firmare.
-->

---

# Gestione decentralizzata delle identità

<v-clicks>

- Chiunque crea quante identità vuole, quando vuole
- Due chiavi uguali? Probabilità trascurabile, se il generatore casuale è buono
- Nessuna autorità che registri le identità
- In Bitcoin si chiamano **indirizzi**

</v-clicks>

<!--
Caso reale: nel 2013 un difetto del generatore casuale di Android espose al furto i portafogli Bitcoin creati su Android.
-->

---

# Un indirizzo, nella pratica

<SchemaPortafoglio />

<div class="sigle">
  <p v-click="1"><strong>BTC</strong>: bitcoin, l'unità della valuta</p>
  <p v-click="1"><strong>BIP</strong>: Bitcoin Improvement Proposal, i documenti che definiscono le regole di Bitcoin (la BIP 173 fissa questo formato di indirizzo)</p>
</div>

---

# Proviamo: creare un'identità

<div v-click>

<KeyIdentity />

</div>

---

# Pseudonimo non vuol dire anonimo

<SchemaPseudonimo />

<div class="sigle">
  <p v-click="1"><strong>ETH</strong>: ether, la valuta della blockchain Ethereum</p>
  <p v-click="2"><strong>KYC</strong>: Know Your Customer, l'adeguata verifica della clientela imposta dalle norme antiriciclaggio</p>
</div>

<!--
Per il giurista: i dati pseudonimizzati restano dati personali per chi può ricondurli a una persona (art. 4, n. 5, e considerando 26 GDPR). Corte di giustizia UE, C-413/23 P, GEPD c. SRB (4 settembre 2025): conta la prospettiva di chi tratta i dati; per l'obbligo di informazione si guarda al titolare al momento della raccolta.
-->

---

# Identificatori decentralizzati (DID)

<p class="lead" v-click>Un identificatore che il titolare controlla da sé, con le proprie chiavi.</p>

<v-clicks>

- Identifica qualsiasi soggetto: persona, organizzazione, cosa
- Il titolare dimostra il controllo firmando con la chiave privata
- Nessun registro centrale; non serve nemmeno una blockchain

</v-clicks>

<p class="formula" v-click><code>did:example:123456789abcdefghi</code></p>

<!--
Standard W3C: Decentralized Identifiers (DIDs) v1.0, Raccomandazione del 19 luglio 2022; la v1.1 è in fase di Candidate Recommendation (marzo 2026). Spesso usati nelle architetture di identità auto-sovrana (self-sovereign identity), anche se lo standard non usa questo termine. Metodi senza blockchain: did:web, did:key.
Il portafoglio europeo (EUDI Wallet) non usa i DID: i dati di identità sono emessi nei formati SD-JWT VC e ISO mdoc (Reg. es. (UE) 2024/2977, modificato dal 2026/1731).
-->

---

# Il documento DID

<SchemaDID />

<!--
Correzione rispetto al 2024: data e firma non fanno parte del documento DID nello standard v1.0; le date sono metadati restituiti da chi lo risolve.
-->

---

# Il documento DID, com'è scritto

```json {hide|3|4-9|10|11-15|all}
{
  "@context": ["https://www.w3.org/ns/did/v1", "https://w3id.org/security/multikey/v1"],
  "id": "did:example:123456789abcdefghi",
  "verificationMethod": [{
    "id": "did:example:123456789abcdefghi#chiave-1",
    "type": "Multikey",
    "controller": "did:example:123456789abcdefghi",
    "publicKeyMultibase": "z6MkmM42vxfqZQsv4ehtTjFF…"
  }],
  "authentication": ["#chiave-1"],
  "service": [{
    "id": "#sito",
    "type": "LinkedDomains",
    "serviceEndpoint": "https://studio-legale-esempio.it"
  }]
}
```

<p class="fonte" v-click="1">Schema: <a href="https://www.w3.org/TR/did-core/">w3.org/TR/did-core</a></p>

<style>
.slidev-code { font-size: 0.95rem !important; line-height: 1.45 !important; }
</style>

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<div v-click>
<Quiz
  domanda="Un indirizzo Bitcoin non contiene nome e cognome. I dati delle sue transazioni sono dati personali?"
  :opzioni="['No, sono anonimi', 'Possono esserlo: sono pseudonimi, riconducibili a una persona con informazioni ulteriori', 'Solo se l’importo supera 1.000 €']"
  :corretta="1"
  spiegazione="Pseudonimo non è anonimo: se il titolare può essere identificato con mezzi ragionevolmente utilizzabili, si applica il GDPR."
/>
</div>
<div v-click>
<Quiz
  domanda="Chi rilascia un DID?"
  :opzioni="['Il Comune di residenza', 'Un’autorità di certificazione europea', 'Lo crea il titolare stesso, generando una coppia di chiavi']"
  :corretta="2"
  spiegazione="Nessuna autorità centrale: il controllo del DID deriva dal possesso della chiave privata."
/>
</div>
</div>

<div class="sigle">
  <p v-click="1"><strong>GDPR</strong>: General Data Protection Regulation, il regolamento generale sulla protezione dei dati, Reg. (UE) 2016/679</p>
</div>

---
layout: copertina
---

# Grazie!

## Domande?

**Mirko Zichichi** · mirko.zichichi@iota.org · [mirkozichichi.me](https://mirkozichichi.me)

<div class="qr">
  <img src="/img/qr-slide.svg" alt="Codice QR che apre le slide interattive" />
  <p>Le slide interattive:<br><strong>mirkozichichi.me/slides/sicurezzagiur2026</strong></p>
</div>

<style>
.qr { display: flex; align-items: center; gap: 1.2rem; margin-top: 2rem; }
.qr img { width: 8.5rem; height: 8.5rem; }
.qr p { font-size: 1rem; }
</style>
