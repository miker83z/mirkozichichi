---
layout: capo
capo: IX
sezione: Identità decentralizzate
---

# Identità decentralizzate

Quando la chiave pubblica diventa un nome

---

# Le chiavi come identità

<div class="identita">
  <div class="persona">Mirko Zichichi</div>
  <div class="freccia">associato a</div>
  <div class="indirizzo"><code>0x7c3f9a1e…b42d</code><br><span class="grigio piccolo">indirizzo pubblico (alfanumerico)</span></div>
</div>

<p class="lead mt-8">Su una blockchain non ci si registra con nome e cognome: si è identificati da un indirizzo derivato da una chiave pubblica.</p>

<style>
.identita { display: flex; align-items: center; justify-content: center; gap: 1.5rem; margin-top: 2rem; }
.persona { font-family: var(--serif); font-size: 1.8rem; }
.freccia { color: var(--rubrica); font-style: italic; }
.indirizzo { text-align: center; }
.indirizzo code { font-size: 1.4rem; }
</style>

---

# Come si crea una nuova identità

<p class="lead">Basta generare una nuova coppia di chiavi asimmetriche (sk, pk).</p>

- La chiave pubblica **pk** è il "nome" dell'identità
  - è uno **pseudonimo**
  - in pratica si usa spesso l'**impronta di pk** come indirizzo (*address*): in Bitcoin, nel formato classico, RIPEMD-160(SHA-256(pk))
- La chiave privata **sk** permette di "parlare a nome" dell'identità: di firmare
- Ognuno controlla la propria identità perché solo lui conosce sk
- Se pk "sembra casuale", nessuno sa associarla a una persona… finché non lo rivela un suo comportamento o un collegamento esterno

---

# Gestione decentralizzata delle identità

<KeyIdentity />

---
layout: glossa
---

# Gestione decentralizzata: le conseguenze

- Chiunque può creare una nuova identità in qualsiasi momento, e quante ne vuole
- La probabilità di generare la stessa chiave di un altro utente è trascurabile, purché la chiave sia generata con una buona fonte di casualità (nel 2013 un difetto del generatore casuale di Android espose al furto i portafogli Bitcoin creati su Android)
- Nessun punto centrale di coordinamento, nessuna autorità che registri le identità
- In Bitcoin queste identità si chiamano **indirizzi**

::glossa::

Pseudonimo non vuol dire anonimo. I dati pseudonimizzati restano dati personali per chi può ricondurli a una persona.

- art. 4, n. 5, e considerando 26 GDPR
- Corte di giustizia UE, C-413/23 P, GEPD c. SRB (2025): conta la prospettiva di chi tratta i dati

---
layout: glossa
---

# Identificatori decentralizzati (DID)

<p class="lead">Un nuovo tipo di identificatore che permette un'identità digitale verificabile e decentralizzata. Sono spesso il mattone delle architetture di identità auto-sovrana (<em>self-sovereign identity</em>), anche se lo standard non usa questo termine.</p>

- Un DID identifica qualsiasi soggetto: una persona, un'organizzazione, una cosa, un modello di dati
- Chi controlla un DID può dimostrarlo crittograficamente (con la sua chiave privata)
- Può essere svincolato da registri centralizzati, fornitori di identità e autorità di certificazione; non serve nemmeno una blockchain (metodi `did:web`, `did:key`). Esempio: `did:example:123456789abcdefghi`

::glossa::

Standard W3C: *Decentralized Identifiers (DIDs) v1.0*, Raccomandazione del 19 luglio 2022; la v1.1 è in fase di Candidate Recommendation (marzo 2026).

Il portafoglio europeo di identità digitale (EUDI Wallet) **non usa i DID**: i dati di identità sono emessi nei formati SD-JWT VC e ISO mdoc.

- Reg. es. (UE) 2024/2977, modificato dal Reg. es. (UE) 2026/1731

---

# Il documento DID

<div class="grid grid-cols-[1fr_17rem] gap-6">

```json {3|4-9|10|11-15|all}
{
  "@context": "https://www.w3.org/ns/did/v1",
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

<div class="piccolo">

Gli elementi principali:

1. **id**: il DID stesso
2. **verificationMethod**: le chiavi pubbliche
3. **authentication**: quali chiavi servono per autenticarsi
4. **service**: dove contattare il soggetto

<p class="fonte mt-4">Correzione rispetto al 2024: data e firma non fanno parte del documento DID nello standard v1.0; le date sono metadati restituiti da chi lo risolve.</p>

</div>
</div>

<p class="fonte">Schema: <a href="https://www.w3.org/TR/did-core/">w3.org/TR/did-core</a></p>

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<Quiz
  domanda="Un indirizzo Bitcoin non contiene nome e cognome. I dati delle sue transazioni sono dati personali?"
  :opzioni="['No, sono anonimi', 'Possono esserlo: sono pseudonimi, riconducibili a una persona con informazioni ulteriori', 'Solo se l’importo supera 1.000 €']"
  :corretta="1"
  spiegazione="Pseudonimo non è anonimo: se il titolare può essere identificato con mezzi ragionevolmente utilizzabili, si applica il GDPR."
/>
<Quiz
  domanda="Chi rilascia un DID?"
  :opzioni="['Il Comune di residenza', 'Un’autorità di certificazione europea', 'Lo crea il titolare stesso, generando una coppia di chiavi']"
  :corretta="2"
  spiegazione="Nessuna autorità centrale: il controllo del DID deriva dal possesso della chiave privata."
/>
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
