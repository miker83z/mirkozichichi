---
layout: capo
capo: III
sezione: Crittografia simmetrica
---

# Crittografia simmetrica

Una sola chiave, condivisa da mittente e destinatario

---

# Cifratura simmetrica

<SchemaSimmetrica />

<p class="lead" v-click>Stessa chiave alle due estremità: è il "segreto condiviso" (<em>shared secret</em>).</p>

---

# Il cifrario di Cesare, attaccato

<p class="lead" v-click>Le chiavi sono solo 25: basta provarle tutte. È l'attacco a forza bruta (<em>brute force</em>).</p>

<div v-click>

<Caesar modo="forzabruta" :chiave-vera="3" />

</div>

<!--
Far scegliere alla classe la riga leggibile. Morale: lo spazio delle chiavi deve essere enorme, non solo segreto.
-->

---

# Una chiave che cambia

<p class="lead" v-click>Cambiare la chiave a ogni messaggio, o addirittura a ogni lettera: lo stesso testo dà cifrati diversi.</p>

<div v-click>

<VariableShift />

</div>

<!--
Si chiama cifrario polialfabetico (non "polimorfico", come nel 2024): il più noto, detto "di Vigenère", era già stato descritto dall'italiano Giovan Battista Bellaso (Venezia, 1553).
-->

---

# DES: Data Encryption Standard

<v-clicks>

- Standard USA dal **1977**, progettato da IBM: chiave di **56 bit**
- 2<sup>56</sup> ≈ 7,2 × 10<sup>16</sup> chiavi: nel **1998** la macchina *Deep Crack* ne trova una in 56 ore
- Oggi hardware dedicato le prova tutte in circa un giorno
- Il **Triplo DES** non è più ammesso dal NIST per cifrare (dal 2024)

</v-clicks>

<p class="lead mt-4" v-click>I computer accelerano: le chiavi devono allungarsi.</p>

<!--
Correzione rispetto al 2024: non "un moderno calcolatore in poche ore": nel 1999 una chiave fu trovata in 22 ore con hardware dedicato e 100.000 PC; crack.sh (48 FPGA) esaurisce lo spazio in ~26 ore; una RTX 4090 in ~6 giorni. Triplo DES: NIST SP 800-131A Rev. 2.
Blocchi da 64 bit cifrati uno per uno.
-->

---

# AES: Advanced Encryption Standard

<v-clicks>

- Standard dal **2001** (NIST FIPS 197), sostituisce DES
- Chiavi da **128, 192 o 256 bit**; blocchi da 128 bit
- 2<sup>128</sup> ≈ 3,4 × 10<sup>38</sup> chiavi: provarle tutte è impraticabile
- Regge anche ai computer quantistici: il NIST non prevede di sostituirlo

</v-clicks>

<p class="lead mt-4" v-click>Protegge ogni giorno il Wi-Fi, i dischi dei portatili, WhatsApp, HTTPS.</p>

<div class="sigle">
  <p v-click="1"><strong>FIPS</strong>: Federal Information Processing Standards, gli standard informatici del governo federale statunitense</p>
  <p v-click="5"><strong>HTTPS</strong>: HyperText Transfer Protocol Secure, il protocollo dei siti web protetti (il lucchetto nel browser)</p>
</div>

<!--
Per il giurista: se i dati sottratti erano cifrati, il titolare non deve comunicare la violazione agli interessati (art. 34, par. 3, lett. a, GDPR). Resta l'obbligo di notificarla al Garante, se ci sono rischi (art. 33).
-->

---

# Quanto tempo serve per provare tutte le chiavi?

<div v-click>

<KeySpace :velocita-chiavi="[{ valore: 2.19e10, etichetta: 'una scheda grafica moderna' }, { valore: 2.19e14, etichetta: '10.000 schede grafiche' }, { valore: 1e21, etichetta: 'quanto tutta la rete Bitcoin (solo come ordine di grandezza)' }]" />

</div>

<!--
Scheda "Chiavi": una RTX 4090 prova circa 2,2 × 10^10 chiavi AES-128 al secondo (hashcat 6.2.6); la rete Bitcoin calcola circa 10^21 hash SHA-256 al secondo (mempool.space, novembre 2026), ma i suoi circuiti sanno fare solo quello: è un limite simbolico.
Con 10^21 tentativi al secondo, 2^128 chiavi richiedono circa 1,1 × 10^10 anni: quasi l'età dell'universo.
L'NSA scrive che l'enorme numero di configurazioni di Enigma diede ai tedeschi una fiducia immeritata: lo spazio delle chiavi è necessario, non sufficiente.
La tabella in basso riproduce la slide del 2024 (con la correzione 62^12 al posto di 52^12).
-->

---

# Crittografia simmetrica: pro e contro

<p v-click><strong>A favore</strong>: è molto <strong>efficiente</strong>, anche su grandi quantità di dati.</p>

<v-clicks>

- **Distribuzione delle chiavi**: come ci si accorda in segreto sulla chiave?
- **Scalabilità**: serve una chiave per ogni coppia di persone
- **Niente non ripudio**: la chiave ce l'hanno entrambi

</v-clicks>

<!--
Per il giurista: se la stessa chiave è nelle mani di entrambe le parti, ciascuna può aver prodotto il messaggio: davanti a un terzo nessuna delle due può provare che l'ha scritto l'altra. Serve qualcosa che solo una parte possiede: la chiave privata (Capo IV).
-->

---

# Quante chiavi servono?

<SchemaChiaviCoppie />

<!--
Correzione rispetto al 2024: il numero di chiavi cresce con il quadrato di n (n(n−1)/2), non "in maniera esponenziale".
10 persone: 45 chiavi; 100: 4.950; 1.000: 499.500. Con la crittografia asimmetrica bastano n coppie.
-->

---

# Proviamo: quante chiavi per n persone?

<div v-click>

<KeyCount />

</div>
