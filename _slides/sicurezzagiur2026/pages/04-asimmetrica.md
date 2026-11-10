---
layout: capo
capo: IV
sezione: Crittografia asimmetrica
---

# Crittografia asimmetrica

Una chiave per tutti, una chiave solo per me

---

# Crittografia a chiave pubblica

<SchemaChiaviAliceBob />

<p class="lead" v-click>Ciò che una chiave chiude, solo l'altra lo apre. E dalla pubblica non si ricava la privata.</p>

<!--
Chiave pubblica: disponibile a chiunque, come un indirizzo. Chiave privata: custodita dal titolare, mai comunicata.
Per il giurista: è la definizione stessa di firma digitale nel diritto italiano: "un sistema di chiavi crittografiche, una pubblica e una privata, correlate tra loro" (art. 1, c. 1, lett. s, CAD).
-->

---

# Alice scrive a Bob, in segreto

<SchemaCifraturaAsimmetrica />

<!--
Analogia: Bob distribuisce lucchetti aperti (la chiave pubblica). Chiunque può chiudere una scatola con un lucchetto di Bob, ma solo Bob ha la chiave per riaprirla.
Alice e Bob non hanno dovuto accordarsi prima su un segreto comune: il problema della distribuzione delle chiavi del Capo III è risolto.
In pratica si usa la cifratura ibrida: l'asimmetrica serve a scambiare una chiave AES, con cui si cifrano i dati.
Attenzione: la chiave pubblica deve essere autentica, altrimenti un intermediario può sostituirla con la propria (è il problema dei certificati, Capo VII).
-->

---

# Proviamo: Alice cifra, Bob decifra

<div v-click>

<PublicKeyBox />

</div>

---

# Cosa si ottiene con le due chiavi

<div class="grid grid-cols-2 gap-10 mt-2">
<div v-click>

## Cifro con la pubblica del destinatario

- **Riservatezza**: solo lui può leggere

</div>
<div>
<div v-click>

## Firmo con la mia privata

</div>

<v-clicks>

- **Autenticazione**: si sa chi ha scritto
- **Integrità**: ogni modifica si vede
- **Non ripudio**: non posso negare

</v-clicks>

</div>
</div>

<p class="grigio mt-6" v-click>La colonna di destra è la firma digitale: la vediamo nel Capo VII.</p>

---

# RSA (Rivest–Shamir–Adleman, 1977)

<p class="lead" v-click>La sicurezza si basa, in parte, su un fatto pratico: moltiplicare è facile, fattorizzare è difficile.</p>

<SchemaFattorizzazione />

<p v-click><strong>Settembre 2026</strong>: nuovi record di fattorizzazione; RSA-2048 resta fuori portata.</p>

<!--
RSA-260 (862 bit) fattorizzato da E. Lu (Cognition) il 3/9/2026 in circa 13,5 anni-GPU (≈ 400.000 $); RSA-896 da S. Weis (19/9/2026), con l'aiuto di Claude. L'autore del record RSA-260 stima circa 30 milioni di dollari per un numero RSA-1024.
Non si conosce un algoritmo classico (non quantistico) efficiente per fattorizzare numeri molto grandi.
-->

---

# Proviamo: moltiplicare e fattorizzare

<div v-click>

<Factoring />

</div>

---

# E il computer quantistico?

<p class="lead" v-click>Con l'algoritmo di Shor, un computer quantistico abbastanza grande romperebbe RSA e le curve ellittiche. Oggi non esiste, ma ci si prepara.</p>

<SchemaPostQuantum />

<p v-click><strong>"Raccogli ora, decifra dopo"</strong>: ciò che oggi viene intercettato cifrato potrà essere letto in futuro.</p>

<div class="sigle">
  <p v-click="6"><strong>ECC</strong>: Elliptic Curve Cryptography, la crittografia su curve ellittiche (tra due slide)</p>
</div>

<!--
Non serve una data: basta che il computer quantistico arrivi prima che il segreto scada. Per atti coperti da segreto professionale, dati sanitari o giudiziari, la riservatezza deve durare più a lungo della crittografia che la protegge. Le firme, invece, non corrono questo rischio.
Standard NIST del 13/8/2024: FIPS 203, 204, 205 (ML-KEM, ML-DSA, SLH-DSA); a marzo 2025 HQC come riserva. NIST IR 8547 (finale 27/10/2026): RSA ed ECC deprecati dopo il 2030, non più ammessi dopo il 2035.
Per il giurista: la tabella di marcia UE (giugno 2025), adottata in attuazione della Racc. (UE) 2024/1101, è soft law: non vincola, ma può pesare sugli obblighi vincolanti attraverso lo «stato dell'arte» (art. 32 GDPR) e le «conoscenze più aggiornate» (art. 21 NIS2).
-->

---

# ECDSA: firme su curve ellittiche

<v-clicks>

- Stessa sicurezza di RSA con **chiavi molto più corte**: 256 bit ≈ RSA da 3072 bit
- Usata da **Bitcoin** ed **Ethereum**: chi ha la chiave privata ha i fondi
- Variante moderna: **Ed25519**, approvata dal NIST nel 2023
- Anche le curve cadrebbero con un computer quantistico: arriva ML-DSA (FIPS 204)

</v-clicks>

<div class="sigle">
  <p v-click="4"><strong>ML-DSA</strong>: Module-Lattice-Based Digital Signature Algorithm, la firma basata sui reticoli, resistente ai computer quantistici</p>
</div>

<!--
Fonti: NIST SP 800-57 (equivalenze), curva secp256k1 per Bitcoin ed Ethereum, RFC 8032 (EdDSA), FIPS 186-5 (2023).
-->

---

# La geometria delle curve ellittiche

<SchemaCurvaEllittica />

<!--
La chiave privata è un numero n; la chiave pubblica è un punto fisso "sommato" a sé stesso n volte. Andare avanti è facile; tornare indietro (dal punto al numero) è il "logaritmo discreto", impraticabile per curve abbastanza grandi.
Sui numeri reali per farla vedere; in crittografia si usa la stessa regola su un insieme finito di punti.
-->

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<div v-click>
<Quiz
  domanda="Alice vuole mandare a Bob un documento riservato. Con quale chiave lo cifra?"
  :opzioni="['La chiave privata di Alice', 'La chiave pubblica di Bob', 'La chiave privata di Bob']"
  :corretta="1"
  spiegazione="Con la chiave pubblica di Bob: solo la chiave privata di Bob, che nessun altro possiede, potrà decifrarlo."
/>
</div>
<div v-click>
<Quiz
  domanda="Perché la crittografia asimmetrica risolve la distribuzione delle chiavi?"
  :opzioni="['Perché le chiavi sono più lunghe', 'Perché la chiave pubblica si può diffondere senza rischi', 'Perché non usa chiavi']"
  :corretta="1"
  spiegazione="La chiave pubblica può viaggiare in chiaro: non serve un canale sicuro per accordarsi prima su un segreto comune."
/>
</div>
</div>
