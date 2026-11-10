---
layout: capo
capo: IV
sezione: Crittografia asimmetrica
---

# Crittografia asimmetrica

Una chiave per tutti, una chiave solo per me

---
layout: glossa
---

# Crittografia a chiave pubblica

<p class="lead">Ognuno ha una coppia di chiavi legate tra loro: una pubblica e una privata.</p>

<div class="grid grid-cols-2 gap-6 mt-2">
<div class="demo">

**Chiave pubblica**

resa disponibile a chiunque, come un indirizzo o un numero di conto

</div>
<div class="demo">

**Chiave privata**

custodita gelosamente dal titolare e mai comunicata a nessuno

</div>
</div>

<p class="mt-5">Ciò che una chiave chiude, solo l'altra lo apre. E dalla chiave pubblica non si può ricavare quella privata.</p>

::glossa::

È la definizione stessa di firma digitale nel diritto italiano:

"un sistema di chiavi crittografiche, una pubblica e una privata, correlate tra loro" che consente al titolare (con la privata) e a un terzo (con la pubblica) di rendere manifesta e di verificare provenienza e integrità del documento.

- art. 1, c. 1, lett. s), CAD (d.lgs. 82/2005)

---

# Alice scrive a Bob, in segreto

<p class="lead">Alice cifra con la chiave pubblica di Bob; solo Bob, con la sua chiave privata, può decifrare.</p>

<PublicKeyBox />

<!--
In pratica si usa la cifratura ibrida: la crittografia asimmetrica serve a scambiare una chiave AES, con cui si cifrano i dati.
Attenzione: la chiave pubblica deve essere autentica, altrimenti un intermediario può sostituirla con la propria (è il problema dei certificati, Capo VII).
Analogia: Bob distribuisce lucchetti aperti (la chiave pubblica). Chiunque può chiudere una scatola con un lucchetto di Bob, ma solo Bob ha la chiave per riaprirla.
Notare che Alice e Bob non hanno dovuto accordarsi prima su un segreto comune: è il problema della distribuzione delle chiavi del Capo III, risolto.
-->

---

# Cosa si ottiene con le due chiavi

<div class="grid grid-cols-2 gap-10 mt-2">
<div>

## Cifro con la chiave pubblica del destinatario

- **Riservatezza**: soggetti non autorizzati non possono leggere il dato; solo il destinatario ha la chiave privata

</div>
<div>

## Firmo con la mia chiave privata

- **Autenticità**: si verifica da chi proviene il messaggio
- **Integrità**: ci si accorge se è stato alterato durante la trasmissione, per errore o di proposito
- **Non ripudio**: il mittente non può negare in seguito di averlo inviato

</div>
</div>

<p class="mt-6 grigio">La colonna di destra è la firma digitale: la vediamo nel Capo VII.</p>

---
layout: glossa
---

# RSA (Rivest–Shamir–Adleman, 1977)

<p class="lead">La sua sicurezza si basa, in parte, su un fatto pratico: moltiplicare due numeri primi grandi è facile, risalire ai fattori dal prodotto è difficilissimo.</p>

<Factoring stretto />

::glossa::

**Settembre 2026**: due record in 16 giorni.

RSA-260 (862 bit) fattorizzato con GPU in circa 13,5 anni-GPU (≈ 400.000 $); poi RSA-896, con l'aiuto di agenti di intelligenza artificiale.

RSA-2048 (617 cifre) resta fuori portata; ma le chiavi da 1024 bit non vanno più considerate sicure.

<p class="fonte">E. Lu, Cognition, 9.9.2026; S. Weis, 19.9.2026</p>

<!--
Il problema della fattorizzazione: non si conosce un algoritmo classico (non quantistico) efficiente per fattorizzare numeri molto grandi.
L'autore del record RSA-260 stima circa 30 milioni di dollari per fattorizzare un numero RSA-1024 con le stesse tecniche.
-->

---
layout: glossa
---

# E il computer quantistico?

<p class="lead">Un computer quantistico abbastanza grande, con l'algoritmo di Shor (1994), romperebbe RSA e le curve ellittiche. Oggi non esiste, ma ci si prepara.</p>

- **13 agosto 2024**: il NIST pubblica i primi standard "post-quantistici" (FIPS 203, 204, 205: ML-KEM, ML-DSA, SLH-DSA); a marzo 2025 sceglie HQC come riserva
- **Giugno 2025**: tabella di marcia comune UE: piani nazionali entro il 2026, sistemi ad alto rischio migrati entro il 2030, gli altri per quanto possibile entro il 2035
- **27 ottobre 2026**: il NIST fissa il calendario definitivo (IR 8547): RSA e curve ellittiche **deprecati dopo il 2030, vietati dopo il 2035**

::glossa::

**"Raccogli ora, decifra dopo"** (*harvest now, decrypt later*): chi intercetta oggi comunicazioni cifrate può conservarle e leggerle tra dieci o quindici anni.

Per atti coperti da segreto professionale, dati sanitari o giudiziari, la riservatezza deve durare più a lungo della crittografia che la protegge. Le firme, invece, non corrono questo rischio.

La tabella UE è *soft law* (Racc. (UE) 2024/1101): diventa vincolante attraverso lo "stato dell'arte" (art. 32 GDPR; art. 21 NIS2).

---

# ECDSA: firme su curve ellittiche

<p class="lead">Elliptic Curve Digital Signature Algorithm: la firma digitale basata sulla geometria delle curve ellittiche.</p>

- Stessa sicurezza di RSA con **chiavi molto più corte**: una chiave ECC da 256 bit vale circa una chiave RSA da 3072 bit (NIST SP 800-57)
- Usata da **Bitcoin** ed **Ethereum** per firmare le transazioni (curva secp256k1): chi controlla la chiave privata controlla i fondi
- Variante moderna: **EdDSA / Ed25519** (RFC 8032), approvata dal NIST nel 2023
- Anche le curve ellittiche cadrebbero con un computer quantistico: il sostituto previsto è ML-DSA (FIPS 204)

---

# La geometria delle curve ellittiche

<p class="lead">La chiave privata è un numero n; la chiave pubblica è un punto fisso "sommato" a sé stesso n volte.</p>

<CurvaEllittica />

<!--
Andare avanti è facile (sommare); tornare indietro, cioè dal punto risalire al numero, è il "logaritmo discreto": impraticabile per curve abbastanza grandi.
-->

---

# Verifica rapida

<div class="grid grid-cols-2 gap-8">
<Quiz
  domanda="Alice vuole mandare a Bob un documento riservato. Con quale chiave lo cifra?"
  :opzioni="['La chiave privata di Alice', 'La chiave pubblica di Bob', 'La chiave privata di Bob']"
  :corretta="1"
  spiegazione="Con la chiave pubblica di Bob: solo la chiave privata di Bob, che nessun altro possiede, potrà decifrarlo."
/>
<Quiz
  domanda="Perché la crittografia asimmetrica risolve il problema della distribuzione delle chiavi?"
  :opzioni="['Perché le chiavi sono più lunghe', 'Perché la chiave pubblica si può diffondere senza rischi', 'Perché non usa chiavi']"
  :corretta="1"
  spiegazione="La chiave pubblica può viaggiare in chiaro: non serve un canale sicuro per accordarsi prima su un segreto comune."
/>
</div>
